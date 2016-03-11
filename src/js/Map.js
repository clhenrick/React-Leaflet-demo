// this is the Map component for React!
// import some dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var qwest = require('qwest');

// add our subway line filter component
var Filter = require('./Filter');

// let's store the map configuration properties, 
// we could also move this to a separate file & require it
var config = {};

// a local variable to store our instance of L.map
var map;

// an array to store BK subway lines
var tmpSubwayLines = [];
var subwayLines = [];

// map paramaters to pass to L.map when we instantiate it
config.params = {
  center: [40.655769,-73.938503], //Greenpoint
  zoomControl: false,
  zoom: 13,
  maxZoom: 19,
  minZoom: 11,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true
};

// params for the L.tileLayer (aka basemap)
config.tileLayer = {
  uri: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
  params: {
    minZoom: 11,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: '',
    accessToken: ''
  }
};

// here's the actual component
var Map = React.createClass({
  getInitialState: function() {
    // TODO: if we wanted an initial "state" for our map component we could add it here
    return {
      tileLayer : null,
      geojsonLayer: null,
      geojson: null,
      filter: '*',
      numEntrances: null,
    };
  },
  
  componentWillMount: function() {
    
    // code to run just before adding the map

  },
  
  componentDidMount: function() {

    // code to run just after adding the map to the DOM
    // instantiate the Leaflet map object
    this.init(this.getID());
    // make the Ajax request for the GeoJSON data
    this.getData();
  },

  componentWillReceiveProps: function() {

    // code to run just before updating the map

  },

  componentWillUnmount: function() {
    
    // code to run just before removing the map

  },

  updateMap: function(line) {
    // change the subway line filter
    console.log("updateMap line: ", line);
    
    if (line === "All lines") {
      line = "*";
    }

    this.state.filter = line;
    this.setState({
      filter: this.state.filter
    });
    this.getData();
  },

  getData: function() {
    var that = this;
    
    // qwest is a library for making Ajax requests, we use it here to load GeoJSON data
    qwest.get('bk_subway_entrances.geojson', null, { responseType : 'json' })
      .then(function(xhr, res) {

        console.log(res);

        if (that.isMounted()) {
          // count the number of features and store it in the component's state for use later
          that.state.numEntrances = res.features.length;
          that.setState({ numEntrances: that.state.numEntrances });
          // use the component's addGeoJSON method to add the GeoJSON data to the map
          that.addGeoJSON(res);
        }
      })
      .catch(function(xhr, res, e) {
        console.log('qwest catch: ', xhr, res, e);
      });
  },

  addGeoJSON: function(data) {
    this.state.geojson = data;

    console.log('this.state.geojson: ', this.state.geojson);
    debugger;

    // if the GeoJSON layer has already been added, remove it.
    // this allows the GeoJSON to be redrawn when the user filters it
    if (this.state.geojsonLayer && data){
      // remove the data from the geojson layer
      this.state.geojsonLayer.clearLayers()
      this.state.geojsonLayer.addData(data);
    } else if (!this.state.geojsonLayer) {
      // add our GeoJSON to the component's state and the Leaflet map
      this.state.geojsonLayer = L.geoJson(data, {
        onEachFeature: this.onEachFeature,
        pointToLayer: this.pointToLayer,
        filter: this.filter
      }).addTo(map);
    }

    // set our component's state with the GeoJSON data and L.geoJson layer
    this.setState({
      geojson: this.state.geojson,
      geojsonLayer: this.state.geojsonLayer
    });

    // fit the filtered geojson within the map's bounds
    this.zoomToFeature(this.state.geojsonLayer);
  },

  zoomToFeature: function(target) {
    // pad fitBounds() so features aren't hidden under the Filter UI element
    var fitBoundsParams = {
      paddingTopLeft: [200,10],
      paddingBottomRight: [10,10]
    };
    map.fitBounds(target.getBounds(), fitBoundsParams);
  },

  filter: function(feature, layer) { 
    // filter the subway entrances based on the map's current search filter
    // returns true only if the filter value matches the value of feature.properties.LINE
    var test = feature.properties.LINE.split('-').indexOf(this.state.filter);
    console.log('test: ', test, ' filter: ', this.state.filter);
    
    if (this.state.filter === '*' || test !== -1) {
      return true;
    }
  },

  pointToLayer: function(feature, latlng) {
    // renders our GeoJSON using circle markers, rather than
    // Leaflet's default image markers typically used to represent points

    // parameters to style the GeoJSON markers
    var markerParams = {
      radius: 4,
      fillColor: 'orange',
      color: '#fff',
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.8
    };

    return L.circleMarker(latlng, markerParams);
  },

  onEachFeature: function(feature, layer) {
    // this method is used to create popups for the GeoJSON features
    // it also creates the initial array of unique subway line names which is later passed to the Filter component

    if (feature.properties && feature.properties.NAME && feature.properties.LINE) {

      // if the array for unique subway line names has not been made, create it
      if (subwayLines.length === 0) {
        // add subway line names to a temporary subway lines array 
        feature.properties.LINE.split('-').forEach(function(d,i){
          tmpSubwayLines.push(d);
        });

        // on the last GeoJSON feature make a new array of unique values from the temporary array
        if (this.state.geojson.features.indexOf(feature) === this.state.numEntrances - 1) {
          
          // use filter() to make sure the subway line names array has one value for each subway line
          // use sort() to put our values in numeric and alphabetical order
          subwayLines = tmpSubwayLines.filter(function(value, index, self){
            return self.indexOf(value) === index;
          }).sort();
          // finally add a value to represent all of the subway lines
          subwayLines.unshift('All lines');
        
        }

      }

      // assemble the HTML for the markers' popups
      var popupContent = '<h3>' + feature.properties.NAME + 
                                       '</h3><strong>Access to MTA lines:</strong> ' + 
                                       feature.properties.LINE;
      // add our popups
      layer.bindPopup(popupContent);
    }
  },

  getID: function() {
    // get the "id" attribute of our component's DOM node
    return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
  },

  init: function(id) {
    // this function creates the Leaflet map object and is called after the Map component mounts
    map = L.map(id, config.params);
    L.control.zoom({ position: "bottomleft"}).addTo(map);
    L.control.scale({ position: "bottomleft"}).addTo(map);
    
    // set our state to include the tile layer
    this.state.tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

    this.setState({
      tileLayer: this.state.tileLayer
    });
  },

  render : function() {
    // return our JSX that is rendered to the DOM
    // we pass our Filter component props such as subwayLines array, filter & updateMap methods
    return (
      <div id="mapUI">
        <Filter lines={subwayLines} curFilter={this.state.filter} filterLines={this.updateMap} />
        <div id="map"></div>
      </div>
    );
  }
});


// export our Map component so that Browserify can include it with other components that require it
module.exports = Map;
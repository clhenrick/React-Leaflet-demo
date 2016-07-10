// this is the Map component for React!
// import some dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var L = require('leaflet');
var qwest = require('qwest');

// add our subway line filter component
var Filter = require('./Filter');

// let's store the map configuration properties,
// we could also move this to a separate file & require it
var config = {};

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

  fetchingData: false,

  // a variable to store our instance of L.map
  map: null,

  componentWillMount: function() {
    // code to run just before adding the map
    console.log('***Component Will Mount****');
  },

  componentDidMount: function() {
    // code to run just after adding the map to the DOM
    console.log('***Component DID Mount****');
    // make the Ajax request for the GeoJSON data
    if (!this.fetchingData) this.getData();
    if (!this.map) this.init(this.getID());
  },

  componentWillUpdate: function(nextProps, nextState) {

    if (nextState.filter !== this.state.filter) {
      console.log(this.state, nextState);
      this.filterGeoJSONLayer();
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.geojson && this.map && !this.state.geojsonLayer) {
      console.log('should add geojson layer', nextState.geojson);
      this.addGeoJSONLayer(this.state.geojson);
    }
  }

  componentWillUnmount: function() {
    // code to run just before unmounting the component
    this.map.remove();
  },

  updateMap: function(subwayLine) {
    // change the subway line filter
    if (subwayLine === "All lines") {
      subwayLine = "*";
    }
    this.setState({
      filter: subwayLine
    });
  },

  getData: function() {
    this.fetchingData = true;
    var that = this;

    // qwest is a library for making Ajax requests, we use it here to load GeoJSON data
    qwest.get('bk_subway_entrances.geojson', null, { responseType : 'json' })
      .then(function(xhr, res) {
        if (that.isMounted()) {
          console.log(res);
          // store the number of GeoJSON features in the component's state for use later
          that.setState({
            numEntrances: res.features.length,
            geojson: res
          });
        }
        that.fetchingData = false;
      })
      .catch(function(xhr, res, e) {
        console.log('qwest catch: ', xhr, res, e);
      });
  },

  addGeoJSONLayer: function(geojson) {
    console.log(geojson);
    // create a native Leaflet GeoJSON SVG Layer for Leaflet to add as an overlay
    // an options object is passed to define functions for customizing the layer
    var geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer
    });
    // add our GeoJSON layer to the Leaflet map object
    geojsonLayer.addTo(this.map);
    // store the Leaflet GeoJSON layer in our component state for use later
    this.setState({ geojsonLayer: geojsonLayer });
    // fit the filtered or unfiltered GeoJSON layer within the map's bounds / viewport
    this.zoomToFeature(geojsonLayer);
  },

  filterGeoJSONLayer: function() {
    console.log(this.state.geojson);
    var geojsonLayer = L.geoJson(this.state.geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
      filter: this.filter
    });
    geojsonLayer.addTo(this.map);
    this.setState({geojsonLayer: geojsonLayer});
    // fit the map to the new geojson layer's extent
    this.zoomToFeature(this.state.geojsonLayer);
  },

  zoomToFeature: function(target) {
    // pad fitBounds() so features aren't hidden under the Filter UI element
    var fitBoundsParams = {
      paddingTopLeft: [200,10],
      paddingBottomRight: [10,10]
    };
    this.map.fitBounds(target.getBounds(), fitBoundsParams);
  },

  filter: function(feature, layer) {
    // filter the subway entrances based on the map's current search filter
    // returns true only if the filter value matches the value of feature.properties.LINE
    var test = feature.properties.LINE.split('-').indexOf(this.state.filter);

    if (this.state.filter === '*' || test !== -1) {
      return true;
    }
  },

  pointToLayer: function(feature, latlng) {
    // renders our GeoJSON points as circle markers, rather than Leaflet's default image markers

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
        feature.properties.LINE.split('-').forEach(function(line, index){
          tmpSubwayLines.push(line);
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
    if (this.map) return;
    // this function creates the Leaflet map object and is called after the Map component mounts
    this.map = L.map(id, config.params);
    L.control.zoom({ position: "bottomleft"}).addTo(this.map);
    L.control.scale({ position: "bottomleft"}).addTo(this.map);

    // set our state to include the tile layer
    var tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(this.map);

    this.setState({
      tileLayer: tileLayer
    });
  },

  render : function() {
    // return our JSX that is rendered to the DOM
    // we pass our Filter component props such as subwayLines array, filter & updateMap methods
    return (
      <div id="mapUI">
        <Filter lines={subwayLines} curFilter={this.state.filter} filterLines={this.updateMap} />
        <div id="map" />
      </div>
    );
  }
});


// export our Map component so that Browserify can include it with other components that require it
module.exports = Map;

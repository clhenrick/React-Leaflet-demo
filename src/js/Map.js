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

    // code to run just after adding the map
    this.init(this.getID());
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
    
    qwest.get('../bk_subway_entrances.geojson')
      .then(function(xhr, res) {
          // hack to pass geojson data, probably not the right way to do this...
          res = JSON.parse(res);
          that.state.numEntrances = res.features.length;
          that.setState({ numEntrances: that.state.numEntrances });
          that.addGeoJSON(res);
      })
      .catch(function(xhr, res, e) {
        console.log('qwest catch: ', xhr, res, e);
      });
  },

  addGeoJSON: function(data) {
    this.state.geojson = data;

    if (map.hasLayer(this.state.geojsonLayer)){
      console.log('map has geojson layer, removing');
      map.removeLayer(this.state.geojsonLayer);  
    }

    this.state.geojsonLayer = L.geoJson(data, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
      filter: this.filter
    }).addTo(map);

    this.setState({
      geojson: this.state.geojson,
      geojsonLayer: this.state.geojsonLayer
    });
  },

  filter: function(feature, layer) { 
    // filter the subway entrances based on the map's current search filter
    var test = feature.properties.LINE.split('-').indexOf(this.state.filter);
    if (this.state.filter === '*' || test !== -1) {
      return true;
    }
  },

  pointToLayer: function(feature, latlng) {
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

    if (feature.properties && feature.properties.NAME && feature.properties.LINE) {

      if (subwayLines.length === 0) {
        // add subway lines to our subway lines array 
        feature.properties.LINE.split('-').forEach(function(d,i){
          tmpSubwayLines.push(d);
        });

        if (this.state.geojson.features.indexOf(feature) === this.state.numEntrances - 1) {
          
          // make our subwayLines array have only unique values for the lines
          subwayLines = tmpSubwayLines.filter(function(value, index, self){
            return self.indexOf(value) === index;
          }).sort();
          subwayLines.unshift('All lines');
          console.log(subwayLines);                  
        }
      }

      var popupContent = '<h3>' + feature.properties.NAME + 
                                       '</h3><strong>Access to MTA lines:</strong> ' + 
                                       feature.properties.LINE;
      layer.bindPopup(popupContent);
    }
  },

  getID: function() {
    // get the "id" attribute of our component's DOM node
    return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
  },

  init: function(id) {
    // this function creates the Leaflet map object and is called after the component mounts
    map = L.map(id, config.params);
    L.control.zoom({ position: "bottomleft"}).addTo(map);
    L.control.scale({ position: "bottomleft"}).addTo(map);
    
    // set our state to include the tile layer & an empty geojson layer
    this.state.tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

    this.setState({
      tileLayer: this.state.tileLayer
    });
  },

  render : function() {
    // return our JSX that is rendered to the DOM
    // right now this doesn't look like anything special but 
    // we could pass other *child* components with it if we like
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
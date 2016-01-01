// this is the Map component for React!
// import some dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var qwest = require('qwest');

// let's store the map configuration properties, 
// we could also move this to a separate file & require it
var config = {};

// a local variable to store our instance of L.map
var map;

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
  uri: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  params: {
    minZoom: 11,
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
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
      geojson: null
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

  updateMap: function(e) {
    // TODO: a function to update our map and its state
    if (e) e.preventDefault();
  },

  getData: function() {
    var that = this;
    
    qwest.get('../bk_subway_entrances.geojson')
      .then(function(xhr, res) {
          // console.log(xhr, res);
          // hack to pass geojson data, probably not the right way to do this...
          res = JSON.parse(res);
          that.addGeoJSON(res);
      })
      .catch(function(xhr, res, e) {
        console.log('qwest catch: ', xhr, res, e);
      });
  },

  addGeoJSON: function(data) {
    this.state.geojson = data;
    this.state.geojsonLayer.addData(data);
    this.setState({
      geojson: this.state.geojson,
      geojsonLayer: this.state.geojsonLayer
    });
  },

  onEachFeature: function(feature, layer) {
    if (feature.properties && feature.properties.NAME && feature.properties.LINE) {
      var popupContent = '<h3>' + feature.properties.NAME + 
                                       '</h3><strong>Access to MTA lines:</strong> ' + 
                                       feature.properties.LINE;
      layer.bindPopup(popupContent);
    }
  },

  getID: function() {
    // get the "id" attribute of our component's DOM node
    return ReactDOM.findDOMNode(this).id;
  },

  init: function(id) {
    // this function creates the Leaflet map object and is called after the component mounts
    map = L.map(id, config.params);
    L.control.zoom({ position: "bottomleft"}).addTo(map);
    L.control.scale({ position: "bottomleft"}).addTo(map);
    
    // set our state to include the tile layer & an empty geojson layer
    this.state.tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
    this.state.geojsonLayer = L.geoJson(null, {
      onEachFeature: this.onEachFeature
    }).addTo(map);

    this.setState({
      tileLayer: this.state.tileLayer,
      geojsonLayer: this.state.geojsonLayer
    });
  },

  render : function() {
    // return our JSX that is rendered to the DOM
    // right now this doesn't look like anything special but 
    // we could pass other *child* components with it if we like
    return (
      <div id="map"></div>
    )
  }
});

// export our Map component so that Browserify can include it with other components that require it
module.exports = Map;
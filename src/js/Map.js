// this is the Map component for React!

// let's store the map configuration properties, 
// we could also move this to a separate file & require it
var config = {};

// a local variable to store our instance of L.map
var map;

// map paramaters to pass to L.map when we instantiate it
config.params = {
  center: [40.718640, -73.94], //Greenpoint
  zoomControl: false,
  zoom: 14,
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
    return null;
  },
  
  componentWillMount: function() {
    
    // code to run just before adding the map

  },
  
  componentDidMount: function() {

    // code to run just after adding the map
    this.init(this.getID());
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
    qwest.get('../data/nyc_subway_stops.geojson')
      .then(function(xhr, res) {
          console.log(res);
      })
      .catch(function(xhr, res, e) {
        console.log('qwest catch: ', xhr, res, e);
      });
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
    L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
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
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/clhenrick/tutorials/react-webmap/src/js/App.js":[function(require,module,exports){
var Map = require('./Map');

// where to mount our App
var mountNode = document.getElementById('app');

// App component
var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement(Map, null)
    );
  }
});

// render the app!
ReactDOM.render(
  React.createElement(App, null),
  mountNode
);

},{"./Map":"/Users/clhenrick/tutorials/react-webmap/src/js/Map.js"}],"/Users/clhenrick/tutorials/react-webmap/src/js/Map.js":[function(require,module,exports){
var config = {};
var map;

// map paramaters to pass to L.map
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

// tileLayer params
config.tileLayer = {
  uri: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  params: {
    minZoom: 11,
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    id: '',
    accessToken: ''
  }
};

var Map = React.createClass({displayName: "Map",
  getInitialState: function() {
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
    if (e) e.preventDefault();
  },

  getID: function() {
    return ReactDOM.findDOMNode(this).id;
  },

  init: function(id) {
    map = L.map(id, config.params);
    L.control.zoom({ position: "bottomleft"}).addTo(map);
    L.control.scale({ position: "bottomleft"}).addTo(map);
    L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
  },

  render : function() {
    return (
      React.createElement("div", {id: "map"})
    )
  }
});

module.exports = Map;

},{}]},{},["/Users/clhenrick/tutorials/react-webmap/src/js/App.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2xoZW5yaWNrL3R1dG9yaWFscy9yZWFjdC13ZWJtYXAvc3JjL2pzL0FwcC5qcyIsIi9Vc2Vycy9jbGhlbnJpY2svdHV0b3JpYWxzL3JlYWN0LXdlYm1hcC9zcmMvanMvTWFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUzQix5QkFBeUI7QUFDekIsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFL0MsZ0JBQWdCO0FBQ2hCLElBQUkseUJBQXlCLG1CQUFBO0VBQzNCLE1BQU0sRUFBRSxXQUFXO0lBQ2pCO01BQ0Usb0JBQUMsR0FBRyxFQUFBLElBQUEsQ0FBRyxDQUFBO01BQ1A7R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILGtCQUFrQjtBQUNsQixRQUFRLENBQUMsTUFBTTtFQUNiLG9CQUFDLEdBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQTtFQUNQLFNBQVM7Q0FDVjs7O0FDbEJELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixJQUFJLEdBQUcsQ0FBQzs7QUFFUixrQ0FBa0M7QUFDbEMsTUFBTSxDQUFDLE1BQU0sR0FBRztFQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztFQUMzQixXQUFXLEVBQUUsS0FBSztFQUNsQixJQUFJLEVBQUUsRUFBRTtFQUNSLE9BQU8sRUFBRSxFQUFFO0VBQ1gsT0FBTyxFQUFFLEVBQUU7RUFDWCxXQUFXLEVBQUUsS0FBSztFQUNsQixPQUFPLEVBQUUsSUFBSTtFQUNiLFdBQVcsRUFBRSxLQUFLO0VBQ2xCLGtCQUFrQixFQUFFLElBQUk7QUFDMUIsQ0FBQyxDQUFDOztBQUVGLG1CQUFtQjtBQUNuQixNQUFNLENBQUMsU0FBUyxHQUFHO0VBQ2pCLEdBQUcsRUFBRSxtREFBbUQ7RUFDeEQsTUFBTSxFQUFFO0lBQ04sT0FBTyxFQUFFLEVBQUU7SUFDWCxXQUFXLEVBQUUsOEVBQThFO0lBQzNGLEVBQUUsRUFBRSxFQUFFO0lBQ04sV0FBVyxFQUFFLEVBQUU7R0FDaEI7QUFDSCxDQUFDLENBQUM7O0FBRUYsSUFBSSx5QkFBeUIsbUJBQUE7RUFDM0IsZUFBZSxFQUFFLFdBQVc7SUFDMUIsT0FBTyxJQUFJLENBQUM7QUFDaEIsR0FBRzs7QUFFSCxFQUFFLGtCQUFrQixFQUFFLFdBQVc7QUFDakM7QUFDQTs7QUFFQSxHQUFHOztBQUVILEVBQUUsaUJBQWlCLEVBQUUsV0FBVztBQUNoQzs7SUFFSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzVCLEdBQUc7O0FBRUgsRUFBRSx5QkFBeUIsRUFBRSxXQUFXO0FBQ3hDO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSCxFQUFFLG9CQUFvQixFQUFFLFdBQVc7QUFDbkM7QUFDQTs7QUFFQSxHQUFHOztFQUVELFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRTtJQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDOUIsR0FBRzs7RUFFRCxLQUFLLEVBQUUsV0FBVztJQUNoQixPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3pDLEdBQUc7O0VBRUQsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ2pCLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxRSxHQUFHOztFQUVELE1BQU0sR0FBRyxXQUFXO0lBQ2xCO01BQ0Usb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxFQUFBLEVBQUUsQ0FBQyxLQUFNLENBQU0sQ0FBQTtLQUNyQjtHQUNGO0FBQ0gsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNYXAgPSByZXF1aXJlKCcuL01hcCcpO1xuXG4vLyB3aGVyZSB0byBtb3VudCBvdXIgQXBwXG52YXIgbW91bnROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xuXG4vLyBBcHAgY29tcG9uZW50XG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TWFwIC8+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIHJlbmRlciB0aGUgYXBwIVxuUmVhY3RET00ucmVuZGVyKFxuICA8QXBwIC8+LFxuICBtb3VudE5vZGVcbik7IiwidmFyIGNvbmZpZyA9IHt9O1xudmFyIG1hcDtcblxuLy8gbWFwIHBhcmFtYXRlcnMgdG8gcGFzcyB0byBMLm1hcFxuY29uZmlnLnBhcmFtcyA9IHtcbiAgY2VudGVyOiBbNDAuNzE4NjQwLCAtNzMuOTRdLCAvL0dyZWVucG9pbnRcbiAgem9vbUNvbnRyb2w6IGZhbHNlLFxuICB6b29tOiAxNCxcbiAgbWF4Wm9vbTogMTksXG4gIG1pblpvb206IDExLFxuICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gIGxlZ2VuZHM6IHRydWUsXG4gIGluZm9Db250cm9sOiBmYWxzZSxcbiAgYXR0cmlidXRpb25Db250cm9sOiB0cnVlXG59O1xuXG4vLyB0aWxlTGF5ZXIgcGFyYW1zXG5jb25maWcudGlsZUxheWVyID0ge1xuICB1cmk6ICdodHRwOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJyxcbiAgcGFyYW1zOiB7XG4gICAgbWluWm9vbTogMTEsXG4gICAgYXR0cmlidXRpb246ICdNYXAgZGF0YSDCqSA8YSBocmVmPVwiaHR0cDovL29wZW5zdHJlZXRtYXAub3JnXCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJyxcbiAgICBpZDogJycsXG4gICAgYWNjZXNzVG9rZW46ICcnXG4gIH1cbn07XG5cbnZhciBNYXAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIC8vIGNvZGUgdG8gcnVuIGp1c3QgYmVmb3JlIGFkZGluZyB0aGUgbWFwXG5cbiAgfSxcbiAgXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcblxuICAgIC8vIGNvZGUgdG8gcnVuIGp1c3QgYWZ0ZXIgYWRkaW5nIHRoZSBtYXBcbiAgICB0aGlzLmluaXQodGhpcy5nZXRJRCgpKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbigpIHtcblxuICAgIC8vIGNvZGUgdG8gcnVuIGp1c3QgYmVmb3JlIHVwZGF0aW5nIHRoZSBtYXBcblxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBcbiAgICAvLyBjb2RlIHRvIHJ1biBqdXN0IGJlZm9yZSByZW1vdmluZyB0aGUgbWFwXG5cbiAgfSxcblxuICB1cGRhdGVNYXA6IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGdldElEOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuaWQ7XG4gIH0sXG5cbiAgaW5pdDogZnVuY3Rpb24oaWQpIHtcbiAgICBtYXAgPSBMLm1hcChpZCwgY29uZmlnLnBhcmFtcyk7XG4gICAgTC5jb250cm9sLnpvb20oeyBwb3NpdGlvbjogXCJib3R0b21sZWZ0XCJ9KS5hZGRUbyhtYXApO1xuICAgIEwuY29udHJvbC5zY2FsZSh7IHBvc2l0aW9uOiBcImJvdHRvbWxlZnRcIn0pLmFkZFRvKG1hcCk7XG4gICAgTC50aWxlTGF5ZXIoY29uZmlnLnRpbGVMYXllci51cmksIGNvbmZpZy50aWxlTGF5ZXIucGFyYW1zKS5hZGRUbyhtYXApO1xuICB9LFxuXG4gIHJlbmRlciA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwibWFwXCI+PC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXA7Il19

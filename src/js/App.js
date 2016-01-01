var React = require('react');
var ReactDOM = require('react-dom');
// require our Map React component
var Map = require('./Map');

// where in the actual DOM to mount our App
var mountNode = document.getElementById('app');

// App component
var App = React.createClass({
  render: function() {
    return (
      <Map />
    );
  }
});

// render the app using ReactDOM!
ReactDOM.render(
  <App />,
  mountNode
);
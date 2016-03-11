var React = require('react');

// the UI component for filtering the subway entrances by subway line
var Filter = React.createClass({
  getInitialState: function() {
    return {
      filter: ''
    };
  },

  getDefaultProps: function(){
    return {
      lines: [],
      curFilter: ''
    }
  },

  updateFilter: function(e) {
    // console.log(e.target.value);
    this.state.filter = e.target.value;
    this.setState({
      filter: this.state.filter
    });
    this.handleUpdate();
  },

  handleUpdate: function(){
    // filterLines passes the value of "filter" to the Map component's updateMap method
    this.props.filterLines(this.state.filter);
  },

  render: function() {
    // this is the JSX that will become the Filter UI in the DOM, notice it looks pretty similar to HTML
    // notice in the select element onChange is set to the updateFilter method
    // thus when a user selects a new subway line to view, the compoent's state is updated
    // and the parent component, Map, reloads the GeoJSON data with the current filter value
    return (
      <div className="filterSubwayLines">
        <hr/>
        <h3>Brooklyn Subway Entrances</h3>
        <p>A <a href="http://leafletjs.com/">Leaflet</a> &amp; <a href="https://facebook.github.io/react/">React</a> demo</p>
        <p>Filter Entrances by Subway Line</p>
        <select defaultValue="*" type="select" name="filterlines" onChange={this.updateFilter}>
            { /* This is how to do a comment in JSX! notice the curly braces. */ }
            { /* We render the select's option elements by maping each of the values of subwayLines array to option elements */ }
            {this.props.lines.map(function(line, i){   
                { /* the "key" property is recommended by React when creating list like elements */ }
                return (
                  <option value={line} key={i}>{line}</option>
                );
              }, this)}
        </select>
      </div>
    );
  }
});

// make sure to export our module so that it can be used elsewhere
module.exports = Filter;
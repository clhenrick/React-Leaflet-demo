var React = require('react');

// the component for filtering the subway entrances by subway line
var Filter = React.createClass({
  getInitialState: function() {
    return {
      filter: '*'
    };
  },

  getDefaultProps: function(){
    return {
      lines: [],
      curFilter: '*'
    }
  },

  updateFilter: function(e) {
    console.log(e.target.value);
    this.state.filter = e.target.value;
    this.setState({
      filter: this.state.filter
    });
    this.handleUpdate();
  },

  handleUpdate: function(){
    this.props.filterLines(this.state.filter);
    this.props.curFilter = this.state.filter;
  },

  render: function() {
    return (
      <div className="filterSubwayLines">
        <hr/>
        <h3>Brooklyn Subway Entrances</h3>
        <p>A <a href="http://leafletjs.com/">Leaflet</a> &amp; <a href="https://facebook.github.io/react/">React</a> demo</p>
        <p>Filter Entrances by Subway Line</p>
        <select defaultValue="*" type="select" name="filterlines" onChange={this.updateFilter}>
          {this.props.lines.map(function(line, i){   
              // the "key" property is recommended by React when creating list like elements
              return (
                <option value={line} key={i}>{line}</option>
              );
            }, this)}
        </select>
      </div>
    );
  }
});

module.exports = Filter;
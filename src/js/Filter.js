var React = require('react');

var Filter = React.createClass({
  getInitialState: function() {
    return {
      filter: ''
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
    this.setState({
      filter: ''
    });
  },

  render: function() {
    var filterOptions = this.props.lines.map(function(line){
      if (line === "All lines") {
        return <option value="*">All lines</option>;
      }
      return <option value={line}>{line}</option>;
    });

    return (
      <div className="filterSubwayLines">
        <hr/>
        <h3>Brooklyn Subway Entrances</h3>
        <p>Filter Entrances by Subway Line</p>
        <select defaultValue={this.props.curFilter} type="select" name="filterlines" onChange={this.updateFilter}>
          {filterOptions}
        </select>
      </div>
    );
  }
});

module.exports = Filter;
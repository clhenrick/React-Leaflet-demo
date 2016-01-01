var React = require('react');

var Filter = React.createClass({
  // getInitialState: function() {
  //   return {
  //     lines: [],
  //     filter: ''
  //   };
  // },

  getDefaultProps: function(){
    return {
      lines: [],
      filter: '*'
    }
  },

  updateLines: function(e) {
    this.setState({
      lines: e.target.value
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
        <p>Filter Entrances by Subway Line</p>
        <select defaultValue="*" type="select" name="filterlines">
          {filterOptions}
        </select>
      </div>
    );
  }
});

module.exports = Filter;
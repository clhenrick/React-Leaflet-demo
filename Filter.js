// var React = require('react');

// var Filter = React.createClass({
//   getInitialState: function() {
//     return {
//       lines: []
//     };
//   },

//   updateLines: function(e) {
//     this.setState({
//       lines: e.target.value
//     });
//   },

//   render: function() {
//     var filterOptions = this.props.lines.map(function(line){
//       return <option value={line}>{line}</option>;
//     });

//     return (
//       <div class="filterSubwayLines">
//         <select type="select" name="filterlines">
//           <option selected value="all">All Lines</option>
//           {filterOptions}
//         </select>
//       </div>
//     );
//   }
// });

// module.exports = Filter;
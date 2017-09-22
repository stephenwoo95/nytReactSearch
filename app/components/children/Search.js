import React, { Component } from "react";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      term: "",
      start: "",
      end: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    var query = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d5fb0ee0ea2a4439a2a4f5ad63f1f268&q=" + this.state.term + "&start_year=" + this.state.start + "&end_year=" + this.state.end;
    this.props.retrieveArticles(query);

    // Clearing the input field after submitting
    this.setState({ term: "",start:"",end:"" });
  },

  render() {
    return(
      <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search For Articles</h3>
        </div>
        <div className="panel-body text-center">

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4>
                <strong>Search Term</strong>
              </h4>

              <input
                type="text"
                value={this.state.term}
                className="form-control text-center"
                id="term"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <h4>
                <strong>Start Year</strong>
              </h4>

              <input
                type="number"
                min="1851"
                max="2017"
                value={this.state.start}
                className="form-control text-center"
                id="start"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <h4>
                <strong>End Year</strong>
              </h4>

              <input
                type="number"
                min="1851"
                max="2017"
                value={this.state.end}
                className="form-control text-center"
                id="end"
                onChange={this.handleChange}
                required
              />
            </div>

            <br />
            <button class="btn waves-effect waves-light" type="submit" name="action">Submit
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;

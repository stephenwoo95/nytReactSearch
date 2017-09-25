import React, { Component } from "react";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      term: "",
      start: "",
      end: ""
    }
    this.handleChange = this.handleChange.bind(this);
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
  }

  render() {
    return(
      <div className="card">
        <div className="card-content">
          <span className="card-title">Search For Articles</span>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4>
                <strong>Search Term</strong>
              </h4>

              <input
                type="text"
                value={this.state.term}
                className="form-control"
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
                className="form-control"
                id="start"
                onChange={this.handleChange}
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
                className="form-control"
                id="end"
                onChange={this.handleChange}
              />
            </div>

            <br />
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;

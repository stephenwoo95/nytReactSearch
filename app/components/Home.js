import React, { Component } from "react";
import Search from "./children/Search";
import Results from "./children/Results";
import Archive from "./children/Archive";
import API from "../utils/API";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      results: []
    };

    this.getArticles = this.getArticles.bind(this);
    this.retrieveArticles = this.retrieveArticles.bind(this);
  }
  // Getting all articles when the component mounts
  componentDidMount() {
    this.getArticles();
  }

  retrieveArticles(query) {
    API.retrieveArticles(query).then(function(data) {
      console.log(data.response.docs);
      this.setState({ results: data.response.docs.splice(0,5) });
    })
  }

  getArticles() {
    API.getArticles().then((res) => {
      this.setState({ articles: res.data });
    });
  }

  // A helper method for rendering one panel fro each result from Article Search
  renderResults() {
    return this.state.results.map(article => (
      // make divs for holding saved articles
      <Results
        article={article}
        getArticles={this.getArticles}
      />
    ));
  }

  // A helper method for rendering one panel for each article
  renderArticles() {
    return this.state.articles.map(article => (
      // make divs for holding saved articles
      <Archive
        article={article}
        key={article._id}
        getArticles={this.getArticles}
      />
    ));
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <Search
            retrieveArticles={this.retrieveArticles}
          />
        </div>
        <div className="row">
          <hr />
          <div className="panel">
            <div className="panel-heading">
              Search Results
            </div>
            <div className="panel-content">
              {this.renderResults()}
            </div>
          </div>
        </div>
        <div className="row">
          <hr />
          <div className="panel">
            <div className="panel-head">
              Saved Articles
            </div>
            <div className="panel-content">
              {this.renderArticles()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

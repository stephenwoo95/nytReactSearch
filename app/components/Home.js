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
    this.clearResults = this.clearResults.bind(this);
  }

  // Getting all articles when the component mounts
  componentWillMount() {
    this.getArticles();
  }

  retrieveArticles(query) {
    API.retrieveArticles(query).then((data) => {
      this.setState({ results: data.data.response.docs.splice(0,5) });
    })
  }

  getArticles() {
    API.getArticles().then((res) => {
      console.log(res);
      this.setState({ articles: res.data });
    });
  }

  // A helper method for rendering one panel for each result from Article Search
  renderResults() {
    return this.state.results.map(article => (
      // make divs for holding saved articles
      <Results
        article={article}
        key={article._id}
        getArticles={this.getArticles}
      />
    ));
  }

  // A helper method for rendering one panel for each article
  renderArticles() {
    // for(var i=0;i<this.state.articles.length;i++) {}
    console.log(this.state.articles);
    return this.state.articles.map(article => (
      // make divs for holding saved articles
      <Archive
        article={article}
        key={article._id}
        getArticles={this.getArticles}
      />
    ));
  }

  clearResults() {
    this.setState({ results: [] });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m6">
            <Search
              retrieveArticles={this.retrieveArticles}
            />
          </div>
          <div className="col m6">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Search Results <button className='clearResults btn red waves-light waves-effect' onClick={ this.clearResults }>Clear</button></span>
                <ul className="collection">
                    { this.renderResults() }
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Archive</span>
                <ul className="collection">
                    { this.renderArticles() }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

import React,{ Component } from "react";
import API from "../../utils/API";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3000");

class Results extends Component {
  constructor() {
    super();
    this.state={
      saved: false
    }
    this.saveArticle = this.saveArticle.bind(this);
  }

  componentWillMount() {
    API.getArticles(this.props.article.headline.main).then((res) => {
      if(res.data.length) {
        this.setState({ saved: true });
      }
    });
  }

  saveArticle() {
    var newEntry = {
      title: this.props.article.headline.main,
      summary: this.props.article.snippet,
      link: this.props.article.web_url
    };
    console.log(newEntry);
    API.saveArticle(newEntry).then((data) => {
      console.log(data);
      socket.emit('save', newEntry);
      this.setState({ saved: true });
      this.props.getArticles();
    });
  }

  render() {
    var buttonChoice = <button className='saveBtn waves-effect waves-light btn blue' onClick={this.saveArticle}>Save Article</button>;
    if(this.state.saved) {
      buttonChoice = <a className='btn-floating green'><i className='material-icons'>check</i></a>;
    }
    return(
      <li className='collection-item'>
        <h4>
          <a href={this.props.article.web_url}>
            {this.props.article.headline.main}
          </a>
        </h4>
        <p><strong>{this.props.article.pub_date}</strong></p>
        {buttonChoice}
        <p>
          {this.props.article.snippet}
        </p>
      </li>
    );
  }
}

export default Results;

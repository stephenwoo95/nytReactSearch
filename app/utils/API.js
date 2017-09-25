import axios from "axios";

const API = {
  // Does a NYT API Search
  retrieveArticles: function(query) {
    return axios.get(query);
  },
  // Retrieves all articles from the db
  getArticles: function(query) {
    var path = "/api/articles";
    if(query) {
      path += "/1?title="+query;
    }
    return axios.get(path);
  },
  // Saves a new article to the db
  saveArticle: function(article) {
    return axios.post("/api/articles", { title:article.title, link:article.link, summary:article.summary });
  },
  // Deletes a article from the db
  deleteArticle: function(id) {
    return axios.delete(`/api/articles/${id}`);
  },
  // Adds a comment to an article
  commentArticle: function(article,comment) {
    const { _id } = article;
    return axios.patch(`/api/articles/${_id}`, { body: comment });
  },
  // Delete a comment from an article
  deleteComment: function(comment) {
    const { _id } = comment;
    return axios.delete(`/api/articles/comment/delete/${_id}`);
  }
};

export default API;

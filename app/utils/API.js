import axios from "axios";

const API = {
  // Does a NYT API Search
  retrieveArticles: function(query) {
    return axios.get(query);
  },
  // Retrieves all articles from the db
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Saves a new article to the db
  saveArticle: function(article) {
    return axios.post("/api/articles", { title:article.title, date:article.date, url:article.url });
  },
  // Deletes a article from the db
  deleteArticle: function(id) {
    return axios.delete(`/api/articles/${id}`);
  },
  // Adds a comment to an article
  commentArticle: function(article,comment) {
    const { _id } = article;
    return axios.patch(`/api/articles/${_id}`, { $push: { comments: comment } });
  }
};

export default API;

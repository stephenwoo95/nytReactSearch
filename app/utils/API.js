import axios from "axios";

const API = {
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
  commentArticle: function(article) {
    article.favorited = !article.favorited;
    const { _id, favorited } = article;
    return axios.patch(`/api/articles/${_id}`, { $push: { comments:  }});
  }
};

export default API;

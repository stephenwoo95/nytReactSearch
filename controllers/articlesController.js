var Article = require("../models/article");
var Comment = require("../models/comment");

module.exports = {
  // This method handles retrieving articles from the db
  index: function(req, res) {
    var query;
    if (req.query) {
      query = req.query;
    }
    else {
      query = req.params.id ? { _id: req.params.id } : {};
    }
    Article.find(query).populate("comments")
      .then(function(doc) {
        res.json(doc);
      }).catch(function(err) {
        res.json(err);
      });
  },
  // This method handles creating new articles
  create: function(req, res) {
    Article.create(req.body).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  // This method handles updating articles
  update: function(req, res) {
    console.log('update controller');
    console.log(req.params.id);
    Comment.collection.insert(req.body, function(err,doc) {
      if(err) {
        console.log(err);
      } else {
        console.log(doc);
        Article.update({
          _id: req.params.id
        },
          { $push: { "comments": doc.insertedIds[0] } }, { new: true }
        ).then(function(doc1) {
          console.log(doc1);
          res.json(doc1);
        }).catch(function(err) {
          res.json(err);
        });
      }
    });
  },
  // This method handles deleting articles
  destroy: function(req, res) {
    Article.remove({
      _id: req.params.id
    }).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },

  deleteComment: function(req, res) {
    Comment.remove({
      _id: req.params.id
    }).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  }
};

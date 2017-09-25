import React,{ Component } from "react";
import Modal from "react-modal";
import API from "../../utils/API";

class Archive extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      modalIsOpen: false,
      commentInput: ''
    }

    this.deleteArticle = this.deleteArticle.bind(this);
    this.commentArticle = this.commentArticle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
  }

  componentWillMount() {
    this.setState({ id: this.props.article._id });
  }

  deleteArticle() {
    API.deleteArticle(this.state.id).then(() => {
      this.props.getArticles();
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  commentArticle() {
    API.commentArticle(this.props.article,this.state.commentInput).then(() => {
      this.setState({ commentInput: '' });
      this.props.getArticles();
    });
  }

  handleCommentInput(event) {
    this.setState({ commentInput: event.target.value });
  }

  deleteComment(comment) {
    API.deleteComment(comment).then(() => {
      this.props.getArticles();
    });
  }

  renderComments() {
    return this.props.article.comments.map(comment => (
      <li className="collection-item valign-wrapper" key={comment._id}>
        <span>{comment.body}</span>
        <a onClick={this.deleteComment.bind(this, comment)} className="deleteComment waves-effect waves-light red btn">&times;</a>
      </li>
    ));
  }

  render() {
    return(
      <li className='collection-item'>
        <h5>
          <a href={this.props.article.link}>
            {this.props.article.title}
          </a>
        </h5>
        <p>{this.props.article.date}</p>
        <button className='comment btn blue waves-light waves-effect' onClick={this.openModal}>View/Add Comments</button>
        <button className='delete btn red waves-light waves-effect' onClick={this.deleteArticle}>&times;</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="commentsModal"
          >
          <div className="modal-header">
            <h2>{this.props.article.title}</h2>
          </div>
          <div className="modal-content">
            <ul className='collection' id='commentsCollection'>
              { this.renderComments() }
            </ul>
          </div>
          <div className="modal-footer">
            <textarea rows='4' cols='100' placeholder='Add a comment' id="commentText" value={this.state.commentInput || ''} onChange={this.handleCommentInput}></textarea>
            <button className="waves-effect waves-light btn green" id="commentSubmit" onClick={this.commentArticle}>Submit</button>
            <a href="#!" className="modal-action modal-close waves-effect waves-red btn-flat" onClick={this.closeModal}>Close</a>
          </div>
        </Modal>

      </li>
    );
  }
}

export default Archive;

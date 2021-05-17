import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types"
import Comment from './Comment';

const SComments = styled.div`
  margin-top: 20px;
`


const CommentContainer = styled.div`
`

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 12px;
  margin: 10px 0px;
  display: block;
`

const Comments = ({ caption, commentNumber, comments, author }) => {
  return (<SComments>
    <CommentContainer>
      <Comment
        author={author}
        payload={caption}
      />
    </CommentContainer>
    <CommentCount>
      {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
    </CommentCount>
    {comments?.map(comment =>
      <Comment
        author={comment.user.username}
        payload={comment.payload}
        key={comment.id} />
    )}
  </SComments>);
}

Comments.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    payload: PropTypes.string.isRequired,
    isMine: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired
    }),
  }))
}

export default Comments;
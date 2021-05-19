import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import PropTypes from "prop-types"
import sanitizeHtml from "sanitize-html"
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const DELETE_COMMENT_MUTATION = gql`  
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  } 
`

const CommentContainer = styled.div`
  margin-bottom: 7px;
`
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${props => props.theme.accent};
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
`

const DeleteCommentBtn = styled.span`
  margin-left: 10px;
  cursor: pointer;
`

const Comment = ({ author, payload, id, isMine, photoId }) => {
  const updateDeleteComment = (cache, result) => {
    const { data: { deleteComment: { ok, error } } } = result
    if (ok) {
      cache.evict({ id: `Comment:${id}` })
      cache.modify({
        id: `Photo:${photoId}`,
        fields: { commentNumber(prev) { return prev - 1 } }
      })
    }
  }
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { id },
    update: updateDeleteComment
  })
  const onDeleteClick = () => {
    deleteCommentMutation(id)
  }
  return (<CommentContainer>
    <Link to={`/user/${author}`}>
      <FatText>{author}</FatText>
    </Link>
    <CommentCaption>
      {payload
        .split(" ")
        .map((word, index) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ?
            <React.Fragment key={index}><Link to={`/hashtages/${word}`}>{word}</Link>{" "}</React.Fragment>
            :
            <React.Fragment key={index}>{word} </React.Fragment>
        )}
    </CommentCaption>
    {isMine && <DeleteCommentBtn onClick={onDeleteClick}><FontAwesomeIcon icon={faTrashAlt} /></DeleteCommentBtn>}
  </CommentContainer>);
}

Comment.propTypes = {
  id: PropTypes.number,
  photoId: PropTypes.number,
  isMine: PropTypes.bool,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
}

export default Comment
import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import PropTypes from "prop-types"
import sanitizeHtml from "sanitize-html"
import { Link } from 'react-router-dom';

const CommentContainer = styled.div`
  margin-bottom: 10px;
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

const Comment = ({ author, payload }) => {
  const cleanedPayload = sanitizeHtml(payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"), {
    allowedTags: ["mark"]
  })
  return (<CommentContainer>
    <FatText>{author}</FatText>
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
  </CommentContainer>);
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired
}

export default Comment
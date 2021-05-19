import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types"
import Comment from './Comment';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useUser from '../../hooks/useUser';

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int! $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`

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

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${props => props.theme.borderColor};
`

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`

const Comments = ({ caption, commentNumber, comments, author, photoId }) => {
  const { data: userData } = useUser()
  const createCommentUpdate = (cache, result) => {
    console.log(result.data);
    const { data: { createComment: { ok, id } } } = result
    const { payload } = getValues()
    setValue("payload", "")
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me
        }
      }
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `
      })
      console.log(newCacheComment);
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment]
          },
          commentNumber(prev) {
            return prev + 1
          }
        }
      })
    }
  }
  const [createCommentMutation, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    update: createCommentUpdate
  })
  const { register, handleSubmit, setValue, getValues } = useForm()
  const onValid = (data) => {
    const { payload } = data
    if (loading) {
      return
    }
    createCommentMutation({
      variables: {
        photoId,
        payload
      }
    })
  }
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
    <PostCommentContainer>
      <form onSubmit={handleSubmit(onValid)}>
        <PostCommentInput
          {...register("payload", { required: true })}
          type="text"
          placeholder="Write a comment..." />
      </form>
    </PostCommentContainer>
  </SComments>);
}

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
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
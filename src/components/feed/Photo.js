import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useMutation } from '@apollo/client';
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import PropTypes from "prop-types"
import React from 'react';
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import Comments from "./Comments"


const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!){
    toggleLike(id: $id) {
      ok
      error
    }
  }
`

const PhotoContainer = styled.div`
    background-color: ${props => props.theme.photoContainerBgColor};
    border: 1px solid ${props => props.theme.borderColor};
    margin-bottom: 20px;
    max-width: 615px;
    border-radius: 5px;
`

const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.borderColor};
`

const Username = styled(FatText)`
    margin-left: 15px;
`

const PhotoFile = styled.img`
    width: 100%;
    height: 450px;
`

const PhotoData = styled.div`
    padding: 15px;
`

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
    svg {
        font-size: 20px
    }
`

const PhotoAction = styled.div`
    margin-right: 10px;
    cursor: pointer;
`

const Likes = styled(FatText)`
    margin-top: 10px;
    display: block;
`
const Photo = ({ id, user, file, isLiked, likes, caption, commentNumber, comments }) => {
  const updateToggleLike = (cache, result) => {
    const { data: { toggleLike: { ok } } } = result
    if (ok) {
      const photoId = `Photo:${id}`

      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1
            }
            return prev + 1
          }
        }
      })

      //   const fragment = gql`
      //   fragment BSName on Photo {
      //     isLiked
      //     likes
      //   }
      // `
      // readFragment 사용하여 cache를 읽고 write하기 (props에 원하는 정보가 없을 때 사용하기 좋다)
      // const result = cache.readFragment({
      //   id: fragmentId,
      //   fragment,
      // })
      // console.log(result);
      // if ("isLiked" in result && "likes" in result) {
      //   const { isLiked, likes } = result
      //   cache.writeFragment({
      //     id: fragmentId,
      //     fragment: fragment,
      //     data: {
      //       isLiked: !isLiked,
      //       likes: isLiked ? likes - 1 : likes + 1
      //     }
      //   })
      // }

      // props에 원하는 정보가 있으면 굳이 cache를 읽을 필요가 없다.
      // cache.writeFragment({
      //   id: fragmentId,
      //   fragment: fragment,
      //   data: {
      //     isLiked: !isLiked,
      //     likes: isLiked ? likes - 1 : likes + 1
      //   }
      // })
    }
  }
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    update: updateToggleLike
  })
  return (<PhotoContainer key={id}>
    <PhotoHeader>
      <Avatar lg={true} url={user.avatar} />
      <Username>{user.username}</Username>
    </PhotoHeader>
    <PhotoFile src={file} />
    <PhotoData>
      <PhotoActions>
        <div>
          <PhotoAction onClick={toggleLikeMutation}>
            <FontAwesomeIcon
              icon={isLiked ? SolidHeart : faHeart}
              style={{ color: isLiked ? "tomato" : "inherit" }}
            />
          </PhotoAction>
          <PhotoAction>
            <FontAwesomeIcon icon={faComment} />
          </PhotoAction>
          <PhotoAction>
            <FontAwesomeIcon icon={faPaperPlane} />
          </PhotoAction>
        </div>
        <div>
          <FontAwesomeIcon icon={faBookmark} />
        </div>
      </PhotoActions>
      <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      <Comments
        author={user.username}
        caption={caption}
        commentNumber={commentNumber}
        comments={comments} />
    </PhotoData>
  </PhotoContainer>)
}

Photo.prototypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
}

export default Photo;
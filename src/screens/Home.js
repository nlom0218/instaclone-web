import { useQuery } from '@apollo/client';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import { FatText } from '../components/shared';

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            id
            user {
                username
                avatar
            }
            file
            caption
            likes
            comments
            createdAt
            isMine
        }
    }
`

const PhotoContainer = styled.div`
    background-color: ${props => props.theme.photoContainerBgColor};
    border: 1px solid ${props => props.theme.borderColor};
    margin-bottom: 20px;
    max-width: 615px;
`

const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
`

const Username = styled(FatText)`
    margin-left: 15px;
`

const PhotoFile = styled.img`
    width: 100%;
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
`

const PhotoAction = styled.div`
    margin-right: 10px;
`

const Likes = styled(FatText)`
    margin-top: 10px;
    display: block;
`

const Home = () => {
    const history = useHistory()
    const { data } = useQuery(FEED_QUERY)
    return (<>
        {data?.seeFeed?.map(photo =>
            <PhotoContainer key={photo.id}>
                <PhotoHeader>
                    <Avatar lg={true} url={photo.user.avatar} />
                    <Username>{photo.user.username}</Username>
                </PhotoHeader>
                <PhotoFile src={photo.file} />
                <PhotoData>
                    <PhotoActions>
                        <div>
                            <PhotoAction>
                                <FontAwesomeIcon size={"2x"} icon={faHeart} />
                            </PhotoAction>
                            <PhotoAction>
                                <FontAwesomeIcon size={"2x"} icon={faComment} />
                            </PhotoAction>
                            <PhotoAction>
                                <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
                            </PhotoAction>
                        </div>
                        <div>
                            <FontAwesomeIcon size={"2x"} icon={faBookmark} />
                        </div>
                    </PhotoActions>
                    <Likes>{photo.likes === 1 ? "1 like" : `${photo.likes} likes`}</Likes>
                </PhotoData>
            </PhotoContainer>)}
    </>);
}

export default Home;
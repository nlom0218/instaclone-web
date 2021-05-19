import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments"

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            comments{
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`

const Home = () => {
    const history = useHistory()
    const { data } = useQuery(FEED_QUERY)
    return ((<>
        <PageTitle title="Home" />
        {data?.seeFeed?.map(photo =>
            <Photo
                key={photo.id}
                {...photo}
            />)
        }
    </>));
}

export default Home;
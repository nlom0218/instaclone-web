import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';

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
            isLiked
        }
    }
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
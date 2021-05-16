import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggedInVar, logUserOut } from '../apllo';

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`

const useUser = () => {
  const histroy = useHistory()
  const hasToken = useReactiveVar(isLoggedInVar)
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  })
  useEffect(() => {
    if (data?.me === null) {
      logUserOut(histroy)
    }
  }, [data])
  return { data }
}

export default useUser;
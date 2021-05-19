import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"

const TOKEN = "TOKEN"
const DARK_MODE = "DARK_MODE"

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)))

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
}
export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN)
  history.replace()
  window.location.reload()
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)))
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled")
  darkModeVar(true)
}
export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE)
  darkModeVar(false)
}

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
})
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN)
  return {
    headers: {
      ...headers,
      token
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`
      }
    }
  }),
})
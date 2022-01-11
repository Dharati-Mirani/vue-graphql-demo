import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({
     // You should use an absolute URL here
     uri: 'https://cunning-perch-68.hasura.app/v1/graphql',
     headers: {
          "x-hasura-admin-secret": "S7RvmdWspsP7afjejaMgFKNd6tp4Mthn4VJ1KX1wGzUTzmzzE4rS198qTmxV9SU7"
     }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
     link: httpLink,
     cache: new InMemoryCache(),
     connectToDevTools: true
})

const apolloProvider = new VueApollo({
     defaultClient: apolloClient
})

// Install the vue plugin
Vue.use(VueApollo)

export default apolloProvider

import React from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import { Route, Switch } from "react-router-dom"
import { createHttpLink } from "apollo-link-http"
import bootstrap from "bootstrap"
import ProductList from "./ProductList"
import ProductView from "./ProductView"
import UpdateForm from "./UpdateForm"

import "./App.css"

const client = new ApolloClient({
  link: createHttpLink({
    fetchOptions: {
      method: "POST",
    },
  }),
  uri: "http://localhost:3000/graphql",
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1> My Company Inventory </h1>
        <h3> Showing all available products </h3>
        <hr />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/product/:id" component={ProductView} />
          <Route path="/edit/product/:id" component={UpdateForm} />
        </Switch>
      </div>
    </ApolloProvider>
  )
}

export default App

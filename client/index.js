import './style/materialize.scss';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider,InMemoryCache } from "@apollo/client";
import {SongDetail,SongList,SongCreate} from './components';
import { createHttpLink } from "apollo-link-http";
import App from './App';

// const cache = new InMemoryCache();

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    DataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <App children={<SongList />}></App>
                </Route>
                <Route exact path="/songs/new">
                    <App children={<SongCreate />}></App>
                </Route>
                <Route path="/songs/:id">
                    <App children={<SongDetail />}></App>
                </Route>
            </Switch>
        </HashRouter>
    </ApolloProvider>
)
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
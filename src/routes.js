import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import {
  WordpressPage,
  WordpressPostList,
  WordpressPost,
} from './containers/wordpress';
import Layout from './containers/layout';
import Search from './containers/search';
import GenePage from './containers/genePage';
import DiseasePage from './containers/diseasePage';
import NotFound from './components/notFound';

export default (
  <Route component={
    (props) => (
      <Layout {...props}>
        <Switch>
          <Route component={
            () => (
              <WordpressPage slug='home' />
            )} exact path='/'
          />
          <Route component={Search} path='/search' />
          <Route component={GenePage} path='/gene/:geneId' />
          <Route component={DiseasePage} path='/disease/:diseaseId' />
          <Route component={
            () => (
              <Redirect to='/posts' />
            )} path='/posts/news'
          />
          <Route component={WordpressPost} path='/posts/:slug' />
          <Route component={WordpressPostList} path='/posts' />
          <Route component={
            ({match}) => (
              <Redirect to={`/${match.params.id}`} />
            )} path='/wordpress/:id'
          />
          {/* before links within user edited WordPress content is fixed, this path rewrite is necessary */}
          <Route component={
            ({location}) =>
              <WordpressPage slug={location.pathname} />
            } path='/:slug'
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    )}
    path='/'
  />

);

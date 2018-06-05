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
          <Route component={WordpressPost} path='/news/:slug' />
          <Route component={WordpressPostList} path='/news' />
          <Route component={
            ({match}) => (
              <Redirect to={`/${match.params.id}`} />
            )} path='/wordpress/:id'
          />
          {/* before links within user edited WordPress content is fixed, this path rewrite is necessary */}
          <Route component={
            ({match}) =>
              <WordpressPage slug={match.params.slug} />
            } path='/:slug'
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    )}
    path='/'
  />

);

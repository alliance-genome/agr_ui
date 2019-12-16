import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import {
  WordpressPage,
  WordpressPostList,
  WordpressPost,
} from './containers/wordpress';
import Homepage from './containers/homepage';
import Layout from './containers/layout';
import Search from './containers/search';
import GenePage from './containers/genePage';
import DiseasePage from './containers/diseasePage';
import NotFound from './components/notFound';
import DownloadsPage from './containers/downloadsPage';

export default (
  <Route
    component={
      (props) => (
        <Layout {...props}>
          <Switch>
            <Route component={Homepage} exact path='/' />
            <Route component={Search} path='/search' />
            <Route component={GenePage} path='/gene/:geneId' />
            <Route component={DiseasePage} path='/disease/:diseaseId' />
            <Route component={WordpressPost} path='/news/:slug' />
            <Route component={WordpressPostList} path='/news' />
            <Route component={DownloadsPage} path='/downloads' />

            {/* this one needs to be handled outside of the main application */}
            <Route
              exact path='/api/swagger-ui' render={
                () => {
                  window.location.href = '/api/swagger-ui';
                  return null;
                }}
            />

            <Route
              path='/wordpress/:id'
              render={({match}) => <Redirect to={`/${match.params.id}`} />}
            />
            {/* before links within user edited WordPress content is fixed, this path rewrite is necessary */}
            <Route
              path='/:slug'
              render={({match}) => <WordpressPage key={match.params.slug} slug={match.params.slug} />}
            />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      )}
    path='/'
  />

);

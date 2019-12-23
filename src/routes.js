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
  <Layout>
    <Switch>
      <Route component={Homepage} exact path='/' />
      <Route component={Search} exact path='/search' />
      <Route component={GenePage} exact path='/gene/:geneId' />
      <Route component={DiseasePage} exact path='/disease/:diseaseId' />
      <Route component={WordpressPost} exact path='/news/:slug' />
      <Route component={WordpressPostList} exact path='/news' />
      <Route component={DownloadsPage} exact path='/downloads' />

      {/* this one needs to be handled outside of the main application */}
      <Route
        exact path='/api/swagger-ui' render={
          () => {
            window.location.href = '/api/swagger-ui';
            return null;
          }}
      />

      <Redirect exact from='/wordpress/:slug' to='/:slug' />
      <Route
        path='/:slug'
        render={({match}) => <WordpressPage key={match.params.slug} slug={match.params.slug} />}
      />
      
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

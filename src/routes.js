// make the routes easier to read
/*eslint react/jsx-sort-props:0*/
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
import AllelePage from './containers/allelePage';

export default (
  <Layout>
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/gene/:id' render={({match}) => <GenePage geneId={match.params.id} />} />
      <Route exact path='/disease/:id' render={({match}) => <DiseasePage diseaseId={match.params.id} />} />
      <Route exact path='/allele/:id' render={({match}) => <AllelePage alleleId={match.params.id} />} />
      <Route exact path='/news/:slug' render={({match}) => <WordpressPost slug={match.params.slug} />} />
      <Route exact path='/news' component={WordpressPostList} />
      <Route exact path='/downloads' component={DownloadsPage} />

      {/* this one needs to be handled outside of the main application */}
      <Route
        exact
        path='/api/swagger-ui'
        render={() => {
          window.location.href = '/api/swagger-ui';
          return null;
        }}
      />

      <Redirect exact from='/wordpress/:slug' to='/:slug' />
      <Route path='/:slug' render={({match}) => <WordpressPage slug={match.params.slug} />} />

      <Route component={NotFound} />
    </Switch>
  </Layout>
);

import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import Wordpress from './containers/wordpress';
import WordpressFeeds from './containers/wordpress/wordpressFeeds';
import Layout from './containers/layout';
import Search from './containers/search';
import GenePage from './containers/genePage';
import DiseasePage from './containers/diseasePage';

export default (
  <Route component={Layout} path='/'>
    <IndexRedirect to="/wordpress" />
    <Route component={Wordpress} path='wordpress' >
      <IndexRedirect to="home" />
      <Route component={Wordpress} path=':pageId' />
    </Route>
    <Route component={WordpressFeeds} path='posts' >
      <IndexRedirect to="/posts/news" />
      <Route component={WordpressFeeds} path=':postId' />
    </Route>
    <Route component={Search} path='search' />
    <Route component={GenePage} path='gene/:geneId' />
    <Route component={DiseasePage} path='disease/:diseaseId' />
  </Route>
);

import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import Wordpress from './containers/wordpress';
import WordpressFeeds from './containers/wordpress/wordpressFeeds';
import Layout from './containers/layout';
import Search from './containers/search';
import GenePage from './containers/genePage';
import DiseasePage from './containers/diseasePage';

export default (
  <Route component={Layout} path='/'>
    <IndexRedirect to="/home" />
    <Route component={Search} path='search' />
    <Route component={GenePage} path='gene/:geneId' />
    <Route component={DiseasePage} path='disease/:diseaseId' />
    <Route component={WordpressFeeds} path='posts' >
      <IndexRedirect to="/posts/news" />
      <Route component={WordpressFeeds} path=':postId' />
    </Route>
    <Redirect from='/wordpress/:id' to='/:id' /> {/* before links within user edited WordPress content is fixed, this path rewrite is necessary */}
    <Route component={Wordpress} path='/'>
      <Route component={Wordpress} path=':pageId' />
    </Route>
  </Route>
);

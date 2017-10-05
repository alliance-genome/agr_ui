import React from 'react';
import { Route, IndexRedirect, IndexRoute, Redirect } from 'react-router';

import Wordpress from './containers/wordpress';
import WordpressFeeds from './containers/wordpress/wordpressFeeds';
import Layout from './containers/layout';
import Search from './containers/search';
import GenePage from './containers/genePage';
import DiseasePage from './containers/diseasePage';

import { WP_PAGES } from './constants';

export default (
  <Route component={Layout} path='/'>
    <IndexRoute
      component={
        (props) => <Wordpress {...props} pageId="home" />
      }
    />
    <Route component={Search} path='search' />
    <Route component={GenePage} path='gene/:geneId' />
    <Route component={DiseasePage} path='disease/:diseaseId' />
    <Route component={WordpressFeeds} path='posts' >
      <IndexRedirect to="/posts/news" />
      <Route component={WordpressFeeds} path=':postId' />
    </Route>
    <Redirect from='/wordpress/:id' to='/:id' /> {/* before links within user edited WordPress content is fixed, this path rewrite is necessary */}
    {
      Object.values(WP_PAGES).map((page) => (
        <Route
          component={
            (props) => <Wordpress {...props} pageId={page.path} />
          }
          key={page.path}
          path={page.path}
        />
      ))
    }

  </Route>
);

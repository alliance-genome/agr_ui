import React from 'react';
import { Route } from 'react-router-dom';

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
  <Route path='/' component={
    (props) => (
      <Layout {...props}>
        <Route path='/' exact component={() => (
          <WordpressPage slug='home' />
        )} />
        <Route component={Search} path='/search' />
        <Route component={GenePage} path='/gene/:geneId' />
        <Route component={DiseasePage} path='/disease/:diseaseId' />
        <Route component={WordpressPostList} path='/posts' />
        {/* <Redirect from='/posts/news' to='/posts' /> */}
        <Route component={WordpressPost} path='/posts/:slug' />
        {/* <Redirect from='/wordpress/:id' to='/:id' />  */}
        {/* before links within user edited WordPress content is fixed, this path rewrite is necessary */}
        <Route component={WordpressPage} path='/:slug' />
        <Route component={NotFound} path="*" />
      </Layout>
    )
  } />

);

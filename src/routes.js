import React from 'react';
import { IndexRoute, Route  } from 'react-router';

import Wordpress from './containers/wordpress';
import Layout from './containers/layout';
import Search from './containers/search';
import GenePage from './containers/genePage';

export default (
  <Route component={Layout} path='/'>
    <IndexRoute component={Wordpress} />
    <Route component={Wordpress} path='home' />
    <Route component={Wordpress} path='about' />
    <Route component={Wordpress} path='faq' />
    <Route component={Wordpress} path='organization' />
    <Route component={Wordpress} path='funding' />
    <Route component={Wordpress} path='features' />
    <Route component={Wordpress} path='supplement' />
    <Route component={Wordpress} path='orthology' />
    <Route component={Wordpress} path='phenotypes' />
    <Route component={Wordpress} path='contact' />
    <Route component={Wordpress} path='projects' />
    <Route component={Search} path='search' />
    <Route component={GenePage} path='gene/:geneId' />
  </Route>
);

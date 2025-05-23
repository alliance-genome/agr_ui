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
import GeneAlleleDetailsPage from './containers/GeneAlleleDetailsPage';
import DiseasePage from './containers/diseasePage';
import NotFound from './components/notFound';
import DownloadsPage from './containers/downloadsPage';
import AllelePage from './containers/allelePage/AllelePage';
import VariantPage from './containers/allelePage/VariantPage';
import MODLanding from './containers/modLanding/Main';
import AlzheimersPage from './containers/alzheimersPage';
import BlastPage from './containers/blastPage';

export default (
  <Layout>
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/gene/:id' render={({match}) => <GenePage geneId={match.params.id} />} />
      <Route exact path='/gene/:id/allele-details' render={({match}) => <GeneAlleleDetailsPage geneId={match.params.id} />} />
      <Route exact path='/disease/:id' render={({match}) => <DiseasePage diseaseId={match.params.id} />} />
      <Route exact path='/allele/:id' render={({match}) => <AllelePage alleleId={match.params.id} />} />
      <Route exact path='/variant/:id' render={({match}) => <VariantPage variantId={match.params.id} />} />
      <Route exact path='/news/:slug' render={({match}) => <WordpressPost slug={match.params.slug} />} />
      <Route exact path='/news' component={WordpressPostList} />
      <Route exact path='/downloads' component={DownloadsPage} />
      <Route exact path='/members/:id' render={({ match }) => <MODLanding modId={match.params.id} />} />
      <Route exact path='/disease-portal/alzheimers-disease' component={AlzheimersPage} />
      <Route exact path='/blastservice' component={BlastPage} />


      {/* this one needs to be handled outside of the main application */}
      <Route
        path='/api'
        render={(props) => {
          window.location.href = `${props.location.pathname}${props.location.search}`;
          return null;
        }}
      />

      <Route
        path='/swagger-ui'
        render={(props) => {
          window.location.href = `${props.location.pathname}${props.location.search}`;
          return null;
        }}
      />

      <Route
        path='/openapi'
        render={(props) => {
          window.location.href = `${props.location.pathname}${props.location.search}`;
          return null;
        }}
      />

      <Route
        path='/bluegenes'
        render={(props) => {
          window.location.href = `${props.location.pathname}${props.location.search}`;
          return null;
        }}
      />

      <Route
        path='/jbrowse'
        render={(props) => {
          window.location.href = `${props.location.pathname}${props.location.search}`;
          return null;
        }}
      />

      <Route
        path='/apollo'
        render={(props) => {
          window.location.href = `${props.location.pathname}${props.location.search}`;
          return null;
        }}
      />

      <Redirect exact from='/wordpress/:slug' to='/:slug' />
      <Route path='/:slug' render={({match}) => <WordpressPage slug={match.params.slug} />} />

      <Route component={NotFound} />
    </Switch>
  </Layout>
);

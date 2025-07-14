// make the routes easier to read
/*eslint react/jsx-sort-props:0*/
import React from 'react';
import { Route, Routes, Navigate, useParams, useLocation } from 'react-router-dom';

import { WordpressPage, WordpressPostList, WordpressPost } from './containers/wordpress';
import Homepage from './containers/homepage/index.jsx';
import Layout from './containers/layout/index.jsx';
import Search from './containers/search';
import GenePage from './containers/genePage/index.jsx';
import GeneAlleleDetailsPage from './containers/GeneAlleleDetailsPage/index.jsx';
import DiseasePage from './containers/diseasePage/index.jsx';
import NotFound from './components/notFound.jsx';
import DownloadsPage from './containers/downloadsPage/index.jsx';
import AllelePage from './containers/allelePage/AllelePage.jsx';
import VariantPage from './containers/allelePage/VariantPage.jsx';
import MODLanding from './containers/modLanding/Main.jsx';
import AlzheimersPage from './containers/alzheimersPage/index.jsx';
import BlastPage from './containers/blastPage/index.jsx';

const WordpressRedirect = () => {
  const { slug } = useParams();
  return <Navigate replace to={`/${slug}`} />;
};

const LayoutWithRoutes = () => (
  <Layout>
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/gene/:id" element={<GenePage />} />
      <Route exact path="/gene/:id/allele-details" element={<GeneAlleleDetailsPage />} />

      <Route exact path="/disease/:id" element={<DiseasePage />} />
      <Route exact path="/allele/:id" element={<AllelePage />} />
      <Route exact path="/variant/:id" element={<VariantPage />} />
      <Route exact path="/news/:slug" element={<WordpressPost />} />

      <Route exact path="/news" element={<WordpressPostList />} />
      <Route exact path="/downloads" element={<DownloadsPage />} />

      <Route exact path="/members/:id" element={<MODLanding />} />

      <Route exact path="/disease-portal/alzheimers-disease" element={<AlzheimersPage />} />
      <Route exact path="/blastservice" element={<BlastPage />} />

      <Route exact path="/wordpress/:slug" component={WordpressRedirect} />
      <Route path="/:slug" element={<WordpressPage />} />

      <Route component={NotFound} />
    </Routes>
  </Layout>
);

export default LayoutWithRoutes;

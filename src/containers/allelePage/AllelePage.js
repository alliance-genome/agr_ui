import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import {
  DataPage,
  PageData,
  PageHeader,
  PageNav
} from '../../components/dataPage';
import HeadMetaTags from '../../components/headMetaTags';
import Subsection from '../../components/subsection';

const SUMMARY = 'Summary';
const SECTIONS = [
  {name: SUMMARY},
];

const AllelePage = ({match}) => {
  const { alleleId } = match.params;
  const title = `${alleleId} allele`;
  return (
    <DataPage>
      <HeadMetaTags title={title} />
      <PageNav entityName={alleleId} sections={SECTIONS} />
      <PageData>
        <PageHeader entityName={alleleId} />

        <Subsection hideTitle title={SUMMARY}>
          <div />
        </Subsection>
      </PageData>
    </DataPage>
  );
};

AllelePage.propTypes = {
  match: PropTypes.object,
};

export default withRouter(AllelePage);

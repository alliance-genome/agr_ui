import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Subsection from '../../components/subsection.jsx';
import NotFound from '../../components/notFound.jsx';
import NoData from '../../components/noData.jsx';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import ExternalLink from '../../components/ExternalLink.jsx';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel.jsx';
import YourInputWelcome from '../../components/YourInputWelcome.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { ANATOMY_CATEGORY } from '../../constants';
import { getOntologyForCurie } from '../ontologyBrowser/ontologies.js';
import AnatomyBasicInfo from './AnatomyBasicInfo.jsx';
import fetchAnatomyTerm from './fetchAnatomyTerm.js';

const SUMMARY = 'Summary';
const EXPRESSION = 'Genes Expressed Here';
const BROWSE_ONTOLOGY = 'Browse Ontology';

const AnatomyPage = () => {
  const { id: curie } = useParams();
  const ontology = getOntologyForCurie(curie);
  // Only the member anatomy ontologies have a page. An unknown prefix is a 404;
  // UBERON is a known prefix with no page yet, handled below.
  const hasPage = Boolean(ontology?.entityPath);

  const { isLoading, isError, data } = usePageLoadingQuery(hasPage ? `anatomy:${ontology.id}:${curie}` : null, () =>
    fetchAnatomyTerm(ontology, curie)
  );

  if (!ontology) {
    return <NotFound />;
  }

  // UBERON terms browse today but have no page until they can aggregate the
  // member terms that map onto them. Send the reader somewhere that works
  // rather than to a dead end.
  if (!hasPage) {
    return <Navigate replace to={`/ontology/${ontology.id}/${curie}`} />;
  }

  if (isError) {
    return <NotFound />;
  }

  if (isLoading || !data) {
    return null; // the main page loading bar is sufficient
  }

  const { term, parents, children } = data;
  const title = term.name || term.curie;

  const keywords = ['anatomy', term.curie, term.name, ontology.species, ontology.mod].filter(Boolean);
  if (term.synonyms?.length) {
    keywords.push(...term.synonyms);
  }

  const siteUrl = `https://www.alliancegenome.org/anatomy/${term.curie}`;

  const jsonLd = [
    {
      '@context': 'http://schema.org',
      '@type': 'Dataset',
      '@id': term.curie,
      name: term.name,
      description: term.definition,
      url: siteUrl,
      keywords: keywords.join(' '),
      includedInDataCatalog: 'https://www.alliancegenome.org',
      creator: {
        '@type': 'Organization',
        name: 'Alliance of Genome Resources',
      },
      version: '2.0',
      license: 'CC BY 4.0',
    },
    {
      '@context': 'http://schema.org',
      '@type': 'AnatomicalStructure',
      '@id': term.curie,
      identifier: term.curie,
      name: term.name,
      url: siteUrl,
      description: term.definition,
    },
  ];

  return (
    <DataPage>
      <HeadMetaTags jsonLd={jsonLd} title={title} />
      <PageNav
        sections={[
          { name: SUMMARY },
          { name: EXPRESSION },
          { name: BROWSE_ONTOLOGY, to: `/ontology/${ontology.id}/${term.curie}` },
        ]}
      >
        <PageNavEntity entityName={title}>
          <ExternalLink href={ontology.termUrl(term.curie)}>{term.curie}</ExternalLink>
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category={ANATOMY_CATEGORY} displayName="Anatomy" />
        <PageHeader>{title}</PageHeader>
        <YourInputWelcome type="Anatomy" name={title} allianceId={term.curie} />

        <Subsection hideTitle title={SUMMARY}>
          <AnatomyBasicInfo ontology={ontology} term={term} parents={parents} children={children} />
        </Subsection>

        {/* Every Alliance expression annotation already carries its native
            member anatomy term, but the API can only be queried gene-first, so
            there is no way to ask which genes are expressed in a term. Say so
            plainly instead of hiding the section — a reader who came here for
            expression should learn where it is, not think none exists. */}
        <Subsection title={EXPRESSION}>
          <NoData>
            Expression annotations cannot yet be searched by anatomy term at the Alliance.
            {ontology.mod && (
              <>
                {' '}
                <ExternalLink href={ontology.termUrl(term.curie)}>
                  View expression for this term at {ontology.mod}
                </ExternalLink>
                .
              </>
            )}
          </NoData>
        </Subsection>
      </PageData>
    </DataPage>
  );
};

export default AnatomyPage;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  DataPage,
  PageData,
  PageHeader,
  PageNav
} from '../../components/dataPage';
import HeadMetaTags from '../../components/headMetaTags';
import Subsection from '../../components/subsection';
import {connect} from 'react-redux';
import {
  selectData,
  selectError,
  selectLoading
} from '../../selectors/alleleSelectors';
import {fetchAllele} from '../../actions/alleleActions';
import NotFound from '../../components/notFound';
import AlleleSummary from './AlleleSummary';
import AlleleSymbol from './AlleleSymbol';
import SpeciesIcon from '../../components/speciesIcon';
import PageNavEntity from '../../components/dataPage/PageNavEntity';
import DataSourceLink from '../../components/dataSourceLink';
import {Link} from 'react-router-dom';
import {setPageLoading} from '../../actions/loadingActions';
import AlleleToPhenotypeTable from './AlleleToPhenotypeTable';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel';
import AlleleToDiseaseTable from './AlleleToDiseaseTable';
import AlleleToVariantTable from './AlleleToVariantTable';
import AlleleSequenceView from './AlleleSequenceView';
import AlleleTransgenicConstructs from './AlleleTransgenicConstructs';
import AlleleMolecularConsequences from './AlleleMolecularConsequences';

const SUMMARY = 'Summary';
const PHENOTYPES = 'Phenotypes';
const DISEASE = 'Disease Associations';
const VARIANTS = 'Genomic Variant Information';
const CONSTRUCTS = 'Transgenic Constructs';
const MOLECULAR_CONSEQUENCE = 'Variant Molecular Consequences';

const SECTIONS = [
  {name: SUMMARY},
  {name: CONSTRUCTS},
  {name: VARIANTS},
  {name: MOLECULAR_CONSEQUENCE},
  {name: PHENOTYPES},
  {name: DISEASE}
];

const AllelePage = (props) => {

  const { alleleId, data, error, dispatch } = props;

  useEffect(() => {
    dispatch(setPageLoading(true));
    dispatch(fetchAllele(alleleId)).finally(() => dispatch(setPageLoading(false)));
  }, [alleleId]);

  if (error) {
    return <NotFound/>;
  }

  if (!data || !Object.keys(data).length) {
    return null;
  }

  const title = `${data.symbolText} | ${data.species.name} allele`;

  return (
    <DataPage>
      <HeadMetaTags title={title}/>
      <PageNav sections={SECTIONS}>
        <PageNavEntity entityName={<AlleleSymbol allele={data} />} icon={<SpeciesIcon scale={0.5} species={data.species.name} />} truncateName>
          <DataSourceLink reference={data.crossReferences.primary} />
          {data.gene && <div>Allele of <Link to={`/gene/${data.gene.id}`}>{data.gene.symbol}</Link></div>}
          <i>{data.species.name}</i>
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category='allele' />
        <PageHeader entityName={<AlleleSymbol allele={data} />}/>

        <Subsection hideTitle title={SUMMARY}>
          <AlleleSummary allele={data} />
        </Subsection>

        <Subsection title={CONSTRUCTS}>
          <AlleleTransgenicConstructs constructs={data.constructs} />
        </Subsection>

        <Subsection title={VARIANTS}>
          <AlleleSequenceView allele={data} />
          <AlleleToVariantTable allele={data} alleleId={alleleId} />
        </Subsection>

        <Subsection title={MOLECULAR_CONSEQUENCE}>
          <AlleleMolecularConsequences alleleId={alleleId} />
        </Subsection>

        <Subsection title={PHENOTYPES}>
          <AlleleToPhenotypeTable alleleId={alleleId} />
        </Subsection>

        <Subsection title={DISEASE}>
          <AlleleToDiseaseTable alleleId={alleleId} />
        </Subsection>

      </PageData>
    </DataPage>
  );
};

AllelePage.propTypes = {
  alleleId: PropTypes.string.isRequired,
  data: PropTypes.object,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  data: selectData(state),
  loading: selectLoading(state),
  error: selectError(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AllelePage);

/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';

import ControlsContainer from '../controlsContainer';
import { getOrthologId } from '../orthology';
import { STRINGENCY_HIGH } from '../orthology/constants';
import { selectOrthologs } from '../../selectors/geneSelectors';
import ExpressionAnnotationTable from './expressionAnnotationTable';
import HorizontalScroll from '../horizontalScroll';
import HelpPopup from '../helpPopup';
import ExpressionControlsHelp from './expressionControlsHelp';
import OrthologPicker from '../OrthologPicker';
import { selectExpressionRibbonSummary } from '../../selectors/expressionSelectors';
import { fetchExpressionRibbonSummary } from '../../actions/expression';
import { GenericRibbon } from '@geneontology/ribbon';
import { POSITION, COLOR_BY } from '@geneontology/ribbon/lib/enums';
import LoadingSpinner from '../loadingSpinner';

class ExpressionComparisonRibbon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringency: STRINGENCY_HIGH,
      selectedOrthologs: [],
      selectedBlock : {
        subject : null,
        group : null,
      }
    };
    this.handleOrthologChange = this.handleOrthologChange.bind(this);
    this.updateSelectedBlock = this.updateSelectedBlock.bind(this);
  }

  componentDidMount() {
    this.dispatchFetchSummary();
  }

  componentDidUpdate(prevProps, prevState) {
    const { geneId } = this.props;
    if (prevProps.geneId !== geneId || !isEqual(prevState.selectedOrthologs, this.state.selectedOrthologs)) {
      this.dispatchFetchSummary();
    }
  }

  dispatchFetchSummary() {
    this.props.dispatch(fetchExpressionRibbonSummary(this.getGeneIdList()));
  }

  getGeneIdList() {
    return [this.props.geneId].concat(this.state.selectedOrthologs.map(getOrthologId));
  }

  handleOrthologChange(values) {
    this.setState({selectedOrthologs: values});
  }

  updateSelectedBlock(gene, term) {
    this.setState(state => {
      const current = state.selectedBlock;
      return {
        selectedBlock: {
          subject: (current.subject && current.subject.id === gene.id) ? null : gene,
          group: (current.group && current.group.id === term.id) ? null : term,
        }
      };
    });
  }

  render() {
    const { geneSymbol, orthology, summary } = this.props;
    const { selectedOrthologs, selectedBlock } = this.state;

    // const genes = [geneId].concat(selectedOrthologs.map(o => getOrthologId(o)));
    // if only looking at a single yeast gene, just show CC group
    // const groups = (geneTaxon === TAXON_IDS.YEAST && selectedOrthologs.length === 0) ? [CC] : [ANATOMY, STAGE, CC];
    if (!summary) {
      return null;
    }

    if (summary.error) {
      // eslint-disable-next-line no-console
      console.log(this.props.summary.error);
      return <span className='text-danger'>Error fetching expression annotation summary</span>;
    }

    if (!summary.data.subjects || !summary.data.categories) {
      return null;
    }

    // we should only show the GO CC category if only a yeast gene is being shown but the
    // GenericRibbon component gets messed up if you do that and then add an ortholog
    // const categories = summary.data.categories.filter(category => !(
    //   selectedOrthologs.length === 0 &&
    //   geneTaxon === TAXON_IDS.YEAST &&
    //   category.id.startsWith('UBERON:')
    // ));

    const genesWithData = Object.entries(orthology.supplementalData)
      .reduce((prev, [geneId, data]) => ({...prev, [geneId]: data.hasExpressionAnnotations}), {});

    return (
      <React.Fragment>
        <div className='pb-4'>
          <ControlsContainer>
            <span className='pull-right'>
              <HelpPopup id='expression-controls-help'>
                <ExpressionControlsHelp />
              </HelpPopup>
            </span>
            <OrthologPicker
              disabledSpeciesMessage={`${geneSymbol} has no ortholog genes or no ortholog genes with expression annotations in this species`}
              genesWithData={genesWithData}
              id='expression-ortho-picker'
              onChange={this.handleOrthologChange}
              orthology={orthology.data}
              value={selectedOrthologs}
            />
          </ControlsContainer>
        </div>

        <HorizontalScroll width={1100}>
          <span className="d-inline-block">
            <GenericRibbon
              categories={summary.data.categories}
              colorBy={COLOR_BY.CLASS_COUNT}
              hideFirstSubjectLabel
              itemClick={this.updateSelectedBlock}
              newTab={false}
              selected={selectedBlock}
              subjectBaseURL={'/gene/'}
              subjectLabelPosition={POSITION.LEFT}
              subjects={summary.data.subjects}
            />
          </span>
          <div>{summary.loading && <LoadingSpinner />}</div>
        </HorizontalScroll>

        {selectedBlock.group &&
          <div className='pt-4'>
            <ExpressionAnnotationTable genes={this.getGeneIdList()} term={selectedBlock.group.id} />
          </div>
        }
      </React.Fragment>
    );
  }
}

ExpressionComparisonRibbon.propTypes = {
  dispatch: PropTypes.func,
  geneId: PropTypes.string.isRequired,
  geneSymbol: PropTypes.string.isRequired,
  geneTaxon: PropTypes.string.isRequired,
  orthology: PropTypes.object,
  summary: PropTypes.object,
};

const mapStateToProps = state => ({
  orthology: selectOrthologs(state),
  summary: selectExpressionRibbonSummary(state),
});

export default connect(mapStateToProps)(ExpressionComparisonRibbon);

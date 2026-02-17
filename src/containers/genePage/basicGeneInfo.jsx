import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AttributeList, AttributeLabel, AttributeValue } from '../../components/attribute';
import DataSourceLink from '../../components/dataSourceLink.jsx';
import CrossReferenceList from '../../components/crossReferenceList.jsx';
import SynonymList from '../../components/synonymList.jsx';
import ModGeneDescription from './modGeneDescription.jsx';
import HelpPopup from '../../components/helpPopup.jsx';
import { getSpecies } from '../../lib/utils';
import { HELP_AUTOMATED_GENE_DESCRIPTION } from './constants';
import GeneSymbol from '../../components/GeneSymbol.jsx';
import SpeciesName from '../../components/SpeciesName.jsx';

class BasicGeneInfo extends Component {
  render() {
    const { gene } = this.props;
    const synopsisProvider = getSpecies(gene.species.taxonId).geneSynopsisProvider || gene.dataProvider;
    return (
      <AttributeList>
        <AttributeLabel>Species</AttributeLabel>
        <AttributeValue>
          <SpeciesName>{gene.species.name}</SpeciesName>
        </AttributeValue>

        <AttributeLabel>Symbol</AttributeLabel>
        <AttributeValue>
          <GeneSymbol gene={gene} />
        </AttributeValue>

        <AttributeLabel>Name</AttributeLabel>
        <AttributeValue>{gene.name}</AttributeValue>

        <AttributeLabel>Synonyms</AttributeLabel>
        <AttributeValue placeholder="None">
          {gene.synonyms && gene.synonyms.length && <SynonymList synonyms={gene.synonyms} />}
        </AttributeValue>

        <AttributeLabel>Biotype</AttributeLabel>
        <AttributeValue>{gene.soTerm.name.replace(/_/g, ' ')}</AttributeValue>

        <AttributeLabel>
          Automated Description{' '}
          {HELP_AUTOMATED_GENE_DESCRIPTION && (
            <HelpPopup id={'help-gene-auto-desc'}>{HELP_AUTOMATED_GENE_DESCRIPTION}</HelpPopup>
          )}
        </AttributeLabel>
        <AttributeValue>{gene.automatedGeneSynopsis}</AttributeValue>

        <AttributeLabel>{synopsisProvider} Description</AttributeLabel>
        <AttributeValue>
          {(gene.geneSynopsis || gene.geneSynopsisUrl) && (
            <ModGeneDescription description={gene.geneSynopsis} url={gene.geneSynopsisUrl} />
          )}
        </AttributeValue>

        <AttributeLabel>Cross References</AttributeLabel>
        <AttributeValue>
          {gene.crossReferenceMap.other && <CrossReferenceList crossReferences={gene.crossReferenceMap.other} />}
        </AttributeValue>

        <AttributeLabel>Additional Information</AttributeLabel>
        <AttributeValue>
          {gene.crossReferenceMap.references && (
            <DataSourceLink reference={gene.crossReferenceMap.references}>Literature</DataSourceLink>
          )}
        </AttributeValue>
      </AttributeList>
    );
  }
}

BasicGeneInfo.propTypes = {
  gene: PropTypes.object,
};

export default BasicGeneInfo;

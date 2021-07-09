import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import DataSourceLink from '../../components/dataSourceLink';
import CrossReferenceList from '../../components/crossReferenceList';
import SynonymList from '../../components/synonymList';
import ModGeneDescription from './modGeneDescription';
import HelpPopup from '../../components/helpPopup';
import { getSpecies } from '../../lib/utils';
import GeneSymbol from '../../components/GeneSymbol';
import SpeciesName from '../../components/SpeciesName';

const helpAutomatedDescription = 'This gene description is generated by an algorithm developed by the Alliance that uses highly structured gene data such as associations to various ontology terms (e.g., Gene Ontology terms) and the Alliance strict orthology set. The original set of ontology terms that a gene is annotated to may have been trimmed to an ancestor term in the ontology, in order to balance readability with the amount of information in the description. The complete set of annotations to this gene may be found in the relevant data tables below.';

class BasicGeneInfo extends Component {
  render() {
    const {gene} = this.props;
    const synopsisProvider = getSpecies(gene.species.taxonId).geneSynopsisProvider || gene.dataProvider;
    return (
      <AttributeList>
        <AttributeLabel>Species</AttributeLabel>
        <AttributeValue><SpeciesName>{gene.species.name}</SpeciesName></AttributeValue>

        <AttributeLabel>Symbol</AttributeLabel>
        <AttributeValue><GeneSymbol gene={gene} /></AttributeValue>

        <AttributeLabel>Name</AttributeLabel>
        <AttributeValue>{gene.name}</AttributeValue>

        <AttributeLabel>Synonyms</AttributeLabel>
        <AttributeValue placeholder='None'>
          {gene.synonyms && gene.synonyms.length && <SynonymList synonyms={gene.synonyms} />}
        </AttributeValue>

        <AttributeLabel>Biotype</AttributeLabel>
        <AttributeValue>{gene.soTerm.name.replace(/_/g, ' ')}</AttributeValue>

        <AttributeLabel>Automated Description {
          helpAutomatedDescription && <HelpPopup id={'help-gene-auto-desc'}>{helpAutomatedDescription}</HelpPopup>}
        </AttributeLabel>
        <AttributeValue>{gene.automatedGeneSynopsis}</AttributeValue>

        <AttributeLabel>{synopsisProvider} Description</AttributeLabel>
        <AttributeValue>
          {
            (gene.geneSynopsis || gene.geneSynopsisUrl) &&
            <ModGeneDescription description={gene.geneSynopsis} url={gene.geneSynopsisUrl} />
          }
        </AttributeValue>

        <AttributeLabel>Cross References</AttributeLabel>
        <AttributeValue>
          {gene.crossReferenceMap.other && <CrossReferenceList crossReferences={gene.crossReferenceMap.other} />}
        </AttributeValue>

        <AttributeLabel>Additional Information</AttributeLabel>
        <AttributeValue>
          {gene.crossReferenceMap.references &&
            <DataSourceLink reference={gene.crossReferenceMap.references}>Literature</DataSourceLink>
          }
        </AttributeValue>
      </AttributeList>
    );
  }
}

BasicGeneInfo.propTypes = {
  gene: PropTypes.object
};

export default BasicGeneInfo;

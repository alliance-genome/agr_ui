import React from 'react';
import PropTypes from 'prop-types';

import { AttributeList, AttributeLabel, AttributeValue } from '../../components/attribute';
import CrossReferenceListCuration from '../../components/CrossReferenceListCuration.jsx';
import DataSourceLinkCuration from '../../components/dataSourceLinkCuration.jsx';
import SynonymListCuration from '../../components/SynonymListCuration.jsx';
import ModGeneDescription from './modGeneDescription.jsx';
import HelpPopup from '../../components/helpPopup.jsx';
import { getSpecies, getNoteText, extractGeneFields } from '../../lib/utils';
import { HELP_AUTOMATED_GENE_DESCRIPTION } from './constants';
import GeneSymbolCuration from '../../components/GeneSymbolCuration.jsx';
import SpeciesName from '../../components/SpeciesName.jsx';

const GeneSummary = ({ gene, crossReferenceMap }) => {
  const { speciesName, taxonId, dataProviderAbbr } = extractGeneFields(gene);
  const synopsisProvider = getSpecies(taxonId)?.geneSynopsisProvider || dataProviderAbbr;

  const automatedDescription = getNoteText(gene.relatedNotes, 'automated_gene_description');
  const modDescription = getNoteText(gene.relatedNotes, 'MOD_provided_gene_description');

  const otherCrossRefs = crossReferenceMap?.other || [];

  return (
    <AttributeList>
      <AttributeLabel>Species</AttributeLabel>
      <AttributeValue>
        <SpeciesName>{speciesName}</SpeciesName>
      </AttributeValue>

      <AttributeLabel>Symbol</AttributeLabel>
      <AttributeValue>
        <GeneSymbolCuration gene={gene} />
      </AttributeValue>

      <AttributeLabel>Name</AttributeLabel>
      <AttributeValue>{gene.geneFullName?.displayText}</AttributeValue>

      <AttributeLabel>Systematic Name</AttributeLabel>
      <AttributeValue>{gene.geneSystematicName?.displayText}</AttributeValue>

      <AttributeLabel>Synonyms</AttributeLabel>
      <AttributeValue placeholder="None">
        {gene.geneSynonyms && gene.geneSynonyms.length > 0 && <SynonymListCuration synonyms={gene.geneSynonyms} />}
      </AttributeValue>

      <AttributeLabel>Biotype</AttributeLabel>
      <AttributeValue>{gene.geneType?.name?.replace(/_/g, ' ')}</AttributeValue>

      <AttributeLabel>
        Automated Description{' '}
        {HELP_AUTOMATED_GENE_DESCRIPTION && (
          <HelpPopup id={'help-gene-auto-desc'}>{HELP_AUTOMATED_GENE_DESCRIPTION}</HelpPopup>
        )}
      </AttributeLabel>
      <AttributeValue>{automatedDescription}</AttributeValue>

      <AttributeLabel>{synopsisProvider} Description</AttributeLabel>
      <AttributeValue>{modDescription && <ModGeneDescription description={modDescription} />}</AttributeValue>

      <AttributeLabel>Cross References</AttributeLabel>
      <AttributeValue>
        {otherCrossRefs.length > 0 && <CrossReferenceListCuration crossReferences={otherCrossRefs} />}
      </AttributeValue>

      <AttributeLabel>Additional Information</AttributeLabel>
      <AttributeValue>
        {crossReferenceMap?.references && (
          <DataSourceLinkCuration reference={crossReferenceMap.references}>Literature</DataSourceLinkCuration>
        )}
      </AttributeValue>
    </AttributeList>
  );
};

GeneSummary.propTypes = {
  gene: PropTypes.object,
  crossReferenceMap: PropTypes.object,
};

export default GeneSummary;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { AttributeLabel, AttributeValue } from '../../components/attribute';
import { CollapsibleList } from '../../components/collapsibleList';
import { VariantJBrowseLink } from '../../components/variant';
import ExternalLink from '../../components/ExternalLink.jsx';
import CrossReferenceList from '../../components/crossReferenceList.jsx';
import Sequence from './Sequence.jsx';
import getVariantGenomeLocation from './getVariantGenomeLocation';
import { sectionAnchor } from './AlleleMolecularConsequences.jsx';

function formatLocation(location) {
  const { chromosome = '', start = '', end = '' } = location || {};
  const formattedStart = start !== '' ? Number(start).toLocaleString('en-US') : '';
  const formattedEnd = end !== '' ? Number(end).toLocaleString('en-US') : '';
  return start !== end ? `${chromosome}:${formattedStart}-${formattedEnd}` : `${chromosome}:${formattedStart}`;
}

const VariantSummaryCuration = ({ variant: variantData, variantId }) => {
  const { variant } = variantData || {};
  const variantSubject = variant?.variantAssociationSubject;

  // hgvs is directly on variant, not variantAssociationSubject
  const symbol = variant?.hgvs || variant?.variantAssociationSubject.curie;

  // Determine the correct anchor for "See all consequences" link
  // On the standalone Variant page (variantId prop is passed), use #variant-molecular-consequences
  // On the Allele page (no variantId prop), use the dynamic sectionAnchor based on HGVS
  const consequencesAnchor = variantId ? '#variant-molecular-consequences' : sectionAnchor(variant?.hgvs);

  const {
    taxon: species,
    variantType: type,
    references,
    crossReferences,
    relatedNotes: notes,
    referenceSequence,
    variantSequence,
    predictedVariantConsequences,
  } = variantSubject || {};

  // Get location object - try both possible paths
  const variantLocationObj =
    variantSubject?.variantGenomicLocationAssociationObject || variant?.variantGenomicLocationAssociationObject;

  // Create location object
  const location = {
    chromosome: variantLocationObj?.name,
    start: variant?.start,
    end: variant?.end,
    assembly: variantLocationObj?.genomeAssembly?.primaryExternalId,
  };

  const assembly = variantLocationObj?.genomeAssembly?.primaryExternalId;

  const nucleotideChange = variant?.nucleotideChange;

  // Extract consequence - try both possible paths
  const consequences =
    predictedVariantConsequences ||
    variantSubject?.predictedVariantConsequences ||
    variant?.predictedVariantConsequences;
  const consequence = consequences?.[0]?.vepConsequences?.[0]?.name;

  // Extract HGVS names from predictedVariantConsequences
  const hgvsC = consequences?.map((c) => c.hgvsCodingNomenclature).filter(Boolean);
  const hgvsP = consequences?.map((c) => c.hgvsProteinNomenclature).filter(Boolean);

  // Gene overlap - all genes from overlapGenes collection
  const overlapGenes = variant?.overlapGenes;

  const genomeLocation = getVariantGenomeLocation(variantData);
  return (
    <>
      <AttributeLabel>Symbol</AttributeLabel>
      <AttributeValue>
        {location && (
          <VariantJBrowseLink
            geneLocation={genomeLocation}
            location={location}
            species={species && species.name}
            type={type && type.name}
            taxonid={species && species.curie}
          >
            <span className="text-break">{symbol}</span>
          </VariantJBrowseLink>
        )}
      </AttributeValue>

      <AttributeLabel>Category</AttributeLabel>
      <AttributeValue>Variant</AttributeValue>

      <AttributeLabel>Variant type</AttributeLabel>
      <AttributeValue>{type && type.name && type.name.replace(/_/g, ' ')}</AttributeValue>

      <AttributeLabel>Overlaps</AttributeLabel>
      <AttributeValue>
        {overlapGenes && overlapGenes.length
          ? overlapGenes.map((gene, index) => (
              <span key={gene.curie}>
                <Link to={`/gene/${gene.curie}`}>{gene.geneSymbol.displayText}</Link>
                {index < overlapGenes.length - 1 && ', '}
              </span>
            ))
          : null}
      </AttributeValue>

      <AttributeLabel>Genome Assembly</AttributeLabel>
      <AttributeValue>{assembly}</AttributeValue>

      <AttributeLabel>Location</AttributeLabel>
      <AttributeValue>{formatLocation(location)} </AttributeValue>

      <AttributeLabel>Nucleotide Change</AttributeLabel>
      <AttributeValue>
        {nucleotideChange && nucleotideChange.length > 300 ? (
          <Sequence
            sequence={nucleotideChange || ''}
            renderLink={(handleToggle) => (
              <button className="btn btn-link p-0" onClick={handleToggle} type="button">
                Show sequence
              </button>
            )}
          />
        ) : (
          <div
            className="text-break"
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              width: '40ch',
            }}
          >
            {nucleotideChange || ''}
          </div>
        )}
      </AttributeValue>

      <AttributeLabel>Most Severe Consequence</AttributeLabel>
      <AttributeValue>
        {consequence ? (
          <>
            <CollapsibleList collapsedSize={10}>
              {consequence && consequence.replace(/_/g, ' ').split(',')}
            </CollapsibleList>

            <HashLink to={consequencesAnchor} className="btn btn-link btn-sm p-0">
              See all consequences
            </HashLink>
          </>
        ) : null}
      </AttributeValue>

      <AttributeLabel>HGVS.g name</AttributeLabel>
      <AttributeValue>{variant.hgvs}</AttributeValue>

      <AttributeLabel>HGVS.c name</AttributeLabel>
      <AttributeValue>{hgvsC && hgvsC.length ? <CollapsibleList>{hgvsC}</CollapsibleList> : null}</AttributeValue>

      <AttributeLabel>HGVS.p name</AttributeLabel>
      <AttributeValue>{hgvsP && hgvsP.length ? <CollapsibleList>{hgvsP}</CollapsibleList> : null}</AttributeValue>

      <AttributeLabel>Synonyms</AttributeLabel>
      <AttributeValue>{/* <em>rs##</em> */}</AttributeValue>

      <AttributeLabel>Notes</AttributeLabel>
      <AttributeValue>
        {notes && notes.length ? <CollapsibleList>{notes.map((note) => note.freeText)}</CollapsibleList> : null}
      </AttributeValue>

      <AttributeLabel>Cross references</AttributeLabel>
      <AttributeValue>
        {crossReferences && crossReferences.length ? (
          <CrossReferenceList crossReferences={crossReferences} />
        ) : null}
      </AttributeValue>

      <AttributeLabel>References</AttributeLabel>
      <AttributeValue>
        {references && references.length ? (
          <CollapsibleList>
            {references.map((ref) => (
              <ExternalLink
                key={ref.referenceID || ref.curie}
                href={ref.url || `https://pubmed.ncbi.nlm.nih.gov/${ref.referenceID?.replace('PMID:', '')}`}
              >
                {ref.referenceID || ref.shortCitation}
              </ExternalLink>
            ))}
          </CollapsibleList>
        ) : null}
      </AttributeValue>
    </>
  );
};

VariantSummaryCuration.propTypes = {
  variantId: PropTypes.string,
  variant: PropTypes.object.isRequired,
  allele: PropTypes.shape({
    gene: PropTypes.any,
    species: PropTypes.any,
  }),
};

export default VariantSummaryCuration;

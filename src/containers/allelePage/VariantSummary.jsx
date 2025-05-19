import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import { CollapsibleList } from '../../components/collapsibleList';
import { VariantJBrowseLink } from '../../components/variant';
import ExternalLink from '../../components/ExternalLink.jsx';
import DataSourceLink from '../../components/dataSourceLink.jsx';
import { sectionAnchor } from './AlleleMolecularConsequences.jsx';
import Sequence from './Sequence.jsx';
import getVariantGenomeLocation from './getVariantGenomeLocation';

function formatLocation(location) {
  const {chromosome = '', start = '', end = ''} = location || {};
  return (start !== end) ? `${chromosome}:${start}-${end}` : `${chromosome}:${start}`;
}

const VariantSummary = ({variant}) => {
  const {
    id: variantId,
    symbol,
    species, // TODO (not available in API yet)
    displayName,
    variantType: type,
    gene: overlap, // TODO (not available in API yet)
    location,
    nucleotideChange,
    consequence,
    hgvsG,
    hgvsC,
    hgvsP,
    publications,
    crossReferenceMap,
    notes,
  } = variant || {};

  const genomeLocation = getVariantGenomeLocation(variant);
  console.log(species);
  return (
    <>
      <AttributeLabel>Symbol</AttributeLabel>
      <AttributeValue>
        {
          location &&
          <VariantJBrowseLink
            geneLocation={genomeLocation}
            location={location}
            species={species && species.name}
            type={type && type.name}
	    taxonid={species && species.taxonId}
          >
            <span className="text-break">{symbol || displayName || variantId}</span>
          </VariantJBrowseLink>
        }
      </AttributeValue>

      <AttributeLabel>Category</AttributeLabel>
      <AttributeValue>Variant</AttributeValue>

      <AttributeLabel>Variant type</AttributeLabel>
      <AttributeValue>{type && type.name && type.name.replace(/_/g, ' ')}</AttributeValue>

      <AttributeLabel>Overlaps</AttributeLabel>
      <AttributeValue>
        {overlap && <Link to={`/gene/${overlap.id}`}>{overlap.symbol}</Link>}
      </AttributeValue>

      <AttributeLabel>Location</AttributeLabel>
      <AttributeValue>
        {formatLocation(location)}{' '}
        {
          /*
          <small>
            <a href='#'>Highlight in browser</a>
          </small>
          */
        }
      </AttributeValue>

      <AttributeLabel>Nucleotide Change</AttributeLabel>
      <AttributeValue>
        {
          nucleotideChange && nucleotideChange.length > 300 ?
            <Sequence
              sequence={nucleotideChange || ''}
              renderLink={
                (handleToggle) => (
                  <button className="btn btn-link p-0" onClick={handleToggle} type="button">
                    Show sequence
                  </button>
                )
              }
            /> :
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
        }
      </AttributeValue>

      <AttributeLabel>Most Severe Consequence</AttributeLabel>
      <AttributeValue>
        {
          consequence ?
            <>
              <CollapsibleList collapsedSize={10}>
                {consequence && consequence.replace(/_/g, ' ').split(',')}
              </CollapsibleList>

              <HashLink
                to={sectionAnchor(variant)}
                className="btn btn-link btn-sm p-0"
              >
                See all consequences
              </HashLink>

            </> :
            null
        }
      </AttributeValue>

      <AttributeLabel>HGVS.g name</AttributeLabel>
      <AttributeValue>
        {
          hgvsG && hgvsG.length ?
            <CollapsibleList>
              {hgvsG}
            </CollapsibleList> :
            null
        }
      </AttributeValue>

      <AttributeLabel>HGVS.c name</AttributeLabel>
      <AttributeValue>
        {
          hgvsC && hgvsC.length ?
            <CollapsibleList>
              {hgvsC}
            </CollapsibleList> :
            null
        }
      </AttributeValue>

      <AttributeLabel>HGVS.p name</AttributeLabel>
      <AttributeValue>
        {
          hgvsP && hgvsP.length ?
            <CollapsibleList>
              {hgvsP}
            </CollapsibleList> :
            null
        }
      </AttributeValue>

      <AttributeLabel>Synonyms</AttributeLabel>
      <AttributeValue>{/* <em>rs##</em> */}</AttributeValue>

      <AttributeLabel>Notes</AttributeLabel>
      <AttributeValue>
        {
          notes && notes.length ?
            <CollapsibleList>
              {notes.map(note => note.note)}
            </CollapsibleList> :
            null
        }
      </AttributeValue>

      <AttributeLabel>Cross references</AttributeLabel>
      <AttributeValue>
        {
          crossReferenceMap && crossReferenceMap.primary ? <DataSourceLink reference={ crossReferenceMap.primary} /> : null
        }
      </AttributeValue>

      <AttributeLabel>References</AttributeLabel>
      <AttributeValue>
        {
          publications && publications.length ?
            <CollapsibleList>
              {publications.map(({id, url}) => <ExternalLink key={id} href={url}>{id}</ExternalLink>)}
            </CollapsibleList> :
            null
        }
      </AttributeValue>
    </>
  );
};

VariantSummary.propTypes = {
  variantId: PropTypes.string,
  variant: PropTypes.object.isRequired,
  allele: PropTypes.shape({
    gene: PropTypes.any,
    species: PropTypes.any
  })
};

export default VariantSummary;

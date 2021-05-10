import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import { CollapsibleList } from '../../components/collapsibleList';
import { DownloadButton } from '../../components/dataTable';
import Subsection from '../../components/subsection';
import NoData from '../../components/noData';
import useAllAlleleVariants from '../../hooks/useAlleleVariants';
import { VariantJBrowseLink } from '../../components/variant';
import ExternalLink from '../../components/ExternalLink';
import DataSourceLink from '../../components/dataSourceLink';
import { sectionAnchor } from './AlleleMolecularConsequences';
import Sequence from './Sequence';

function formatLocation(location) {
  const {chromosome = '', start = '', end = ''} = location || {};
  return (start !== end) ? `${chromosome}:${start}-${end}` : `${chromosome}:${start}`;
}

const AlleleVariantsSummary = ({allele, alleleId}) => {
  const {
    data
  } = useAllAlleleVariants(alleleId);

  const { gene, species } = allele;
  const { genomeLocations: geneLocations } = gene || {};
  const [geneLocation] = geneLocations || [];

  return (
    <>
      {
        data.map(variant => {
          const {
            displayName,
            variantType: type,
            gene: overlap,
            location,
            nucleotideChange,
            consequence,
            hgvsG,
            hgvsC,
            hgvsP,
            publications,
            crossReferences,
            notes,
          } = variant || {};
          return (
            <Subsection title={displayName} level={1} key={displayName}>
              <AttributeList className='mb-0'>
                <AttributeLabel>Symbol</AttributeLabel>
                <AttributeValue>
                  {
                    location &&
                    <VariantJBrowseLink
                      geneLocation={geneLocation}
                      location={location}
                      species={species && species.name}
                      type={type && type.name}
                    >
                      <span className="text-break">{displayName}</span>
                    </VariantJBrowseLink>
                  }
                </AttributeValue>

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
                    crossReferences && crossReferences.primary ? <DataSourceLink reference={ crossReferences.primary} /> : null
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
              </AttributeList>
              <Link to={`/search?q=${displayName}`}>All alleles with this variant <i className='fa fa-search' /></Link>
            </Subsection>
          );
        })
      }
      {
        data && data.length ?
          (
            <div className='mb-5'>
              <DownloadButton downloadUrl={`/api/allele/${alleleId}/variants/download`} text='Download Variants Data' />
            </div>
          ) : <NoData />
      }
    </>
  );
};

AlleleVariantsSummary.propTypes = {
  alleleId: PropTypes.string.isRequired,
  allele: {
    gene: {
      genomeLocations: PropTypes.any,
    },
    species: {
      name: PropTypes.string
    },
  }
};

export default AlleleVariantsSummary;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import { DownloadButton } from '../../components/dataTable';
import useAllAlleleVariants from '../../hooks/useAlleleVariants';
import { VariantJBrowseLink } from '../../components/variant';

function formatLocation(location) {
  const {chromosome = '', start = '', end = ''} = location || {};
  return (start !== end) ? `${chromosome}:${start}-${end}` : `${chromosome}:${start}`;
}

const VariantSummary = ({allele, alleleId}) => {
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
          } = variant || {};
          return (
            <div className='mb-3' key={displayName}>
              <strong><em>Fake data is highlighted.</em></strong>
              <h5>{displayName}</h5>
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
                <AttributeValue>{type && type.name}</AttributeValue>

                <AttributeLabel>Overlaps</AttributeLabel>
                <AttributeValue>
                  {overlap && <Link to={`/gene/${overlap.id}`}>{overlap.symbol}</Link>}
                </AttributeValue>

                <AttributeLabel>Location</AttributeLabel>
                <AttributeValue>
                  {formatLocation(location)}{' '}
                  <small>
                    <a href='#'>Highlight in browser</a>
                  </small>
                </AttributeValue>

                <AttributeLabel>Nucleotide Change</AttributeLabel>
                <AttributeValue><pre className='m-0'>{nucleotideChange}</pre></AttributeValue>

                <AttributeLabel>Most Severe Consequence</AttributeLabel>
                <AttributeValue>{consequence} <small><a href='#variant-molecular-consequences'>See all consequences</a></small></AttributeValue>

                <AttributeLabel>HGVS.g name</AttributeLabel>
                <AttributeValue>
                  <em>12:g.46493042del<br/>
                  NC_005111.4:g.46493042_46493042del<br/>
                  (Rnor_6.0)12:46493042_46493042del</em>
                </AttributeValue>

                <AttributeLabel>HGVS.c name</AttributeLabel>
                <AttributeValue><em>rna8188.1:c.52del, rna8192.1:c.52del</em></AttributeValue>

                <AttributeLabel>HGVS.p name</AttributeLabel>
                <AttributeValue><em>.1:p.Glu18SerfsTer10,.1:p.Glu18SerfsTer10, ...</em></AttributeValue>

                <AttributeLabel>Synonyms</AttributeLabel>
                <AttributeValue><em>rs##</em></AttributeValue>

                <AttributeLabel>Notes</AttributeLabel>
                <AttributeValue><em>This is a cool variant (reference##)</em></AttributeValue>

                <AttributeLabel>Cross references</AttributeLabel>
                <AttributeValue><em>RGD##</em></AttributeValue>

                <AttributeLabel>References</AttributeLabel>
                <AttributeValue><em>PMID:###</em></AttributeValue>
              </AttributeList>
              <Link to={`/search?q=${name}&category=alteration`}>All alleles with this variant <i className='fa fa-search' /></Link>
            </div>
          );
        })
      }
      <div className='mb-5'>
        <DownloadButton downloadUrl={`/api/allele/${alleleId}/variants/download`} text='Download Variants Data' />
      </div>
    </>
  );
};

VariantSummary.propTypes = {
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

export default VariantSummary;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import { DownloadButton } from '../../components/dataTable';

const VariantSummary = () => {
  return (
    <>
      <div className='mb-3'>
        <h5>Chr12:46493042_46493042del</h5>
        <AttributeList className='mb-0'>
          <AttributeLabel>Symbol</AttributeLabel>
          <AttributeValue>Chr12:46493042_46493042del</AttributeValue>

          <AttributeLabel>Variant type</AttributeLabel>
          <AttributeValue>deletion</AttributeValue>

          <AttributeLabel>Overlaps</AttributeLabel>
          <AttributeValue><Link to='/'>Cit</Link></AttributeValue>

          <AttributeLabel>Location</AttributeLabel>
          <AttributeValue>12:46493042 <small><a href='#'>Highlight in browser</a></small></AttributeValue>

          <AttributeLabel>Nucleotide Change</AttributeLabel>
          <AttributeValue><pre className='m-0'>tC&gt;t</pre></AttributeValue>

          <AttributeLabel>Most Severe Consequence</AttributeLabel>
          <AttributeValue>frameshift variant <small><a href='#'>See all consequences</a></small></AttributeValue>

          <AttributeLabel>HGVS.g name</AttributeLabel>
          <AttributeValue>
        12:g.46493042del<br/>
        NC_005111.4:g.46493042_46493042del<br/>
        (Rnor_6.0)12:46493042_46493042del
          </AttributeValue>

          <AttributeLabel>HGVS.c name</AttributeLabel>
          <AttributeValue>rna8188.1:c.52del, rna8192.1:c.52del</AttributeValue>

          <AttributeLabel>HGVS.p name</AttributeLabel>
          <AttributeValue>.1:p.Glu18SerfsTer10,.1:p.Glu18SerfsTer10, ...</AttributeValue>

          <AttributeLabel>Synonyms</AttributeLabel>
          <AttributeValue>rs##</AttributeValue>

          <AttributeLabel>Notes</AttributeLabel>
          <AttributeValue>This is a cool variant (reference##)</AttributeValue>

          <AttributeLabel>Cross references</AttributeLabel>
          <AttributeValue>RGD##</AttributeValue>

          <AttributeLabel>References</AttributeLabel>
          <AttributeValue>PMID:###</AttributeValue>
        </AttributeList>
        <Link to='/'>All alleles with this variant <i className='fa fa-search' /></Link>
      </div>
      <div className='mb-5'>
        <DownloadButton downloadUrl='' text='Download Variant Data' />
      </div>
    </>
  )
}

export default VariantSummary;

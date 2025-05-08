import React from 'react';
import ExternalLink from '../ExternalLink';

export default function MITermURL({name} = {}) {
  let url = "";
      let displayName = name.toUpperCase();
      if (name === 'mbinfo') {
        displayName = 'MBInfo';
      } else if (name === 'iid') {
        url = 'https://iid.ophid.utoronto.ca';
      } else if (name === 'ntnu') {
        url = 'https://www.ntnu.no/home';
      } else if (name === 'molecular connections') {
        displayName = 'Molecular Connections';
        url = 'https://molecularconnections.com';
      } else if (name === 'bhf-ucl') {
        url = 'https://www.ebi.ac.uk/GOA/CVI';
      } else if (name === 'uniprot knowledge base') {
        displayName = 'UniProtKB';
        url = 'https://www.uniprot.org';
      } else if (name === 'hpidb') {
        url = 'https://cales.arizona.edu/hpidb/';
      } else if (name === 'intact') {
        displayName = 'IntAct';
        url = "https://www.ebi.ac.uk/intact";
      } else if (name === 'mint') {
        url = 'https://mint.bio.uniroma2.it';
      } else if (name === 'matrixdb') {
        url = 'https://matrixdb.univ-lyon1.fr'
        displayName = 'MatrixDB';
      } else if (name === 'innatedb') {
        displayName = 'InnateDB';
        url = 'https://www.innatedb.ca';
      } else if (name === 'mpidb') {
        url = "https://www.ebi.ac.uk/intact";
      } else if (name === 'imex') {
        url = "https://www.imexconsortium.org";
      } else if (name === 'dip') {
        url = "https://dip.doe-mbi.ucla.edu/";
      }
  
      if (url === "") {
        return <span>{displayName}</span>;
      }
  
      return <ExternalLink href={url}>{displayName}</ExternalLink>
}

import React, {Component} from 'react';

const URL_GENERATORS = {
  FB: id => `http://flybase.org/reports/${id}.html`,
  MGI: id => `http://www.informatics.jax.org/marker/${id}`,
  RGD: id => `http://rgd.mcw.edu/rgdweb/report/gene/main.html?id=${id}`,
  SGD: id => `http://www.yeastgenome.org/locus/${id}/overview`,
  ZFIN: id => `https://zfin.org/${id}`,
  WB: id => `http://www.wormbase.org/species/c_elegans/gene/${id}`,
  NCBIGene: id => `https://www.ncbi.nlm.nih.gov/gene/?term=${id}`,
  UniProtKB: id => `http://www.uniprot.org/uniprot/${id}`,
  Ensembl: id => `http://www.ensembl.org/id/${id}`,
  RNAcentral: id => `http://rnacentral.org/rna/${id}`,
  HGNC: id => `http://www.genenames.org/cgi-bin/gene_symbol_report?hgnc_id=${id}`,
  PMID: id => `https://www.ncbi.nlm.nih.gov/pubmed/${id}`,
};

class DataSourceLink extends Component {
  render() {
    let linker = URL_GENERATORS[this.props.dataProvider];
    let prefix = this.props.omitPrefix ? '' : `${this.props.dataProvider}:`;
    if (!linker) {
      return <span>{prefix}{this.props.id}</span>;
    }
    return (
      <span>
        {prefix}<a href={linker(this.props.id)}>{this.props.id}</a>
      </span>
    );
  }
}

DataSourceLink.propTypes = {
  dataProvider: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  omitPrefix: React.PropTypes.bool,
};

export default DataSourceLink;

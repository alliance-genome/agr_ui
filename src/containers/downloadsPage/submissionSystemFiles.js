import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectSnapshot } from '../../selectors/metadataSelectors';
import { fetchSnapshot } from '../../actions/metadata';

import { Table } from 'reactstrap';
import LoadingSpinner from '../../components/loadingSpinner';

import style from './style.scss';
import { compareBy, compareByFixedOrder, compareAlphabeticalCaseInsensitive } from '../../lib/utils';
import { TAXON_ORDER } from '../../constants';

const humanReadableTaxon = (id) => {
  return {
    10090: 'Mus musculus',
    10116: 'Rattus norvegicus',
    559292: 'Saccharomyces cerevisiae',
    6239: 'Caenorhabditis elegans',
    7227: 'Drosophila melanogaster',
    7955: 'Danio rerio',
    9606: 'Homo sapiens',
  }[id] || id;
};

const humanReadableType = (type) => {
  return {
    DAF: 'disease annotations',
    PHENOTYPE: 'phenotype annotations',
    EXPRESSION: 'expression annotations',
    ORTHO: 'orthology',
    ALLELE: 'alleles',
    BGI: 'genes'
  }[type] || type;
};

const fileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.') + 1).toUpperCase();
};

class SubmissionSystemFiles extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSnapshot());
  }

  render() {
    const { data, loading, error } = this.props.snapshot;

    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <NotFound />;
    }

    if (!data || !Object.keys(data).length) {
      return null;
    }

    return (
      <Table size='sm'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {
            data.snapShot.dataFiles
              .sort(compareBy([
                compareByFixedOrder(TAXON_ORDER, f => 'NCBITaxon:' + f.taxonIDPart),
                compareAlphabeticalCaseInsensitive(f => humanReadableType(f.dataType))
              ]))
              .map(file => (
                <tr key={file.s3path}>
                  <td>
                    <i>{humanReadableTaxon(file.taxonIDPart)}</i> {humanReadableType(file.dataType)}
                  </td>
                  <td>
                    <a className={style.fileLink} href={`http://download.alliancegenome.org/${file.s3path}`}>
                      {fileExtension(file.s3path)}
                    </a>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </Table>
    );
  }
}

SubmissionSystemFiles.propTypes = {
  dispatch: PropTypes.func,
  snapshot: PropTypes.object,
};

const mapStateToProps = (state) => ({
  snapshot: selectSnapshot(state)
});

export default connect(mapStateToProps)(SubmissionSystemFiles);

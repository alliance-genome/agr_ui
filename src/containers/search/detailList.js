import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';
import { makeFieldDisplayName } from '../../lib/searchHelpers';
import NoData from '../../components/noData';
import { CollapsibleList } from '../../components/collapsibleList';
import SpeciesName from '../../components/SpeciesName';

const COLLAPSIBLE_FIELDS = ['collapsible_synonyms','variant.name'];

const JOIN_CHAR = ', ';

class DetailList extends Component {

  render() {
    let d = this.props.data;
    let nodes = this.props.fields.map( (field) => {
      let valueNode;
      let value = field.split('.').reduce((o,i)=>o[i], d);

      if (Array.isArray(value)) {
        if (COLLAPSIBLE_FIELDS.includes(field)) { //special handling to make cross references collapsible
          valueNode = (
            <CollapsibleList>{value.sort().map(val => <span dangerouslySetInnerHTML={{__html: val}} key={val}/>)}</CollapsibleList>
          );
        } else { //everything else just gets joined
          valueNode = <span dangerouslySetInnerHTML={{__html: value.join(JOIN_CHAR)}}/>;
        }
      } else {
        if (value && field.toLowerCase() === 'species') {
          valueNode = <SpeciesName dangerouslySetInnerHTML={{ __html: value }} />;
        } else {
          valueNode = <span dangerouslySetInnerHTML={{ __html: value }} />;
        }
      }

      if (field.toLocaleString() === 'dataProviderNote') {
        return (
          <div className={style.detailLineContainer} key={`srField.${field}`}>
            <span className={style.detailValue}>{valueNode}</span>
          </div>);
      }

      if (!value) {
        valueNode = <NoData>Not Available</NoData>;
      }

      return (
        <div className={style.detailLineContainer} key={`srField.${field}`}>
          <span className={style.detailLabel}><strong>{makeFieldDisplayName(field)}:</strong> </span>
          <span className={style.detailValue}>{valueNode}</span>
        </div>
      );
    });
    return (
      <div className={style.detailContainer}>
        {nodes}
      </div>
    );
  }

}

DetailList.propTypes = {
  collapsible: PropTypes.bool,
  data: PropTypes.object,
  fields: PropTypes.array
};

export default DetailList;

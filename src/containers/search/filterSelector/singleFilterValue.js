import CategoryLabel from '../categoryLabel';
import {
  getQueryParamWithoutPage
} from '../../../lib/searchHelpers';
import style from './style.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ExcludeLink from './excludeLink';
import FilterLink from './filterLink';


const  SingleFilterValue = ({name, queryParams, value, SEARCH_PATH, displayName}) => {
  const [ displayExclude, setDisplayExclude ] = useState(false);
  const [ strikeThroughFilter, setStrikeThroughFilter ] = useState(false);

  const toggle = () => setDisplayExclude(value.isActive ? false : !displayExclude);

  const toggleStrikeThrough = () => setStrikeThroughFilter(!strikeThroughFilter);

  let classSuffix = value.isActive ? ' active' : '';
  let _key = `fv.${name}.${value.name}`;
  let nameNode;
  if (name.match('species')) {
    nameNode = <i>{value.displayName}</i>;
  } else if (name === 'category') {
    nameNode = <CategoryLabel category={value.name} />;
  } else {
    nameNode = <span>{value.displayName}</span>;
  }
  let newQueryObj = getQueryParamWithoutPage(name, value.key, queryParams);
  let values = (<ul className={style.filterList}>{value.values.map (v =>
    (<SingleFilterValue
      key={_key + '.' + v.name}
      value={v}
      name={name}
      queryParams={queryParams}
      SEARCH_PATH={SEARCH_PATH}
    />))}
  </ul>);

  return (
    <div>
      <li
        className='nav-item'
        onMouseEnter={toggle}
        onMouseLeave={toggle}
      >
        <span className='d-flex justify-content-start align-items-center'>

          <FilterLink
            newQueryObj={newQueryObj}
            nameNode={nameNode}
            strikeThroughFilter={strikeThroughFilter}
            SEARCH_PATH={SEARCH_PATH}
            value={value}
            classSuffix={classSuffix}
          />

          <ExcludeLink
            queryObject={newQueryObj}
            value={value}
            displayExclude={displayExclude}
            SEARCH_PATH={SEARCH_PATH}
            toggleStrikeThrough={toggleStrikeThrough}
            displayName={displayName}
          />
        </span>
      </li>
      {values}
    </div>
  );
};


SingleFilterValue.propTypes = {
  name: PropTypes.string,
  queryParams: PropTypes.object,
  value: PropTypes.object,
  SEARCH_PATH: PropTypes.string,
  displayName: PropTypes.string
};

export default SingleFilterValue;

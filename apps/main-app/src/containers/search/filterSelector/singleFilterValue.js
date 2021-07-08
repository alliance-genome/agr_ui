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
  const [displayExclude, setDisplayExclude] = useState(false);
  const [strikeThroughFilter, setStrikeThroughFilter] = useState(false);

  let classSuffix = value.isActive ? ' active' : '';
  let _key = `fv.${name}.${value.name}`;
  let nameNode;
  if (name.match('species')) {
    nameNode = <i>{value.displayName}</i>;
  } else if (name === 'category') {
    nameNode = <CategoryLabel category={value.name}/>;
  } else {
    nameNode = <span>{value.displayName}</span>;
  }
  let newQueryObj = getQueryParamWithoutPage(name, value.key, queryParams);
  let values = (<ul className={style.filterList}>{value.values.map(v =>
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
        onMouseEnter={() => setDisplayExclude(!value.isActive)}
        onMouseLeave={() => setDisplayExclude(false)}
      >
        <span className='d-flex justify-content-start align-items-center'>

          <FilterLink
            newQueryObj={newQueryObj}
            nameNode={nameNode}
            strikeThroughFilter={strikeThroughFilter}
            SEARCH_PATH={SEARCH_PATH}
            value={value}
            classSuffix={classSuffix}
            setDisplayExclude={setDisplayExclude}
          />

          <ExcludeLink
            queryObject={newQueryObj}
            value={value}
            displayExclude={displayExclude}
            SEARCH_PATH={SEARCH_PATH}
            setStrikeThroughFilter={setStrikeThroughFilter}
            displayName={displayName}
            setDisplayExclude={setDisplayExclude}
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

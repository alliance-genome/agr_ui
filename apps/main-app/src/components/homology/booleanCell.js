import PropTypes from 'prop-types';
import style from './style.scss';

const BooleanCell = ({value, isTrueFunc, render}) => {
  const rendered = render ? render(value) : value;
  return (
    <td className={isTrueFunc(value) ? style.booleanTrueBackground : ''}>
      {
        typeof value === 'boolean' ? value ? 'Yes' : 'No' : rendered
      }
    </td>
  );
};

BooleanCell.propTypes = {
  isTrueFunc: PropTypes.func.isRequired,
  render: PropTypes.func,
  value: PropTypes.any,
};

export default BooleanCell;

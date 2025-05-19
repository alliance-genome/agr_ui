import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import { ORTHOLOGY_METHODS, methodCellStyle } from './constants';
import PARALOGY_METHODS from '../paralogy/methods.jsx';

const MethodCell = (props) => {
  const {
    predictionMethodsMatched,
    predictionMethodsNotMatched,
    rowKey,
    paralogy
  } = props;

  const predictionMethodsMatchedSet = new Set(predictionMethodsMatched);
  const predictionMethodsNotMatchedSet = new Set(predictionMethodsNotMatched);
  const methods = paralogy ? PARALOGY_METHODS : ORTHOLOGY_METHODS;

  return (
    <td>
      {
        methods.map( (method) => {
          let symbol, tipText;
          if (predictionMethodsMatchedSet.has(method)) {
            symbol = '\u2611';
            tipText = `Match by ${method}`;
          } else if (predictionMethodsNotMatchedSet.has(method)) {
            symbol = '\u2610';
            tipText = `No match by ${method}`;
          } else {
            symbol = '\u00a0';
            tipText = `Comparision not available on ${method}`;
          }

          const id = `${rowKey}-${method}`.replace(/[\s:]/g, '-');
          return (
            <span key={method}>
              <span id={id} style={Object.assign({fontSize: 22}, methodCellStyle)}>
                {symbol}
              </span>
              <UncontrolledTooltip delay={{show: 300, hide: 150}} placement='top' target={id}>
                {tipText}
              </UncontrolledTooltip>
            </span>
          );
        })
      }
    </td>
  );
};

MethodCell.propTypes = {
  predictionMethodsMatched: PropTypes.arrayOf(PropTypes.string),
  predictionMethodsNotMatched: PropTypes.arrayOf(PropTypes.string),
  rowKey: PropTypes.string,
  paralogy: PropTypes.bool
};

export default MethodCell;

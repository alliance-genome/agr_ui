import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import { methodHeaderCellStyle } from './constants';

const MethodLogo = ({methodKey}) => {
  const id = 'methodLogo-' + methodKey.replace(/\s/g, '-');
  return (
    <span>
      <span id={id} style={methodHeaderCellStyle}>{methodKey}</span>
      <UncontrolledTooltip delay={{hide: 150, show: 300}} placement='top' target={id}>
        {methodKey}
      </UncontrolledTooltip>
    </span>
  );
};

MethodLogo.propTypes = {
  methodKey: PropTypes.string,
};

export default MethodLogo;

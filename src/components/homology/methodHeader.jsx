import PropTypes from 'prop-types';
import MethodLogo from './methodLogo.jsx';
import { ORTHOLOGY_METHODS, methodHeaderStyle } from './constants';
import PARALOGY_METHODS from '../paralogy/methods.jsx'

const MethodHeader = ({name, paralogy}) => {
  const methods = paralogy ? PARALOGY_METHODS : ORTHOLOGY_METHODS;
  return (
  <th>
  <div>{name}</div>
  <div style={methodHeaderStyle}>{
    methods.map((methodKey) => (
      <MethodLogo key={methodKey} methodKey={methodKey} />
    ))
  }</div>
</th>)};

MethodHeader.propTypes = {
  name: PropTypes.string,
  paralogy: PropTypes.bool
};

export default MethodHeader;

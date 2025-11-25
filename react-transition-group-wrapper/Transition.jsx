import { useRef } from 'react';
import OriginalTransition from 'react-transition-group/Transition';

const Transition = ({ children, nodeRef, ...otherProps }) => {
  const ref = useRef(null);

  return (
    <OriginalTransition {...otherProps} nodeRef={nodeRef || ref}>
      {children}
    </OriginalTransition>
  );
};

export * from 'react-transition-group/Transition';
export default Transition;

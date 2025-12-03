import { useRef } from 'react';
import { CSSTransition as OriginalCSSTransition } from 'react-transition-group';

const CSSTransition = ({ children, nodeRef, ...otherProps }) => {
  const ref = useRef(null);

  return (
    <OriginalCSSTransition {...otherProps} nodeRef={nodeRef || ref}>
      {children}
    </OriginalCSSTransition>
  );
};

export * from 'react-transition-group';
export { CSSTransition };

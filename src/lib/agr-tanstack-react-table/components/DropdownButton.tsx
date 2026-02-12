import React, { useEffect, useRef } from 'react';
import CaretDownIcon from '../icons/CaretDownIcon';
import './DropdownButton.scss';

type DropdownButtonProps = {
  text?: string;
  Icon?: () => React.ReactNode;
  children?: React.ReactNode;
};

const DropdownButton: React.FC<DropdownButtonProps> = ({ text, Icon = CaretDownIcon, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && containerRef.current && event.target && !containerRef.current!.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef, isOpen]);

  return (
    <section className="dropdown-button-container" ref={containerRef}>
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {text && <span>{text}</span>}
        <Icon />
      </button>
      {isOpen && children && (
        <section className="child-wrapper" onClick={(e) => e.stopPropagation()}>
          {children}
        </section>
      )}
    </section>
  );
};

export default DropdownButton;

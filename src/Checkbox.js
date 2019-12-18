import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

const CheckBox = ({ isChecked, onChange }) => {
  const container = useRef(null);
  const checkboxBorder = useRef(null);
  const checkboxBackground = useRef(null);
  const checkboxMark = useRef(null);
  const isSwitching = useRef(false);

  useEffect(() => {
    const toggleElementCheck = element => {
      if (element.classList.contains("-unchecked")) {
        element.classList.remove("-unchecked");
      }
      element.classList.toggle("-checked");
    };

    const check = () => {
      if (container.current.classList.contains('-checked')) return;
      isSwitching.current = true;
      checkboxBackground.current.classList.add("-checked");
      toggleElementCheck(checkboxBorder.current);
      setTimeout(() => {
        toggleElementCheck(checkboxMark.current);
      }, 360);
      setTimeout(() => {
        toggleElementCheck(container.current);
      }, 400);
    };

    const unCheck = () => {
      if (container.current.classList.contains('-unchecked')) return;
      isSwitching.current = true;
      toggleElementCheck(checkboxMark.current);
      toggleElementCheck(container.current);
      setTimeout(() => {
        toggleElementCheck(checkboxBorder.current);
      }, 200);
    };

    const toggle = () => {
      if (isSwitching.current) return;
      container.current.classList.add("-animating");
      if (isChecked) {
        check();
      } else unCheck();
    };

    toggle();

  }, [isChecked]);
  const handleClick = e => {
    if (isSwitching.current) return;
    onChange(e);
  };

  const handleAnimationEnd = () => {
    isSwitching.current = false;
    if (!checkboxBorder.current.classList.contains("-checked")) {
      checkboxBackground.current.classList.remove("-checked");
    }
  };

  return (
    <svg ref={container} onClick={handleClick} xmlns="http://www.w3.org/2000/svg" className="checkbox -unchecked">
      <rect ref={checkboxBorder} onAnimationEnd={handleAnimationEnd} className="checkbox__border -unchecked" rx="2.5rem"></rect>
      <rect ref={checkboxBackground} className="checkbox__background" rx="2.5rem"></rect>
      <path
        ref={checkboxMark}
        d="M104.869 1.3L21.024 93.876.949 75.457"
        className="checkbox__check -unchecked"
      />
    </svg>
  );
};

CheckBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default CheckBox;

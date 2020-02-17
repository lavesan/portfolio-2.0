import React, { useState, useMemo, useRef, useEffect } from "react";
import { StyledDropdown, StyledSubelement } from './nav-dropdown.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default ({ elements, orientation = "right", label, onClick, onDropInfoWhenClicked, closeOnClick }) => {

  const [showDrop, setShowDrop] = useState(false);
  const [showSub, setShowSub] = useState([]);

  const dropdownRef = useRef(null);

  const [elemMeasurements, setMeasurements] = useState({
    offsetHeight: 0,
    offsetWidth: 0,
  });

  const formatedOrientation = useMemo(() => {

    if (orientation === "left") {
      return "";
    } else {
      return "-";
    }

  }, [orientation]);

  const onClickAction = (element, body) => {

    // Stops father onClick events
    element.stopPropagation();

    if (onClick) {
      onClick(body);
    }

    if (closeOnClick) {
      setShowDrop(false);
      setShowSub([]);
    }

  }

  useEffect(() => {

    setTimeout(() => {
        const { current } = dropdownRef;
    
        setMeasurements({
            offsetHeight: current.offsetHeight,
            offsetWidth: current.offsetWidth,
        });
    }, 100);

  }, []);

  /**
   *
   * @param {{ position }} param0 position - 'left' or 'right'
   */
  const SideElement = ({ position = 1, childrens = [], show }) => {

    if (childrens.length) {
      return (
        <StyledSubelement
          className="dropdown-sub-element"
          elemMeasurements={elemMeasurements}
          orientation={formatedOrientation}
          show={show}
        >
          {childrens.map(({ name, childrens, ...body }, index) => (
            <li
              className="dropdown-element"
              onMouseEnter={() => {
                if (childrens.length) {
                  setShowSub(p => [...p, { index, position: position + 1 }]);
                } else {
                  setShowSub(p => p.slice(0, position));
                }
              }}
              onClick={(e) => onClickAction(e, { name, ...body })}
              key={index}>
              <div className="dropdown-text">
                <p>{name}</p>
                <p>{childrens.length ? <FontAwesomeIcon icon={faAngleRight} /> : ''}</p>
              </div>
              <SideElement show={showSub.some(elem => elem.index === index && elem.position === position + 1)} childrens={childrens} position={position + 1} />
            </li>
          ))}
        </StyledSubelement>
      );
    } else {
      return <></>;
    }

  };

  return (
    <StyledDropdown
      elemMeasurements={elemMeasurements}
      showDropdown={showDrop && elements.length}
      onMouseEnter={() => setShowDrop(true)}
      onMouseLeave={() => {
        setShowDrop(false);
        setShowSub([]);
      }}
    >
      <p ref={dropdownRef} onClick={(e) => onClickAction(e, onDropInfoWhenClicked)} className="dropdown-input">
        {label}
      </p>
      <ul className="dropdown-list">
        {elements.map(({ name, childrens, ...body }, index) => (
          <li
            className="dropdown-element"
            onMouseEnter={() => {
              if (childrens.length) {
                setShowSub([{ index, position: 1 }]);
              } else {
                setShowSub([]);
              }
            }}
            onClick={(e) => onClickAction(e, { name, ...body })}
            key={index}
          >
            <div className="dropdown-text">
              <p>{name}</p>
              <p>{childrens.length ? <FontAwesomeIcon icon={faAngleRight} /> : ''}</p>
            </div>
            <SideElement show={showSub.some(elem => elem.index === index && elem.position === 1)} childrens={childrens} />
          </li>
        ))}
      </ul>
    </StyledDropdown>
  );

};

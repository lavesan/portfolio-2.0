import React, { useState, useMemo, useRef, useEffect } from "react";
import { StyledDropdown, StyledSubelement } from './nav-dropdown.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default ({ elements, orientation = "right", label }) => {

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
  const SideElement = ({ position = 1, childrens = [] }) => {
    const measurements = {};
    Object.assign(measurements, elemMeasurements);

    measurements.offsetWidth = measurements.offsetWidth * position;

    if (childrens.length) {
      return (
        <StyledSubelement
          className="dropdown-sub-element"
          elemMeasurements={measurements}
          orientation={formatedOrientation}
        >
          {childrens.map(({ name, childrens }, index) => (
            <li
              className="dropdown-element"
              onMouseEnter={() => {
                if (childrens.length) {
                  setShowSub(p => [...p, { index, position: position + 1 }]);
                } else {
                  setShowSub(p => p.slice(0, position));
                }
              }}
              key={index}>
              <p>{name} {childrens.length ? <FontAwesomeIcon icon={faAngleRight} /> : ''}</p>
              {showSub.find(elem => elem.index === index && elem.position === position + 1) &&
                <SideElement childrens={childrens} position={position + 1} />
              }
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
      <p ref={dropdownRef} className="dropdown-input">
        {label}
      </p>
      <ul className="dropdown-list">
        {elements.map(({ name, childrens }, index) => (
          <li
            className="dropdown-element"
            onMouseEnter={() => {
              if (childrens.length) {
                setShowSub([{ index, position: 1 }]);
              } else {
                setShowSub([]);
              }
            }}
            key={index}
          >
            <p>{name} {childrens.length ? <FontAwesomeIcon icon={faAngleRight} /> : ''}</p>
            {showSub.some(elem => elem.index === index && elem.position === 1) &&
              <SideElement childrens={childrens} />
            }
          </li>
        ))}
      </ul>
    </StyledDropdown>
  );

};

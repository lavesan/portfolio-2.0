import React, { useState, useMemo, useRef, useEffect } from "react";
import { StyledDropdown, StyledSubelement } from './nav-dropdown.styles';

const exampleElements = [
  {
    name: "Elemento 1",
    id: 1,
    childrens: []
  },
  {
    name: "Elemento 2",
    id: 2,
    childrens: [
      {
        name: "Subelemento 1",
        id: 1,
        childrens: []
      },
      {
        name: "Subelemento 2",
        id: 2,
        childrens: []
      }
    ]
  },
  {
    name: "Elemento 3",
    id: 3,
    childrens: []
  },
  {
    name: "Elemento 4",
    id: 4,
    childrens: [
      {
        name: "Subelemento 1",
        id: 1,
        childrens: []
      },
      {
        name: "Subelemento 2",
        id: 2,
        childrens: []
      },
      {
        name: "Subelemento 3",
        id: 3,
        childrens: []
      }
    ]
  }
];

export default ({ elements, orientation = "left", label }) => {
  const [showDrop, setShowDrop] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [onSub, setOnSub] = useState(false);
  const [onDrop, setOnDrop] = useState(false);

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
          onMouseEnter={() => setOnSub(true)}
          onMouseLeave={() => {
            setOnSub(false);
            if (!onDrop) {
              setShowDrop(false);
              setShowSub(false);
            }
          }}
        >
          {childrens.map(({ name, childrens }) => (
            <li className="dropdown-element">
              <p>{name}</p>
              <SideElement childrens={childrens} position={position + 1} />
            </li>
          ))}
        </StyledSubelement>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <StyledDropdown
        elemMeasurements={elemMeasurements}
        showDropdown={showDrop}
        onMouseEnter={() => {
          setOnDrop(true);
          setShowDrop(true);
        }}
        onMouseLeave={() => {
          setOnDrop(false);
          if (!onSub) {
            setShowSub(false);
            setShowDrop(false);
          }
        }}
      >
        <p ref={dropdownRef} className="dropdown-input">
          {label}
        </p>
        <ul className="dropdown-list">
          {elements.map(({ name, childrens }) => (
            <>
              <li
                className="dropdown-element"
                onMouseEnter={() => {
                  setShowSub(false);
                  setOnDrop(true);
                }}
                onMouseLeave={() => {
                  setOnDrop(false);
                }}
              >
                <p>{name}</p>
                <SideElement childrens={childrens} />
              </li>
            </>
          ))}
        </ul>
      </StyledDropdown>
    </>
  );
};

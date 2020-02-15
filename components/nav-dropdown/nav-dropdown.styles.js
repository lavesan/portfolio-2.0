import styled, { css, keyframes } from "styled-components";

const simpaticMargin = keyframes`
  0% {
    top: 23px;
  }

  50% {
    top: 28px;
  }

  100% {
    top: 23px;
  }
`;

export const StyledDropdown = styled.div`
  ${({ showDropdown, elemMeasurements, theme }) => css`
    cursor: pointer;
    position: relative;

    p {
      margin: 0;
    }

    .dropdown-input {
      background-color: ${showDropdown ? theme.green.terciary : 'transparent'};
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      color: #fff;
    }
    .dropdown-list {
      background-color: #fff;
      border-radius: 3px;
      box-shadow: 0 2px 4px 1px #aaa;
      display: ${showDropdown ? "block" : "none"};
      list-style-type: none;
      padding-inline-start: 0;
      position: absolute;
      top: 23px;
      width: ${elemMeasurements.offsetWidth}px;

      ${showDropdown &&
        css`
          animation: ${simpaticMargin} 0.2s linear 1;
        `}

      .dropdown-element {
        padding: 10px;
        display: flex;
        background-color: #fff;
        justify-content: space-between;
        position: relative;

        :last-child {
          border-bottom-right-radius: 3px;
          border-bottom-left-radius: 3px;
        }
      }

      .dropdown-element:hover {
        background-color: ${theme.green.terciary};
        color: #fff;
      }
    }
  `}
`;

export const StyledSubelement = styled.div`
  ${({ elemMeasurements, orientation }) => css`
    width: ${elemMeasurements.offsetWidth}px;
    position: absolute;
    right: ${orientation}${elemMeasurements.offsetWidth}px;
    top: 0;
    border-radius: 3px;
    box-shadow: 2px 2px 4px 1px #aaa;
    list-style-type: none;
    padding-inline-start: 0;
    color: #000;
    > :hover {
      color: #fff;
    }
  `}
`;
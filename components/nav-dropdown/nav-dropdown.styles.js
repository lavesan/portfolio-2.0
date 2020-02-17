import styled, { css, keyframes } from "styled-components";

const simpaticMargin = keyframes`
  0% {
    top: 15px;
  }

  50% {
    top: 20px;
  }

  100% {
    top: 15px;
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
      padding: 5px 10px;
      color: #fff;

      :hover {
        background-color: ${theme.green.terciary};
      }
    }
    .dropdown-list {
      background-color: #fff;
      border-radius: 3px;
      display: ${showDropdown ? "block" : "none"};
      list-style-type: none;
      padding-inline-start: 0;
      position: absolute;
      font-size: .8rem;
      top: 15px;
      width: ${elemMeasurements.offsetWidth + 20}px;
      z-index: 2;

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

        .dropdown-text {
          width: 100%;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
        }

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

export const StyledSubelement = styled.ul`
  ${({ elemMeasurements, orientation, show }) => css`
    display: ${show ? 'block' : 'none'};
    width: ${elemMeasurements.offsetWidth + 20}px;
    position: absolute;
    z-index: 2;
    right: ${orientation}${elemMeasurements.offsetWidth + 20}px;
    top: 0;
    border-radius: 3px;
    list-style-type: none;
    padding-inline-start: 0;
    color: #000;

    > :hover {
      color: #fff;
    }
  `}
`;
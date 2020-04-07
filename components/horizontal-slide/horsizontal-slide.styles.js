import styled, { css } from "styled-components";

export const StyledHorizontalSlide = styled.div`
  ${({ actual, activateTransition }) => css`
    display: flex;
    flex-flow: row nowrap;
    transform: translate(-${actual}px);
    user-select: none;
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none;

    ${activateTransition && css`
      transition: transform .3s;
    `}
  `}
`;
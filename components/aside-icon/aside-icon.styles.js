import styled, { css } from 'styled-components';

export const StyledAsideIcon = styled.div`
${({ theme }) => css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
    color: ${theme.green.primary};

    .header-action-icon {
        font-size: 1.1rem;
        margin-right: 10px;
    }
    
    .header-action-text {
        font-size: 1rem;
    }
`}
`

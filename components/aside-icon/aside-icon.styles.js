import styled, { css } from 'styled-components';

export const StyledAsideIcon = styled.div`
${({ theme }) => css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    position: relative;
    cursor: pointer;
    
    .header-action-icon {
        font-size: 1.1rem;
        margin-right: 10px;
        color: ${theme.green.quaternary};
    }
    
    .header-action-text {
        font-size: 1rem;
        color: ${theme.gray.secondary};
    }
`}
`

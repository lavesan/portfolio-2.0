import styled, { css } from 'styled-components';
import Select from 'react-select';

export const StyledOrderFormSelectField = styled.div`
    ${({ theme }) => css`
        color: ${theme.gray.secondary};
        display: flex;
        flex-flow: column nowrap;
        height: 90px;

        label {
            font-size: .9rem;
            margin-bottom: 10px;
        }

        .error-message {
            color: ${theme.danger.primary};
        }
    `}
`;

export const StyledOrderFormSelect = styled(Select)`
    ${({ theme }) => css`
        > * {
            background-color: ${theme.gray.terciary} !important;
            border-color: ${theme.gray.terciary} !important;
            cursor: pointer !important;
        }

        > :last-child * *:hover {
            color: ${theme.green.primary};
            background-color: ${theme.green.penternary};
        }
    `}
`;

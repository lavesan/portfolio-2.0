import styled, { css } from 'styled-components';

export const StyledSchedulerStepForm = styled.section`
    ${({ theme, isResponsive }) => css`

        > * {
            width: 50%;
        }

        > :first-child {
            margin-right: 10px;
        }

        .scheduler-form-container {
            display: flex;
            flex-flow: row nowrap;
            width: 100%;

            > * {
                width: 50%;
            }

            h3 {
                font-size: 1rem;
                font-weight: 500;
            }

            .responsive-picker-container {
                width: 70%;
            }

            .scheduler-form-container--time-form {
                margin-left: 20px;
            }

        }

        .react-calendar {
            background-color: ${theme.gray.terciary};
            border: none;
            border-radius: 5px;
            padding: 10px;

            .react-calendar__navigation > * {
                background: none !important;
                color: ${theme.gray.secondary} !important;
                border: none !important;
                cursor: pointer !important;
            }

            .react-calendar__month-view__weekdays__weekday {
                text-align: center !important;
                > * {
                    text-decoration: none !important;
                }
            }

            .react-calendar__tile {
                cursor: pointer;
                border: none;
                background: none;
                height: 31px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .react-calendar__tile--active,
            .react-calendar__tile--active:hover,
            .react-calendar__month-view__days__day abbr:hover {
                background-color: transparent;
                color: ${theme.green.primary} !important;
            }

            .react-calendar__tile--active abbr,
            .react-calendar__month-view__days__day:hover abbr {
                padding: 7px 8px;
                background-color: ${theme.green.penternary} !important;
                border-radius: 50%;
            }

            .react-calendar__month-view__days__day {
                color: ${theme.gray.secondary};
                background-color: transparent;
            }

            .react-calendar__tile--now abbr {
                background-color: ${theme.warning.primary} !important;
            }

            .react-calendar__month-view__days__day abbr {
                padding: 7px 8px;
                border-radius: 50%;
                background-color: transparent;
            }
        }

        ${isResponsive && css`
            .scheduler-form-container {
                flex-direction: column;

                .scheduler-form-container--time-form {
                    margin-top: 20px;
                }

                > * {
                    width: 100%;
                }
            }

            > * {
                width: 100%;
            }
        `}

    `}
`;

const SET_SHOW_HEADER_AND_FOOTER = 'SET_SHOW_HEADER_AND_FOOTER';
const SET_ACTUAL_ROUTE = 'SET_ACTUAL_ROUTE';

export const setShowHeaderAndFooter = ({
    showHeader,
    showFooter,
    applyPageStyle,
}) => ({
    type: SET_SHOW_HEADER_AND_FOOTER,
    showHeader,
    showFooter,
    applyPageStyle,
})

export const setActualRoute = actualRoute => ({
    type: SET_ACTUAL_ROUTE,
    actualRoute,
})

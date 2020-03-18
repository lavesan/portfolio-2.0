const SET_SHOW_HEADER_AND_FOOTER = 'SET_SHOW_HEADER_AND_FOOTER';

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

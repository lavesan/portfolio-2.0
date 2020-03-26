import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { StyledSpinner } from './load-icon.styles';

export default (props) => (
    <StyledSpinner
        icon={faSpinner}
        {...props} />
)

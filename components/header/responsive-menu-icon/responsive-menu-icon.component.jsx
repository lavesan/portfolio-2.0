import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { toggleResponsiveMenu } from '../../../store/actions/responsiveActions';
import { StyledResponsiveMenu } from './responsive-menu-icon.styles';

const ResponsiveMenuIcon = ({ dispatch }) => {

    const toogleMenu = () => {
        dispatch(toggleResponsiveMenu());
    }

    return (
        <StyledResponsiveMenu>
            <div className="responsive-icon-menu" onClick={toogleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </StyledResponsiveMenu>
    )

}

export default connect()(ResponsiveMenuIcon);

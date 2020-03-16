import React from 'react';
import { connect } from 'react-redux';

import { StyledEntrarPage } from './entrar.styles';
import { setSelectedForm } from '../../store/actions/authActions';
import { LoginFormComponent } from './login-form';

const EntrarPage = ({ dispatch, selectedForm }) => {

    const changeSelectedForm = (selectedForm) => {
        dispatch(setSelectedForm(selectedForm));
    }

    return (
        <StyledEntrarPage>
            {selectedForm === 'login'
                ? <LoginFormComponent />
                : <LoginFormComponent />
            }
        </StyledEntrarPage>        
    )

}

const mapStateToProps = store => ({
    selectedForm: store.authState.selectedForm,
})

export default connect(mapStateToProps)(EntrarPage);

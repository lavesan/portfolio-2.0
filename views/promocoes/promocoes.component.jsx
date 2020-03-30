import React from 'react';
import { connect } from 'react-redux';

import { StyledPromocoesPage } from './promocoes.styles';

const PromocoesPage = ({ promotions, promotionalProducts, selectedPromotion, dispatch }) => {

    return (
        <StyledPromocoesPage>

        </StyledPromocoesPage>
    )

}

const mapStateToProps = store => ({
    promotionalProducts: store.productState.promotionalProducts,
    promotions: store.productState.promotions,
    selectedPromotion: store.productState.selectedPromotion,
})

export default connect(mapStateToProps)(PromocoesPage);

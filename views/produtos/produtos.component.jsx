import React from 'react';
import { connect } from 'react-redux';

import { StyledProdutosPage } from './produtos.styles';
import { StyledSuccessLink } from '../../components/button';
import produtoNaoAchado from '../../public/static/imgs/produto-não-achado.png';

const ProdutosPage = ({ dispach }) => {

    const notFoundProductText = 'Eita! Este produto não foi encontrado :(';

    return (
        <StyledProdutosPage>
            <div className="not-found-row">
                <h2>{notFoundProductText}</h2>
                <p>Mas você pode nos mandar mensagem no Whatsapp para vermos se conseguimos te ajudar!</p>
                <img src={produtoNaoAchado} alt="Produto não encontrado" />
                <StyledSuccessLink href="https://wa.me/5581994122409">
                    Falar com a gente no Whatsapp
                </StyledSuccessLink>
            </div>
        </StyledProdutosPage>
    )

}

export default connect()(ProdutosPage);

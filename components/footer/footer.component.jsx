import React from 'react';

import { StyledFooter } from './footer.styles';

export default () => {
    return (
        <StyledFooter>
            <section className="footer-info">
                <div>
                    <h3>Sobre nós</h3>
                    <p>dnaodnewcmirbibigdsbguidsbgcus,cg</p>
                    <p>
                        <strong>Nossas redes sociais</strong>
                    </p>
                </div>
                <div>
                    <h3>Política de privacidade</h3>
                    <p>dnaodnewcmirbibigdsbguidsbgcus,cg</p>
                </div>
                <div>
                    <h3>Fale conosco</h3>
                    <div>
                        <p>(81) 99999-9999</p>
                    </div>
                    <div>
                        <p>mail@gmail.com</p>
                    </div>
                </div>
            </section>
            <section className="footer-cards">
                <p>Zero veneno</p>
                <p>Um moi de imagem ae</p>
            </section>
        </StyledFooter>
    )
}
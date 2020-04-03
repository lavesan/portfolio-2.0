import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

import { TalToUsCompoent } from './talk-to-us';
import { StyledFooter } from './footer.styles';
import { toggleTermOfContractModal } from '../../store/actions/modalActions';

const FooterComponent = ({ dispatch }) => {
    
    const aboutText = 'Somos uma pequena empresa de produção e comércio de hortaliças orgânicas certificada pela IMO control, cuja filosofia é levar orgânicos com carinho, qualidade e simplicidade a preço acessível para todos.Também dispomos de ovos orgânicos e de grãos, oleaginosas, chás e temperos a granel (apenas naturais, não orgânicos).';

    const openTermOfContract = () => {
        dispatch(toggleTermOfContractModal());
    }

    return (
        <StyledFooter>
            <section className="footer-responsive-info">
                <h3>Links úteis</h3>
                <Link href="/sobre">
                    <a className="util-link">Sobre nós</a>
                </Link>
                <p onClick={openTermOfContract}>Termos de uso</p>
                <div>
                    <a
                        title="Instagram"
                        className="social-link"
                        href="https://instagram.com/zero_veneno?igshid=ume3v34g4kjd"
                        target="_blank"
                        rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
                <h3>Fale conosco</h3>
                <TalToUsCompoent
                    icon={faWhatsapp}
                    className="contact-link"
                    href="https://wa.me/5581994122409"
                    value="(81) 99412-2409"
                    title="Falar pelo whatsapp" />
                <TalToUsCompoent
                    icon={faEnvelope}
                    className="contact-link"
                    href="mailto:zerovenenoorganicos@gmail.com"
                    value="zerovenenoorganicos@gmail.com"
                    title="Enviar mensagem" />
                <h3>Endereço</h3>
                <p className="address-text">Nossa propriedade localiza-se em Ribeirão-PE, e a loja localiza-se na Avenida Domingos Ferreira, 1933, em Boa Viagem, Recife-PE</p>
            </section>
            <section className="footer-info">
                <div>
                    <h3>Sobre nós</h3>
                    <p>{aboutText}</p>
                    <p>
                        <strong>Nossas redes sociais</strong>
                    </p>
                    <div className="social-media-container">
                        <a
                            title="Instagram"
                            href="https://instagram.com/zero_veneno?igshid=ume3v34g4kjd"
                            target="_blank"
                            rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        {/* <p title="Facebook"><FontAwesomeIcon icon={faFacebook} /></p> */}
                    </div>
                </div>
                <div>
                    <h3>Política de privacidade</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia mollitia ducimus totam, animi, modi iusto numquam officia earum id eligendi blanditiis neque distinctio. Repellat quas eligendi, dolores omnis reprehenderit eum!</p>
                </div>
                <div>
                    <h3>Fale conosco</h3>
                    <div className="whatsapp-container">
                        <TalToUsCompoent
                            icon={faWhatsapp}
                            href="https://wa.me/5581994122409"
                            value="(81) 99412-2409"
                            title="Falar pelo whatsapp" />
                    </div>
                    <div>
                        <TalToUsCompoent
                            icon={faEnvelope}
                            href="mailto:zerovenenoorganicos@gmail.com"
                            value="zerovenenoorganicos@gmail.com"
                            title="Enviar mensagem" />
                    </div>
                </div>
            </section>
            <section className="footer-cards">
                <p className="enterprise-name">Zero veneno</p>
                <div></div>
            </section>
        </StyledFooter>
    )
}

export default connect()(FooterComponent);

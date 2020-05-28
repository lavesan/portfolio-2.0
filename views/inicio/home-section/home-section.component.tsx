import React, { useState } from 'react';
import Typing from "react-typing-animation";
import { BounceWordAnimation } from '../../../components/bounce-word';
import { goToSection } from '../../../helpers/location.helpers';

import { StyledHomeSection } from './home-section.styles';

export default () => {

    const [typingAnimation, setTypingAnimation] = useState({
        0: true,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    });

    const name                      = Array.from('Valdery Paes');
    const service                   = Array.from('Desenvolvedor de sites/aplicativos');
    const role                      = Array.from('full-stack');

    const paragraphStart            = Array.from('<p>');
    const paragraphEnd              = Array.from('</p>');
    const headingStart              = Array.from('<h1>');
    const headingEnd                = Array.from('</h1>');

    const typingSpeed               = 100;

    const activateTypingAnimation = (step: number) => {
        setTypingAnimation(f => ({ ...f, [step]: true }));
    }

    return (
        <StyledHomeSection>
            {/* <InicioBackgroundAnimation /> */}
            <div style={{ height: 20 }}>
                <Typing onFinishedTyping={() => activateTypingAnimation(1)} speed={typingSpeed} cursorClassName="introduction-section--info--cursor">
                    <span className="introduction-section--info--typed-tag">
                        {paragraphStart.map((word, index) => <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}
                    </span>
                </Typing>
            </div>
            <p className="introduction-section--info--name">
                {name.map((word, index) => <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}
            </p>
            <div style={{ height: 40 }}>
                {typingAnimation[1] && (
                    <Typing onFinishedTyping={() => activateTypingAnimation(2)} speed={typingSpeed} cursorClassName="introduction-section--info--cursor">
                        <span className="introduction-section--info--typed-tag">
                            {paragraphEnd.map((word, index) => <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}
                        </span>
                    </Typing>
                )}
                {typingAnimation[2] && (
                    <Typing onFinishedTyping={() => activateTypingAnimation(3)} speed={typingSpeed} cursorClassName="introduction-section--info--cursor">
                        <span className="introduction-section--info--typed-tag">
                            {headingStart.map((word, index) => <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}
                        </span>
                    </Typing>
                )}
            </div>
            <h1>{service.map((word, index) =>
                <>
                    <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>
                    {index === 22 && <br className="break-on-responsive" />}
                </>
            )}</h1>
            <div style={{ height: 40 }}>
                {typingAnimation[3] && (
                    <Typing onFinishedTyping={() => activateTypingAnimation(4)} speed={typingSpeed} cursorClassName="introduction-section--info--cursor">
                        <span className="introduction-section--info--typed-tag">
                            {headingEnd.map((word, index) => <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}
                        </span>
                    </Typing>

                )}
                {typingAnimation[4] && (
                    <Typing onFinishedTyping={() => activateTypingAnimation(5)} speed={typingSpeed} cursorClassName="introduction-section--info--cursor">
                        <span className="introduction-section--info--typed-tag">
                            {paragraphStart.map((word, index) => <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}
                        </span>
                    </Typing>
                )}
            </div>
            <p>{role.map((word, index) => <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}</p>
            <div style={{ height: 20 }}>
                {typingAnimation[5] && (
                    <Typing speed={typingSpeed} cursorClassName="introduction-section--info--cursor">
                        <span className="introduction-section--info--typed-tag">
                            {paragraphEnd.map((word, index) => <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}
                        </span>
                    </Typing>
                )}
            </div>
            <div className="introduction-section--info--buttons-container">
                <button
                    type="button"
                    className="submit-button"
                    onClick={() => goToSection('contato')}>
                    Me contacte
                </button>
                <button
                    type="button"
                    className="submit-button"
                    onClick={() => goToSection('projetos')}>
                    Meus projetos
                </button>
            </div>
        </StyledHomeSection>
    )

}

import React, { useState } from 'react';

import { StyledBounceWord } from './bounce-word.styles';
import { IBounceWord } from './bounce-word.interfaces';

export default ({ children, activateOnClick, ...attrs }: IBounceWord & React.HTMLAttributes<HTMLSpanElement>) => {

    const [activate, setActivate] = useState<boolean>(false);

    const activateAnimation = () => {

        if (!activate) {
            setActivate(true)
            setTimeout(() => {
                setActivate(false)
            }, 500)
        }

    }

    return (
        <>
            {!children?.toString() || children?.toString() === ' '
                ? <>&nbsp;</>
                : <StyledBounceWord
                    activate={activate}
                    onMouseEnter={activateAnimation}
                    onTouchStart={activateAnimation}
                    {...attrs}>
                    {children}
                </StyledBounceWord>
            }
        </>
    )

}

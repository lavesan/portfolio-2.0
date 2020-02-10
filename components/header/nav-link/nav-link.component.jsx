import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

import { StyledNavLink } from './nav-link.styles';

export default ({ href, text }) => {

    const router = useRouter();

    const isActive = () => {
        return router.pathname == href;
    }

    return (
        <Link href={href}>
            <StyledNavLink className={isActive() ? 'active-route' : ''}>{text}</StyledNavLink>    
        </Link>
    )
}

import Link from 'next/link';

import { StyledNavLink } from './nav-link.styles';

export default ({ href, text }) => (
    
    <Link href={href}>
        <StyledNavLink>{text}</StyledNavLink>    
    </Link>
)

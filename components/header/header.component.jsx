import Link from 'next/link';

import { StyledHeader } from './header.styles';

export default function HeaderComponent() {

    return (
        <StyledHeader>
            <Link href="/about">
                Link ae
            </Link>
            <h1>Vamu ver bixo</h1>
        </StyledHeader>
    )

}
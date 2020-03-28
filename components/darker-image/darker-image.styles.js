import styled from 'styled-components';

export default styled.div`
    background:
        linear-gradient(
            rgba(0, 0, 0, 0.1), 
            rgba(0, 0, 0, 0.1)
        ), url(${({ src }) => src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
`

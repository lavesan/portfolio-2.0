import React from 'react';

import { StyledSuccessButton } from './button.styles';

export default class ButtonComponent extends React.Component {

    state = {
        loadingText: 'Carregando',
    }

    constructor(props) {
        super(props);

        this.state = {
            loadingText: 'Carregando',
        }
    }

    async intervalFunc() {

        const texto = this.state.loadingText.match(/\.{1,3}$/);
        const caracteres = this.state.loadingText.match(/^[^.]+/);

        if (!texto) {
            await this.setState({ loadingText: `${this.state.loadingText}.` });
        } else if (String(texto).length >= 3) {
            await this.setState({ loadingText: `${caracteres}` });
        } else {
            await this.setState({ loadingText: `${caracteres}${texto}.` });
        }

        if (this.props.loading) {
            this.timeoutRef = setTimeout(() => this.intervalFunc(), 700);
        }

    }
    
    componentWillReceiveProps(props) {

        if (props.loading) {
            this.timeoutRef = setTimeout(() => this.intervalFunc(this), 700);
        } else {
            clearTimeout(this.timeoutRef);
        }

    }

    componentWillUnmount() {
        clearTimeout(this.timeoutRef);
    }

    render() {

        const { disabled, loading, text, ...props } = this.props;

        return (
            <>
                {loading
                    ? <StyledSuccessButton disabled={disabled || loading} {...props}>{this.state.loadingText}</StyledSuccessButton>
                    : <StyledSuccessButton disabled={disabled} {...props}>{text}</StyledSuccessButton>
                }
            </>
        )

    }

}

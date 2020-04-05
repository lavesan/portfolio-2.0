import React from 'react';
import { connect } from 'react-redux';
import Lottie from 'react-lottie'

import { StyledFullScreenLoading } from './full-screen-loading.styles';
import loadingAnimation from '../../public/static/loading-loop-animated.json';

const FullScreenLoading = ({ showFullLoading }) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <StyledFullScreenLoading show={showFullLoading}>
            <div className="loading-animated">
                <Lottie options={defaultOptions}
                    height={150}
                    width={150}
                    isPaused={!showFullLoading}
                />
                <b>Carregando...</b>
            </div>
        </StyledFullScreenLoading>
    )

}

const mapStateToProps = store => ({
    showFullLoading: store.loadingState.showFullLoading,
});

export default connect(mapStateToProps)(FullScreenLoading)

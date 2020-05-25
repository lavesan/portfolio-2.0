import React, { useMemo } from 'react';
import { motion, MotionStyle } from 'framer-motion';
import { connect, ConnectedProps } from 'react-redux';

import { StyledBlogSection } from './blog-section.styles';
import { ISection } from '../inicio.interfaces';
import { BlogCardComponent } from '../../../components/blog-card';
import { IReduxStates } from '../../../store/types';
import blogsJSON from '../../../public/static/blogs.json';

const mapStateToProps = (store: IReduxStates) => ({
    screenWidth: store.uiState.screenWidth,
});

const connector = connect(mapStateToProps);

const BlogSectionComponent = ({ triggerAnimation, initialLeftStyle, initialRightStyle, animationStyle, animationTransition, screenWidth }: ISection & ConnectedProps<typeof connector>) => {

    const isResponsive = useMemo(
        () => {
            return screenWidth <= 850;
        },
        [screenWidth]
    )

    const fromAnimation = (index: number): MotionStyle => {
        return index % 2 === 0
            ? initialLeftStyle
            : initialRightStyle;
    }

    return (
        <StyledBlogSection>
            {blogsJSON.map((blog, index) => (
                <motion.div
                    key={blog.id}
                    initial={fromAnimation(index)}
                    animate={triggerAnimation ? animationStyle : fromAnimation(index)}
                    transition={animationTransition}
                    className="blog-container">
                    <BlogCardComponent isResponsive={isResponsive} {...blog} />
                </motion.div>
            ))}

        </StyledBlogSection>
    )

}

export default connector(BlogSectionComponent);

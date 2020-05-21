import React from 'react';
import { motion, MotionStyle } from 'framer-motion';

import { StyledBlogSection } from './blog-section.styles';
import { ISection } from '../inicio.interfaces';
import { BlogCardComponent } from '../../../components/blog-card';
import blogsJSON from '../../../public/static/blogs.json';

export default ({ triggerAnimation, initialLeftStyle, initialRightStyle, animationStyle, animationTransition }: ISection) => {

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
                    transition={animationTransition}>
                    <BlogCardComponent {...blog} />
                </motion.div>
            ))}

        </StyledBlogSection>
    )

}

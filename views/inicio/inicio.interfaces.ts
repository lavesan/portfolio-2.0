import React, { RefObject } from 'react';
import { Transition } from 'framer-motion';

export interface IShowSections {
    about: boolean,
    projects: boolean,
    blogs: boolean,
    contact: boolean,
}

export interface ISection {
    triggerAnimation: boolean;
    initialLeftStyle: any;
    initialRightStyle: any;
    animationStyle: any;
    animationTransition: Transition;
}

export interface ISectionReferences {
    about: HTMLTableSectionElement | null,
    projects: HTMLTableSectionElement | null,
    blogs: HTMLTableSectionElement | null,
    contact: HTMLTableSectionElement | null,
}

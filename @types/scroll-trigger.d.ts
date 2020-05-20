import React from 'react';

interface IScrollTriggerProps {
    onEnter: VoidFunction;
    onExit: VoidFunction;
    children: React.ReactNode;
}

declare module 'react-scroll-trigger' {
    export default (props: IScrollTriggerProps) => React.FC;
}
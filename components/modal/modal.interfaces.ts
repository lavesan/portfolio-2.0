import React from 'react';

export interface IModal {
    show: boolean;
    children: React.ReactNode;
    toggleModal: VoidFunction;
}
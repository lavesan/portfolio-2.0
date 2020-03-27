import React from 'react';

import { StyledTimeForm } from './time-form.styles';
import { LoadIconComponent } from '../../../../../components/load-icon';

export default ({ times = [], setFieldValue, value, name, loading, error }) => {

    const onChange = (choosenDate) => {
        setFieldValue(name, choosenDate);
    }

    return (
        <StyledTimeForm loading={loading}>
            {loading && <LoadIconComponent className="loading-container" />}
            <div className="times-container">
                {times.map(time =>
                    <div
                        onClick={() => onChange(time.time)}
                        className={`scheduled-time-container ${value === time.time && 'active'} ${!time.active && 'inactive'}`}>
                        <p>{time.time}</p>
                    </div>
                )}
            </div>
            {error && <p className="error-message">Selecione um horário</p>}
        </StyledTimeForm>
    )

}

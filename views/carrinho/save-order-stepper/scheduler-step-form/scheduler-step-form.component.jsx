import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from 'moment';

import { setScheduleStepValues } from '../../../../store/actions/orderActions';
import { StyledSchedulerStepForm } from './scheduler-step-form.styles';
import { TimeFormComponent } from './time-form';
import { orderInstance } from '../../../../services/order.service';
import { StyledOrderFormTitle } from '../save-order-stepper.styles';

const SchedulerStepFormComponent = ({ dispatch, scheduleStep }) => {

    const orderSerivce = orderInstance.getInstance();

    const [loadingTime, setLoadingTime] = useState(false);
    const [freeTimes, setFreeTimes] = useState([]);

    const setFieldValue = async (name, value) => {

        if (name === 'date') {

            const parsedDate = moment(value).format('DD/MM/YYYY');

            setLoadingTime(true);
            await orderSerivce.getFreeTimesFromDate(parsedDate)
                .then(res => setFreeTimes(res.activeTimes))
                .catch(err => console.log('Deu pau vei: ', err));
            setLoadingTime(false);

            dispatch(setScheduleStepValues({
                name: 'time',
                value: '',
            }));

        }

        dispatch(setScheduleStepValues({
            name,
            value,
        }));

    }

    useEffect(() => {
        setFieldValue('date', new Date());
    }, [])

    return (
        <StyledSchedulerStepForm>
            <StyledOrderFormTitle>Horário e data de entrega</StyledOrderFormTitle>
            <div className="scheduler-form-container">
                <div>
                    <h3>Selecione uma data</h3>
                    <Calendar
                        onChange={(value) => setFieldValue('date', value)}
                        value={scheduleStep.date || new Date()}
                        locale="pt-br" />
                </div>
                <div className="scheduler-form-container--time-form">
                    <h3>Selecione um horário</h3>
                    <TimeFormComponent
                        name="time"
                        times={freeTimes}
                        value={scheduleStep.time}
                        setFieldValue={setFieldValue}
                        loading={loadingTime} />
                </div>
            </div>
        </StyledSchedulerStepForm>
    )

}

const mapStateToProps = store => ({
    scheduleStep: store.orderState.scheduleStep,
})

export default connect(mapStateToProps)(SchedulerStepFormComponent);

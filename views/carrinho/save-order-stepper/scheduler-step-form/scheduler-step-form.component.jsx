import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from 'moment';

import { setScheduleStepValues, setScheduleValidation } from '../../../../store/actions/orderActions';
import { StyledSchedulerStepForm } from './scheduler-step-form.styles';
import { TimeFormComponent } from './time-form';
import { orderInstance } from '../../../../services/order.service';
import { StyledOrderFormTitle } from '../save-order-stepper.styles';

const SchedulerStepFormComponent = ({ dispatch, scheduleStep, scheduleValidations, submitted }) => {

    const orderSerivce = orderInstance.getInstance();

    const [freeTimes, setFreeTimes] = useState([]);
    const [loadingTime, setLoadingTime] = useState(false);

    const startDate = moment().day() !== 0 ? new Date() : moment().add(1, 'date').toDate();

    const deactiveDate = ({ date }) => {
        return moment(date).day() === 0;
    }

    const setFieldValue = (name, value) => {

        dispatch(setScheduleStepValues({
            name,
            value,
        }));

    }

    useEffect(
        () => {
            dispatch(setScheduleValidation({
                time: {
                    invalid: !Boolean(scheduleStep.time),
                },
            }));
        },
        [scheduleStep.time]
    );

    const handleChange = useCallback(
        async () => {
            
            const parsedDate = scheduleStep.date
                ? moment(scheduleStep.date).format('DD/MM/YYYY')
                : moment().format('DD/MM/YYYY');

            setLoadingTime(true);
            const times = await orderSerivce.getFreeTimesFromDate(parsedDate)
                .catch(err => console.log('erro: ', err));
            setLoadingTime(false);

            dispatch(setScheduleStepValues({
                name: 'time',
                value: '',
            }));

            setFreeTimes(times ? times.activeTimes : []);

        },
        [scheduleStep.date]
    )

    useEffect(() => {
        handleChange();
    }, [handleChange])

    useEffect(() => {
        setFieldValue('date', new Date());
    }, []);

    return (
        <StyledSchedulerStepForm>
            <StyledOrderFormTitle>Horário e data de entrega</StyledOrderFormTitle>
            <div className="scheduler-form-container">
                <div>
                    <h3>Selecione uma data</h3>
                    <Calendar
                        onChange={(value) => setFieldValue('date', value)}
                        value={scheduleStep.date || startDate}
                        tileDisabled={deactiveDate}
                        locale="pt-br" />
                </div>
                <div className="scheduler-form-container--time-form">
                    <h3>Selecione um horário</h3>
                    <TimeFormComponent
                        name="time"
                        times={freeTimes}
                        error={submitted && scheduleValidations.time.invalid}
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
    scheduleValidations: store.orderState.scheduleValidations,
})

export default connect(mapStateToProps)(SchedulerStepFormComponent);

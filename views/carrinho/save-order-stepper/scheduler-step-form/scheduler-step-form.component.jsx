import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import Calendar from "react-calendar";
import moment from 'moment';

import { setScheduleStepValues, setScheduleValidation, setFreeTimes } from '../../../../store/actions/orderActions';
import { StyledSchedulerStepForm } from './scheduler-step-form.styles';
import { TimeFormComponent } from './time-form';
import { orderInstance } from '../../../../services/order.service';
import { StyledOrderFormTitle } from '../save-order-stepper.styles';
import { FormResponsiveDatePicker } from '../../../../components/form/form-responsive-date-picker';
import { isRequired, isValidDate, isBrDate } from '../../../../helpers/validations.helpers';

const SchedulerStepFormComponent = ({ dispatch, scheduleStep, scheduleValidations, submitted, isResponsive, freeTimes }) => {

    const orderSerivce = orderInstance.getInstance();

    const { addToast } = useToasts();

    const [loadingTime, setLoadingTime] = useState(false);

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const setFormValidations = validation => {
        dispatch(setScheduleValidation(validation));
    }

    const deactiveDate = ({ date }) => {
        
        const momentDate = moment(date);
        return momentDate.day() === 0 || momentDate.isBefore(moment());

    }

    const setFieldValue = async (name, value) => {

        if (name === 'date') {

            const parsedDate = scheduleStep.date
            ? moment(scheduleStep.date).format('DD/MM/YYYY')
            : moment().format('DD/MM/YYYY');
    
            setLoadingTime(true);
            await orderSerivce.getFreeTimesFromDate(parsedDate)
                .then(res => {
                    dispatch(setFreeTimes(res ? res.activeTimes : []));
                })
                .catch(({ message }) => {
                    showToast(message);
                    dispatch(setFreeTimes(res ? res.activeTimes : []));
                });
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
        () => {

            dispatch(setScheduleValidation({
                date: {
                    invalid: !Boolean(scheduleStep.date),
                },
            }));

        },
        [scheduleStep.date]
    )

    useEffect(() => {
        handleChange();
    }, [handleChange])

    useEffect(() => {

        if (isResponsive && typeof scheduleStep.date === 'object') {

            const newDate = moment(scheduleStep.date).format('MM/DD/YYYY');
            setFieldValue('date', newDate);
            
        } else if (!isResponsive && typeof scheduleStep.date === 'string') {

            const newDate = moment(scheduleStep.date, 'DD/MM/YYYY').toDate();
            setFieldValue('date', newDate);

        }

    }, [isResponsive]);

    return (
        <StyledSchedulerStepForm isResponsive={isResponsive}>
            <StyledOrderFormTitle>Horário e data de entrega</StyledOrderFormTitle>
            <div className="scheduler-form-container">
                {isResponsive
                    ? <FormResponsiveDatePicker
                        label="Selecione uma data"
                        name="date"
                        setFormValidations={setFormValidations}
                        formValidation={scheduleValidations.date}
                        validatesOnChange={[isRequired, isBrDate, isValidDate]}
                        value={scheduleStep.date}
                        startValidations={submitted}
                        placeholder="Escolha uma data"
                        setFieldValue={setFieldValue} />
                    : <div>
                        <h3>Selecione uma data</h3>
                        <Calendar
                            onChange={(value) => setFieldValue('date', value)}
                            value={typeof scheduleStep.date === 'string' ? new Date() : scheduleStep.date}
                            tileDisabled={deactiveDate}
                            locale="pt-br" />
                    </div>
                }
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
    freeTimes: store.orderState.freeTimes,
})

export default connect(mapStateToProps)(SchedulerStepFormComponent);

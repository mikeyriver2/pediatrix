import React, { useState } from 'react';
import {
    Form
} from 'react-bootstrap';
import moment from 'moment';

const returnFormat = (type = 'DD') => {
    return parseInt(moment().format(type));
}

const DatePicker = () => {
    const [date, setDate] = useState(null);
    const [day, setDay] = useState(returnFormat('DD'));
    const [month, setMonth] = useState(returnFormat('MM'));
    const [year, setYear] = useState(returnFormat('YYYY'))

    const renderDays = () => {
        const days = moment(`${month}-${year}`,'MM-YYYY').daysInMonth();
        let toReturn = [];
        for(let i = 1; i < days+1; i++) {
            toReturn.push(<option>{i}</option>);
        }
        return toReturn;
    }

    const renderMonths = () => {
        let toReturn = [];
        for(let i = 1; i < 13; i++) {
            toReturn.push(<option>{i}</option>);
        }
        return toReturn;  
    }

    const renderYears = () => {
        const currentYear = parseInt(moment().format('YYYY'));
        let toReturn = [];
        for(let i = 0; i <= 9; i++) {
            toReturn.push(<option>{currentYear+i}</option>);
        }
        return toReturn;  
    }

    return (
        <div className="datePicker">
            <div>
                <Form.Control
                    className="datePick__day"
                    onChange={() => {}}
                    as="select"
                    value={day}
                >
                    { renderDays() }
                </Form.Control>
                <p>DD</p>
            </div>
            <div>
                <Form.Control
                    className="datePick__month"
                    onChange={(e) => {
                        setMonth(e.target.value)
                    }}
                    as="select"
                    value={month}
                >
                    { renderMonths() }
                </Form.Control>
                <p>MM</p>
            </div>
            <div>
                <Form.Control
                    className="datePick__year"
                    onChange={(e) => {
                        setYear(e.target.value)
                    }}
                    as="select"
                >
                    { renderYears() }
                </Form.Control>
                <p>YYYY</p>
            </div>
        </div>
    );
}

export default DatePicker;
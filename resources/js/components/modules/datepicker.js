import React, { useState } from 'react';
import {
    Form
} from 'react-bootstrap';
import moment from 'moment';

const returnFormat = (type = 'DD') => {
    return parseInt(moment().format(type));
}

const DatePicker = () => {
    const [day, setDay] = useState(returnFormat('DD'));
    const [month, setMonth] = useState(returnFormat('MM'));
    const [year, setYear] = useState(returnFormat('YYYY'))

    const renderDays = () => {
        const days = moment(`${month}-${year}`,'MM-YYYY').daysInMonth();
        let toReturn = [];
        for(let i = 1; i < days+1; i++) {
            toReturn.push(<option>{("0" + i).slice(-2)}</option>);
        }
        return toReturn;
    }

    const renderMonths = () => {
        let toReturn = [];
        for(let i = 1; i < 13; i++) {
            toReturn.push(<option>{("0" + i).slice(-2)}</option>);
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

    const chosenDate = moment(`${month}-${day}-${year}`,'MM-DD-YYYY');
    const dayString = chosenDate.format('ddd');

    return (
        <div className="datePicker">
            <div>
                <Form.Control
                    className="datePicker__month"
                    onChange={(e) => {
                        setMonth(e.target.value)
                    }}
                    as="select"
                    // value={month}
                >
                    { renderMonths() }
                </Form.Control>
                <p>MM</p>
            </div>
            <div>
                <Form.Control
                    className="datePicker__day"
                    onChange={(e) => {
                        setDay(e.target.value)
                    }}                    
                    as="select"
                    // value={day}
                >
                    { renderDays() }
                </Form.Control>
                <p>DD</p>
            </div>
            <div>
                <Form.Control
                    className="datePicker__year"
                    onChange={(e) => {
                        
                        setYear(e.target.value)
                    }}
                    as="select"
                    // value={year}
                >
                    { renderYears() }
                </Form.Control>
                <p>YYYY</p>
            </div>
            <p>
                ({dayString})
            </p>
        </div>
    );
}

export default DatePicker;
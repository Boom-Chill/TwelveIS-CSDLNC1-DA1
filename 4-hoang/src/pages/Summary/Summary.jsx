import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Grid from '@mui/material/Grid'
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import './Summary.scss'
const queryString = require('query-string')

function Summary(props) {
    const [revenue, setRevenue] = useState(null)

    const [date, setDate] = useState(
        new Date('2021-03-15T00:00:00.000')
    )
    const [selectedDate, setSelectedDate] = React.useState({
        month: 3,
        year: 2021,
    });

    const query = queryString.stringify(selectedDate)

    const handleDateChange = (date) => {
        setDate(date)

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        setSelectedDate({
            month: month,
            year: year,
        });

    };

    const handleSubmit = () => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/invoice/summary?${query}`)
                let price = 0
                res.data.forEach((item) => {
                    price += item.TongTien
                })
                setRevenue(price)
            } catch (error) {
                console.log(error)
            }
        }

        getProduct()
    }

    return (
        <div className='summary'>
            <h1>
                Doanh thu
            </h1>
            <div className="line">

            </div>
            <div className='summary__month-picker'>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <DatePicker
                            //dateFormat='dd-mm-yyyy'
                            variant="inline"
                            openTo="year"
                            views={["year", 'month']}
                            label="Year and Month"
                            helperText="Start from year selection"
                            value={date}
                            onChange={handleDateChange}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>

            <div
                className='summary__month-picker__btn noselect'
                onClick={() => handleSubmit()}
            >
                CHỌN
            </div>

            <div>
                <p>
                    {revenue && revenue?.length == 0 ? <div>Không có doanh thu tháng này</div> : <div>Doanh thu tháng này {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(revenue)}</div>}
                </p>
            </div>
        </div>
    )
}

export default Summary


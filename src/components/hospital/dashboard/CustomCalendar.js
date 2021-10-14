import React, { useState } from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: "#2fb4db",
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                backgroundColor: "white",
                color: "#1b5e20",
            },
        },
        MuiPickersDay: {
            daySelected: {
              backgroundColor: "#209abd",
            },
            current: {
              color: "#209abd",
            },
          },
    },
});

export default function CustomCalendar() {
    const [selectedDate, handleDateChange] = useState(new Date());
    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={materialTheme}>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        variant="static"
                    ></DatePicker>
                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </div>
    );
}
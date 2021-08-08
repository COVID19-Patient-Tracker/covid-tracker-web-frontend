import { FormControl, FormControlLabel, FormLabel,Radio, RadioGroup  as  MuiRadioGroup  } from '@material-ui/core';
import React from 'react'

export default function RadioGroup(props) {

    const {name,  value, label, onChange, items} = props;
    return (
        <FormControl>
          <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row={true} name={name}  value={value} onChange = {onChange}>
                {
                    items.map(
                        (item,index) => {
                            return <FormControlLabel value={item.id} control={<Radio />} label={item.label} />
                       }
                    )
                }
            </MuiRadioGroup>
        </FormControl>              
    )
}

import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Box } from '@material-ui/core';


export default function VaccineCard(props) {

    const { carddata } = props;

    return (
        <Box bgcolor={carddata.card_clr} p={1} borderRadius={6} boxShadow={3} textAlign="center">
            <Typography variant="h5" style={{fontWeight:700}} gutterBottom>{carddata.name}</Typography>
            <br></br>
            <Typography variant="body1">{carddata.approved}</Typography>
            <Typography variant="body1">{carddata.trial}</Typography>
        </Box>
    );
}

VaccineCard.propTypes = {
    carddata: PropTypes.object,
  };
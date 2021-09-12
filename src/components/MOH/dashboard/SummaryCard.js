import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Box } from '@material-ui/core';


export default function SummaryCard(props) {

    const { carddata } = props;

    return (
        <Box bgcolor={carddata.card_clr} p={1} borderRadius={6} boxShadow={3} textAlign="center">
            <Typography variant="h6">{carddata.title}</Typography>
            <Typography variant="h4">{carddata.count}</Typography>
        </Box>
    );
}

SummaryCard.propTypes = {
    carddata: PropTypes.object,
  };
import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Box } from '@material-ui/core';

export default function SummaryCard(props) {

    const { carddata } = props;

    return (
        <Box p={1} borderRadius={6} boxShadow={3} textAlign="center" style={carddata.card_clr}>
            <Typography variant="h6" gutterBottom>{carddata.title}</Typography>
            <Typography variant="h4" style={{fontWeight:"bold"}}>{carddata.count}</Typography>
        </Box>
    );
}

SummaryCard.propTypes = {
    carddata: PropTypes.object,
  };
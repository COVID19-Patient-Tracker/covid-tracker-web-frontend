import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Card, CardActionArea, CardContent, CardMedia, CardActions, Button, Typography } from '@material-ui/core';

import { Dialog, DialogActions, DialogContent, Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        borderWidth: 4,
        borderRadius: 10,
    },
    media: {
        height: 200,
    },
    btn: {
        backgroundColor: "#4dc8f7",
        borderRadius: 13,
        fontFamily: "monospace",
    },
    dialogPrimaryText: {
        fontSize: '1.2rem',
        fontWeight: 700,
        textAlign: 'justify',
    },
    dialogSecondaryText: {
        fontSize: '1rem',
        fontWeight: 500,
        textAlign: 'justify',
    },
    dialogDivider: {
        fontWeight: 500,
        marginTop: theme.spacing(2),
    },
    dialogGridContainer: {
        justifyContent: 'center',
    },
    dialogContentRoot: {
        marginTop: '50px',
    },
}));

export default function MediaCard(props) {

    const { newsdata } = props;

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Card className={classes.root} variant="outlined">
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={newsdata.pic}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 700 }} align="left">
                            {newsdata.topic}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" align="justify">
                            {newsdata.content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant="contained" size="small" className={classes.btn}>
                        Share
                    </Button>
                    <Button variant="contained" size="small" className={classes.btn} onClick={handleClickOpen}>
                        Read More
                    </Button>
                </CardActions>
            </Card>
            <Dialog
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent classes={{ root: classes.dialogContentRoot }}>
                    <Grid container spacing={5} className={classes.dialogGridContainer}>
                        <Grid item sm={5}>
                            <div>
                                <img src={newsdata.pic} alt="login_vector" height={400} width={400}></img>
                            </div>
                        </Grid>
                        <Grid item sm={10}>
                            <Typography
                                className={classes.dialogPrimaryText}
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {newsdata.topic}
                            </Typography>
                            <Divider
                                className={classes.dialogDivider}
                                classes={{ root: classes.dividerRoot }}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Typography
                                className={classes.dialogSecondaryText}
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {newsdata.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className={classes.cardAction}>
                    <Button onClick={handleClose}>Show less</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

MediaCard.propTypes = {
    carddata: PropTypes.object,
};
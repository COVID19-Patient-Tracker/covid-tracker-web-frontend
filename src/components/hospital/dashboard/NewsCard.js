import { makeStyles } from '@material-ui/core/styles';

import { Card, CardActionArea,CardContent,CardMedia,CardActions, Button, Typography}  from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        borderWidth: 4,
        borderRadius: 10,
    },
    media: {
        height: 200,
    },
    btn: {
        backgroundColor: "#5985bd"
    }
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/assets/cardnews.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 700}}>
                        Pay special attention to those who suffer from chronic non-communicable diseases…
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        President Gotabaya Rajapaksa informed the health officials to pay special attention to those who are above the age of 60 and are suffering from chronic non-communicable diseases....
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button  variant="contained" size="small" className={classes.btn}>
                    Share
                </Button>
                <Button variant="contained" size="small" className={classes.btn}>
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
}
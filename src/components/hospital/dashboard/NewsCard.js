import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/assets/newsimage.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Pay special attention to those who suffer from chronic non-communicable diseases…
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        President Gotabaya Rajapaksa informed the health officials to pay special attention to those who are above the age of 60 and are suffering from chronic non-communicable diseases....
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button  variant="contained" size="small" >
                    Share
                </Button>
                <Button variant="contained" size="small">
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
}
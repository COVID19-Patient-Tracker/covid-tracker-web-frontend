import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
};

export default function AccountProfile(props) {

    const { userData, closeFunction } = props;

    return (
      <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 100,
              width: 100
            }}
          />
             <Typography
            color="textSecondary"
            variant="body1"
            gutterBottom
          >
            {`User ID : ${userData.user_id}`}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {`${userData.first_name} ${userData.last_name}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
            gutterBottom
          >
            {`User Role : ${userData.role}`}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
          >
            {userData.nic}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
          >
            {userData.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          variant="outlined"
          onClick={closeFunction}
        >
          CLOSE
        </Button>
      </CardActions>
    </Card>
    );
}

AccountProfile.propTypes = {
    carddata: PropTypes.object,
  };
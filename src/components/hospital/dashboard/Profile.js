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

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Colombo',
  country: 'Sri Lanka',
  jobTitle: 'Senior Developer',
  name: 'Nimal Jayasinghe',
  timezone: 'GTM-7'
};

const AccountProfile = (props) => (
  <Card {...props}>
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
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          gutterBottom
        >
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
        >
          NIC : 97857547V
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
        >
          EMAIL : nimal@gmail.com
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
    <Button
        variant="outlined"
      >
        EDIT
      </Button>
      <Button
        variant="outlined"
      >
        CLOSE
      </Button>
    </CardActions>
  </Card>
);

export default AccountProfile;
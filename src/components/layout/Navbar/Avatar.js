import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useAuth } from '../../AuthConext'


export default function AccountMenu() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const auth = useAuth();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleLogout = () => {
    auth.logout();
  }
  const handleClose = (e) => {
    e.preventDefault();
    setAnchorEl(null);
  };
  
  return (

    <React.Fragment>

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Profile">
          <IconButton onClick={handleClick} size="medium" sx={{ ml: 1 }}>
            <Avatar sx={{ width: 35, height: 35 }}/>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem   >
          <Avatar /> 
          <ListItemButton onClick={()=>console.log("Profile clicked")} >
          Profile
          </ListItemButton>
        </MenuItem>
        <MenuItem >
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemButton  onClick={handleLogout} >
           Logout
          </ListItemButton>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

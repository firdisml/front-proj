import React, { useEffect, useState, useRef } from 'react'
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import { UserCircle as UserCircleIcon } from '../icons/user-circle'
import { Bell as BellIcon } from '../icons/bell'
import { Users as UsersIcon } from '../icons/users'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import NextLink from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import { getUserData, updateUserInfo, logout, getSelfData, updatePassowrd } from '../actions/userActions'
import LockResetIcon from '@mui/icons-material/LockReset';
import Popup from './Popup'
import { ChangePassword } from './user/changePassword'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({

  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]

}));

export const DashboardNavbar = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { onSidebarOpen, ...other } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openPopup, setOpenPopup] = useState(false);
  const [password, setPassword] = useState('');

  const selfData = useSelector(state => state.selfData);
  const { data } = selfData


  const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''


  useEffect(() => {
    dispatch(getSelfData(JSON.parse(localStorage.getItem('id'))))
    return () => {
      //
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClickLogout = () => {
    router.push('/');
    dispatch(logout())
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const onClickChaneg = () => {
    dispatch(updatePassowrd(password))
    setOpenPopup(false)
  };



  const id = open ? 'simple-popover' : undefined;


  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>

        <Popup
          maxWidth='sm'
          title="Change Password"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <ChangePassword

            password={password}
            handleChange={e => setPassword(e.target.value)}
            // userInfo={selectedStudent}
            change={(e) => onClickChaneg()} />
        </Popup>

        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}>
             
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}>
            <MenuIcon fontSize="small" />
          </IconButton>

          

       
          {/* <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          <Box sx={{ flexGrow: 1 }} />

          {/* {type === 'Child' && <Tooltip title="Change Password">
            <IconButton sx={{ ml: 1 }} onClick={e => setOpenPopup(true)}>
              <LockResetIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          } */}
        

          {/* <Tooltip title="Log Out">
            <IconButton sx={{ ml: 1 }} onClick={e => onClickLogout()}>
              <NextLink
                href="/"
                passHref
              >
                <LogoutIcon fontSize="small" />
              </NextLink>
            </IconButton>
          </Tooltip> */}
          {/* <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }} onClick={handleClick}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip> */}
         
          <IconButton
            onClick={handleClick}

            size="small"
            sx={{ ml: 2, borderRadius: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar

              sx={{
                height: 42,
                width: 42,
                ml: 1
              }}
              src={data.image || "/static/images/avatars/default_profile.png"}
            >
              {/* <UserCircleIcon fontSize="small" /> */}
            </Avatar>


            <Typography sx={{ p: 2, color: 'black' }}>{data.username}</Typography>
          </IconButton>
        </Toolbar>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
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
                width: 40,
                height: 40,
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
          <MenuItem>
            <Avatar
              sx={{
                height: 40,
                width: 40,
                ml: 1,


              }}
              src={data.image || "/static/images/avatars/default_profile.png"}
            >
            </Avatar>
            <ListItemText primary={data.username || ''} secondary={data.email || ''} />
            {/* <Typography sx={{ color: 'black' }}>{data.username}</Typography> */}
          </MenuItem>
          <Divider />
          {type === 'Child' && <MenuItem
            onClick={e => setOpenPopup(true)}>
            <ListItemIcon>
              <LockResetIcon fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>}
          <MenuItem
            onClick={e => onClickLogout()}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        {/* <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover> */}
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {

  onSidebarOpen: PropTypes.func

};

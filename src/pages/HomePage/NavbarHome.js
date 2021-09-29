import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import AccountPopover from './AccountPopover';
import { useSelector } from 'react-redux';
import Login from '../../Component/Authentication/Login';
import Register from '../../Component/Authentication/Register';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.up('lg')]: {
    // width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  },
  left: 0,
  right: 0,
  margin: '0 auto',
}));

NavbarHome.propTypes = {
  onOpenSidebar: PropTypes.func,
};
const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};
export default function NavbarHome({ onOpenSidebar }) {
  const theme = useTheme();
  const [mode, setMode] = useState(MODE.LOGIN);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, r) => {
    if (r === 'backdropClick' || r === 'escapeKeyDown') return;
    setOpen(false);
  };
  const isLogin = !!useSelector((state) => state.user.current.email);

  useEffect(() => {
    return () => {
      window.location.reload();
    };
  }, []);

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ [theme.breakpoints.up('lg')]: { minHeight: '80px' } }}>
          <IconButton onClick={onOpenSidebar}>
            <Icon icon="bx:bxs-book-heart" color="white" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{ color: '#fff', textDecoration: 'none' }}
            href="/"
          >
            RIKUO
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            {isLogin ? (
              <AccountPopover />
            ) : (
              <Button
                sx={{ color: '#fff', textTransform: 'none' }}
                endIcon={<Icon icon="ant-design:login-outlined" color="white" />}
                onClick={handleClickOpen}
              >
                Đăng nhập
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Icon icon="majesticons:close" color="#6b7280" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <Login handleClose={handleClose} />
              <Box textAlign="center" mt={2}>
                <Button onClick={() => setMode(MODE.REGISTER)} sx={{ textTransform: 'none' }}>
                  Bạn chưa có tài khoản? Đăng ký
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.REGISTER && (
            <>
              <Register handleClose={handleClose} />
              <Box textAlign="center" mt={2}>
                <Button onClick={() => setMode(MODE.LOGIN)} sx={{ textTransform: 'none' }}>
                  Bạn đã có tài khoản? Đăng nhập
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

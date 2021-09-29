import React from "react";
import PropTypes from 'prop-types';
import {Box, CssBaseline, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import {styled} from "@mui/material/styles";
import {Icon} from "@iconify/react";
import Hidden from "../../Component/Hidden";
import AdminPopover from "./AdminPopover";

const DRAWER_WIDTH = 280;

const AppBar = styled(MuiAppBar)(({theme}) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
    }
}));


DashBoardNavbar.propTypes = {
    onOpenSidebar: PropTypes.func
};

export default function DashBoardNavbar({onOpenSidebar}) {


    return (
        <div>
            <CssBaseline/>
            <AppBar position="fixed">
                <Toolbar>
                    <Hidden width='lgUp'>
                        <IconButton onClick={onOpenSidebar} sx={{mr: 1}}>
                            <Icon icon="eva:book-fill" color="white"/>
                        </IconButton>
                    </Hidden>

                    <Typography
                        variant="h6"
                        noWrap
                        component='a'
                        sx={{color: '#fff', textDecoration: 'none'}}
                        href='/'
                    >RIKUO</Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Stack direction="row" alignItems="center" spacing={{xs: 0.5, sm: 1.5}}>
                        <Hidden width="mdDown">
                            <Typography variant="h6">
                                Hi Admin!
                            </Typography>
                        </Hidden>

                        <AdminPopover/>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
}

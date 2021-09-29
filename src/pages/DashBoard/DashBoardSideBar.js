import React, {useEffect} from 'react';
import {styled} from "@mui/styles";
import {Link as RouterLink, useLocation} from "react-router-dom";
import {Avatar, Box, Drawer, Link, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import SideBarConfig from "./SideBarConfig";
import Hidden from "../../Component/Hidden";
import ScrollBar from "../../Component/ScrollBar";
import NavSection from "../../Component/NavSection";

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({theme}) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));

const AccountStyle = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: 12,
    backgroundColor: theme.palette.grey[200]
}));



export default function DashBoardSideBar({isOpenSidebar, onCloseSidebar}) {
    const {pathname} = useLocation();

    const email = useSelector(state => state.user.current.email);
    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
    const renderContent = (
        <ScrollBar
            sx={{
                height: '100%',
                '& .simplebar-content': {height: '100%', display: 'flex', flexDirection: 'column'}
            }}
        >
            <Box sx={{my: 5, mx: 2.5}}>
                <Link underline="none" component={RouterLink} to="/">
                    <AccountStyle>
                        <Avatar src="https://cdn.quasar.dev/img/boy-avatar.png" alt="photoURL"/>
                        <Box sx={{ml: 2}}>
                            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
                                Admin
                            </Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                {email}
                            </Typography>
                        </Box>
                    </AccountStyle>
                </Link>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <NavSection navConfig={SideBarConfig} />
        </ScrollBar>
    );
    return (
        <RootStyle>
            <Hidden width='lgUp'>
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: {width: DRAWER_WIDTH}
                    }}
                >
                    {renderContent}
                </Drawer>

            </Hidden>
            <Hidden width="lgDown">
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.default'
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            </Hidden>
        </RootStyle>
    );
}
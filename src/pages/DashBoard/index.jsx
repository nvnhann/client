import React, {useState} from 'react';
import DashBoardNavbar from "./DashBoardNavbar";
import DashBoardSideBar from "./DashBoardSideBar";
import { Outlet } from 'react-router-dom';
import {styled} from "@mui/styles";
import {Helmet} from "react-helmet-async";
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

export default function DashBoard() {
    const [open, setOpen] = useState(false);
    return (
        <RootStyle>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <DashBoardNavbar onOpenSidebar={() => setOpen(true)}/>
            <DashBoardSideBar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}/>
            <MainStyle><Outlet /></MainStyle>
        </RootStyle>

    );
}
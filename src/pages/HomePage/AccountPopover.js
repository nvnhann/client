import React, {useRef, useState} from "react";
import {Avatar, Box, Button, Divider, IconButton, MenuItem, Typography} from "@mui/material";
import MenuPopover from "../../Component/MenuPopover";
import {useDispatch, useSelector} from "react-redux";
import {Icon} from '@iconify/react';
import {Link as RouterLink} from 'react-router-dom';
import {logout} from "../../Store/userSlice";


const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: "flat-color-icons:home",
        color: "#6b7280",
        linkTo: '/'
    },
    {
        label: 'Thông tin cá nhân',
        icon: "noto:information",
        color: "#6b7280",
        linkTo: '/profile'
    },
];

export default function AccountPopover() {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const email = useSelector(state => state.user.current.email);
    const dispatch = useDispatch();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (<>
        <IconButton
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
                padding: 0,
                width: 44,
                height: 44,
                ...(open && {
                    '&:before': {
                        zIndex: 1,
                        content: "''",
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        position: 'absolute',
                    }
                })
            }}
        >
            <Avatar src="https://cdn.quasar.dev/img/boy-avatar.png"/>
        </IconButton>
        <MenuPopover
            open={open}
            onClose={handleClose}
            anchorEl={anchorRef.current}
            sx={{width: 200}}
        >

            <Box sx={{my: 1.5, px: 2.5}}>
                <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                    {email}
                </Typography>
            </Box>
            <Divider sx={{my: 1}}/>
            {MENU_OPTIONS.map((option) => (
                <MenuItem
                    key={option.label}
                    to={option.linkTo}
                    component={RouterLink}
                    onClick={handleClose}
                    sx={{typography: 'body2', py: 1, px: 2.5}}
                >
                    <Box
                        component={Icon}
                        icon={option.icon}
                        color={option.color}
                        sx={{
                            mr: 2,
                            width: 24,
                            height: 24
                        }}
                    />

                    {option.label}

                </MenuItem>
            ))}
            <Box sx={{ p: 2, pt: 1.5 }}>
                <Button sx={{textTransform: 'none'}} fullWidth color="inherit" variant="outlined" onClick={()=>{
                    dispatch(logout())
                    handleClose();
                }}>
                    Đăng xuất
                </Button>
            </Box>
        </MenuPopover>
    </>)
}
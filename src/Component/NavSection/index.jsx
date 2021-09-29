import PropTypes from 'prop-types';
import {matchPath, NavLink as RouterLink, useLocation} from 'react-router-dom';
// material
import {alpha, useTheme} from '@mui/material';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import React from 'react';
// ----------------------------------------------------------------------

NavItem.propTypes = {
    item: PropTypes.object,
    active: PropTypes.func
};

function NavItem({item, active}) {
    const theme = useTheme();
    const isActiveRoot = active(item.path);
    const {title, path, icon} = item;

    const activeRootStyle = {
        color: theme.palette.primary.main,
        bgcolor: alpha(theme.palette.primary.main, .2),
        borderRadius: '8px'

    };

    return (
        <ListItem>
            <ListItemButton
                component={RouterLink}
                to={path}
                sx={{
                    ...(isActiveRoot && activeRootStyle)
                }}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText disableTypography primary={title}/>
            </ListItemButton>
        </ListItem>
    );
}

NavSection.propTypes = {
    navConfig: PropTypes.array
};

export default function NavSection({navConfig, ...other}) {
    const {pathname} = useLocation();
    const match = (path) => (path ? !!matchPath({path, end: false}, pathname) : false);

    return (
        <Box {...other}>
            <List disablePadding>
                {navConfig.map((item) => (
                    <NavItem key={item.title} item={item} active={match}/>
                ))}
            </List>
        </Box>
    );
}

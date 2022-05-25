import React from "react";
import {AppBar, Toolbar, Typography, IconButton, Button} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
export default function Navbar(props) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

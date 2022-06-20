import React from "react";
import {AppBar, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Link to={'/'}>Cestovne nahrady</Link>
                <div className={'ml-[1.5rem]'}>
                    <Link to={'/lateness'}>Uroky z omeskania</Link>
                </div>
            </Toolbar>
        </AppBar>
    )
}

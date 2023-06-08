
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";


export const NavBar = ({ drawerWidth = 260 }) => {

    const dispatch = useDispatch();
    const onLogout = () => {
       dispatch(startLogout());
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}>
                    <MenuOutlined />
                </IconButton>
                <Grid container direction="row" justifyContent="space-between" alignItems="left">
                    <Typography variant='h5' noWrap component='div' sx={{ ml: 3 }}>
                        JournalApp
                    </Typography>
                    <IconButton 
                        onClick={onLogout}
                        color="blanc">
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>

        </AppBar>
    )
}

import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";

export const JournalLayout = ({ children }) => {

    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex' }}>

            <NavBar drawerWidth={drawerWidth} />
            <SideBar />

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}
            >
                <Toolbar />

                {children}

            </Box>
        </Box>
    )
}

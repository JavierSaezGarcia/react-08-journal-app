import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { dateNow } from "../../helpers";
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal";
import { useDispatch } from "react-redux";


export const SideBarItem = ({ title, body, id, date, imageUrls= []}) => {
    
    const dispatch = useDispatch();    

    const newTitle = useMemo(() => {
        // if(!title) return;     
        return title.length > 17 
        ? title.substring(0, 17) + '...' 
        : title
    }, [title]);

    const newBody = useMemo(() => {
        // if(!body) return; 
        return body.length > 17 
        ? body.substring(0, 17) + '...' 
        : body
    }, [body]);

    const onClicNote = () => {
        dispatch(setActiveNote({id, title, body, date, imageUrls}));
    }
    return (
        <>
            <ListItem disablePadding key={id} >
                <ListItemButton onClick={onClicNote}>
                    <ListItemIcon>
                        <TurnedInNot sx={{ fontSize: '40px' , opacity: 1, color: 'rgba(0, 0, 0, 0.75)', fontWeight: '400'}} />
                    </ListItemIcon>
                    <Grid container direction="column">
                        <ListItemText primary={newTitle} sx={{ margin: '1px' }} />
                        <ListItemText secondary={dateNow(date)} sx={{ margin: '1px', fontStyle: 'italic' }} />                        
                        <ListItemText secondary={newBody} sx={{ margin: '1px' }} />                        
                    </Grid>
                    
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
    )
}

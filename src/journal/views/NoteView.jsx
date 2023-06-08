import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { dateFormatted } from "../../helpers/dateFormatted";
import { SaveOutlined } from "@mui/icons-material";
import { ImageGallery } from "../components";
import { useEffect } from "react";
import { setActiveNote, startSaveNote } from "../../store/journal";

export const NoteView = () => {

    const { active:note } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState} = useForm(note);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setActiveNote(formState));       
    }, [formState])
    
    const onSaveNote = () => {
        dispatch(startSaveNote());
        console.log('Save Note');
        console.log(formState);
        
    
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' className='animate__animated animate__fadeIn animate__faster'>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{ dateFormatted(date) }</Typography>
            </Grid>
            <Grid item>
                <Button 
                    onClick={onSaveNote}
                    color="primary" 
                    variant="outlined" 
                    size="large" 
                    startIcon={<SaveOutlined />} 
                    >                   
                        Save                    
                </Button>
            </Grid>
            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Type a title..."
                    label="Title"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿What happened today?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <ImageGallery />
        </Grid>
    )
}

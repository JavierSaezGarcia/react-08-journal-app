import { React, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { dateFormatted } from "../../helpers/dateFormatted";
import { ImageGallery } from "../components";
import { useEffect } from "react";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";

import { Button, Grid, TextField, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState} = useForm(note);

    const fileInputRef = useRef()
    

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setActiveNote(formState));       
    }, [formState]);

    useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire('Note Updated', messageSaved, 'success');
        }       
    }
    , [messageSaved])
    
    const onSaveNote = () => {
        dispatch(startSaveNote());
        // console.log('Save Note');
        // console.log(formState);      
    }

    const onFileInputChange = ({ target }) => {

        if(target.files === 0) return;

        console.log('Subiendo archivos');
        dispatch( startUploadingFiles(target.files) );
    }
    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' className='animate__animated animate__fadeIn animate__faster'>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{ dateFormatted(date) }</Typography>
                
            </Grid>
            
            <Grid   alignItems='right'>
                <input  
                    type="file" 
                    multiple
                    ref={ fileInputRef}
                    onChange={ onFileInputChange }  
                    style={{ display: 'none' }}
                />                
                
                <Button
                color="primary" 
                variant="contained"
                size="large" 
                disabled={isSaving}
                onClick= { () => fileInputRef.current.click() }
                sx={{  mr: 1 }}
                startIcon={<AddPhotoAlternateOutlinedIcon />} >
                Upload

                </Button>
                <Button 
                disabled = {isSaving}
                    onClick={onSaveNote}
                    color="success" 
                    variant="contained" 
                    size="large" 
                    startIcon={<SaveOutlined />} 
                    >                   
                        Save                    
                </Button>
                <Button
                    onClick={onDelete}                    
                    sx={{ ml: 5 }}
                    color="error"
                    variant="contained"
                    size="large" >
                    <DeleteOutlineRoundedIcon /> 
                    Delete
                    
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
            
            

            <ImageGallery images={note.imageUrls}/>
        </Grid>
    )
}

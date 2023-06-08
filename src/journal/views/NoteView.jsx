import { Button, Grid, TextField, Typography } from "@mui/material";
import { DateNow } from "../../helpers/DateNow";
import { SaveOutlined } from "@mui/icons-material";
import { ImageGallery } from "../components";




export const NoteView = () => {
    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' className='animate__animated animate__fadeIn animate__faster'>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{ <DateNow /> }</Typography>
            </Grid>
            <Grid item>
                <Button color="primary" variant="outlined" size="large" startIcon={<SaveOutlined />} >                   
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
                />
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿What happened today?"
                    minRows={5}
                />
            </Grid>

            <ImageGallery />
        </Grid>
    )
}

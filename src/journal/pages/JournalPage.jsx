import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { ImageGallery } from "../components";
import { AddOutlined } from "@mui/icons-material";



export const JournalPage = () => {
  return (
    <>
    <JournalLayout>
    {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Libero, molestias. Esse sapiente aliquam vero doloribus maiores vitae cum dolores suscipit atque accusantium. 
      Voluptatem pariatur praesentium consequatur. Aliquam quaerat ad consectetur.</Typography> */}
    
      {/* <NothingSelectedView /> */}
      
      <NoteView />
     
      <IconButton
        size='large'
        sx={{  
          position: 'fixed',        
          color: '#fff',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.7 },
          right: 50,
          bottom: 50}}
        >
<AddOutlined sx={{ fontSize:30}}/>
      </IconButton>
    </JournalLayout>
    
    
    </>
    
  )
}

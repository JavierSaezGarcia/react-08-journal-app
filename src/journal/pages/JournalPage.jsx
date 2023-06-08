import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { ImageGallery } from "../components";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote, startNewNote } from "../../store/journal";




export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, active } = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <>
      <JournalLayout>
        {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Libero, molestias. Esse sapiente aliquam vero doloribus maiores vitae cum dolores suscipit atque accusantium. 
      Voluptatem pariatur praesentium consequatur. Aliquam quaerat ad consectetur.</Typography> */}
        {
          (!!active) ? <NoteView /> : <NothingSelectedView />
        }
        <IconButton
          disabled={isSaving}
          onClick={onClickNewNote}
          size='large'
          sx={{
            position: 'fixed',
            color: '#fff',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.7 },
            ':disabled': { backgroundColor: 'gray', opacity: 0.5 },
            right: 50,
            bottom: 50
          }}
        >
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
      </JournalLayout>


    </>

  )
}

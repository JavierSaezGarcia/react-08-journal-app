// Importamos de firebase firestore
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote } from './';
import { loadNotes } from '../../helpers/loadNotes';


export const startNewNote = () => {

    return async (dispatch, getState) => {

        dispatch(savingNewNote)

        // console.log('startNewNote');
        // necesitamos el uid del usuario
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        // ¿Como insertar una nota en la base de datos firebase?: necesitamos el path de la coleccion y el objeto a insertar
        // Insertamos un documento en la colleccion notes de la base de datos que llamamos FirebaseDB que hemos importado de la configuracion de firebase
        // creamos el documento que queremos insertar con el parametro de firebase que es el uid del usuario /journal/notes        
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        
        
        // Ahora insertamos newDoc
        await setDoc( newDoc, newNote );
        // asignamos la id de firebase a la nota que creamos
        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );
       
    }
}

export const startLoadingNotes = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );        

        dispatch(setNotes(notes));

    }
}

export const startSaveNote = () => {

    return async (dispatch, getState) => {
        
        dispatch( setSaving());

        const { uid } = getState().auth; // Tomo el uid del usuario

        const { active:note } = getState().journal; // Tomo la nota activa

        if( !uid ) throw new Error('El UID del usuario no existe'); // Si no existe el uid lanzamos error

        const noteToFirestore = { ...note }; // esparzo la nota activa para borrarle el id
        
        delete noteToFirestore.id; // eliminar el id de la nota (ojo, no del usuario)

        // console.log(noteToFirestore);

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` ); // referencia al documento de la base de datos

        await setDoc( docRef, noteToFirestore, { merge: true } ); // actualizamos el documento con la nota y el tercer argumento que es un merge para que no sobreescriba el documento
        
        dispatch( updateNote(note) );

    }




}
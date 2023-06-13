// Importamos de firebase firestore
import { collection, doc, setDoc, deleteDoc, getDoc} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from './';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers';





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

export const startUploadingFiles = ( files = [] ) => {
    return async (dispatch) => {

        dispatch( setSaving());

        // console.log(files);

        // await hacer algo... 
        // await fileUpload( files[0] );  // pero las subiría de una en una, no es lo que queremos

        // para subir varias, podriamos hacer un foreach, pero las subiria de una en una y queremos que las suba de golpe
        // Para ello hacemos un array de promesas y las ejecutamos con Promise.all que cuando todas las promesas( peticiones ) se hayan completado, ejecuta la llamada Promise.all()
        const fileUploadPromises = [];
         // Llenamos el array
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) );
        }
        
        // enviamos el arreglo de promesas
        const photosUrls = await Promise.all( fileUploadPromises );
        console.log([photosUrls]);

        // console.log(photosUrls);
        dispatch( setPhotosToActiveNote( photosUrls ) );       

    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        // console.log({uid, note});       

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );

        // Obtener el documento desde Firebase
        const docSnapshot = await getDoc(docRef);

        // Obtener los datos del documento
        const noteData = docSnapshot.data();

        // Obtener las URLs de las imágenes desde los datos de la nota
        const imageUrls = noteData.imageUrls;
        // TODO buscar la forma de con el array de urls de cada nota se puedan borrar de cloudinary  a la vez que se borra la nota
        console.log(imageUrls);
      
        
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id))

    }

}


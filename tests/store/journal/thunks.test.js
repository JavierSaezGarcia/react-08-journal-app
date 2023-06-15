import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "../../../src/store/journal";
import { startLoadingNotes, startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";
import { loadNotes } from "../../../src/helpers";




describe('testing in journal/thunks', () => {

    const dispatch = jest.fn()
    const getState = jest.fn()
    

    beforeEach(() => jest.clearAllMocks());

    test('should create a new journal entry', async () => {

        const uid = 'TEST-UID';

        getState.mockReturnValue({ auth: { uid: uid } });

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith( savingNewNote );
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)
        }));

        // TODO borrar firebase de testing
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` ); // Buscamos la coleccion en firebase
        const {docs} = await getDocs( collectionRef ); // Obtenemos los documentos de la coleccion
        await Promise.all(docs.map(({ ref }) => deleteDoc(ref))); // Eliminamos todos los documentos       

    });

    test('should testing startLoadingNotes', async() => { 
        
        const uid = 'TEST-UID';

        getState.mockReturnValue({ auth: { uid: uid } });

        const notes = await loadNotes( uid );
        await startLoadingNotes()(dispatch, getState);
        
        expect(dispatch).toHaveBeenCalledWith(setNotes(notes));  
    });

    test('should testing startLoadingNotes with error', async() => {
        
        const uid = 'TEST-UID';

        getState.mockReturnValue({ auth: { uid: uid } });

        await startLoadingNotes()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(setNotes([]));  
    });        


});
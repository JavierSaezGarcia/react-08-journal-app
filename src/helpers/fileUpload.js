

export const fileUpload = async( file ) => {

    // if( !file) throw new Error('No hay archivo para subir');
    if(!file) return null

    const cloudUrl = 'https://api.cloudinary.com/v1_1/images-cloudinary/upload';
    // hacemos una instancia de un formulario html de javascript FormData()
    const formData = new FormData();
    // Añadimos el body de la peticion
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file );
    // Realizamos el fetch envuelto en un try-catch
    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST', // especificamos que sea post
            body: formData  // añadimos el body
        
        });

        if( !resp.ok ) throw new Error('No se pudo subir imagen'); // creamos la posibilidad de que haya un error

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        // console.log(error);
        // throw new Error( error.message );
        return null;
    }   


}
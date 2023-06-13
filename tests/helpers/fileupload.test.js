import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'images-cloudinary',
    api_key: '397116656318379',
    api_secret: '35x-pgvIGXzT18okJ5erHiwsJZY', 
    secure: true
});


describe('Test in fileUpload.js', () => {

    test('should upload a file correctly to Cloudinary', async() => { 
        
        const imageURL = "https://images.unsplash.com/photo-1561409037-5d7c064238bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        
        // ahora con la url de la imagen voy a crear un archivo en mi sistema local
        // para poder probar el funcionamiento de fileUpload
        const resp = await fetch(imageURL);
        // Con .blob() me convierto la respuesta en un archivo blob o de imagenes
        const blob = await resp.blob();

        const file = new File([blob], 'test-image.jpg');

        const url = await fileUpload(file);
        console.log(url);

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        console.log(imageId);

        expect(typeof url).toBe('string');
        expect(url.length > 0).toBe(true);
        expect(url.includes('https://')).toBe(true);

        const cloudResp = await cloudinary.api.delete_resources(['journal-app/' + imageId], {
            resource_type: 'image'
        });
        console.log(cloudResp);

    
    });
    test('should return null if there is no file', async() => {
        
        const file = new File([], 'test-image.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
    
});
import { ImageList, ImageListItem } from '@mui/material';


export const ImageGallery = ({ images }) => {
    if(!images) return;
    return (
        <ImageList variant="quilted" sx={{ width: '100%'}} cols={4}  gap={8}>
          
          {images.map((image) => (
            <ImageListItem  key={image}>
              <img
                src={`${image}?w=250&h=250&fit=crop&auto=format`}
                srcSet={`${image}?w=250&h=250&fit=crop&auto=format&dpr=2 2x`}
                alt="Imagen de la nota"
                loading="lazy"
                
              />
            </ImageListItem>
          ))}
        </ImageList>
      );
}
   

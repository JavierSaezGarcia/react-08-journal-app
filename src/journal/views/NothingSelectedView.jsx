import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"


export const NothingSelectedView = () => {
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: 'calc(100vh - 100px)', backgroundColor: 'primary.main', borderRadius: 5 }}
    >
        <Grid>
            <StarOutline sx={{ fontSize:100, color:'#fff' }}/>
        </Grid>
        <Grid>
            <Typography sx={{color: '#fff'}}  variant='h5'>Select or create a note</Typography>
        </Grid>
    
    </Grid>
  )
}

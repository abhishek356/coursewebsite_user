import {Typography} from '@mui/material';
import '../App.css'

let Landing =()=>{

 

return(<>
<div >
<Typography 
variant ='poster'
component={"h1"} style = {{
       
        wordSpacing:'2px',
        fontStretch:'ultra-condensed',
        position : 'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%,-50%) scale(1.3,3)'
}}>WELCOME TO COURSEFREE.</Typography>
</div>
</>)
}


export default Landing
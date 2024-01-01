import {AppBar, Typography} from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import  '../App.css'

let Menubar = ()=>{

    let navigate = useNavigate();

    let customMenu = {
        backgroundColor : 'black',
        height : '12vh',
        display : 'flex',
        justifyContent : 'space-between'
    }

    let customColor2 = {
        color : 'white',
        fontSize : '20px',
        marginTop:'18px'
    }

    return(<>
    <div >
    <AppBar style = {customMenu}>
        
        <div style = {{
              display : 'flex',
              justifyContent : 'space-between'
        }}>
        <div>
            <Typography variant = "h5" style = {{
                marginTop : '18px',
                marginLeft : '8px'
            }}>Coursefree</Typography>
        </div>
        
        <div style = {{
            marginRight:'5px',
            fontSize : '20px'
        }}>
        <Button 
        variant = "text"  
        style = {customColor2} 
        size = {'small'}
        onClick={()=>navigate('/SignUp')}
        >Sign up</Button>

        <Button 
        variant = "text"  
        style = {customColor2} 
        size = {'small'}
        onClick = {()=>navigate('/login')}
        >Login</Button>
       
        </div>
        </div>
        
    </AppBar>
    </div>
    </>)
}

export default Menubar;
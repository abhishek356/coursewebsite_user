import { Card, CardContent, TextField, Typography,Button  } from "@mui/material";
import { useState } from "react";
import '../../public/style.css'
import axios from "axios";
import {BASE_URL} from '../utilities/utilites'
import { useNavigate } from "react-router-dom";



let SignUp = ()=>{

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    let navigate = useNavigate();

    let submitSignUp = async () =>{
        try{

            let res = await axios.post(BASE_URL+'/users/signup',{
                username,
                password 

})
        console.log(`successful sign Up,${res}`);
        navigate('/welcome')
        }
        catch(error)
        {
            console.log(error)
        }
     
    }

    let customInput = {

        style :{
            color : 'black',
            
        }
       
    };

    return(
    
    <>
    <center>

    <div style = {{
    display : 'flex',
       justifyContent : 'center',
       alignItems : 'center',
       
    }}>
    <Card  
    
    variant={"outlined"}
    style = {{
            position : 'absolute',
            top : '50%',
            left : '50%',
            transform : 'translate(-50%,-50%)',
            width : '400px',
            height : '50%',
            borderWidth:'2px',
            borderColor : '#a32e9a',
            
    }}
   >    

<CardContent style = {{
    padding : '0px',
    width : '500px',
    position : 'absolute',
    color : 'black'

}}>
    <center>
        
    </center>
<div className = 'customInput'style = {{
marginTop:'50px'
}}>
<Typography variant="h6" style = {{marginBottom :'0px',
marginTop:'30px',
marginRight: '230px',
paddingBottom:'-10px',
fontSize:'15px'}}>
    SignUp below.
</Typography>
<div className = 'customInput' style = {{
    position : 'absolute',
    marginLeft : '85px',
    color :'black',

}}>

<TextField className = 'customInput' 
 label="username" 
 variant="outlined"  
 fullWidth = {true}  
 style = {{
    borderColor : 'black'
}} 
InputProps={{
    color : "secondary"
}}

InputLabelProps={{
    color : 'secondary'
}}

onChange = {(e)=>setUsername(e.target.value)
}/>
        <br/><br/>
<TextField className = 'customInput' 
id="password" 
label="password" 
type = "password" 
variant="outlined" 
fullWidth = {true} 
InputProps={{
    color : 'secondary'
}}

InputLabelProps={{
    color : 'secondary'
}}
style = {{
borderRadius: '0px',
borderColor:'black'
}}
onChange = {(e)=>setPassword(e.target.value)}/>

<br/>
<br/>

<Button variant = "contained" 
size = 'large' 
fullWidth = {true} 
color  = 'secondary'
onClick = {(e)=>{
    submitSignUp()
    console.log(`username is ${username} and password is ${password}`)}}>Sign Up</Button>
</div>
{/* <picture>
    <source media="(min-width: )" srcset="" />
    <img src="" alt="" />
</picture> */}

</div>

</CardContent>
     


    </Card>
</div>
    </center>
    
    </>)
}

export default SignUp;
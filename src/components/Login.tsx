import {Card, CardContent, Typography,Button, TextField} from '@mui/material'
import { BASE_URL } from '../utilities/utilites';
import { useState } from 'react';
import  '../App.css'
import axios from 'axios';
import { userCourses } from '../utilities/atoms/DataAtom';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

let Login = ()=>{

    let [username,setUsername] = useState<string>();
    let [password,setPassword] = useState<string>();
    let setuserCourses = useSetRecoilState(userCourses);
    let navigate = useNavigate();

    let handleUserLogin = async()=>{
        try{
            let res = await axios.post(BASE_URL+'/users/login',{
                username,
                password
            });
 
            console.log(`request received from the backend is ${JSON.stringify(res.data, null, 2)}`)

            localStorage.setItem('token',res.data.token);
            console.log(`the list of couseIds bought by the user is ${res.data.purchasedCourses}`)
            setuserCourses(res.data.purchasedCourses)
            navigate('/purchasedCourses')
        }
        catch(error)
        {
            console.log(`error occured while sending data to the backend to verify user ${error}`)
        }

    }

    return(<>

            <Card variant = {'elevation'} style = {{

                position : 'absolute',
                top : '50%',
                left : '50%',
                transform : 'translate(-50%,-50%)' ,
                width : '500px',
                height: '70vh'

            }}>
                <CardContent>
                    <div  style = {{
                        position:'absolute',
                        marginLeft: '85px',
                        marginTop:'50px'
                    }}>
                    <Typography variant = {'h4'} style = {{
                        color : '#a32e9a'
                    }}>
                            Welcome to Login.

                    </Typography>
                    <br></br>
                    <TextField label = {'username'} 
                    variant = {'outlined'}
                    fullWidth = {true}
                    style = {{
                        color : '#a32e9a'
                    }}
                    InputProps={{
                        color : 'secondary'
                    }}
                    InputLabelProps={{
                        color : 'secondary'
                          }}

                    onChange={(e)=>{
                        setUsername(e.target.value)
                    }}
                />
                    <br/>
                    <br/>
                    <TextField label = {'password'} 
                    variant = {'outlined'}
                    fullWidth = {true}
                    onChange = {(e)=>{
                        setPassword(e.target.value)
                    }}

                    />
                    <br/>
                    <br/>
                    <Button 
                    variant = {'contained'} 
                    size = {'large'}
                    fullWidth = {true}
                    onClick = {()=>{
                        handleUserLogin()
                    }}>
                            submit
                    </Button>
                    </div>
                    
                </CardContent>

            </Card>

    </>)
}


export default Login
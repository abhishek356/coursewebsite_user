import {Card,CardContent,Typography} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

let SignUpCard = ()=>{

let navigate = useNavigate();

setTimeout(()=>{
navigate('/login')
},2000)

    return (

        <>
        <div style = {{
            position : 'absolute',
            left : '50%',
            right :'30%',
            transform : 'translate(-50%,-50%)'
        }}>
            <Card variant = 'elevation' style = {{
                width : '300px',
                height : '200px',
                backgroundColor: 'black'
            }}>
                <Typography variant = {'h5'}
                style = {{
                    position : 'absolute',
                    display : 'flex',
                    justifyContent : 'space-between',
                    top : '50%',
                    left : '50%',
                    transform : 'translate(-50%,-50%) scale(1.3,3)',
                    color : '#a32e9a',
                }}>SignUp Successfull !</Typography>

            </Card>
        </div>
        </>

    )
}

export default SignUpCard;
import {AppBar, Typography} from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import  '../App.css'
import { courseList } from '../utilities/atoms/DataAtom'
import { useRecoilValue } from 'recoil'
//import {SearchItems}  from './SearchItems'
import { useState } from 'react'

let Menubar = ()=>{

    let navigate = useNavigate();
    let allCourses = useRecoilValue(courseList);
    let [listCourse,setlistCourse] = useState<object[]>([]);

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

    let searchCourse = (val:string):void=>{

        let filtereCourses : object[] = allCourses.filter(course=>{
            return course.title.toLowerCase().includes(val.toLowerCase())
        })

        console.log(filtereCourses);
        if(filtereCourses!=undefined)
        {
            setlistCourse(filtereCourses)
        }
        console.log(`the array of list courses contains ${listCourse}`)
    }


    return(<>
    <div >
    <AppBar style = {customMenu}>
        
        <div style = {{
              display : 'flex',
              justifyContent : 'space-between',
              alignItems:'center'
        }}>
        <div>
            <Typography variant = "h5" style = {{
                marginTop : '18px',
                marginLeft : '8px',
                marginRight:'0px'
            }}>Coursefree</Typography>
        </div>

        <div style = {{
            
        }}>
            {/* <TextField label = {'Search Courses'} fullWidth = {true} style = {{
                marginTop:'18px',
                color : 'white'
            }}></TextField> */}
            <input className = 'placeholder-moved' placeholder='Search Course' name = 'courseSearch' id = 'courseSearch' style = {{
                marginTop : '18px',
                height : '6vh',
                backgroundColor : 'black',
                color : 'white',
                width: '500px',
                borderColor:'white',
                borderRadius:'20px'
                
            }} onChange={(event)=>{
                searchCourse(event.target.value)
            
            }}></input>
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
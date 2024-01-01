import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Landing from './components/Landing'
import Menubar from './components/Menubar'
import SignUp from './components/SignUp' 
import SignUpCard from './components/SignUpCard'
import Login from './components/Login'
import './App.css'
import {useEffect} from 'react'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import {courseList} from './utilities/atoms/DataAtom'
import {PurchasedCourses} from './components/PurchasedCourses'
import { BASE_URL } from './utilities/utilites'

export function App() {

  let res;
  let setAllCourse = useSetRecoilState(courseList)
  useEffect(()=>{

    try{

      let fetchCourses = async ()=>{

        res = await axios.post(BASE_URL+'/loadCourses')
        console.log('data received from the backend is',res.data)

        setAllCourse({
          isLoading:false,
          courseList:res.data
        });


      }

      fetchCourses();

    }
    catch(error)
    {
      console.log(error)
    }

  },
  [])

  return (
<>
  <div>
<Router>
  <Menubar/>
  <Routes>
    <Route path = "/" element = {<Landing/>}/>
    <Route path = '/SignUp' element = {<SignUp/>}/>
    <Route path = '/welcome' element = {<SignUpCard/>}/>
    <Route path = '/login' element = {<Login/>}/>
    <Route path = '/purchasedCourses' element = {<PurchasedCourses/>} />
  </Routes>
</Router>
</div>
</>
  )
}


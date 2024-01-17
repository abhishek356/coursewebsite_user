import {atom, RecoilState} from 'recoil'
import { course } from '../Structure'

export let courseList = atom<course[]>({

    key:'courseList',
   //default : [{title : '',description:'',price:'',imageLink:'', published:'',id:0}]
     default :[]
})




// export let UserCourses = atom({
//     key : 'userCourses',
//     default :{
//         UserCourses : []
//     }
// })
import {atom} from 'recoil'
import { purchaseCourseIds } from '../Structure'
// export let courseList = atom({

//     key:'courseList',
//     default : {
//         isLoading:true,
//         allCourses: [{}]
//     }

// })   

export let UserData = atom<purchaseCourseIds>({
    key : 'UserData',
    default : []
    
    
})
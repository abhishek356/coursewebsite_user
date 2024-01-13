import {atom} from 'recoil'

export let courseList = atom({

    key:'courseList',
    default : []

})

// export let UserCourses = atom({
//     key : 'userCourses',
//     default :{
//         UserCourses : []
//     }
// })
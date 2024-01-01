import {atom} from 'recoil'

export const courseList = atom({

    key:'courseList',
    default : {
        isLoading:true,
        allCourses: []
    }

})

export const userCourses = atom({
    key : 'userCourses',
    default :{
        UserCourses : []
    }
})
import { selector } from "recoil";
import {courseList,userCourses} from '../atoms/DataAtom'


export let purchasedCourses  = selector({
    key : 'PURCHASEDCOURSES',
    get : ({get})=>{

        const CourseList = get(courseList);
        const PurchasedCourses = get(userCourses)

        console.log(`the value of course in selector is ${CourseList.allCourses} and ${PurchasedCourses.UserCourses}`)
         
        return (CourseList.allCourses.filter(course=>{
            console.log(`the list of all the courses is ${course}`)
            PurchasedCourses.UserCourses.find(id=>{
                return ''
            })}
        ))
    }
})
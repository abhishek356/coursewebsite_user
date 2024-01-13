import { selector } from "recoil";
import {UserData} from '../atoms/UserCourseData'
import {courseList} from '../atoms/DataAtom'



export let purchasedCourses  = selector({
    key : 'purchasedCourses',
    get : ({get})=>{

        const CourseList = get(courseList);
        const PurchasedCourses = get(UserData)
        const purchasedCourseIds = PurchasedCourses || {};

        console.log( `the value of UserCourses is ${JSON.stringify(purchasedCourseIds)}`)

    //    console.log(`values that are coming from the atoms are ${JSON.stringify(CourseList.allCourses)} and ${JSON.stringify( PurchasedCourses)})}`)

     //  const allCoursesData = CourseList.allCourses && CourseList.allCourses.map(course => course.data);
      const allCoursesData  = CourseList;
      console.log(`the list of purchased courses in the atom is ${typeof(purchasedCourseIds)}`)
      console.log(`the value of allCourseData is ${allCoursesData} and ${JSON.stringify(allCoursesData )}`)

        // console.log(`the value of course in selector is ${JSON.stringify(allCoursesData[1])} and ${PurchasedCourses}
        // and ${typeof(JSON.stringify(allCoursesData))}`)
         
        return (allCoursesData.filter(course=>{
            console.log(`the list of all the courses is ${JSON.stringify(course)} and the value of purchased courses is ${JSON.stringify(PurchasedCourses)} and 
             //type of PurchasedCourses is ${typeof(PurchasedCourses)}`)
            return purchasedCourseIds.includes(course.id);
          }
        ))
         
        
    }
})
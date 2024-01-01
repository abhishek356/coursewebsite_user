import React from 'react'
import { purchasedCourses } from '../utilities/selectors/purchasedCourses'
import { useRecoilValue } from 'recoil'

export let PurchasedCourses = () =>{
let purchased = useRecoilValue(purchasedCourses)
console.log(`purchasedcourses is ${purchasedCourses}`)
    return(<>
    <div>
        <h2>{JSON.stringify(purchased)}</h2>
    </div>
    </>)
}
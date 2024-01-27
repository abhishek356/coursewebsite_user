import React from 'react'
import { course } from '../utilities/Structure'
import {Items} from './items'

export let SearchItems = (items)=>{

console.log(`inside search items the value recieved is ${JSON.stringify(items)}`)

return (<>
<div style = {{
    backgroundColor : 'red',
    position:'absolute',
    marginTop:'99px',
    marginLeft:'469px',
    width : '500px'
}}>
{items.props?(<p>{items.props.map((i:course)=>{
   
   console.log(`the value received from props is ${i}`)
   
   return i.title
})}</p>):(<p></p>)}|
</div>
</>)}
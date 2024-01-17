import React from 'react'
import { course } from '../utilities/Structure'
import {Items} from './items'

export let SearchItems = (items)=>{

console.log(`inside search items the value recieved is ${JSON.stringify(items)}`)

return (<>
<div style = {{
    backgroundColor : 'red',
    position:'absolute',
    marginLeft:'217px',
    width : '500px'
}}>
{items.props?(<p>{JSON.stringify(items.props[0])}</p>):(<p></p>)}|
</div>
</>)}
import {z} from 'zod'



export const credInput = z.object({
    username:z.string().min(1).max(10),
    password:z.string().min(10).max(20)
})
// Initial idea was to define a separate check for user, but then it  was dropped.
export const datatypeUser = z.object({
    username:z.string().min(1).max(10),
    password:z.string().min(10).max(25),
    id:z.array(z.number()).min(1).max(10)
})

export const coursestructure = z.object({
title:z.string().min(1).max(30),
description:z.string().min(10).max(40),
price : z.string().min(1).max(5),
imageLink:z.string().min(1).max(1000),
id:z.number().min(1)
})
 
export type credentialInput = z.infer<typeof credInput>
export type courseStruct = z.infer<typeof coursestructure>
export type userData = z.infer<typeof datatypeUser>
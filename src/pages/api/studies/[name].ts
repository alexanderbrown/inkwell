import * as dotenv from 'dotenv'
dotenv.config()

import { NextApiRequest, NextApiResponse } from "next";

import data from '@/data/sampleData'

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
    const {name} = req.query 
    if (process.env.MODE==='dev'){
        const results = data.filter(study => study.name.toLowerCase()===(name as string).toLowerCase())
        if (results.length===1) {
            return res.status(200).json(results[0])
        } else if (results.length < 1) {
            return res.status(404).send(`No such study: ${name}`)
        } else if (results.length > 1) {
            return res.status(500).send(`Multiple studies found with name ${name}`)
        }
    }
}
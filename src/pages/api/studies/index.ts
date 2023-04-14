import * as dotenv from 'dotenv'
dotenv.config()

import { NextApiRequest, NextApiResponse } from "next";

import data from '@/data/sampleData'

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
    if (process.env.MODE==='dev'){
        return res.status(200).json(data.map(study => study.name))
    } else {
        return res.status(404).send('Unable to obtain data. Have you enabled dev mode?')
    }
}
import * as dotenv from 'dotenv'
dotenv.config()

import { NextApiRequest, NextApiResponse } from "next";

import data from '@/data/sampleData'

export default async (req:NextApiRequest, res:NextApiResponse) => {
    if (process.env.MODE==='dev'){
        return res.status(200).json(data.map(study => study.name))
    }
}
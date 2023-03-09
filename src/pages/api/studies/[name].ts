import path from 'path';
import { promises as fs } from 'fs';

import type { NextApiRequest, NextApiResponse } from 'next'

import { Study } from '@/types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {name} = req.query
    const templateDirectory = path.join(process.cwd(), 'templates');
    const filePath = path.join(templateDirectory, name + '.json')
    const fileContents = await fs.readFile(filePath, 'utf8');
    const studyConfig: Study = JSON.parse(fileContents)
    res.status(200).json(studyConfig);
}

import path from 'path';
import { promises as fs } from 'fs';

import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const templateDirectory = path.join(process.cwd(), 'templates');
    const files = await fs.readdir(templateDirectory)
    const templates = files.filter((file) => file.endsWith('.json')).map((files) => files.replace('.json', ''))
    res.status(200).json(templates);
}

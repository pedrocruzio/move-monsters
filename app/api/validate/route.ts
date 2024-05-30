import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { exec } from 'child_process';

const lessonsDirectory = path.join(process.cwd(), 'lessons');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code, lessonId } = req.body;

    // Read the lesson file to get the expected output
    const fullPath = path.join(lessonsDirectory, `${lessonId}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const expectedOutput = matterResult.data.expected_output;

    // Simulate code execution and validation
    exec(`move run --code '${code}'`, (error, stdout, stderr) => {
      if (error) {
        res.status(400).json({ success: false, error: stderr });
      } else {
        // Validate output
        const isValid = stdout.trim() === expectedOutput.trim();
        res.status(200).json({ success: isValid, output: stdout });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

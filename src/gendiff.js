import { createReadStream } from 'fs';
import * as path from 'path';
import getDiffTree from './diffTree.js';
import parse from './parse.js';
import render from './formaters/index.js';

export default async function renderDiff(filePath1, filePath2, outputFormat = 'stylish') {
  const getFormat = (filePath) => path.extname(filePath).slice(1);
  const getFileData = (filePath) => new Promise((resolve, reject) => {
    const buffer = [];
    createReadStream(filePath, 'utf8')
      .on('error', (err) => reject(err))
      .on('data', (chunk) => buffer.push((chunk)))
      .on('end', () => {
        const format = getFormat(filePath);
        const data = buffer.join();
        resolve(parse(data, format));
      });
  });

  const fileBefore = await getFileData(filePath1);
  const fileAfter = await getFileData(filePath2);

  const tree = getDiffTree(fileBefore, fileAfter);

  return render(tree, outputFormat);
}

import { resolve } from 'path';
import { readFileSync } from 'fs';
import genDiff from './gendiff.js';


const getFixturePath = (filename) => resolve('../', '__fixtures__', filename);
const read = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const fixturesFormates = ['json', 'ini', 'yml'];
const styles = ['json', 'plain', 'stylish'];

styles.forEach((style) => {
  const fileBefore = getFixturePath(`before.${'json'}`);
  const fileAfter = getFixturePath(`after.${'json'}`);
  const tested = genDiff(fileBefore, fileAfter, style);
  const expected = read(`result-${style}.txt`);
  console.log(tested, '////', expected);
});

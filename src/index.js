import { resolve } from 'path';
import { readFileSync } from 'fs';
import genDiff from './gendiff.js';

const getFixturePath = (filename) => resolve('../', '__fixtures__', filename);
const read = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const fixturesFormates = ['json', 'ini', 'yml'];
const styles = ['json', 'plain', 'stylish'];

describe.each(fixturesFormates)('%s', (format) => {
  test(`${format} genDiff test`, () => {
    styles.forEach((style) => {
      const fileBefore = getFixturePath(`before.${format}`);
      const fileAfter = getFixturePath(`after.${format}`);
      const tested = genDiff(fileBefore, fileAfter, style);
      const expected = read(`result-${style}.txt`);
      expect(tested).toEqual(expected);
    });
  });
});

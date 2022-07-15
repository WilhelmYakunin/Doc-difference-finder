import fs from 'fs';
import { join } from 'path';
import genDiff from '../src/gendiff';

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const read = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fixturesFormates = ['json', 'ini', 'yml'];
const styles = ['json', 'plain', 'stylish'];

describe.each(fixturesFormates)('%s', (format) => {
  test(`${format} genDiff test`, () => {
    styles.forEach(async (style) => {
      const fileBefore = getFixturePath(`before.${format}`);
      const fileAfter = getFixturePath(`after.${format}`);
      const tested = await genDiff(fileBefore, fileAfter, style);
      const expected = await read(`result-${style}.txt`);
      expect(tested).toEqual(expected);
    });
  });
});

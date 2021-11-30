import {getFile, partOne, partTwo, processInput} from "./day2020_01";

// eslint-disable-next-line no-undef
const SAMPLE_INPUT = processInput(getFile(__dirname, 'day2020_01_input-sample.txt'));
// eslint-disable-next-line no-undef
const QUESTION_INPUT = processInput(getFile(__dirname, 'day2020_01_input.txt'));

describe('Part One', () => {
  it('returns correct answer for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(514579);
  });
  it('returns correct answer for question input', () => {
    expect(partOne(QUESTION_INPUT)).toBe(1006875);
  });
});

describe('Part Two', () => {
  it('returns correct answer for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(241861950);
  });
  it('returns correct answer for question input', () => {
    expect(partTwo(QUESTION_INPUT)).toBe(165026160);
  });
});


describe('Part Test Cv', () => {
  it('returns correct answer for sample input.', () => {
    console.log("some test");
    const result = partTwo(SAMPLE_INPUT);
    console.log(result);
    expect(partTwo(SAMPLE_INPUT)).toBe(241861950);
  });
  it('returns correct answer for question input', () => {
    expect(partTwo(QUESTION_INPUT)).toBe(165026160);
  });
});



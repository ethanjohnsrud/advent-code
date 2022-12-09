/* Advent of Coding : Climbing Stairs 
https://adventofcode.com/2015/day/1 */

const fs = require('fs');
const INPUT_FILE = './input.txt';

const compute = async() => { 
  const INPUT = Array.from(await readInput(INPUT_FILE));

  //Tracking Fields
  let floor = 0;
  let stepsUntilBasement = 0;

  INPUT.forEach((step, index) => {
      floor += (step === '(') ? 1 
              : (step === ')') ? -1 
              : 0;
      if(floor < 0 
          && stepsUntilBasement === 0)
              stepsUntilBasement = index + 1;
  });

  //Result
  console.log(`Day 1 : Advent of Coding : Climbing Stairs`);
  console.log(`Santa wondered up and down: ${INPUT.length} stairs`); /* 7000 */
  console.log(`Santa finished looking of the Christmas tree on floor: ${floor}`); /* 232 */
  console.log(`Santa submerges to the basement on step: ${stepsUntilBasement}`); /* 1783 */
}

//Utility Method:
const readInput = async(file) => 
  fs.readFileSync(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log('INPUT', data);
});

compute();
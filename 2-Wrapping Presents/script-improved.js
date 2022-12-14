/* Advent of Coding : 2 : Wrapping Presents
https://adventofcode.com/2015/day/2 */

const fs = require('fs');
const assert = require('node:assert').strict;
const INPUT_FILE = './input.txt';

const compute = async() => { 
  const INPUT = await readInput(INPUT_FILE);
  const BOXES = convertToNestedArray(INPUT);

  //Calculate total square footage
  const totalPaper = BOXES.reduce((subtotal, box) => subtotal + calculatePaper(box), 0);
  
  const totalRibbon = BOXES.reduce((subtotal, box) => subtotal + calculateRibbon(box), 0);

  //Result
  console.log(`Day 2 : Advent of Coding : Wrapping Presents`);
  console.log(`Elves need to wrap ${BOXES.length} presents this year`); /* 1000 */
  console.log(`They'll need a total ${totalPaper} square feet of wrapping paper.`); /* 1586300 */
  console.log(`They'll need a total of ${totalRibbon} feet of ribbon.`); /* 3737498 */
}

//Utility Method:
const readInput = async(file) => 
  fs.readFileSync(file, 'utf8', (err, data) => {
    if (err) console.error(err);
});

const formatBox = (line) => {
  const box = line.trim().split('x');
  if(box.length != 3) return null;
  return {
    length: Number.parseInt(box[0]),
    width: Number.parseInt(box[1]),
    height: Number.parseInt(box[2])
  };
}

const convertToNestedArray = (data) => 
  data.split('\n').map((line, index) => 
    formatBox(line))
    .filter((box) => box != null);

const calculatePaper = (box) => (2 * box.length * box.width)
    + (2 * box.width * box.height)
    + (2 * box.height * box.length)
    + calculatePaperExtra(box.length, box.width, box.height); //additional smallest side

  /* Area of Smallest Side*/
  /* Combinations:
  LWH -> Height Max
  WLH -> Height Max
  LHW -> Width Max
  HLW -> Width Max
  WHL -> Length Max
  HWL -> Length Max
  */

const calculatePaperExtra = (l, w, h) => {
  if(l < h && w < h) { //Height Max
    return l * w;

  } else if(l < w && h <= w) { //Width Max
    return l * h;

  } else { //Length Max
    return w * h;
  }
}

const testAreaSmallest = () => {
  assert.equal(calculatePaperExtra(1,2,3), 2);
  assert.equal(calculatePaperExtra(1,1,2), 1);
  assert.equal(calculatePaperExtra(2,1,1), 1);
  assert.equal(calculatePaperExtra(1,2,1), 1);

  console.log("All Smallest Side Area Tests Pass!");
}

const calculateRibbon = (box) => ((2 * calculateRibbonExtra(box.length, box.width, box.height))
    + (box.length * box.width * box.height)); //additional box

const calculateRibbonExtra = (l,w,h) => {
  if(l < h && w < h) { //Height Max
    return l + w;

  } else if(l < w && h <= w) { //Width Max
    return l + h;

  } else { //Length Max
    return w + h;
  }
}

const test = () => {
  assert.equal(calculatePaper(formatBox("2x3x4")), 58, "First Test");
  assert.equal(calculatePaper(formatBox("1x1x10")), 43, "Second Test");

  assert.equal(calculateRibbon(formatBox("2x3x4")), 34, "Third Test");
  assert.equal(calculateRibbon(formatBox("1x1x10")), 14, "Fourth Test");

  console.log("Unit Tests pass!");
}

//Execute
testAreaSmallest();
test();
compute();
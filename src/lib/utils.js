const interleave = (array1, array2) => {
  return array1.map((element, index) => [element, array2[index]]).flat();
};

const createWithNum = (numToCreate, f, ...args) => {
  let arr = [];
  for (let i = 0; i < numToCreate; i++) {
    let iArrs = [i, ...args];
    arr.push(f.apply(iArrs));
  }
  return arr;
};

const utils = { interleave, createWithNum };

export default utils;

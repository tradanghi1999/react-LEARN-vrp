const interleave = (array1, array2) => {
  return array1.map((element, index) => [element, array2[index]]).flat();
};

const createWithNum = (numToCreate, f, ...args) => {
  let arr = [];
  for (let i = 0; i < numToCreate; i++) {
    arr.push(f.apply(args));
  }
  return arr;
};

const utils = { interleave, createWithNum};

export default utils;


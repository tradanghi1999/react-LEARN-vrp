const interleave = (array1, array2) => {
  return array1.map((element, index) => [element, array2[index]]).flat();
};

const utils = {
  
};

export default interleave;

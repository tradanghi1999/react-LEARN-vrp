const interleave = (array1, array2) => {
  result = array1.map((element, index) => [element, array2[index]]).flat();
};

export default interleave;

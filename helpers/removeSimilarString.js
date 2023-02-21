const removeSimilarStrings = (arr) => {
  //   const result = [];
  //   arr.forEach((str) => {
  //     if (!result.some((el) => el.includes(str))) {
  //       result.push(str);
  //     }
  //   });
  //   return result;
  //remove similar strings from an array
  return arr.filter((item, index, self) => self.indexOf(item) === index);
};

module.exports = removeSimilarStrings;

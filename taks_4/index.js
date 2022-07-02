const taks_4 = (num) => {
  // check number cant be negative
  if (num < 0) return "Number cant be negative";

  //comvert number to baçse 6
  let temp;
  let result = [];
  while (num !== 0) {
    temp = num % 6;
    num = (num - temp) / 6;
    result = [temp, ...result];
  }
  return result.join("");
};

console.log("Base 6 : " + taks_4(50));

const taks_3 = (num) => {
  const digitSum = (int) => {
    const intStr = int.toString();
    var sum = 0;
    for (let i = 0; i < intStr.length; i++) {
      sum += parseInt(intStr[i]);
    }
    return sum;
  };

  const search = (string, part) => {
    var result = false;
    for (let i = 0; i < string.length; i++) {
      if (string[i] == part) {
        result = true;
        break;
      }
    }
    return result;
  };

  const isPrintedBull = (int) => {
    const intStr = int.toString();
    var result = false;
    if (int % 4 == 0 || search(intStr, "4") || digitSum(int) % 4 == 0) {
      result = true;
    }
    return result;
  };

  const isPrintedDog = (int) => {
    const intStr = int.toString();
    var result = false;
    if (int % 8 == 0 || search(intStr, "8") || digitSum(int) % 8 == 0) {
      result = true;
    }
    return result;
  };
  const result = [];
  for (let i = 0; i <= num; i++) {
    if (isPrintedBull(i) && isPrintedDog(i)) {
      result.push(`${i} ->  BullDog`);
    } else if (isPrintedBull(i)) {
      result.push(`${i} ->  Bull`);
    } else if (isPrintedDog(i)) {
      result.push(`${i} ->  Dog`);
    } else {
      result.push(`${i} ->  ${i}`);
    }
  }
  return result;
};

console.log(taks_3(100));

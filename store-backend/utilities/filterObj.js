exports.rejectFilter = (arr, obj) => {
  // const newObj = {};

  // Object.keys(obj).forEach((key) => {
  //   let flag = false;
  //   arr.forEach((k) => {
  //     if (k === key) flag = true;
  //   });

  //   if (!flag) {
  //     newObj[key] = obj[key];
  //   }
  // });

  Object.keys(obj).forEach((key) => {
    if (arr.includes(key)) {
      delete obj[key];
    }
  });

  return obj;
};

exports.acceptFilter = (arr, obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    let flag = false;
    arr.forEach((k) => {
      if (k === key) flag = true;
    });

    if (flag) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};

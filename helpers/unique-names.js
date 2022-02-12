const setNames = (property, array) => {
  let data = array.map((e) => {
    return e?.[property].name;
  });

  data = new Set(data);

  data = [...data];

  return data;
};

module.exports = {
  setNames,
};

export const paginate = (data, page, limit) => {
  const result = {};
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  if (endIndex < data.length) {
    result.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    result.previous = {
      page: page - 1,
      limit,
    };
  }

  result.items = data.slice(startIndex, endIndex);
  return result;
};

export const sortDataByName = (data) => {
  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }
  return data.sort(compare);
};

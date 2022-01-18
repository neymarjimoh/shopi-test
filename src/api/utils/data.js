import fs from "fs";
import { Parser } from "json2csv";
import DbModule from "../config/db";

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

// generate random unique identifier without collisions
export const uniqueID = function () {
  let dec2hex = [];
  for (var i = 0; i <= 15; i++) {
    dec2hex[i] = i.toString(16);
  }
  let uuid = "";
  // eslint-disable-next-line no-redeclare
  for (var i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += "-";
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += dec2hex[(Math.random() * 4) | (0 + 8)];
    } else {
      uuid += dec2hex[(Math.random() * 16) | 0];
    }
  }
  return uuid;
};

export const converToCSV = async () => {
  const jsonData = await DbModule.find();
  const fields = Object.keys(jsonData[0]);
  //parse the fields
  const csv = new Parser({ fields }).parse(jsonData);

  // export it to a csv file
  await fs.promises.writeFile("inventory.csv", csv);
  return csv;
};

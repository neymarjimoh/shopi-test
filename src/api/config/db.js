import { writeFile, promises, constants } from "fs";
class DbModule {
  constructor(filename = "db.json") {
    this.filename = filename;
  }

  // returns a promise which resolves true if file is not written:
  writeToFile(filepath, data) {
    return new Promise((resolve) => {
      writeFile(filepath, data, (error) => {
        resolve(!error);
      });
    });
  }

  // checks if file exists or not
  async checkFileExists(filepath) {
    try {
      await promises.access(filepath, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  async connectDB() {
    try {
      // check if file exists
      const fileExists = await this.checkFileExists(this.filename);
      // if exists leave unchanged
      if (fileExists) {
        return console.log("Database file connected");
      }
      // else create new file with an empty array
      const newFile = await this.writeToFile(this.filename, "[]");
      if (newFile) {
        return console.log("Database file created and connected");
      }
    } catch (e) {
      console.log("Error connecting DB file..");
    }
  }

  //   Logic to add data
  async save(data) {
    const items = await this.readFileContent();
    items.push(data);

    // Writing all records back to the file
    await promises.writeFile(this.filename, JSON.stringify(items, null, 2));
    return data;
  }

  async readFileContent() {
    try {
      // Read filecontents of the datastore
      const jsonRecords = await promises.readFile(this.filename, {
        encoding: "utf8",
      });
      // Parsing JSON records in JavaScript
      // object type records
      const objRecord = JSON.parse(jsonRecords);
      return objRecord;
    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
  }

  async findByName(itemName) {
    const items = await this.readFileContent();
    const data = items.filter((item) => item.name === itemName);
    return data[0];
  }

  async findById(itemId) {
    const items = await this.readFileContent();
    const data = items.filter((item) => item.id === itemId);
    return data[0];
  }
}

export default new DbModule("inventory.json");

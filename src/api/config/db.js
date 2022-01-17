import { writeFile, promises, constants, readFile as _readFile } from "fs";
// import appRoot from "app-root-path";

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
  //   async createNewRecord(attributes) {
  //     // Read filecontents of the datastore
  //     const jsonRecords = await promises.readFile(this.filename, {
  //       encoding: "utf8",
  //     });

  //     // Parsing JSON records in JavaScript
  //     // object type records
  //     const objRecord = JSON.parse(jsonRecords);

  //     // Adding new record
  //     objRecord.push(attributes);

  //     // Writing all records back to the file
  //     await promises.writeFile(this.filename, JSON.stringify(objRecord, null, 2));

  //     return attributes;
  //   }
  async readFile(filePath) {
    try {
      const data = await _readFile(filePath);
      console.log(data.toString());
    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
  }
}

export default new DbModule("inventory.json");

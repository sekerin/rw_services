import fs from "fs";

export default class StreamFactory {
  static makeStream(path: string) {
    return fs.createWriteStream(path);
  }
}
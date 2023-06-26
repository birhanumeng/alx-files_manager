const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        this.db = client.db(DB_DATABASE);
      } else {
        this.db = false;
      }
    });
  }

  // check if MongoDB is connected
  isAlive() {
    if (this.db) return true;
    return false;
  }

  // number of documents in users collection
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  // number of documents in file collection
  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;

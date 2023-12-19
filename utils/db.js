const { MongoClient } = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '27017';
const database = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    this.db = null;
    MongoClient.connect(`mongodb://${host}:${port}/${database}`,
      { useUnifiedTopology: true },
      (err, client) => {
        if (err) console.log(err);
        this.db = client.db(database);
        this.db.createCollection('users');
        this.db.createCollection('files');
      });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    const usersCollection = this.db.collection('users');

    const count = await usersCollection.countDocuments();

    return count;
  }

  async nbFiles() {
    const filesCollection = this.db.collection('files');

    const count = await filesCollection.countDocuments();

    return count;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;

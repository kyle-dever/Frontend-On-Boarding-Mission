import mysql from "mysql";

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "127.0.0.1",
      port: "3306",
      user: "root",
      password: "dpqj1231",
      database: "blogDB",
    });
  }

  query = async (sql, args) => {
    return await new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  };
}

export default Database;

import mysql from 'mysql';

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: '10.24.200.245',
      port: '3306',
      user: 'jin',
      password: 'test1234',
      database: 'blogDB',
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

  close = async () => {
    return await new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  };
}

export default Database;

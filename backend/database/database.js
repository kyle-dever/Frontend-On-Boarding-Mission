import { createConnection } from "mysql";

const connection = createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "dpqj1231",
    database: "blogDB",
  });
  
export default connection;
import { createConnection } from "mysql";

const connection = createConnection({
    host: "localhost",
    port: "3306",
    multipleStatements: true,
      typeCast: function (field, next) {
          if (field.type == 'VAR_STRING') {
              return field.string();
          }
          return next();
      },
    user: "root",
    password: "dpqj1231",
    database: "blogDB",
  });
  
export default connection;
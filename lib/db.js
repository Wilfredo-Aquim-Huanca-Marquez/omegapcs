import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",     // tu contraseña de MySQL si tiene
  database: "omegapcs",  // cambia por tu base
});

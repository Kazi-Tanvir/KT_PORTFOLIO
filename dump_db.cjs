// const mysql = require('mysql2/promise');
// const fs = require('fs');

// async function dump() {
//   const connection = await mysql.createConnection('mysql://root:R35T1NP3C3@localhost:3306/portfoliodb');
//   const [tables] = await connection.query('SHOW TABLES');
//   let sql = 'CREATE DATABASE IF NOT EXISTS portfoliodb;\nUSE portfoliodb;\n\n';
  
//   for (const row of tables) {
//     const tableName = Object.values(row)[0];
//     const [createTable] = await connection.query(`SHOW CREATE TABLE ${tableName}`);
//     sql += createTable[0]['Create Table'] + ';\n\n';
    
//     const [rows] = await connection.query(`SELECT * FROM ${tableName}`);
//     if (rows.length > 0) {
//       for (const data of rows) {
//         const values = Object.values(data).map(v => typeof v === 'string' ? connection.escape(v) : (v === null ? 'NULL' : v));
//         sql += `INSERT INTO ${tableName} VALUES (${values.join(', ')});\n`;
//       }
//       sql += '\n';
//     }
//   }
//   fs.writeFileSync('db_dump.sql', sql);
//   console.log('Dump completed successfully!');
//   await connection.end();
// }

// dump().catch(console.error);

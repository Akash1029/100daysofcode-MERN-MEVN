const {Sequelize} = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
   {
     host: process.env.DB_HOST,
     dialect: process.env.DB_CONNECTION,
   }
 );
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

 
module.exports = {sequelize};
// module.exports = sequelize;


// module.exports = connection;
// connection.connect()

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end();

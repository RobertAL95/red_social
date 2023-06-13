require('dotenv').config();

const config = {
  api: {
    port: parseInt(process.env.API_PORT) || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notaSecret'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'mysql',
    user: process.env.MYSQL_USER || 'robert',
    password: process.env.MYSQL_PASS || 'admin123',
    database: process.env.MYSQL_DB || 'my_store'
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3001,
  }
};

module.exports = config;


const client = require('pg').Pool

const DB_URL = 'postgres://odgbyfgxhbrqix:b5b1b41110b190b151dda5f912fcd94391fb9779e6f35c306681d87b049d0239@ec2-54-85-56-210.compute-1.amazonaws.com:5432/d3pecob29d06r4'
const pool = new client({
        connectionString: 'postgres://odgbyfgxhbrqix:b5b1b41110b190b151dda5f912fcd94391fb9779e6f35c306681d87b049d0239@ec2-54-85-56-210.compute-1.amazonaws.com:5432/d3pecob29d06r4',
         ssl: {rejectUnauthorized: false}
        
        });

module.exports = pool;
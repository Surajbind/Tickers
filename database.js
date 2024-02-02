const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tickersdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const storeTickersData = (tickers) => {
  tickers.forEach(ticker => {
    const { name, last, buy, sell, volume, base_unit } = ticker;
    const query = `INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(query, [name, last, buy, sell, volume, base_unit], (error, results, fields) => {
      if (error) {
        console.error('Error storing ticker data in database:', error);
      }
      else {
        console.log(`Successfully stored ${name} ticker data`);
      }
    });
  });
};

const fetchTopTickers = (callback) => {
  const query = 'SELECT * FROM tickers ORDER BY volume DESC LIMIT 10';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching top tickers:', error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = { storeTickersData, fetchTopTickers };

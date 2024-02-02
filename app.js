const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { storeTickersData, fetchTopTickers } = require('./database');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

app.get('/toptickers', async (req, res) => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickersData = response.data;

    const tickers = Object.values(tickersData).map(pair => ({
      name: pair.name,
      last: pair.last,
      buy: pair.buy,
      sell: pair.sell,
      volume: pair.volume,
      base_unit: pair.base_unit
    }));

    tickers.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
    const top10Tickers = tickers.slice(0, 10);

    storeTickersData(top10Tickers);

    res.json(top10Tickers);
  } catch (error) {
    console.error('Error fetching tickers:', error);
    res.status(500).json({ error: 'Error fetching tickers' });
  }
});

app.get('/gettickers', async (req, res) => {
  try {
    fetchTopTickers((error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching top tickers' });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error('Error fetching tickers:', error);
    res.status(500).json({ error: 'Error fetching tickers' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

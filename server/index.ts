require('dotenv').config();
import express from 'express';
const bodyParser = require('body-parser');
import cors from 'cors';
import axios from 'axios';

const app = express();
// Enabling CORS for development
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 8000;
const subdomain = process.env.SUBDOMAIN || '';
const username = process.env.USERNAME || '';
const password = process.env.PASSWORD || '';

const ticketsURL = `https://${subdomain}.zendesk.com/api/v2/tickets.json`;

app.post('/tickets', async (req, res) => {
  let link = req.body ? req.body.link : '';
  let url = link && link !== '' ? link : ticketsURL;

  try {
    const data = await axios
      .get(url, {
        auth: {
          username,
          password,
        },
      })
      .then((response) => response.data);
    res.json(data);
  } catch (err) {
    res.status(err.response.status).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

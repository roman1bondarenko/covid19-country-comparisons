const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(`${__dirname}/dist/covid-stats-comparation`));

app.get('/*', function(req,res) {

  res.sendFile(path.join(`${__dirname}/dist/covid-stats-comparation/index.html`));
});

app.listen(PORT, () => {
  console.log(`Start listening on ${PORT}`);
});

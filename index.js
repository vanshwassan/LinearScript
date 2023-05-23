const express = require('express');
const { updateLinearIssuesById } = require('./linear1');

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Linear Update API Working')
})

app.get('/update', (req, res) => {
  const issueId = req.query.issueId;
  const title = req.query.title;
  const description = req.query.description;

  const result = updateLinearIssuesById(issueId, title, description);

  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
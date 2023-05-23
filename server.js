// server.js
const express = require('express');
const { updateLinearIssuesById } = require('./linear1');

const app = express();
const port = 3000;

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

const express = require('express');
const app = express();
const port = 4000;

const fetch = require('node-fetch');
require("dotenv").config();

const linearApiKey = process.env.LINEAR_API;

async function updateLinearIssuesById(issueId, newIssueTitle, newIssueDescription) {
  const apiUrl = 'https://api.linear.app/graphql';

  const updateQuery = `
  mutation IssueUpdate {
    issueUpdate(
      id: "${issueId}",
      input: {
        title: "${newIssueTitle}",
        description: "${newIssueDescription}",
      }
    ) {
      success
      issue {
        id
        title
        state {
          id
          name
        }
      }
    }
  }
  `;

//   const query = `
//   query Issue {
//     issue(id: "${issueId}") {
//       id
//       title
//       description
//     }
//   }
//   `;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${linearApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: updateQuery,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    // const MainIssue = data.data.issue;

    //   console.log('---');
    //   console.log('ID:', MainIssue.id);
    //   console.log('Title:', MainIssue.title);
    //   console.log('Description:', MainIssue.description);
    return data.data.issue;

  } catch (error) {
    return('Failed to update issue:', error);
  }
}

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
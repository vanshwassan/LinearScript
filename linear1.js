const fetch = require('node-fetch');
require("dotenv").config();

const linearApiKey = process.env.LINEAR_API;

// const issueId = 'TEC-11';
// const newIssueTitle = 'new Updated Issue Title';
// const newIssueDescription = 'new Updated Issue Description';


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

module.exports = {
  updateLinearIssuesById,
};
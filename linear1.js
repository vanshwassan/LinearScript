const fetch = require('node-fetch');

const linearApiKey = '';
const issueId = 'TEC-11';
const newIssueTitle = 'Updated Issue Title';
const newIssueDescription = 'Updated Issue Description';


async function updateLinearIssuesById() {
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

  } catch (error) {
    console.error('Failed to update issue:', error);
  }
}

updateLinearIssuesById();

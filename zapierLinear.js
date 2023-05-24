// This is a script for a zapier code action!

const linearApiKey = ``;
const issueId = inputData.issueId;
const newIssueTitle = inputData.title;
const newIssueDescription = inputData.description;
const apiUrl = 'https://api.linear.app/graphql';

const updateQuery = `
  mutation IssueUpdate {
    issueUpdate(
      id: """${issueId}""",
      input: {
        title: """${newIssueTitle}""",
        description: """${newIssueDescription}""",
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
    return data;
  } catch (error) {
    return error;
}

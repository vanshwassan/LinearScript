const { Linear } = require("@linear/sdk");

const linear = new Linear({
  token: ""
});

async function main() {
// Making a query
    const projects = await linear.query.projects();
    console.log(projects);

    // Creating a new issue through mutation with return value
    const issue = await linear.getIssue(issueId, "{ id project { id } }");
    console.log(issue.project.id);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
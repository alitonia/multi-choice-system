export const Placeholder = props => {
    return (
        <>
            <h1>This is a placeholder</h1>
            <h3>{JSON.stringify(props || {}, null, 2)}</h3>
        </>
    );
};

const payload = context.payload
const issue = payload.issue
const milestone = payload.milestone
const milestone_title = milestone.title

const issue_number = issue.number
console.log(milestone_title, issue_number)

console.log(context.repo)

const addLabels = await github.request('PUT /repos/{owner}/{repo}/issues/{issue_number}/labels', {
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issue_number
    labels: [milestone_title]
})

console.log(addLabels)

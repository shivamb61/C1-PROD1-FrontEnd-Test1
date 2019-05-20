
## Development Environment
### Pre-requisites
1. Install [GIT](https://git-scm.com/downloads)
2. Install [NodeJS](https://nodejs.org/en/download/)

### Setup development sandbox
1. Clone GitHub using following command

    ```git clone https://github.com/comprodls/tests-functional```
2. Install grunt using following command

    ```npm install grunt -g```

### Building and Launching
1. Go to root directory of project and run following command to install required node modules

   ```npm install --no-shrinkwrap```


## Environment Variables
* **Saucelabs_USER_NAME** - Username of saucelabs account on which the tests are running.
* **Saucelabs_ACCESS_KEY** - Access key of saucelabs account on which the tests are running.


## Tests

### Pre-requisites
Install nightwatch using following command

```
npm install nightwatch -g
```

### Executing a Smoke Test
Select 'builder' branch and refer the corresponding readme file for details on test execution.

### Test Report
After test execution, reports can be accessible at ``` reports/index.html ``` in project root directory.


## Making changes (bugs or features)
1. Create a GitHub issue describing the purpose of the change. This change can either be a bug or a brand new feature. Provide as many details as possible.
2. Create a new branch from develop e.g. "feature-search-integration". For more details on branching model and branch naming coventions, please see http://nvie.com/posts/a-successful-git-branching-model/
3. Switch to new branch.
4. Make required changes in branch and commit. In commit message, please mention Github issue number in following format

   ```#[Issue Number]: [Commit Message]```

   Following is an example of a valid commit message:

   ```#1: First Commit for search```
5. You can do as many commits as required for one feature/bug.
6. Push your changes to GitHub.
6. Generate a Pull Request (to develop branch) on GitHub.
7. Await feedback from code review/audit.
8. After pull request is merged, deployment is triggered on development (DEV1) server.

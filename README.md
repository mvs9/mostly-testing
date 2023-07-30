For this task, I chose to use Playwright for its ease of use as well as straightforward reporting.

#### GUIDE TO RUNNING A TEST
1. Navigate to the repository on Github and clone into your local machine: https://github.com/mvs9/mostly-testing
2. Run the below command by either:
    - opening the folder in VS Code and cretaing a new terminal 
    - right clicking on the folder in file explorer and opening a terminal (in the example below, I used Git Bash)

![alt text](test-guide-images\folder_terminal.PNG)
![alt text](test-guide-images\vscode_terminal.PNG)

`npx playwright test`

If that doesn't work, try:
`npx playwright test MostlyTesting.spec.ts`

#### GUIDE TO PRODUCING A REPORT

You can find a report under 'MostlyTesting/playwright-report' either by: 
1. Running the below command to 
`npx playwright show-report playwright-report`

2. Copying the path of the file playwright-report/index.html into your browser.

This should open up a webpage showing the three tests that ran in Chromium, Firefox and Webkit.

![alt text](test-guide-images\report.PNG)

If you want to create a new report, run the command:

`npx playwright test --reporter=html`

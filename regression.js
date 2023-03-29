require('dotenv').config();
const path = require('path');
const newman = require('newman');
let ENV = process.env.ENV || 'QA';
const collectionEnvironment =
  ENV === 'DEV'
    ? process.env.DEV_ENV_UID
    : ENV === 'STG'
    ? process.env.STG_ENV_UID
    : process.env.QA_ENV_UID;

const slackWebhookUrl =
  ENV === 'QA'
    ? process.env.SLACK_QA_URL
    : ENV === 'STG'
    ? process.env.SLACK_STAGE_URL
    : null;

newman.run(
  {
    collection: `https://api.postman.com/collections/${process.env.COLLECTION_UID}?access_key=${process.env.TCS_C_API_KEY}`,
    environment: `https://api.getpostman.com/environments/${collectionEnvironment}?apikey=${process.env.TCS_E_API_KEY}`,
    folder: 'Automated',
    reporters: ['htmlextra', 'cli', 'slackreporter', 'xunit'],
    iterationCount: 1,
    suppressExitCode: true,
    reporter: {
      htmlextra: {
        export: path.join(process.cwd(), `./report/regression${ENV}.html`),
        // template: './template.hbs'
        // logs: true,
        // showOnlyFails: true,
        // noSyntaxHighlighting: true,
        // testPaging: true,
        // browserTitle: "My Newman report",
        // title: "My Newman Report",
        // titleSize: 4,
        // omitHeaders: true,
        // skipHeaders: "Authorization",
        // omitRequestBodies: true,
        // omitResponseBodies: true,
        // hideRequestBody: ["Login"],
        // hideResponseBody: ["Auth Request"],
        // showEnvironmentData: true,
        // skipEnvironmentVars: ["API_KEY"],
        // showGlobalData: true,
        // skipGlobalVars: ["API_TOKEN"],
        // skipSensitiveData: true,
        // showMarkdownLinks: true,
        // showFolderDescription: true,
        // timezone: "Australia/Sydney",
        // skipFolders: "folder name with space,folderWithoutSpace",
        // skipRequests: "request name with space,requestNameWithoutSpace",
        // displayProgressBar: true,
      },
      xunit: {
        export: path.join(process.cwd(), './junit/result.xml'),
      },
      slackreporter: {
        channel: process.env.SLACK_CHANNEL,
        webhookurl: slackWebhookUrl,
        collection: 'TCS-Automated',
        environment: process.env.ENV,
        messageSize: 150,
        buildurl:
          'You can download an HTML report of this run and other details here: ' +
          process.env.BUILD_URL,
      },
    },
  },
  function (err) {
    if (err) {
      throw err;
    }
    console.log('collection run complete!');
  }
);

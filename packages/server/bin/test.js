const { expect } = require('@japa/expect')
const { specReporter } = require('@japa/spec-reporter')
const { processCliArgs, configure, run } = require('@japa/runner')

/*
|--------------------------------------------------------------------------
| Configure tests
|--------------------------------------------------------------------------
|
| The configure method accepts the configuration to configure the Japa
| tests runner.
|
| The first method call "processCliArgs" process the command line arguments
| and turns them into a config object. Using this method is not mandatory.
|
| Please consult japa.dev/runner-config for the config docs.
*/
configure({
  ...processCliArgs(process.argv.slice(2)),
  ...{
    suites: [
        {
            name: 'unit',
            files: ['tests/unit/**/*.spec.js']
        },
        {
            name: 'functional',
            files: ['tests/functional/**/*.spec.js'],
        }
    ],
    files: ['tests/**/*.spec.js'],
    plugins: [expect()],
    reporters: [specReporter()],
    importer: (filePath) => require(filePath),
  },
})

/*
|--------------------------------------------------------------------------
| Run tests
|--------------------------------------------------------------------------
|
| The following "run" method is required to execute all the tests.
|
*/
run()

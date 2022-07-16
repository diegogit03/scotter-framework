import { expect } from '@japa/expect';
import { specReporter } from '@japa/spec-reporter';
import { processCliArgs, configure, run } from '@japa/runner';

configure({
  ...processCliArgs(process.argv.slice(2)),
  ...{
    suites: [
        {
            name: 'unit',
            files: ['tests/unit/**/*.spec.ts']
        },
    ],
    files: ['tests/**/*.spec.ts'],
    plugins: [expect()],
    reporters: [specReporter()],
    importer: (filePath: string) => import(filePath),
  },
})

run()

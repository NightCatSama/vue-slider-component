module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'update',
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'revert',
        'chore',
        'perf',
        'wip',
      ],
    ],
    'subject-case': [0, 'never', ['lower-case']],
  },
}

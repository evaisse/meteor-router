Package.describe({
  name: 'router',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A Meteor hash location based router',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/evaisse/meteor-router',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('router.js');
  api.export('Router', ['client']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('router');
  api.addFiles('router-tests.js');
});

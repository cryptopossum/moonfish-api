const database = require('./database');
const setupFixtures = require('../scripts/setup-fixtures');
const { initialize: initializeEmails } = require('./lib/emails');
const app = require('./app');
const config = require('./lib/config');

const PORT = config.get('bind.port');
const HOST = config.get('bind.host');

module.exports = (async () => {
  await initializeEmails();
  await database();
  await setupFixtures();

  app.listen(PORT, HOST, () => {
    console.log(`Started on port //${HOST}:${PORT}`);
  });

  return app;
})();
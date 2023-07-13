import { AppRunner, joinFilePath } from '@solid/community-server';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

addPodAccounts();

async function addPodAccounts() {
  const app = await new AppRunner().create(
    {
      // Tell Components.js where to start looking for component configurations.
      mainModulePath: joinFilePath(__dirname, '..'),
      // How CSS handles typings conflicts with the Components.js expectations so this needs to be disabled.
      typeChecking: false,
      // We don't want Components.js to create an error dump in case something goes wrong with our test.
      dumpErrorState: false,
    },
    joinFilePath(__dirname, '../node_modules/@solid/community-server/config/file-no-setup.json'),
    // We do not use any custom Components.js variable bindings and set our values through the CLI options below.
    {},
    {
      port: 3000,
      loggingLevel: 'off',
      seededPodConfigJson: 'seeded-pod-config.json',
      rootFilePath: 'pods'
    },
  );

  await app.start();
  await app.stop();
}

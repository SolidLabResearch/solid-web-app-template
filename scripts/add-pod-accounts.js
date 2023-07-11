import { exec } from 'node:child_process';
import fetch from 'node-fetch';

let killingCSS = false;
const css = exec('npx @solid/community-server -c @css:config/file-no-setup.json --seededPodConfigJson seeded-pod-config.json -f pods', (err, stdout, stderr) => {
  if (!killingCSS) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  }
});

const intervalId = setInterval(async () => {
  try {
    const response = await fetch('http://localhost:3000/');

    if (response.ok) {
      killingCSS = true;
      css.kill();
      clearInterval(intervalId);
    }
  } catch (e) {
    // We ignore this error, because we expect to get errors when the server has not started yet.
  }
}, 500);

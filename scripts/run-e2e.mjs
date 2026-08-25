import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const astroCli = fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url));
const playwrightCli = fileURLToPath(
  new URL('../node_modules/@playwright/test/cli.js', import.meta.url),
);

const run = (entry, args, stdio = 'inherit') =>
  spawnSync(process.execPath, [entry, ...args], { stdio }).status ?? 1;

run(astroCli, ['preview', 'stop'], 'ignore');
const started = run(astroCli, ['preview', '--background', '--host', '127.0.0.1', '--port', '4322']);

if (started !== 0) process.exit(started);

let result = 1;
try {
  result = run(playwrightCli, ['test', ...process.argv.slice(2)]);
} finally {
  run(astroCli, ['preview', 'stop']);
}

process.exit(result);

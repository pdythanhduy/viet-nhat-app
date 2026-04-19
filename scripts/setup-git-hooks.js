const { spawnSync } = require('child_process');
const path = require('path');

function runGit(args, quiet = false) {
  const result = spawnSync('git', args, {
    cwd: process.cwd(),
    stdio: quiet ? 'pipe' : 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    return false;
  }

  return true;
}

function main() {
  const hooksPath = '.githooks';
  const cwd = process.cwd().replace(/\\/g, '/');

  const configured =
    runGit(['config', '--local', 'core.hooksPath', hooksPath], true) ||
    runGit(['-c', `safe.directory=${cwd}`, 'config', '--local', 'core.hooksPath', hooksPath]);

  if (!configured) {
    console.error('[bjt-hook] Failed to set core.hooksPath. Run manually:');
    console.error(`git -c safe.directory=${cwd} config --local core.hooksPath .githooks`);
    process.exit(1);
  }

  const fullPath = path.resolve(process.cwd(), hooksPath);
  console.log(`[bjt-hook] Git hooks enabled at: ${fullPath}`);
}

main();

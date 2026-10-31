// Packs the publishable packages and verifies the resulting tarballs, not the workspace sources.
// Run `pnpm build` first. Usage: node scripts/verify-packs.mjs
import { execFileSync, execSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const PACKAGES = ['theme', 'ui'];
const tmp = mkdtempSync(join(tmpdir(), 'monklabs-packs-'));
const failures = [];

try {
  for (const name of PACKAGES) {
    const cwd = join('packages', name);
    execSync(`pnpm pack --pack-destination "${tmp}"`, { cwd, stdio: 'pipe' });
  }
  for (const name of PACKAGES) {
    const dir = join(tmp, name);
    const tgz = `monklabs-${name}-${JSON.parse(readFileSync(join('packages', name, 'package.json'), 'utf8')).version}.tgz`;
    // Relative paths only: GNU tar on Windows treats `C:\...` as a remote host.
    mkdirSync(dir);
    execFileSync('tar', ['-xzf', tgz, '-C', name], { cwd: tmp });
    const root = join(dir, 'package');
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    const check = (ok, message) => ok || failures.push(`@monklabs/${name}: ${message}`);

    const entry = pkg.exports?.['.'];
    for (const [label, file] of [
      ['main', pkg.main],
      ['types', pkg.types],
      ['exports["."].default', entry?.default],
      ['exports["."].types', entry?.types],
    ]) {
      check(
        typeof file === 'string' && existsSync(join(root, file)),
        `${label} -> ${file} is missing`,
      );
    }
    check(!JSON.stringify(pkg).includes('workspace:'), 'contains an unresolved workspace: range');
    check(!existsSync(join(root, 'src')), 'ships src/');
    check(!existsSync(join(root, 'dist', '__tests__')), 'ships tests');
    check(
      pkg.peerDependencies?.react && pkg.peerDependencies?.['react-native'],
      'missing react peers',
    );
    check(
      !pkg.dependencies?.react && !pkg.dependencies?.['react-native'],
      'bundles react as dependency',
    );
    check(!pkg.private, 'is still private');
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(failures.map((f) => `FAIL ${f}`).join('\n'));
  process.exit(1);
}
process.stdout.write(`OK: ${PACKAGES.length} packed artifacts verified.\n`);

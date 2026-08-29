// 扫描 dist 产物中的禁止内容；退出码非 0 即失败。
// 使用大陆手机号正则（1 后跟第二位 3-9 再 9 位数字），不写入任何真实号码原文。
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FORBIDDEN = [new RegExp('1[3-9]\\d{9}')];
const ROOT = fileURLToPath(new URL('../dist', import.meta.url));

let hits = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|css|js|svg|xml|txt|json)$/.test(name)) {
      const text = readFileSync(p, 'utf8');
      for (const f of FORBIDDEN) if (f.test(text)) hits.push(`${p}: ${f}`);
    }
  }
})(ROOT);

if (hits.length) { console.error('FAIL\n' + hits.join('\n')); process.exit(1); }
console.log(`OK: dist 安全扫描通过（检查 ${FORBIDDEN.length} 项禁止内容）`);

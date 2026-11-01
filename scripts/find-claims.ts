import fs from 'fs';
import path from 'path';

const patterns = ['رسمي', 'معتمد', 'خبراء', 'نخبة', 'مستخدم', 'بنوك', 'الأولى', 'تدقيق', 'شهرياً', '100%', 'مرخص'];
const results: { file: string; lineNum: number; pattern: string; text: string }[] = [];

function searchDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') searchDir(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json')) {
      if (file.includes('.test.')) continue;
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        for (const p of patterns) {
          if (line.includes(p)) {
            results.push({ file: path.relative(process.cwd(), fullPath), lineNum: idx + 1, pattern: p, text: line.trim() });
            break;
          }
        }
      });
    }
  }
}

searchDir('src');
console.log('Total matches:', results.length);
results.forEach(r => console.log(`${r.file}:${r.lineNum} [${r.pattern}] -> ${r.text.substring(0, 120)}`));

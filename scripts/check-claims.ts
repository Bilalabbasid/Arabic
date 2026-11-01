import fs from 'fs';
import path from 'path';

const claimPhrases = [
  'معتمد رسمياً',
  'المنصة الرسمية الأولى',
  'الأكثر دقة',
  'نخبة من الخبراء',
  'فريق عمل معتمد',
  'المحاسبين القانونيين',
  '100,000 مستخدم',
  'كبرى البنوك',
  'المحدثة يومياً',
  'خصوصية تامة 100%',
  '100% خصوصية',
  'كافة الدول العربية',
  'جميع الدول العربية',
];

function searchDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') searchDir(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json') || file.endsWith('.md')) {
      if (file.includes('.test.')) continue;
      const content = fs.readFileSync(fullPath, 'utf8');
      claimPhrases.forEach((phrase) => {
        if (content.includes(phrase)) {
          console.log(`FOUND "${phrase}" in ${path.relative(process.cwd(), fullPath)}`);
        }
      });
    }
  }
}

searchDir('src');

import * as esbuild from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { watch as fsWatch } from 'node:fs';

const jsSources = [
  'assets/js/plugins/simple-jekyll-search.min.js',
  'assets/js/plugins/glightbox.min.js',
  'assets/js/_main.js',
  'assets/js/_redirects.js',
];

async function buildJs() {
  const concatenated = (await Promise.all(
    jsSources.map((f) => readFile(f, 'utf8'))
  )).join('\n');

  await writeFile('assets/js/scripts.js', concatenated);

  const { code } = await esbuild.transform(concatenated, {
    minify: true,
    legalComments: 'none',
  });
  await writeFile('assets/js/scripts.min.js', code);

  console.log(`✓ scripts.js + scripts.min.js (${jsSources.length} sources)`);
}

async function buildResume() {
  const resume = JSON.parse(await readFile('resume.json', 'utf8'));
  const themeModule = await import('jsonresume-theme-elegant');
  const render = themeModule.render
    || themeModule.default?.render
    || themeModule.default;
  const html = render(resume);
  await writeFile('resume.html', `---\n---\n${html}`);
  console.log('✓ resume.html (from resume.json)');
}

await Promise.all([buildJs(), buildResume()]);

if (process.argv.includes('--watch')) {
  console.log('watching...');
  for (const src of jsSources) {
    fsWatch(src, () => buildJs().catch(console.error));
  }
  fsWatch('resume.json', () => buildResume().catch(console.error));
}

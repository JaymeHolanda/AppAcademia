const https = require('https');

const categories = ['legs', 'thighs', 'lower-body', 'hip', 'quads', 'leg'];

function fetchSlugs(cat) {
  return new Promise((resolve) => {
    const url = 'https://smartworkout.app/en/exercise-library/' + cat;
    https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Check if page has exercises
        const regex = /exercise-library\/[a-z-]+\/([a-z0-9-]+)/g;
        const slugs = new Set();
        let m;
        while ((m = regex.exec(data)) !== null) {
          slugs.add(m[0]);
        }
        const filtered = [...slugs].filter(s =>
          s.includes('leg') || s.includes('squat') || s.includes('extension') ||
          s.includes('curl') || s.includes('adduct') || s.includes('abduct') ||
          s.includes('hip') || s.includes('calf') || s.includes('hack') ||
          s.includes('kickback') || s.includes('press')
        );
        resolve({cat, slugs: filtered});
      });
    }).on('error', () => resolve({cat, slugs: []}));
  });
}

// Also try the main exercise library page
function fetchMainPage() {
  return new Promise((resolve) => {
    const url = 'https://smartworkout.app/en/exercise-library';
    https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Find all category links
        const regex = /exercise-library\/([a-z-]+)(?=")/g;
        const cats = new Set();
        let m;
        while ((m = regex.exec(data)) !== null) {
          cats.add(m[1]);
        }
        resolve([...cats]);
      });
    }).on('error', () => resolve([]));
  });
}

(async () => {
  console.log('=== All categories on SmartWorkout ===');
  const allCats = await fetchMainPage();
  allCats.forEach(c => console.log('  ' + c));

  for (const cat of categories) {
    const result = await fetchSlugs(cat);
    if (result.slugs.length > 0) {
      console.log('\n=== ' + cat + ' ===');
      result.slugs.forEach(s => console.log('  ' + s));
    }
  }
})();

const https = require('https');
const slugs = ['glutes/seated-hip-abduction', 'glutes/machine-hip-abduction', 'glutes/hip-abduction-machine', 'glutes/lever-seated-hip-abduction', 'glutes/band-seated-hip-abduction'];

function fetchVideo(slug) {
  return new Promise((resolve) => {
    const url = 'https://smartworkout.app/en/exercise-library/' + slug;
    https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const regex = /videoLightUrl":"(https:[^"]+)"/;
        const match = data.match(regex);
        resolve(slug + ' -> ' + (match ? match[1] : 'NOT_FOUND'));
      });
    }).on('error', () => resolve(slug + ' -> ERROR'));
  });
}

(async () => {
  for (const slug of slugs) {
    console.log(await fetchVideo(slug));
  }
})();

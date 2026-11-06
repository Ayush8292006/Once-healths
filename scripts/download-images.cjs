const fs = require('fs');
const path = require('path');
const https = require('https');

const imageList = [
  { name: 'card-b12-folate.webp', url: 'https://unsplash.com/photos/a-close-up-of-a-bunch-of-green-leaves-WZcU0c7zdvs', fallback: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85' },
  { name: 'card-magnesium.webp', url: 'https://unsplash.com/photos/a-close-up-of-nuts-and-nutshells-on-a-table-0aKV9ttdGJQ', fallback: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=85' },
  { name: 'card-energy.webp', url: 'https://unsplash.com/photos/man-running-through-a-grassy-field-with-trees-W8g-xYPYP20', fallback: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=85' },
  { name: 'card-clean.webp', url: 'https://unsplash.com/photos/green-leaf-on-white-background-_mUVHhvBYZ0', fallback: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85' },
  { name: 'card-him-her.webp', url: 'https://unsplash.com/photos/a-couple-happily-cooking-together-in-a-modern-kitchen-xs0_4EN7osM', fallback: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85' },
  { name: 'quality-testing.webp', url: 'https://unsplash.com/photos/scientist-uses-pipette-in-a-laboratory-experiment-HRLTL6bmeow', fallback: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=85' },
  { name: 'quality-sourcing.webp', url: 'https://unsplash.com/photos/green-leaves-with-white-background-qNt82C7Wg1Y', fallback: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=85' },
  { name: 'quality-manufacturing.webp', url: 'https://unsplash.com/photos/pharmaceutical-technician-in-sterile-environment-working-on-production-of-pills-at-pharmacy-factory-YmUbK1SkgIQ', fallback: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85' },
  { name: 'ritual-capsules.webp', url: 'https://unsplash.com/photos/a-person-holding-a-pill-in-their-hand-vPHwsP7lVLY', fallback: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=85' },
  { name: 'ritual-meal.webp', url: 'https://unsplash.com/photos/healthy-breakfast-with-toast-eggs-and-vegetables-2h9_d8JPIO0', fallback: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=85' },
  { name: 'ritual-everyday.webp', url: 'https://unsplash.com/photos/a-woman-standing-in-a-kitchen-preparing-food-jfi9hkQgq1I', fallback: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85' },
  { name: 'lifestyle-women.webp', url: 'https://unsplash.com/photos/woman-performing-yoga-pose-on-mat-in-studio-UbZ1je0X33Q', fallback: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85' },
  { name: 'lifestyle-men.webp', url: 'https://unsplash.com/photos/a-fit-mature-male-runner-with-headphones-running-outdoors-on-the-bridge-in-prague-city-listening-to-music-wm7XapH5iaw', fallback: 'https://images.unsplash.com/photo-1483721074573-586540da5703?auto=format&fit=crop&w=1200&q=85' },
  { name: 'science-capsules.webp', url: 'https://unsplash.com/photos/a-glass-bowl-filled-with-yellow-pills-on-a-white-surface-lrsUEoEaxWs', fallback: 'https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?auto=format&fit=crop&w=1200&q=85' },
  { name: 'science-lab.webp', url: 'https://unsplash.com/photos/scientists-in-lab-coats-working-with-test-tubes-UJHANmlaHwc', fallback: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85' },
  { name: 'story-morning.webp', url: 'https://unsplash.com/photos/a-bowl-of-oatmeal-with-apples-and-a-cup-of-coffee-HwAaFI2_UZ8', fallback: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85' },
];

const targetDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.get({
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchText(new URL(res.headers.location, url).href).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.get({
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(new URL(res.headers.location, url).href, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function processImage(item) {
  const destPath = path.join(targetDir, item.name);
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
    console.log(`[EXISTS] ${item.name}`);
    return;
  }

  let directUrl = null;
  try {
    const html = await fetchText(item.url);
    // Search for images.unsplash.com url in the page
    const matches = html.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-_]+/g);
    if (matches && matches.length > 0) {
      // Pick first matching photo id url
      directUrl = `${matches[0]}?auto=format&fit=crop&w=1200&q=80`;
      console.log(`[FOUND PHOTO] ${item.name} -> ${directUrl}`);
    }
  } catch (err) {
    console.log(`[SCRAPE FAILED] ${item.name} (${err.message})`);
  }

  const finalUrl = directUrl || item.fallback;
  try {
    console.log(`[DOWNLOADING] ${item.name} from ${finalUrl}...`);
    await downloadFile(finalUrl, destPath);
    console.log(`[SUCCESS] Saved ${item.name} (${fs.statSync(destPath).size} bytes)`);
  } catch (err) {
    console.error(`[DOWNLOAD ERROR] ${item.name}: ${err.message}`);
  }
}

async function main() {
  for (const item of imageList) {
    await processImage(item);
  }
  console.log('All image downloads completed!');
}

main();


const fs = require('fs');
const db = JSON.parse(fs.readFileSync('exercises.json'));
const terms = [
    "incline machine", "pec deck", "bent over row", "lat pulldown", "machine shoulder press", "preacher curl", "rope pushdown",
    "seated leg curl", "hack squat", "leg press", "adductor", "hip thrust", "machine chest press", "cable row", "cable fly",
    "v-bar pulldown", "lateral raise", "cable curl", "overhead triceps", "lying leg curl", "leg extension", "stiff leg", "abductor"
];
terms.forEach(t => {
    const match = db.find(e => e.name.toLowerCase().includes(t.toLowerCase()));
    if(match && match.images && match.images.length > 0) {
        console.log(`${t} -> https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${match.images[0]}`);
    } else {
        console.log(`${t} -> NOT FOUND`);
    }
});

const FILE_READER = require("fs");

const YEAR = new Date().getUTCFullYear();

const SEASON_DIR = `season-${YEAR}`;
const IMAGE_DIR = `src/images/${YEAR}`;

const GAMES = [];

function formatGameName(fileName) {

    const nameWithoutExt = fileName.replace(".png", "");

    const words = nameWithoutExt.split("_");

    const capitalized = words.map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    );

    return capitalized.join(" ");
}


if (!FILE_READER.existsSync(SEASON_DIR)) {
    console.log("Season directory not found");
    process.exit(0);
}

if (!FILE_READER.existsSync(IMAGE_DIR)) {
    console.log("Image directory not found");
    process.exit(0);
}


const FOLDERS = FILE_READER.readdirSync(SEASON_DIR);
const IMAGES = FILE_READER.readdirSync(IMAGE_DIR);

FOLDERS.forEach(folder => {

    const gamePath = `${SEASON_DIR}/${folder}/index.html`;

    if (!FILE_READER.existsSync(gamePath)) return;

    const author = folder.replace(/_/g, " ");

    const image = IMAGES.find(img =>
        img.toLowerCase().includes(folder.split("_")[0].toLowerCase())
    );

    const imageName = image || "default.png";

    const gameName = formatGameName(imageName);

    GAMES.push({
        author: author,
        gameName: gameName,
        imageSrc: `../src/images/${YEAR}/${imageName}`,
        altText: gameName,
        link: `../${SEASON_DIR}/${folder}/index.html`
    });

});


GAMES.sort((a, b) => a.gameName.localeCompare(b.gameName));

FILE_READER.writeFileSync(
    `data/gamesData/games-${YEAR}.json`,
    JSON.stringify(GAMES, null, 2)
);

console.log("games json added!!!");
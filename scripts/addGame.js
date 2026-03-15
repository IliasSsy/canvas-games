const FILE_READER = require("fs");
const PATH = require("path");

const YEAR = new Date().getUTCFullYear();

const SEASON_DIR = `season-${YEAR}`;
const IMAGE_DIR = `src/images/${YEAR}`;

const GAMES = [];




function getGameTitle(htmlPath) {

    const html = FILE_READER.readFileSync(htmlPath, "utf8");

    const match = html.match(/<title>(.*?)<\/title>/i);

    if (match && match[1]) {
        return match[1].trim();
    }

    return "Unknown Game";
}


function formatGameName(fileName) {

    const nameWithoutExt = fileName.replace(".png", "");

    const words = nameWithoutExt.split("_");

    const capitalized = words.map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    );

    return capitalized.join(" ");
}


/*
Поиск превью картинки
1) сначала ищет точное совпадение Фамилия_Имя
2) если нет — ищет по фамилии
3) если нет — default.png
*/

function findPreviewImage(images, folder) {

    const fullName = folder.toLowerCase();        
    const surname = folder.split("_")[0].toLowerCase(); 

    let image = images.find(img =>
        img.toLowerCase().startsWith(fullName)
    );

    if (!image) {
        image = images.find(img =>
            img.toLowerCase().startsWith(surname)
        );
    }

    return image || "default.png";
}



function generateGamesJSON() {

    if (!FILE_READER.existsSync(SEASON_DIR)) {
        console.log("Season directory not found");
        process.exit(0);
    }

    if (!FILE_READER.existsSync(IMAGE_DIR)) {
        console.log("Image directory not found");
        process.exit(0);
    }

    const folders = FILE_READER.readdirSync(SEASON_DIR);
    const images = FILE_READER.readdirSync(IMAGE_DIR);

    folders.forEach(folder => {

        const gamePath = PATH.join(SEASON_DIR, folder, "index.html");

        if (!FILE_READER.existsSync(gamePath)) return;

        const author = folder.replace(/_/g, " ");

        const imageName = findPreviewImage(images, folder);

        const gameName = getGameTitle(gamePath);

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
}


function generateSeasonPage() {

    const templatePath = "scripts/seanson-index.html";

    let htmlTemplate = FILE_READER.readFileSync(templatePath, "utf8");

    htmlTemplate = htmlTemplate.replaceAll("{{YEAR}}", YEAR);

    FILE_READER.writeFileSync(
        `${SEASON_DIR}/index.html`,
        htmlTemplate
    );

    console.log("index.html created!!!");
}


function generateMainPage() {

    const seasonFolders = FILE_READER
        .readdirSync(".")
        .filter(name => name.startsWith("season-"));

    const years = seasonFolders
        .map(name => name.replace("season-", ""))
        .sort((a, b) => a - b);

    const cardTemplate = FILE_READER.readFileSync(
        "scripts/season-card.html",
        "utf8"
    );

    let cardsHTML = "";

    years.forEach(year => {

        let card = cardTemplate.replaceAll("{{YEAR}}", year);

        cardsHTML += card + "\n";

    });

    let mainTemplate = FILE_READER.readFileSync(
        "scripts/main-index.html",
        "utf8"
    );

    mainTemplate = mainTemplate.replace("{{SEASON_CARDS}}", cardsHTML);

    FILE_READER.writeFileSync(
        "index.html",
        mainTemplate
    );

    console.log("Main page updated!");
}


function main() {

    generateGamesJSON();

    generateSeasonPage();

    generateMainPage();

}

main();
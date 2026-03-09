async function LoadGamesData(yearNumber) {
    try {
        const response = await fetch(`../data/gamesData/games-${yearNumber}.json`);
        const games = await response.json();

        const container = document.querySelector('.main-div__cards-wrapper');

        games.forEach(game => {
            const gameCardHTML = GameCardTemplate
                .replace('{{author}}', game.author)
                .replace('{{gameName}}', game.gameName)
                .replace('{{imageSrc}}', game.imageSrc)
                .replace('{{altText}}', game.altText)
                .replace('{{link}}', game.link);

            container.insertAdjacentHTML('beforeend', gameCardHTML);
        });

        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('game-card__button')) {
                const link = event.target.getAttribute('data-link');
                if (link) window.location.href = link;
            }
        });

    } catch (error) {
        console.error('Data loading error:', error);
    }
}

function scrollToPos(position) {
    window.scrollTo({top: position, behavior: "smooth"})
}

function RedirectToLink(link) {
    location.href = link;
}
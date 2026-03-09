const GameCardTemplate = `
  <div class="main-div__card">
    <div class="game-card__image-area">
      <img class="game-card__image-area" src="{{imageSrc}}" alt="{{altText}}" loading="lazy">
    </div>
    <div class="game-card__game-info-area">
      <div class="game-card__text-area">
        <p class="game-card__game-info-text">Автор: {{author}}</p>
        <p class="game-card__game-info-text">Игра: {{gameName}}</p>
      </div>
      <div class="main-div__button-wrapper">
        <button class="game-card__button" data-link="{{link}}">Поиграть!</button>
      </div>
    </div>
  </div>
`;
var GAME={  //параметры игрового поля
  width: 800,
  height: 600,
}
  var VRAG = {  //параметры врагов
  enemyLasers: [],
  enemies : [],
  enemy_width: 50,
  number_of_enemies: 16,
  enemy_reload : 0,
}
var SPACESHIP ={  //параметры корабля
  move_right: false,
  move_left: false,
  x_play:0,
  y_play:0,
  spaceship_width: 50,
  shoot: false,
  gameOver: false,
  lasers: [],
  reload : 0,
  KEY_RIGHT: 39,
  KEY_LEFT : 37,
  KEY_SPACE : 32,
}

container = document.querySelector(".main"); // использование контейнеров в main в css

function setPosition(element, x, y) {
  element.style.transform = `translate(${x}px, ${y}px)`; // задает позицию корабля
}

function setSize(element, width) { //задает размеры корабля
  element.style.width = `${width}px`;
  element.style.height = "auto"; 
}

function granica(x){  //границы игрового поля, которые не пересекаются кораблем
  if (x >= GAME.width-SPACESHIP.spaceship_width){
    SPACESHIP.x_play = GAME.width-SPACESHIP.spaceship_width;
  } if (x <= 0){
    SPACESHIP.x_play = 0;
  } else {
    return x;
  }
}

function heatbox(rect1, rect2){ // создание хитбоксов
  return!(rect2.left > rect1.right || 
    rect2.right < rect1.left || 
    rect2.top > rect1.bottom || 
    rect2.bottom < rect1.top);
}

function createEnemy(container, x, y){
  MyEnemy = document.createElement("img");
  MyEnemy.src = "monster.png";  // загрузки изображениея
  MyEnemy.className = "enemy";   // создал класс ememy чтобы овраги были на равном расстоянии друг от друга
  container.appendChild(MyEnemy);
  enemy_reload = Math.floor(Math.random()*100);
  enemy = {x, y, MyEnemy, enemy_reload} // изображение, его x,y, параметр перезарядки
  VRAG.enemies.push(enemy);
  setSize(MyEnemy, VRAG.enemy_width); // назначение размеров
  setPosition(MyEnemy, x, y) // назначение расположения
}

function updateEnemies(container){
  dx = Math.sin(Date.now()/1000)*40; // круговое движение врагов
  dy = Math.cos(Date.now()/1000)*30;
  enemies = VRAG.enemies;
  for (let i = 0; i < enemies.length; i+=1){
    enemy = enemies[i];
    var a = enemy.x + dx;
    var b = enemy.y + dy;
    setPosition(enemy.MyEnemy, a, b); // пложение  врагов исходя из вычислений
    enemy.reload = Math.random(0,100); // случайное время  стрельбы у врагов
    if (enemy.enemy_reload == 0){ //процессе перезарядки врага
      createEnemyLaser(container, a, b);
      enemy.enemy_reload = Math.floor(Math.random()*50)+75 ;
    }
    enemy.enemy_reload -= 0.5; 
  }
}

function createEnemyLaser(container, x, y){ // создание фаербола
  fireball = document.createElement("img");
  fireball.src = "fireball.png";
  fireball.className = "enemyLaser";
  container.appendChild(fireball);//добавление элемента в контейнер
  enemyLaser = {x, y, fireball};//откуда появляется лазер
  VRAG.enemyLasers.push(enemyLaser);
  setPosition(fireball, x, y);
}

function updateEnemyLaser(container){ //отрисовка вражеского лазера
  enemyLasers = VRAG.enemyLasers;
  for(i = 0; i < enemyLasers.length; i+=1){
    enemyLaser = enemyLasers[i];//передвижение фаербола врага
    enemyLaser.y += 2;
    if (enemyLaser.y > GAME.height-30){ //условие удаления вражеского фаербола
      deleteLaser(enemyLasers, enemyLaser, enemyLaser.fireball);
    }
    enemyLaser_grani = enemyLaser.fireball.getBoundingClientRect(); //объект - вражеский лазер
    spaceship_grani = document.querySelector(".player").getBoundingClientRect();// объект-корабля
    if(heatbox(spaceship_grani, enemyLaser_grani)){ // условие проигрыша при попадании врага
      SPACESHIP.gameOver = true;
    }
    setPosition(enemyLaser.fireball, enemyLaser.x + VRAG.enemy_width/2, enemyLaser.y+15);// откуда появляется лазер
  }
}

function createEnemies(container) { //создание врагов
  for(var i = 0; i <= VRAG.number_of_enemies/2; i+=1){
    createEnemy(container, i*80, 100); //1 ряд
  } for(var i = 0; i <= VRAG.number_of_enemies/2; i+=1){
    createEnemy(container, i*80, 180); //2 ряд
  }
}

function createPlayer(container) { // создание игрока
  SPACESHIP.x_play = GAME.width / 2;
  SPACESHIP.y_play = GAME.height - 30;
  player = document.createElement("img");
  player.src = "Spaceship.png"; //загрузка изображения
  player.className = "player";
  container.appendChild(player); //создание игрока
  setPosition(player, SPACESHIP.x_play, SPACESHIP.y_play); // коррекция положение игрока
  setSize(player, SPACESHIP.spaceship_width); // коррекция размеров игрока
}

window.addEventListener("keydown", KeyDown); //при знажатии клавиши
window.addEventListener("keyup", KeyUp); // при опускании пальца с клавиши

function updatePlayer(){ // движение игрока
  if(SPACESHIP.move_left){ //движение влево
    SPACESHIP.x_play -= 3;
  } if(SPACESHIP.move_right){ //движение
    SPACESHIP.x_play += 3;
  } if(SPACESHIP.shoot && SPACESHIP.reload == 0){
    createLaser(container, SPACESHIP.x_play - SPACESHIP.spaceship_width/2, SPACESHIP.y_play);// созддание лазера из "носа" корабля
    SPACESHIP.reload = 30; //  "времени" до перезарядки
  }
  player = document.querySelector(".player");
  setPosition(player, granica(SPACESHIP.x_play), SPACESHIP.y_play-10); //позиция игрока
  if(SPACESHIP.reload > 0){
    SPACESHIP.reload -= 0.5;
  }
}

function KeyDown(event) { //движение корабля при помощи условий (уведел и решил попробовать :) )
  if (event.keyCode === SPACESHIP.KEY_RIGHT) {
    SPACESHIP.move_right = true;
  } else if (event.keyCode === SPACESHIP.KEY_LEFT) {
    SPACESHIP.move_left = true;
  } else if (event.keyCode === SPACESHIP.KEY_SPACE) {
    SPACESHIP.shoot = true;
  }
}

function KeyUp(event) {
  if (event.keyCode === SPACESHIP.KEY_RIGHT) {
    SPACESHIP.move_right = false;
  } else if (event.keyCode === SPACESHIP.KEY_LEFT) {
    SPACESHIP.move_left = false;
  } else if (event.keyCode === SPACESHIP.KEY_SPACE) {
    SPACESHIP.shoot = false;
  }
}

function createLaser(container, x, y){
  bullet = document.createElement("img");
  bullet.src = "bullet.png"; //загрузка картинок
  bullet.className = "laser"; //загрузка лазера в css
  container.appendChild(bullet); //добавляем в контейнер снаряд
  laser = {x, y, bullet};
  SPACESHIP.lasers.push(laser); //добавляем лазер к кораблю
  setPosition(bullet, x, y);
}

function updateLaser(container){
  lasers = SPACESHIP.lasers; // создание лазера
  for(let i = 0; i < lasers.length; i+=1){
    laser = lasers[i];// формирование позиции лазера
    laser.y -= 2;
    if (laser.y < 0){ // удаление лазера,если вышел за поле игры
      deleteLaser(lasers, laser, laser.bullet);
    }
    setPosition(laser.bullet, laser.x, laser.y); //позиция лазера
    laser_napravlenie = laser.bullet.getBoundingClientRect();
    enemies = VRAG.enemies;
    for(j = 0; j < enemies.length; j+=1){
      enemy = enemies[j];
      enemy_rectangle = enemy.MyEnemy.getBoundingClientRect();
      if(heatbox(enemy_rectangle, laser_napravlenie)){ // если лазер попал в хитбокс противникаб
        deleteLaser(lasers, laser, laser.bullet); 
        index = enemies.indexOf(enemy); // находим индекс врага
        enemies.splice(index,1); // удаление врага
        container.removeChild(enemy.MyEnemy);//окончательное удаление "убитого" врага
      }
    }
  }
}

function deleteLaser(lasers, laser, bullet){  //удаление "использованного" лазера
  index = lasers.indexOf(laser);
  lasers.splice(index,1);
  container.removeChild(bullet);
}

createPlayer(container); //создание игрока в контейнере
createEnemies(container); //создание врагов в контейнере

function play(){ // отрисовка объектов в игре
  updatePlayer();
  updateEnemies(container);
  updateLaser(container);
  updateEnemyLaser(container);
  window.requestAnimationFrame(play);

  if (SPACESHIP.gameOver) { //условие вывода в зависимости от исходов игры
    document.querySelector(".lose").style.display = "block";
  } if (VRAG.enemies.length == 0) {
    document.querySelector(".win").style.display = "block";
  }
}

play(); //запуск игры
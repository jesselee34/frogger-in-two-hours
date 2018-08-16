const createCar = (type, row) => ({
  row,
  type,
  col: 0,
});

const createState = () => ({
  speed: 1,
  cars: [],

  frog: {
    x: 11,
    y: 0,
    rotate: 0,
    isAlive: true,
    framesSinceDeath: 0,
  },
  
  keyIsDown: false,
  frame: 0,
});

const frogUp = (state) => {
  if (state.frog.y < 10) {
    state.frog.y += 1;
  }
};

const frogDown = (state) => {
  if (state.frog.y > 0) {
    state.frog.y -= 1;
  }
}

const frogLeft = (state) => {
  if (state.frog.x > 0) {
    state.frog.x -= 1;
  }
};

const frogRight = (state) => {
  if (state.frog.x < 10) {
    state.frog.x += 1;
  }
};

const moveCar = (state, carIndex) => {
  const car = state.cars[i];
  if (car.row % 2 === 0) {
    car.x -= 1;
  } else {
    car.x += 1;
  }
};

const detectHit = (state) => {
  const hitX = state.cars.some(car => car.x === state.frog.x);
  const hitY = state.cars.some(car => car.y === state.frog.y);
  
  if (hitX && hitY) {
    state.frog.isAlive = false;
  }
};

const handleKeyDown = (event, state) => {
  if (state.keyIsDown === false) {
    if (event.key === 'ArrowUp') frogUp(state);
    if (event.key === 'ArrowDown') frogDown(state);
    if (event.key === 'ArrowLeft') frogLeft(state);
    if (event.key === 'ArrowRight') frogRight(state);
    state.keyIsDown = true;
  }
};

const handleKeyUp = (event, state) => {
  state.keyIsDown === false;
};

const updateCars = (state) => {

};

const renderCars = (state, root) => {

};

const renderFrog = (state, root) => {

};

const createStartScreen = () => `
  <div class="start-screen">
    <h1>Highway Crossing Frog</h1>
    <h3>Controls:</h3>
    <ul>
      <li>Up: Arrow Up</li>
      <li>Down: Arrow Down</li>
      <li>Left: Arrow Left</li>
      <li>Right: Arrow Right</li>
      <li>Start Game: Enter</li>
    </ul>
  </div>
`;

const createGameScreen = (state) => `
  <div class="game-screen">
    <div class="grass"></div>
    <div class="road one"></div>
    <div class="road two"></div>
    <div class="grass"></div>
    <div class="road one"></div>
    <div class="road two"></div>
    <div class="grass"></div>
    <div class="road one"></div>
    <div class="road two"></div>
    <div class="grass"></div>
    <div class="frog"></div>
  </div>
`;

const startGame = (root) => {
  const state = createState();

  const keyDown = event => handleKeyDown(event, state);
  const keyUp = event => handleKeyDown(event, state);

  // Handle keys
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);

  const game = {
    gameLoop: null,
    killKeydown: () => window.removeEventListener('keydown', keyDown),
    killKeyup: () => window.removeEventListener('keyup', keyUp),
  };

  const gameScreen = createGameScreen(state);
  renderGameScreen(state, root);

  // Start game loop
  state.gameLoop = setInterval(() => {
    if (state.frog.isAlive === false) {
      endGame(state, game, root);
    }

    if (state.frame % 60 === 0 && state.frog.isAlive === true) {
      updateCars(state);
      renderCars(state, root);
    }

    renderFrog(state, root);
    detectHit(state);

  }, 1000/60);
};

const renderStartScreen = (startScreen, root) => {
  root.innerHTML = startScreen;

  const 

  window.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      window.removeEventListener('keypress');
      startGame();
    }
  });
};

const endGame = (state, game, root) => {
  if (state.frog.framesSinceDeath % 20 === 0) {
    state.frog.rotate += 90;
  }
  
  if (state.frog.framesSinceDeath === 60 * 5) {
    game.gameLoop.clearInterval();
    game.killKeyDown();
    game.killKeyUp();

    const startScreen = createStartScreen();
    renderStartScreen(startScreen, root);
  }
};

// Init
const root = document.querySelector('#root');
const startScreen = createStartScreen();
renderStartScreen(startScreen, root);
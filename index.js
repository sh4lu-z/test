const readline = require('readline');

const WIDTH = 15;
const HEIGHT = 8;

const player = { x: 1, y: 1 };

function createMap(width, height) {
  const grid = [];

  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
        row.push('#');
      } else {
        row.push('.');
      }
    }
    grid.push(row);
  }

  grid[player.y][player.x] = '@';
  grid[height - 2][width - 2] = 'E';

  return grid;
}

function renderMap(grid) {
  console.clear();
  console.log('--- DUNGEON CRAWLER ---');
  console.log('@: Player | E: Exit | #: Wall | .: Floor');
  console.log(`Player: (${player.x}, ${player.y}) | Controls: W/A/S/D | Ctrl+C to exit\n`);

  for (const row of grid) {
    console.log(row.join(' '));
  }
}

const dungeon = createMap(WIDTH, HEIGHT);

function movePlayer(dx, dy) {
  const nextX = player.x + dx;
  const nextY = player.y + dy;

  // Check wall collision
  if (dungeon[nextY][nextX] === '#') {
    return;
  }

  dungeon[player.y][player.x] = '.';
  player.x = nextX;
  player.y = nextY;
  dungeon[player.y][player.x] = '@';

  renderMap(dungeon);
}

// Setup keyboard controls if running interactively
if (process.stdin.isTTY) {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    }

    if (key.name === 'w' || key.name === 'up') movePlayer(0, -1);
    if (key.name === 's' || key.name === 'down') movePlayer(0, 1);
    if (key.name === 'a' || key.name === 'left') movePlayer(-1, 0);
    if (key.name === 'd' || key.name === 'right') movePlayer(1, 0);
  });
}

renderMap(dungeon);

module.exports = { createMap, renderMap, movePlayer, player, dungeon, WIDTH, HEIGHT };

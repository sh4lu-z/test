const readline = require('readline');

const WIDTH = 15;
const HEIGHT = 8;

const player = { x: 1, y: 1, hp: 50, maxHp: 50 };

const enemies = [
  { id: 1, name: 'Goblin', symbol: 'G', hp: 20, maxHp: 20, atk: 5, x: 5, y: 2 },
  { id: 2, name: 'Skeleton', symbol: 'S', hp: 30, maxHp: 30, atk: 8, x: 9, y: 5 }
];

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

function spawnEnemies(grid, enemyList) {
  for (const enemy of enemyList) {
    if (grid[enemy.y][enemy.x] === '.') {
      grid[enemy.y][enemy.x] = enemy.symbol;
    }
  }
}

function getEnemyAt(x, y) {
  return enemies.find(e => e.hp > 0 && e.x === x && e.y === y);
}

function renderMap(grid) {
  console.clear();
  console.log('--- DUNGEON CRAWLER ---');
  console.log('@: Player | G: Goblin | S: Skeleton | E: Exit | #: Wall | .: Floor');
  console.log(`Player: (${player.x}, ${player.y}) HP: ${player.hp}/${player.maxHp} | Controls: W/A/S/D | Ctrl+C to exit\n`);

  for (const row of grid) {
    console.log(row.join(' '));
  }

  console.log('\nEnemies in area:');
  for (const e of enemies) {
    const status = e.hp > 0 ? `HP: ${e.hp}/${e.maxHp} at (${e.x}, ${e.y})` : 'Defeated';
    console.log(`- ${e.name} [${e.symbol}]: ${status}`);
  }
}

const dungeon = createMap(WIDTH, HEIGHT);
spawnEnemies(dungeon, enemies);

function movePlayer(dx, dy) {
  const nextX = player.x + dx;
  const nextY = player.y + dy;

  // Check wall collision
  if (dungeon[nextY][nextX] === '#') {
    return;
  }

  // Block movement if enemy occupies the cell
  if (getEnemyAt(nextX, nextY)) {
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

module.exports = {
  createMap,
  spawnEnemies,
  renderMap,
  movePlayer,
  getEnemyAt,
  player,
  enemies,
  dungeon,
  WIDTH,
  HEIGHT
};

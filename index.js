const WIDTH = 15;
const HEIGHT = 8;

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

  // Initial player and exit positions
  grid[1][1] = '@';
  grid[height - 2][width - 2] = 'E';

  return grid;
}

function renderMap(grid) {
  console.clear();
  console.log('--- DUNGEON CRAWLER ---');
  console.log('@: Player | E: Exit | #: Wall | .: Floor\n');

  for (const row of grid) {
    console.log(row.join(' '));
  }
}

const dungeon = createMap(WIDTH, HEIGHT);
renderMap(dungeon);

module.exports = { createMap, renderMap, WIDTH, HEIGHT };

const readline = require('readline');

const WIDTH = 15;
const HEIGHT = 8;

const player = {
  x: 1,
  y: 1,
  hp: 50,
  maxHp: 50,
  atk: 10,
  gold: 20,
  level: 1,
  xp: 0,
  xpNeeded: 20,
  inventory: []
};

let gameLog = 'Lore: Ancient runes whisper of a dragon imprisoned below... Press T near runes (?) to read lore.';

const ancientRunes = [
  { x: 3, y: 1, symbol: '?', text: 'Rune I: "The dragon fears sharp steel and warrior spirit. Equip well before facing it."' },
  { x: 10, y: 4, symbol: '?', text: 'Rune II: "Potions brewed by the wanderer mend wounds that magic cannot heal."' }
];

const merchant = {
  x: 7,
  y: 3,
  symbol: 'M',
  potionPrice: 10
};

const enemies = [
  { id: 1, name: 'Goblin', symbol: 'G', hp: 20, maxHp: 20, atk: 5, xpYield: 15, goldYield: 10, x: 5, y: 2, isBoss: false },
  { id: 2, name: 'Skeleton', symbol: 'S', hp: 30, maxHp: 30, atk: 8, xpYield: 25, goldYield: 20, x: 9, y: 5, isBoss: false },
  { id: 3, name: 'Dragon Boss', symbol: 'B', hp: 60, maxHp: 60, atk: 14, xpYield: 100, goldYield: 100, x: 12, y: 6, isBoss: true }
];

const chests = [
  { id: 1, x: 3, y: 4, item: { name: 'Health Potion', heal: 25 }, opened: false },
  { id: 2, x: 11, y: 2, item: { name: 'Iron Sword', atkBoost: 5 }, opened: false }
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

function spawnEntities(grid) {
  for (const rune of ancientRunes) {
    if (grid[rune.y][rune.x] === '.') {
      grid[rune.y][rune.x] = rune.symbol;
    }
  }

  if (grid[merchant.y][merchant.x] === '.') {
    grid[merchant.y][merchant.x] = merchant.symbol;
  }

  for (const enemy of enemies) {
    if (grid[enemy.y][enemy.x] === '.') {
      grid[enemy.y][enemy.x] = enemy.symbol;
    }
  }

  for (const chest of chests) {
    if (!chest.opened && grid[chest.y][chest.x] === '.') {
      grid[chest.y][chest.x] = 'C';
    }
  }
}

function getEnemyAt(x, y) {
  return enemies.find(e => e.hp > 0 && e.x === x && e.y === y);
}

function getChestAt(x, y) {
  return chests.find(c => !c.opened && c.x === x && c.y === y);
}

function getRuneAt(x, y) {
  return ancientRunes.find(r => r.x === x && r.y === y);
}

function buyFromMerchant() {
  if (player.gold >= merchant.potionPrice) {
    player.gold -= merchant.potionPrice;
    player.inventory.push('Health Potion');
    gameLog = `Merchant: "May this potion keep you alive against the beast!" (Bought for ${merchant.potionPrice}G).`;
  } else {
    gameLog = `Merchant: "Times are tough, traveler. Bring me ${merchant.potionPrice} gold for a potion."`;
  }
}

function grantRewards(enemy) {
  player.gold += enemy.goldYield;
  player.xp += enemy.xpYield;
  let logAddition = ` Gained ${enemy.xpYield} XP and ${enemy.goldYield} Gold!`;

  if (player.xp >= player.xpNeeded) {
    player.level += 1;
    player.xp -= player.xpNeeded;
    player.xpNeeded = Math.floor(player.xpNeeded * 1.5);
    player.maxHp += 15;
    player.hp = player.maxHp;
    player.atk += 3;
    logAddition += ` LEVEL UP! Now Level ${player.level} (Max HP +15, ATK +3)!`;
  }

  return logAddition;
}

function openChest(chest) {
  chest.opened = true;
  dungeon[chest.y][chest.x] = '.';

  if (chest.item.heal) {
    player.inventory.push(chest.item.name);
    gameLog = `Opened chest! Found ${chest.item.name}. Press H to use.`;
  } else if (chest.item.atkBoost) {
    player.atk += chest.item.atkBoost;
    player.inventory.push(chest.item.name);
    gameLog = `Opened chest! Found ${chest.item.name}! ATK increased to ${player.atk}!`;
  }
}

function usePotion() {
  const index = player.inventory.indexOf('Health Potion');
  if (index === -1) {
    gameLog = 'No Health Potion in inventory!';
    return;
  }

  player.inventory.splice(index, 1);
  player.hp = Math.min(player.maxHp, player.hp + 25);
  gameLog = `Used Health Potion! Restored 25 HP (Current HP: ${player.hp}/${player.maxHp}).`;
}

function attackEnemy(enemy) {
  enemy.hp -= player.atk;

  if (enemy.hp <= 0) {
    enemy.hp = 0;
    dungeon[enemy.y][enemy.x] = '.';
    const rewards = grantRewards(enemy);
    if (enemy.isBoss) {
      gameLog = `VICTORY! The Dragon Boss let out a final roar and perished! The exit (E) is open!${rewards}`;
    } else {
      gameLog = `Victory! Defeated ${enemy.name}!${rewards}`;
    }
    return;
  }

  player.hp -= enemy.atk;
  if (player.hp <= 0) {
    player.hp = 0;
    gameLog = `Defeat! You were struck down by ${enemy.name}... Game Over.`;
    return;
  }

  gameLog = `You strike ${enemy.name} for ${player.atk} DMG! ${enemy.name} lashes out for ${enemy.atk} DMG!`;
}

function renderMap(grid) {
  console.clear();
  console.log('=== REALM OF SHADOWS: DUNGEON CRAWLER ===');
  console.log('@: Player | M: Merchant | B: Boss | G: Goblin | S: Skeleton | ?: Lore Rune | C: Chest | E: Exit');
  console.log(`Player: (${player.x}, ${player.y}) | LVL: ${player.level} | Gold: ${player.gold}G | XP: ${player.xp}/${player.xpNeeded}`);
  console.log(`HP: ${player.hp}/${player.maxHp} | ATK: ${player.atk} | Inv: [${player.inventory.join(', ')}]`);
  console.log(`Controls: WASD | H: Heal | B: Shop | T: Read Lore | Ctrl+C: Quit`);
  console.log(`Log: ${gameLog}\n`);

  for (const row of grid) {
    console.log(row.join(' '));
  }

  console.log('\nEntities:');
  console.log(`- Merchant [M]: At (${merchant.x}, ${merchant.y}) selling Potions (10G)`);
  for (const e of enemies) {
    const status = e.hp > 0 ? `HP: ${e.hp}/${e.maxHp} at (${e.x}, ${e.y})` : 'Defeated';
    const tag = e.isBoss ? ' [BOSS]' : '';
    console.log(`- ${e.name}${tag} [${e.symbol}]: ${status}`);
  }
}

const dungeon = createMap(WIDTH, HEIGHT);
spawnEntities(dungeon);

function movePlayer(dx, dy) {
  if (player.hp <= 0) {
    return;
  }

  const nextX = player.x + dx;
  const nextY = player.y + dy;

  // Check wall collision
  if (dungeon[nextY][nextX] === '#') {
    return;
  }

  // Check rune inspection on walk
  const rune = getRuneAt(nextX, nextY);
  if (rune) {
    gameLog = rune.text;
  }

  // Exit check
  if (dungeon[nextY][nextX] === 'E') {
    const boss = enemies.find(e => e.isBoss);
    if (boss && boss.hp > 0) {
      gameLog = 'The Dungeon Exit is sealed by dragon flames! Defeat the Dragon Boss (B) first!';
      renderMap(dungeon);
      return;
    } else {
      gameLog = 'CONGRATULATIONS! You unlocked the ancient exit and stepped into the sunlight!';
      dungeon[player.y][player.x] = '.';
      player.x = nextX;
      player.y = nextY;
      dungeon[player.y][player.x] = '@';
      renderMap(dungeon);
      return;
    }
  }

  // Check merchant interaction
  if (nextX === merchant.x && nextY === merchant.y) {
    gameLog = `Merchant: "Greetings traveler! Press 'B' to buy a Health Potion for 10G."`;
    renderMap(dungeon);
    return;
  }

  // Attack enemy if occupying cell
  const targetEnemy = getEnemyAt(nextX, nextY);
  if (targetEnemy) {
    attackEnemy(targetEnemy);
    renderMap(dungeon);
    return;
  }

  // Open chest if present
  const chest = getChestAt(nextX, nextY);
  if (chest) {
    openChest(chest);
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
    if (key.name === 'h') {
      usePotion();
      renderMap(dungeon);
    }
    if (key.name === 'b') {
      const isNearMerchant = Math.abs(player.x - merchant.x) <= 1 && Math.abs(player.y - merchant.y) <= 1;
      if (isNearMerchant) {
        buyFromMerchant();
      } else {
        gameLog = 'You must be next to the Merchant (M) to buy!';
      }
      renderMap(dungeon);
    }
    if (key.name === 't') {
      const runeNearby = ancientRunes.find(r => Math.abs(player.x - r.x) <= 1 && Math.abs(player.y - r.y) <= 1);
      if (runeNearby) {
        gameLog = runeNearby.text;
      } else {
        gameLog = 'No ancient runes nearby to decipher.';
      }
      renderMap(dungeon);
    }
  });
}

renderMap(dungeon);

module.exports = {
  createMap,
  spawnEntities,
  renderMap,
  movePlayer,
  attackEnemy,
  ancientRunes,
  merchant,
  player,
  enemies,
  chests,
  dungeon,
  WIDTH,
  HEIGHT
};

// Return a random element from an array.
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Enemies our player must avoid
var Enemy = function() {
    // Starting parameters for enemies.
    this.parameters = {
        'position': [48, 131, 214],
        'speed': [150, 175, 200, 250, 275, 300, 325, 350, 400]
    },
    this.sprite = 'images/enemy-bug.png';
    this.x = -150;
    // Choose random starting row and speed.
    this.y = randomElement(this.parameters.position);
    this.speed = randomElement(this.parameters.speed);
};

Enemy.prototype.update = function(dt) {
    // If enemy is to the right of screen, then move enemy to the left.
    // Also, set random starting row and speed.
    if (this.x > 600) {
        this.x = -150;
        // Choose random starting row and speed.
        this.y = randomElement(this.parameters.position);
        this.speed = randomElement(this.parameters.speed);
    }
    this.x += this.speed * dt;

    // Check for enemy-player collision.
    // It is considered a collision if player is within 30 pixels of an enemy.
    // If enemy collides with player, then reset player.
    if (Math.abs(player.x - this.x) <= 30 && Math.abs(player.y - this.y) <= 30) {
        player.currentScore = 0;
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// The player that the user moves.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.bestScore = 0;
    this.currentScore = 0;
    this.x = 200;
    this.y = 380;
};


// Reset player position to starting position.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.update = function() {
    // If player is on water, then reset player.
    if (this.y === -35) {
        this.currentScore += 1;
        this.reset();
    }

    // Update best score if current is greater.
    if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore;
    }

};

Player.prototype.handleInput = function(key) {
    // If player is on an edge tile, then cannot move off screen.
    if (key === 'left' && this.x !== -2) {
        this.x -= 101;
    } else if (key === 'right' && this.x !== 402) {
        this.x += 101;
    } else if (key === 'up' && this.y !== -35) {
        this.y -= 83;
    } else if (key === 'down' && this.y !== 380) {
        this.y += 83;
    }
};

// Draw the player and score on the screen.
Player.prototype.render = function() {
    // Player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // Score
    ctx.font = '20px arial';
    ctx.clearRect(0, 0, 505, 50);
    ctx.textAlign = 'left';
    ctx.fillText('Best: ' + this.bestScore, 0, 40);
    ctx.textAlign = 'right';
    ctx.fillText(this.currentScore, 505, 40);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

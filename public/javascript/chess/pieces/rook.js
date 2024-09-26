var Rook = function(config) {
    this.type = 'rook';
    Piece.call(this, config); // Call the parent constructor
};

// Inherit from Piece
Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.moveTo = function(targetPosition) {
    // Extract the current position (e.g., 'A1' -> 'A' and 1)
    let currentCol = this.position[0];
    let currentRow = parseInt(this.position[1]);

    // Extract the target position
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Check if the move is horizontal or vertical
    const isHorizontal = (targetCol === currentCol);
    const isVertical = (targetRow === currentRow);

    if (isHorizontal || isVertical) {
        // Valid move, update the position
        this.position = targetCol + targetRow;
        this.render(); // Re-render the piece at the new position
    } else {
        console.warn("Invalid move for the rook.");
    }
};

Rook.prototype.getAvailableMoves = function() {
    let moves = [];
    let currentCol = this.position[0].charCodeAt(0);
    let currentRow = parseInt(this.position[1]);

    // Define the four straight directions
    let directions = [
        {colDir: 1, rowDir: 0},   // right
        {colDir: -1, rowDir: 0},  // left
        {colDir: 0, rowDir: 1},   // up
        {colDir: 0, rowDir: -1}   // down
    ];

    for (let direction of directions) {
        for (let i = 1; i <= 7; i++) {  // maximum 7 steps in any direction
            let newCol = String.fromCharCode(currentCol + i * direction.colDir);
            let newRow = currentRow + i * direction.rowDir;

            // Check if the new position is within the board
            if (newCol >= 'A' && newCol <= 'H' && newRow >= 1 && newRow <= 8) {
                moves.push({col: newCol, row: newRow});
            } else {
                break;  // Stop if we've gone off the board
            }
        }
    }

    return moves;
};

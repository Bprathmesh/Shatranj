var Bishop = function(config){
    this.type = 'bishop';
    Piece.call(this, config);
};

// Inherit from Piece
Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.isValidMove = function(targetPosition){
    let currentCol = this.position[0];
    let currentRow = parseInt(this.position[1]);

    // Extract the target position (e.g., 'F4' -> 'F' and 4)
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Calculate column and row differences
    let colDifference = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDifference = Math.abs(targetRow - currentRow);

    // The bishop can move diagonally, so the column and row differences should be equal
    return (colDifference === rowDifference) 
}

Bishop.prototype.moveTo = function(targetPosition){
    // Extract the current position (e.g., 'C1' -> 'C' and 1)
    let currentCol = this.position[0];
    let currentRow = parseInt(this.position[1]);

    // Extract the target position (e.g., 'F4' -> 'F' and 4)
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Calculate column and row differences
    let colDifference = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDifference = Math.abs(targetRow - currentRow);

    // The bishop can move diagonally, so the column and row differences should be equal
    if (colDifference === rowDifference) {
        // Valid move, update the position
        this.position = targetCol + targetRow;
        this.render(); // Re-render the piece at the new position
    } else {
        console.warn("Invalid move for the bishop.");
    }
};

Bishop.prototype.getAvailableMoves = function() {
    let moves = [];
    let currentCol = this.position[0].charCodeAt(0);
    let currentRow = parseInt(this.position[1]);

    // Define the four diagonal directions
    let directions = [
        {colDir: 1, rowDir: 1},   // up-right
        {colDir: 1, rowDir: -1},  // down-right
        {colDir: -1, rowDir: 1},  // up-left
        {colDir: -1, rowDir: -1}  // down-left
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
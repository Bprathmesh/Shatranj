var King = function(config){
    this.type = 'king';
    Piece.call(this, config); 
};

// Inherit from Piece
King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

King.prototype.moveTo = function(targetPosition){
    // Extract the current position (e.g., 'E1' -> 'E' and 1)
    let currentCol = this.position[0];
    let currentRow = parseInt(this.position[1]);

    // Extract the target position (e.g., 'D2' -> 'D' and 2)
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Calculate column and row differences
    let colDifference = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDifference = Math.abs(targetRow - currentRow);

    // The king can move only one square in any direction
    if (colDifference <= 1 && rowDifference <= 1) {
        // Valid move, update the position
        this.position = targetCol + targetRow;
        this.render(); // Re-render the piece at the new position
    } else {
        console.warn("Invalid move for the king.");
    }
};

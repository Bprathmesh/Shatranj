var Knight = function(config) {
    this.type = 'knight'; // Set the type of the piece
    Piece.call(this, config); // Call the parent constructor (Piece)
};

// Inherit from the Piece class
Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight; // Set the correct constructor

Knight.prototype.isValidMove = function(newPosition) {
        const currentCol = this.position[0]; // Current column (A-H)
        const currentRow = parseInt(this.position[1]); // Current row (1-8)
    
        const targetCol = newPosition.col; // Target column (A-H)
        const targetRow = parseInt(newPosition.row); // Target row (1-8)
    
        // Calculate the differences in the column and row positions
        const colDiff = Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0));
        const rowDiff = Math.abs(currentRow - targetRow);
    
        // A knight moves in an "L" shape: 2 squares in one direction and 1 square in the other
        return ((colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2))
}

// Implement the move logic specific to the Knight
Knight.prototype.moveTo = function(newPosition) {
    const currentCol = this.position[0]; // Current column (A-H)
    const currentRow = parseInt(this.position[1]); // Current row (1-8)

    const targetCol = newPosition.col; // Target column (A-H)
    const targetRow = parseInt(newPosition.row); // Target row (1-8)

    // Calculate the differences in the column and row positions
    const colDiff = Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0));
    const rowDiff = Math.abs(currentRow - targetRow);

    // A knight moves in an "L" shape: 2 squares in one direction and 1 square in the other
    if ((colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2)) {
        // Valid knight move
        this.position = targetCol + targetRow;
        this.render(); // Update the board after moving
        //console.log(Knight moved to ${this.position});
    } else {
        console.warn('Invalid move for a knight');
    }
};

var Bishop = function(config){
    this.type = 'bishop';
    Piece.call(this, config);
};

// Inherit from Piece
Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.isValidMove = function(targetPosition, board){
    let currentCol = this.position[0];
    let currentRow = parseInt(this.position[1]);

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    let colDifference = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDifference = Math.abs(targetRow - currentRow);

    // Check if the move is diagonal
    if (colDifference !== rowDifference) {
        return false;
    }

    // Check for pieces in the path
    let colStep = targetCol > currentCol ? 1 : -1;
    let rowStep = targetRow > currentRow ? 1 : -1;

    let checkCol = currentCol.charCodeAt(0) + colStep;
    let checkRow = currentRow + rowStep;

    while (checkCol !== targetCol.charCodeAt(0) && checkRow !== targetRow) {
        let checkPosition = {
            col: String.fromCharCode(checkCol),
            row: checkRow.toString()
        };
        
        if (board.getPieceAt(checkPosition)) {
            return false; // There's a piece blocking the path
        }

        checkCol += colStep;
        checkRow += rowStep;
    }

    // Check if the target square is occupied by a piece of the same color
    let pieceAtTarget = board.getPieceAt(targetPosition);
    if (pieceAtTarget && pieceAtTarget.color === this.color) {
        return false;
    }

    return true;
};

Bishop.prototype.getAvailableMoves = function(board) {
    let moves = [];
    let currentCol = this.position[0].charCodeAt(0);
    let currentRow = parseInt(this.position[1]);

    let directions = [
        {colDir: 1, rowDir: 1},   // up-right
        {colDir: 1, rowDir: -1},  // down-right
        {colDir: -1, rowDir: 1},  // up-left
        {colDir: -1, rowDir: -1}  // down-left
    ];

    for (let direction of directions) {
        for (let i = 1; i <= 7; i++) {
            let newCol = String.fromCharCode(currentCol + i * direction.colDir);
            let newRow = currentRow + i * direction.rowDir;

            if (newCol >= 'A' && newCol <= 'H' && newRow >= 1 && newRow <= 8) {
                let targetPosition = {col: newCol, row: newRow.toString()};
                
                if (this.isValidMove(targetPosition, board)) {
                    moves.push(targetPosition);
                }

                // Stop if we hit a piece
                if (board.getPieceAt(targetPosition)) {
                    break;
                }
            } else {
                break;
            }
        }
    }

    return moves;
};
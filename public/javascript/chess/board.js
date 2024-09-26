var Board = function(config){
    this.root_id = config.root_id;
    this.$el = document.getElementById(this.root_id);
    this.turn = 'white';
    this.selectedPiece = null;
    this.whitePieces = {};
    this.blackPieces = {};
    this.generateBoardDom();
    this.addListeners();
    this.initiateGame();
    this.renderAllPieces();
}

Board.prototype.switchTurn = function() {
    this.turn = (this.turn === 'white') ? 'black' : 'white';
    console.log("It's now " + this.turn + "'s turn");
};

Board.prototype.addListeners = function(){
    this.$el.addEventListener('click', this.boardClicked.bind(this));
}

Board.prototype.generateBoardDom = function(){
    let boardHTML = '<ul id="game-ct">';
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    for (let col of columns) {
        boardHTML += `<li data-col="${col}"><ul>`;
        for (let row = 1; row <= 8; row++) {
            boardHTML += `<li data-row="${row}"></li>`;
        }
        boardHTML += '</ul></li>';
    }
    
    boardHTML += '</ul>';
    
    this.$el.innerHTML = boardHTML;    
}

Board.prototype.getClickedBlock = function(clickEvent){
    const clickedCell = clickEvent.target.closest('li');
        
    if (clickedCell) {
        const row = clickedCell.getAttribute('data-row');
        const parentLi = clickedCell.closest('li[data-col]');
        const col = parentLi ? parentLi.getAttribute('data-col') : null;
        
        if (row !== null && col !== null) {
            return {
                row: row,
                col: col
            };
        } else {
            console.warn('Unable to determine block coordinates');
        }
    } else {
        console.warn('Clicked element is not within a board square');
    }
}

Board.prototype.clearSelection = function(){
    const allPieces = document.querySelectorAll('.piece');
    allPieces.forEach(piece => {
        piece.classList.remove('selected');
    });
};

Board.prototype.boardClicked = function(event){    
    this.clearSelection();
    const clickedCell = this.getClickedBlock(event);
    
    if (!clickedCell) return;

    const selectedPiece = this.getPieceAt(clickedCell);
    
    if (selectedPiece) {
        if (selectedPiece.color !== this.turn) {
            console.warn("It's not your turn.");
            return;
        }
        this.selectPiece(event.target, selectedPiece);
    } else {
        if (this.selectedPiece) {
            if (this.selectedPiece.color === this.turn) {
                if (this.selectedPiece.isValidMove(clickedCell, this)) {
                    this.movePiece(this.selectedPiece, clickedCell);
                    this.switchTurn();
                } else {
                    console.warn("Invalid move for this piece.");
                }
            } else {
                console.warn("It's not your turn.");
            }
        }
    }    
};

Board.prototype.movePiece = function(piece, targetPosition) {
    let currentPosition = {col: piece.position[0], row: piece.position[1]};
    this.setPieceAt(currentPosition, null);

    let capturedPiece = this.getPieceAt(targetPosition);
    if (capturedPiece) {
        this.removePiece(capturedPiece);
    }

    this.setPieceAt(targetPosition, piece);
    piece.position = targetPosition.col + targetPosition.row;
    piece.render();
};

Board.prototype.setPieceAt = function(position, piece) {
    let col = position.col;
    let row = position.row;
    
    if (piece) {
        if (piece.color === 'white') {
            if (!this.whitePieces[piece.type]) {
                this.whitePieces[piece.type] = {};
            }
            this.whitePieces[piece.type][col + row] = piece;
        } else {
            if (!this.blackPieces[piece.type]) {
                this.blackPieces[piece.type] = {};
            }
            this.blackPieces[piece.type][col + row] = piece;
        }
    } else {
        // Remove piece
        for (let color of ['white', 'black']) {
            let pieces = color === 'white' ? this.whitePieces : this.blackPieces;
            for (let type in pieces) {
                if (pieces[type][col + row]) {
                    delete pieces[type][col + row];
                }
            }
        }
    }
};

Board.prototype.getPieceAt = function(position) {
    let positionStr = position.col + position.row;
    
    for (let color of ['white', 'black']) {
        let pieces = color === 'white' ? this.whitePieces : this.blackPieces;
        for (let type in pieces) {
            if (pieces[type][positionStr]) {
                return pieces[type][positionStr];
            }
        }
    }
    
    return null;
};

Board.prototype.removePiece = function(piece) {
    let position = {col: piece.position[0], row: piece.position[1]};
    this.setPieceAt(position, null);
};

Board.prototype.selectPiece = function(clickedElement, selectedPiece) {
    if (clickedElement.classList.contains('piece')) {
        clickedElement.classList.add('selected');
    } else {
        const parentElement = clickedElement.closest('.piece');
        if (parentElement) {
            parentElement.classList.add('selected');
        }
    }
    selectedPiece.selected = true;
    this.selectedPiece = selectedPiece;
}

Board.prototype.initiateGame = function() {
    const pieceTypes = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook'];
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    // Create pieces for both colors
    for (let color of ['white', 'black']) {
        let row = color === 'white' ? '1' : '8';
        let pawnRow = color === 'white' ? '2' : '7';

        // Create main pieces
        for (let i = 0; i < 8; i++) {
            let pieceType = pieceTypes[i].toLowerCase();
            let position = columns[i] + row;
            let piece = new window[pieceTypes[i]]({ color: color, position: position });
            this.setPieceAt({ col: columns[i], row: row }, piece);
        }

        // Create pawns
        for (let i = 0; i < 8; i++) {
            let position = columns[i] + pawnRow;
            let piece = new Pawn({ color: color, position: position });
            this.setPieceAt({ col: columns[i], row: pawnRow }, piece);
        }
    }
};

Board.prototype.renderAllPieces = function() {
    for (let color of ['white', 'black']) {
        let pieces = color === 'white' ? this.whitePieces : this.blackPieces;
        for (let type in pieces) {
            for (let position in pieces[type]) {
                pieces[type][position].render();
            }
        }
    }
};
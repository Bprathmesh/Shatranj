var Piece = function(config){
    this.position = config.position;
    this.color = config.color;
    if(this.position){
        this.render();        
    }    
}
Piece.prototype.moveTo = function(targetPosition){
    console.log("Method not implemeted by: " + this.type);
}

Piece.prototype.capturePiece = function(targetPiece) {
    console.log("Capturing piece: " + targetPiece.type + " at " + targetPiece.position);

    // Remove the piece from the DOM
    if (targetPiece.$el && targetPiece.$el.parentNode) {
        targetPiece.$el.parentNode.removeChild(targetPiece.$el);
    }

    // Remove the piece from the board's list of pieces
    const pieceList = (targetPiece.color === 'white') ? board.whitePieces : board.blackPieces;
    
    for (let pieceType in pieceList) {
        if (Array.isArray(pieceList[pieceType])) {
            pieceList[pieceType] = pieceList[pieceType].filter(p => p !== targetPiece);
        } else {
            if (pieceList[pieceType] === targetPiece) {
                delete pieceList[pieceType];
            }
        }
    }
};


Piece.prototype.attachListeners = function(){
    //To be implemented
}

Piece.prototype.render = function(){
    var col = this.position[0];
    var row = this.position[1];
    // Find the li element with matching data-col and data-row attributes
    var element = document.querySelector(`[data-col="${col}"] [data-row="${row}"]`);
    if (element) {  
        // Remove the existing piece element from the DOM if it exists
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        // Create a new div element to represent the piece
        var pieceElement = document.createElement('div');
        
        // Add classes to the new element for styling
        pieceElement.classList.add('piece', this.color, this.type);
        
        // Clear any existing content in the cell
        element.innerHTML = '';
        
        // Append the new piece element to the cell
        element.appendChild(pieceElement);
        this.$el = pieceElement;
        this.attachListeners();
    } else {
        console.warn(`Element not found for position: ${this.position}`);
    }
}

Piece.prototype.kill = function(targetPiece){
    console.log("Method not implemeted by: " + typeof(this));
}
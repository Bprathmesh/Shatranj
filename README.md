# Chess Game Implementation

This project implements a chess game using JavaScript. It consists of several files that work together to create a functional chess board with piece movement.

## File Structure

1. `board.js`: Defines the main `Board` class that handles the game logic and board state.
2. `piece.js`: Contains the base `Piece` class from which all specific chess pieces inherit.
3. `chess.js`: Initializes the game by creating a new `Board` instance.
4. Individual piece files (e.g., `pawn.js`, `rook.js`, etc.): Define the behavior for each type of chess piece.

## Main Components

### Board Class (`board.js`)

The `Board` class is responsible for:
- Generating the DOM representation of the chess board
- Managing the game state (piece positions, current turn)
- Handling user interactions (piece selection and movement)
- Implementing game logic (valid moves, piece capture, turn switching)

Key methods:
- `generateBoardDom()`: Creates the HTML structure for the chess board
- `boardClicked()`: Handles click events on the board
- `movePiece()`: Updates the board state when a piece is moved
- `initiateGame()`: Sets up the initial piece positions

### Piece Class (`piece.js`)

The `Piece` class serves as a base class for all chess pieces. It provides common functionality such as:
- Rendering the piece on the board
- Basic movement and capture logic

Key methods:
- `render()`: Updates the visual representation of the piece on the board
- `capturePiece()`: Handles the logic for capturing an opponent's piece

### Chess Piece Classes

Each type of chess piece (Pawn, Rook, Knight, Bishop, Queen, King) has its own class that extends the base `Piece` class. These classes implement the specific movement rules for each piece type.

### Game Initialization (`chess.js`)

This file contains the code to start the game by creating a new `Board` instance and calling `initiateGame()`.


## Customization

You can customize the appearance of the chess board and pieces by modifying the CSS classes used in the `render()` methods of the `Board` and `Piece` classes.



Feel free to contribute to this project by submitting pull requests or reporting issues!

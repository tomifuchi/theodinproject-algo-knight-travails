const { Knight } = require('./knight');

describe('Knight', () => {
  let knight;

  beforeEach(() => {
    knight = new Knight(8, 8);
  });

  it('should return the next valid move for the knight at [3, 4]', () => {
    const expectedValidMoves = [
	[ 1, 3 ],
	[ 1, 5 ],
	[ 2, 6 ],
	[ 4, 6 ],
	[ 5, 5 ],
	[ 5, 3 ],
	[ 4, 2 ],
	[ 2, 2 ]
    ]
    expect(knight.getNextMove([3,4])).toEqual(expectedValidMoves);
  });

  it('should return the next valid move for the knight when at edge', () => {
    const expectedMoveA = [[1,2],[2,1]];
    expect(knight.getNextMove([0, 0])).toEqual(expectedMoveA);
    const expectedMoveB = [[ 5, 1 ], [ 5, 3 ], [ 6, 4 ], [ 6, 0 ] ]
    expect(knight.getNextMove([7, 2])).toEqual(expectedMoveB);
  });

  /* If you are building real chess, use this
  it('should return true if the move is valid', () => {
    const move = [2, 1];
    expect(knight.checkMove(move)).toBe(true);
  });

  it('should return false if the move is not valid, or out of bound', () => {
    const move = [0, 1];
    expect(knight.checkMove(move)).toBe(false);
  });

  it('should return false if the knight is not in a valid position', () => {
    const move = [1, 1];
    knight.currentPos[0] = 0;
    knight.currentPos[1] = 0;
    expect(knight.checkMove(move)).toBe(false);
  });
  */
});


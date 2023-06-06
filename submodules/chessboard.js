//This board only purpose is to display the edge list in sequential 
//and not take in invalid edgelist.
class Board{
	constructor(n, m) {
		this.limY = n;
		this.limX = m;
		this.board = new Array(n);
		for (let i = 0; i < m; i++) {
			this.board[i] = new Array(m).fill(' ');
		}
	}

	printBoard(clean=false) {
		for (let i = 0; i < this.board.length; i++) {
			let row = '';
			for(let j = 0;j < this.board[i].length; j++) {
				row += clean ? `[${this.board[i][j]}] `:`[(${i},${j}) ${this.board[i][j]}] `
			}
			console.log(row);
		}
	}

	//From edgelist, will print the step like [0,0], [2,1], [4,0] as below
	//Either clean
	//[1] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
	//[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
	//[ ] [2] [ ] [ ] [ ] [ ] [ ] [ ]
	//[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
	//[3] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
	//[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
	//[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
	//[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
	//Or display the vertices, If the knight is at (3,4) all the ABC's are valid moves
	//[(0,0)  ] [(0,1)  ] [(0,2)  ] [(0,3)  ] [(0,4)  ] [(0,5)  ] [(0,6)  ] [(0,7)  ]
	//[(1,0)  ] [(1,1)  ] [(1,2)  ] [(1,3) A] [(1,4)  ] [(1,5) B] [(1,6)  ] [(1,7)  ]
	//[(2,0)  ] [(2,1)  ] [(2,2) H] [(2,3)  ] [(2,4)  ] [(2,5)  ] [(2,6) C] [(2,7)  ]
	//[(3,0)  ] [(3,1)  ] [(3,2)  ] [(3,3)  ] [(3,4) O] [(3,5)  ] [(3,6)  ] [(3,7)  ]
	//[(4,0)  ] [(4,1)  ] [(4,2) G] [(4,3)  ] [(4,4)  ] [(4,5)  ] [(4,6) D] [(4,7)  ]
	//[(5,0)  ] [(5,1)  ] [(5,2)  ] [(5,3) F] [(5,4)  ] [(5,5) E] [(5,6)  ] [(5,7)  ]
	//[(6,0)  ] [(6,1)  ] [(6,2)  ] [(6,3)  ] [(6,4)  ] [(6,5)  ] [(6,6)  ] [(6,7)  ]
	//[(7,0)  ] [(7,1)  ] [(7,2)  ] [(7,3)  ] [(7,4)  ] [(7,5)  ] [(7,6)  ] [(7,7)  ]
	//

	//A [ 1, 3 ]
	//B [ 1, 5 ]
	//C [ 2, 6 ]
	//D [ 4, 6 ]
	//E [ 5, 5 ]
	//F [ 5, 3 ]
	//G [ 4, 2 ]
	//G [ 2, 2 ]

	passEdgeList(list) {
		if(this.checkEdgeList(list)) {
			list.forEach((edge, i) => {
				this.board[edge[0]][edge[1]] = i + 1;
			});
		} else console.error('Out of bound move in list!!');
	}

	//Modify to return the false edge if wanted to
	checkEdgeList(list) {
		for(let i = 0;i < list.length;i++) {
			if(!(list[i][0] >= 0 && list[i][0] < this.limY && list[i][1] >= 0 && list[i][1] < this.limX))
				return false;
		}
		return true;
	}

	//Clean the board
	wipeBoard() {
		for (let i = 0; i < this.limY; i++) {
			for(let j = 0;j < this.limX; j++) {
				this.board[i][j] = ' ';
			}
		}
	}
}

module.exports = {Board};

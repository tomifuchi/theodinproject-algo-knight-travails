const {BST, prettyPrint, inOrderRecur} = require('./dependencies/bst');
const {Knight} = require('./submodules/knight');
const {Board} = require('./submodules/chessboard');

//Sources to read
//https://en.wikipedia.org/wiki/Knight%27s_graph
//https://chess.stackexchange.com/questions/34588/how-many-moves-needed-for-a-knight-to-go-from-any-square-to-any-other-square
//https://en.wikipedia.org/wiki/Shortest_path_problem

//We will do edgelist for this exercise.
class Graph {
	//Takes in an edgelist as default stored in a binary search tree
	constructor(el) {
		this.list = new BST(el, (a, b) => {
			if(a[0] == b[0]) {
				if(a[1] < b[1]) return -1;
				else if (a[1] > b[1]) return 1;
				else return 0;
			} else {
				if(a[0] < b[0]) {
					return -1;
				} else if (a[0] > b[0]) return 1;
				else return 0;
			}
		})
	}

	getAdjacents() {
	}
}

//knight on a 8x8 chessboard starting at [0, 0] or top left of playing board
const k = new Knight(8, 8, [0, 0]);


//Get all possible move for each vertex
const allPossibleKnightMoves = []
function explore() {
	for(let i = 0;i < 8;i++){
		for(let j = 0;j < 8;j++) {
			allPossibleKnightMoves.push(k.getNextMove([i, j]))
		}
	}
}
explore();

const g = new Graph(allPossibleKnightMoves.flat())
prettyPrint(g.list.root);

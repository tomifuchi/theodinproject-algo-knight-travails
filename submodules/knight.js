const {LinkedList} = require('../dependencies/LinkedList'); //Queue using linked list
const {BST} = require('../dependencies/bst');

//for this exercise the commented out shouldn't be needed. if you are making 
//real chess. It's advise to use the extra propertises
class Knight {
	//Knight for n x m playing board
	//constructor(n, m, currentPos) {
	constructor(n, m) {
		//this.moves = [currentPos]; //Moves made
		//this.currentPos = currentPos; //Starting position
		this.limX = m; //Column
		this.limY = n; //Row
	}

	//It can be any position not necessarily knight's current.
	//because it still checks 8x8 it will return [] if bullshits are detected.
	getNextMove(currentPos) {
		if(this.checkValidBound(currentPos)) {
			const nextValidMoves = [];
			//Should go 2 steps up or down then 1 step left or right then two to the left and right.
			const knightMoves = [
				[currentPos[0] - 2,currentPos[1] - 1], //A
				[currentPos[0] - 2,currentPos[1] + 1], //B
				[currentPos[0] - 1,currentPos[1] + 2], //C
				[currentPos[0] + 1,currentPos[1] + 2], //D
				[currentPos[0] + 2,currentPos[1] + 1], //E
				[currentPos[0] + 2,currentPos[1] - 1], //F
				[currentPos[0] + 1,currentPos[1] - 2], //G
				[currentPos[0] - 1,currentPos[1] - 2]  //H
			]
			knightMoves.forEach(move => {if(this.checkValidBound(move)) nextValidMoves.push(move)})

			return nextValidMoves;
		}
	}

	/*
	move(nextMove) {
		if(this.getNextMove(this.currentPos)checkMove(nextMove)) {
			this.moves.push(nextMove);
			this.currentPos = nextMove;
		}
	}*/

	checkValidBound(nextMove) {
		return (
			nextMove[0] >= 0 && nextMove[0] < this.limY
			&&
			nextMove[1] >= 0 && nextMove[1] < this.limX
		);
	}
	
	//In theory. if every positions on the chessboard are accessable or every vertice are connected.
	//that would mean this is an undirected graph, and from the current position to the position we wanted to get to we can use BFS.
	//https://www.khanacademy.org/computing/computer-science/algorithms/breadth-first-search/a/breadth-first-search-and-its-uses
	explore(start, dest) {
		if(this.checkValidBound(start) && this.checkValidBound(dest)){
			const visited = [];
			const q = new LinkedList();
			q.append(start);
			visited.push({pred: null, v: start});

			while(!q.isEmpty()) {
				const cur = q.removeAt(0);
				const validMoves = this.getNextMove(cur)
				//console.log('Considering move: ', cur);

				//If not visited
				for(let i = 0;i < validMoves.length;i++){
					const nextMove = validMoves[i];
					//console.log('Consider valid move: ', nextMove);

					if(nextMove[0] == dest[0] && nextMove[1] == dest[1]){
						//console.log('FOUND!')
						visited.push({pred: cur, v: nextMove});
						return visited;
					}

					if(visited.findIndex((visited) => nextMove[0] == visited[0] && nextMove[1] == visited[1]) == -1){
						visited.push({pred: cur, v: nextMove});
						q.append(nextMove);
					}


				}
			}
			//Should not get here since the destination should be found
			return [];
		}
	}

	//Have to search through a list, use bst here if you wanted to
	static backtrack(list, start, dest) {
		function cpr (a , b) {
			return (a[0] == b[0] && a[1] == b[1]);
		}

		let arr = [];
		let cur = list[list.length - 1];
		arr.push(cur);
		while(true) {
			if(cpr(cur.v, start)) 
				break;

			const pred = list.find(move => {
				//console.log(move);
				return cpr(cur.pred,move.v)
			})
			arr.push(pred);
			cur = pred;
		}

		return arr.map(move => move.v).reverse();
	}

	shortestPath(start, dest) {
		const el = this.explore(start, dest)
		const p = Knight.backtrack(el, start, dest)

		return p;
	}
}

module.exports = {Knight}

const {LinkedList} = require('../dependencies/LinkedList');
const {Board} = require('./chessboard');
const {BST, prettyPrint, levelOrderIter} = require('../dependencies/bst');

//for this exercise the not commented out if sufficient
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
		const nextValidMove = [];
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

		knightMoves.forEach(move => {if(this.checkOutOfBound(move)) nextValidMove.push(move)})

		return nextValidMove;
	}

	/*
	move(nextMove) {
		if(this.getNextMove(this.currentPos)checkMove(nextMove)) {
			this.moves.push(nextMove);
			this.currentPos = nextMove;
		}
	}*/

	checkOutOfBound(nextMove) {
		return (
			nextMove[0] >= 0 && nextMove[0] < this.limY
			&&
			nextMove[1] >= 0 && nextMove[1] < this.limX
		);
	}
}

//In theory. if every position in the chessboard is accessable or a vertex in a graph
//that would mean it's an undirected graph from the current position to the position we wanted to get to.
//they are connected. So we can ulitilzed BFS to get to where we wanted to go.
function explore(k, start, dist){
	const visited = [];
	const q = new LinkedList();
	q.append(start);
	visited.push({pred: null, v: start});

	while(!q.isEmpty()) {
		const cur = q.removeAt(0);
		const validMoves = k.getNextMove(cur)
		//console.log('Considering move: ', cur);

		//If not visited
		for(let i = 0;i < validMoves.length;i++){
			const currentMove = validMoves[i];
			//console.log('Consider valid move: ', currentMove);

			if(currentMove[0] == dist[0] && currentMove[1] == dist[1]){
				//console.log('FOUND!')
				visited.push({pred: cur, v: currentMove});
				return visited;
			}

			if(visited.findIndex((visited) => currentMove[0] == visited[0] && currentMove[1] == visited[1]) == -1){
				visited.push({pred: cur, v: currentMove});
				q.append(currentMove);
			}
		}
	}
}

function cpr (a , b) {
	return (a[0] == b[0] && a[1] == b[1]);
}

//Use if found dist should at the end
function backtrack(list, start, dist) {
	arr = [];
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
	//console.log(arr);
	let barr = arr.map(move => move.v).reverse();
	return barr;
}

function shortestPath(n, m, start, dist) {
	const k = new Knight(n,m);
	const el = explore(k, start, dist)
	const p = backtrack(el, start, dist)

	return p;
}
console.log(shortestPath(8, 8, [3, 4], [0, 0]));

module.exports = {shortestPath}

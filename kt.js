const {Knight} = require('./submodules/knight');
const {Board} = require('./submodules/chessboard');

//Sources to read
//https://en.wikipedia.org/wiki/Knight%27s_graph
//https://chess.stackexchange.com/questions/34588/how-many-moves-needed-for-a-knight-to-go-from-any-square-to-any-other-square
//https://en.wikipedia.org/wiki/Shortest_path_problem

const dim = {n: 8, m: 8}
const start = [3, 4]; 
const dest  = [0, 0];

const k = new Knight(dim.n, dim.m); //Make an 8x8 knight
const b = new Board(dim.n, dim.m); //Make to display 8x8 board that display edgelist in sequence.
const p = k.shortestPath(start, dest); //Get shortest path in edge list format
b.passEdgeList(p); //Pass to the board to be display

console.log(`Path from ${start} to ${dest} on an ${dim.n}x${dim.m} chess board using a knight`);
b.printBoard(); //Print the board out

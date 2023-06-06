const {Knight, checkLegitPath} = require('./submodules/knight');
const {Board} = require('./submodules/chessboard');

//Additional sources to read
//https://en.wikipedia.org/wiki/Knight%27s_graph
//https://chess.stackexchange.com/questions/34588/how-many-moves-needed-for-a-knight-to-go-from-any-square-to-any-other-square
//https://en.wikipedia.org/wiki/Shortest_path_problem
//https://www.khanacademy.org/computing/computer-science/algorithms/breadth-first-search/a/breadth-first-search-and-its-uses

const dim = {n: 8, m: 8}
const start = [0, 0]; 
const dest  = [7, 7];

const k = new Knight(dim.n, dim.m); //Make an 8x8 knight
const b = new Board(dim.n, dim.m); //Make to display 8x8 board that display edgelist in sequence.
const p = k.shortestPathTree(start, dest); //Get shortest path in edge list format
console.log('Legit path ?: ', checkLegitPath(dim.n, dim.m, p));
b.passEdgeList(p); //Pass to the board to be display

console.log(`Path from ${start} to ${dest} on an ${dim.n}x${dim.m} chess board using a knight, total ${p.length - 1} step(s)`);
b.printBoard(); //Print the board out

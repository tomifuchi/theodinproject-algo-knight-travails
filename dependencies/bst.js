const {LinkedList} = require('./LinkedList'); // Used as a queue, update linkedlist to keep track of tail to append quicker, for breadth-first traversal
const {merge_sort} = require('./merge_sort'); //Stack is already built in used for depth-first traversal, or recursion
const uniq = require('uniq');

//Simple implementation of tree
class Node {
	constructor(value, left=null, right=null) {
	    this.value = value;
	    this.left = left
	    this.right = right;
	}
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//Read this to deal with comparing function that's in congruent
//This is for number
function defaultCompareFn(a, b) {
	if(a < b) {
		return -1;
	}
	else if(a > b) {
		return 1;
	}
	return 0;
}

class BST{
	#compFn;
	constructor(arr=[], compFn = defaultCompareFn) {
		//Note:
		//This doesn't work Arry.from(new Set(arr)).sort();
		//const tree = new BST([4, 1, 1, 9, 27, -1, -5, -7, 2, 0, 3, 7, 9]);
		//Try it you will see that the array it sorted wrong.
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
		//Be sure to pass compare function to sort to correct this behavior
		this.#compFn = compFn;
		this.root = this.buildTree(arr);
	}

	buildTree(arr)
	{ 
		//Sort first
		arr = merge_sort(arr, this.#compFn);
		//Remove duplicate
		uniq(arr, this.#compFn, true)

		function buildTreeTraverse(arr, start, end) {
			if(start > end)
			    return null;

			const mid = parseInt((start + end)/2)
			const node =  new Node(arr[mid])

			node.left = buildTreeTraverse(arr, start, mid - 1)
			node.right = buildTreeTraverse(arr, mid + 1, end)

			return node;
		}
		return buildTreeTraverse(arr, 0, arr.length - 1);
	}

	insert(val) {
		const comp = this.#compFn;
		function traverse(current, value) {
			if(comp(current.value, val) === 1) {
				if(current.left) 
				    traverse(current.left, val);
				else
				    current.left = new Node(val);
			} else if(comp(current.value, val) === -1) {
				if(current.right) 
				    traverse(current.right, val);
				else
				    current.right= new Node(val);
	
			} 
		}
		traverse(this.root, val);
	}

	remove(val){
		const [directParent, node] = this.findNode(val);
		//console.log('parent', directParent);
		//console.log('node', node);

		if(node !== null) {
			//Node left and right both are null
			if(node.left == null && node.right == null) {
				if(directParent.left == node)       			
					directParent.left = null;   
				else directParent.right = null;
			}
			//One of them is not null
			else if(node.left == null || node.right == null){
				if(directParent.left == node) {
					if(node.left) {
						directParent.left = node.left;
					} else
						directParent.left = node.right;
				} else if(directParent.right == node) {
					if(node.left) {
						directParent.right = node.left;
					} else
						directParent.right = node.right;
				}
			}
			//Both not null
			//Either maximum number from the left subtree or minimum from
			//the right subtree.
			else {
				//Find minimum on right
				function findMinimum(current) {
					if(current.left) {
						return findMinimum(current.left);
					} else return current;
				}
				//Find maximum on left
				function findMaximum(current) {
					if(current.right) {
						return findMaximum(current.right);
					} else return current;
				}
				//const replacedNode = findMinimum(node);
				const replacedNode = findMaximum(node.left);
				this.remove(replacedNode.value);
				node.value = replacedNode.value;
			}


		}
	}

	//Find [parent's node, node itself]
	//Should it be the root then it would have no parent hence [null, node itself]
	//Or it would be [parent's node, node itself]
	//Or not found to be [null, null]
	findNode(val, comp=this.#compFn) {
		function traverse(current, value) {
			if(comp(current.value, value) === 1) {
				if(current.left) {
					if(comp(current.left.value, value) === 0)
						return [current, current.left];
					else
				    		return traverse(current.left, value);
				}
				else return [null,null]
			} else if (comp(current.value,value) === -1){
				if(current.right) {
					if(comp(current.right.value, value) === 0)
						return [current, current.right];
					else
				    		return traverse(current.right, value);
				}
				else return [null, null];
			} else if (comp(current.value, value) === 0){
				return [null, current];
			} else {
				return [null, null]
			}
		}
		return traverse(this.root, val);
	}

	//Assumed using findNode first to passed in target
	depth(target) {
		const comp = this.#compFn;
		if(target) {
			let level = 1;
			let current = this.root;
			while(current != null){
				if(comp(current.value,target.value) === 1) {
					if(current.left) {
						level++;
						current = current.left;
					}
					else return null
				} else if (comp(current.value,target.value) === -1) {
					if(current.right){
						level++;
						current = current.right;
					}
					else return null
				} else if(comp(current.value,target.value) === 0) {
					return level;
				}
			}
		}
	}

	isBalanced() {
		const leftHeight = height(this.root.left);
		const rightHeight = height(this.root.right);

		return (Math.abs(leftHeight - rightHeight) <= 1 );
	}

	rebalance() {
		const arr = inOrderRecur(this.root);
		this.root = this.buildTree(arr, this.#compFn);
	}
}


//Height of a node
function height(node) {
	if(node == null) return 0;
	const leftHeight = 1 + height(node.left);
	const rightHeight = 1 + height(node.right);

	return Math.max(leftHeight, rightHeight);
}

//Inorder traversal to sort the tree aswell, recursion seems better than stack but for 
//performance change to stack.
//Depth traversal
//
//In order with stack took too much time to think on my own.
function inOrderRecur(root, cb = (val) => val) {
	let arr = [];
	function recur(root) {
		if(root !== null) {
			if(root.left)
				recur(root.left);

			arr.push(root.value);
			cb(root);

			if(root.right)
				recur(root.right);
		}
	}
	recur(root, cb);
	return arr;
}

function preOrder(root, cb=(val) => val) {
	let a = [];
	let arr = [root];
	while(arr.length > 0) {
		const current = arr.pop();
		a.push(current.value)
		cb(current);
		if(current.right)
			arr.push(current.right)
		if(current.left)
			arr.push(current.left)
	}
	return a;
}

function postOrder(root, cb=(val) => val) {
	let a = [];
	let arr = [root];
	while(arr.length > 0) {
		const current = arr.pop();
		a.push(current.value);
		cb(current);
		if(current.left)
			arr.push(current.left)
		if(current.right)
			arr.push(current.right)
	}
	return a;
}

//Breadth traversal, iteration using LinkedList
function levelOrderIter(root, cb = (val) => val) {
	const arr = []
	const q = new LinkedList();
	q.append(root);

	let current = root;
	while(!q.isEmpty() && current != null) {
		cb(current.value);
		arr.push(current.value);
		if(current.left) {
			q.append(current.left);
		} 
		if(current.right) {
			q.append(current.right);
		}
		q.removeAt(0);
		current = (q.head != null) ? q.head.value:null;
	}
	return arr;
}

//Output
function prettyPrint(node, prefix = "", isLeft = true) {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

//const tree = new BST([4, 1, 1, 9, 27, -1, -5, -7, 2, 0, 3, 7, 9]);
//prettyPrint(tree.root);

//const treeOfObj = new BST([
//	[0,1], [0,6], [0,8], [1,4], 
//	[1,6], [1,9], [2,4], [2,6], 
//	[3,4], [3,5], [3,8], [4,5], 
//	[4,9], [7,8], [7,9] 
//]
//, (a, b) => {
//	if(a[0] == b[0]) {
//		if(a[1] < b[1]) return -1;
//		else if (a[1] > b[1]) return 1;
//		else return 0;
//	} else {
//		if(a[0] < b[0]) {
//			return -1;
//		} else if (a[0] > b[0]) return 1;
//		else return 0;
//	}
//});
//prettyPrint(treeOfObj.root);

module.exports = {BST, prettyPrint, inOrderRecur, levelOrderIter, Node, height}

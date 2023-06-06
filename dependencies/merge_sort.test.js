const {merge_sort, merge_arr, splitArr} = require('./merge_sort')

//testing merges
test("merges two sorted arrays together", function() {
  const array1 = [1, 2, 3, 4, 5];
  const array2 = [6, 7, 8, 9, 10];
  const mergedArray = merge_arr(array1, array2);

  expect(mergedArray).toEqual([1,2,3,4,5,6,7,8,9, 10]);
});

test("merges two empty arrays together", function() {
  const array1 = [];
  const array2 = [];
  const mergedArray = merge_arr(array1, array2);

  expect(mergedArray).toEqual([]);
});

test("merges two arrays of different lengths together", function() {
  const array1 = [1, 2, 3];
  const array2 = [4, 5];
  const mergedArray = merge_arr(array1, array2);

  expect(mergedArray).toEqual([1, 2, 3, 4, 5]);
});

test("handles arrays with negative numbers", function() {
  const array1 = [-1, 2, 3, 4];
  const array2 = [1, 2, 3, 4];
  const mergedArray = merge_arr(array1, array2);

  expect(mergedArray).toEqual([-1, 1, 2, 2, 3, 3, 4 ,4]);
});

test("handles single number array", function() {
  const array1 = [4];
  const array2 = [3];
  const mergedArray = merge_arr(array1, array2);

  expect(mergedArray).toEqual([3 ,4]);
});

test("handles arrays with large numbers", function() {
  const array1 = [2, Number.MAX_SAFE_INTEGER];
  const array2 = [3, Number.MAX_SAFE_INTEGER];
  const mergedArray = merge_arr(array1, array2);

  expect(mergedArray).toEqual([2, 3, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
});

//Test splitArr
test("splits an array in half, odd n", function() {
  const array = [1, 2, 3, 4, 5];
  const splitArray = splitArr(array);

  expect(splitArray).toEqual([[1, 2, 3], [4, 5]]);
});

test("splits an array in half, even n", function() {
  const array = [2,4,6,9];
  const splitArray = splitArr(array);

  expect(splitArray).toEqual([[2,4], [6,9]]);
});

//Testing merge sort itself
test("testing merge sort less than 2 elements", function() {
  expect([1]).toEqual([1]);
  expect([]).toEqual([]);
});

test("testing merge sort, already sorted", function() {
  const array = [2,4,6,9];
  const sortedArray = merge_sort(array);

  expect(sortedArray).toEqual([2, 4, 6, 9]);
});

test("sort an array of random numbers", function() {
  const inputArray = [3, 1, 4, 1, 5, 9, 2, 6, 5];
  const sortedArray = merge_sort(inputArray);

  expect(sortedArray).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
});


test("sort an array with large numbers", function() {
  const inputArray = [Number.MAX_SAFE_INTEGER, 2, Number.MAX_SAFE_INTEGER];
  const sortedArray = merge_sort(inputArray);

  expect(sortedArray).toEqual([2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
});

test("sort an array with negative numbers", function() {
  const inputArray = [-1, 2, -3, 4];
  const sortedArray = merge_sort(inputArray);

  expect(sortedArray).toEqual([-3, -1, 2, 4]);
});

//For range function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function range(n) {
    return Array.from({ length: n }, (_, i) => i + 1);
}

test("sort an array of 100 elements", function() {
  const inputArray = shuffle(range(100));
  const sortedArray = merge_sort(inputArray);

  expect(sortedArray).toEqual(range(100));
});

test("sort an array of objects with custom comparing function", function () {
  const inputArray = [
	  {name: 'John', val: 7},
	  {name: 'Bob', val: 4},
	  {name: 'Harry', val: 3}
  ];
  const sortedArray = merge_sort(inputArray, compFn = (a,b) => {
	  if(a.val < b.val) {
		  return -1;
	  } else if(a.val > b.val) {
		  return 1;
	  }
	  return 0;
  });

  expect(sortedArray).toEqual([
	  {name: 'Harry', val: 3},
	  {name: 'Bob', val: 4},
	  {name: 'John', val: 7},
  ]);
});

// Time complexity - O(nlog(r)), where r is the range of the marix value, n is the length of the matrix (no. of rows or col)
// Space complexity - O(1), no extra space used
function kthSmallest(matrix: number[][], k: number): number {
	let n = matrix.length;
	let low = matrix[0][0];
	let high = matrix[n - 1][n - 1];
	let result = -1;

	// since the matrix row/col is sorted, we can apply binary search
	while (low <= high) {
		let mid = Math.floor((low + high) / 2);

		// count number of elements smaller than mid
		const count = countSmallerElements(mid);

		// if the count is less than k, means we need more values on left and k is on right side
		if (count < k) {
			low = mid + 1;
		} else {
			high = mid - 1;
			// if count is >= k, update the result
			result = mid;
		}
	}

	return result;

	function countSmallerElements(mid: number): number {
		let count = 0;

		// start with bottom row to count smaller elements
		let row = n - 1;
		let col = 0;

		while (row >= 0 && col < n) {
			if (matrix[row][col] <= mid) {
				// since the row and columns are sorted, all the elemnts in the row above are smaller
				// count the elements from previous row
				count += row + 1;
				col++;
			} else {
				row--;
			}
		}
		return count;
	}
}

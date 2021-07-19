/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findKthLargest = function(nums, k) {
    let sortedArray = nums.sort((a, b) => {
        return b - a
    })
    return sortedArray[k - 1]
};

var findKthLargest_ = function(nums, k) {
    let sortedArray = quickSort(nums)
    return sortedArray[nums.length - k]
};

function quickSort (nums) {
    if (nums.length <= 1) {
        return nums
    }
    let base = nums[0]
    let right = []
    let left = []
    for(let i = 1, j = nums.length; i <= j; j--, i++) {
        if (i == j) {
            if(nums[i] !== void 0) {
                if(nums[i] > base) {
                    right.push(nums[i])
                } else {
                    left.push(nums[i])
                }
            }
            break
        }
        if(nums[i] !== void 0) {
            if(nums[i] > base) {
                right.push(nums[i])
            } else {
                left.push(nums[i])
            }
        }
        if (nums[j] !== void 0) {
            if(nums[j] > base) {
                right.push(nums[j])
            } else {
                left.push(nums[j])
            }
        }
    }
    let result = []
    result = result.concat(quickSort(left))
    result.push(base)
    result = result.concat(quickSort(right))
    return result
}
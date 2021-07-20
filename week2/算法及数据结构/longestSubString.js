/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    let prev = []
    let max = 0
    getPrev(prev, s)
    let k = 0, j = 1 // 双指针
    while (j <= s.length) {
         // 如果prev表中发现j指针存在前一个并且大于指针k
         // 则当前k到j的子字符串中存在重复元素
        if(prev[j] < j && prev[j] >= k || prev[j] == void 0) {
            if (max < j - k) {
                max = j - k
            }
            k = prev[j] + 1
            j = k
        }
        j++
    }
    return max
};

function getPrev (prev, t) { // 获取每个字符串中元素t的前一个t的索引
    let _map = new Map()
    for(let i = 0; i < t.length; i++) {
        if(_map.get(t[i]) !== void 0) {
            prev.push(_map.get(t[i]))
        } else {
            prev.push(i)
        }
        _map.set(t[i], i)
    }
}

// 最长子字符串
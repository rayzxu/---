/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
    if (head == null || head.next == null) return head;
    p = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return p;
}
// 链表反转
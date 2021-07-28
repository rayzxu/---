import request from '@/router/axios'

export function preview (file) {
    return request({
        url: 'write',
        method: 'post',
        data: file
    })
}

export function getBundle () {
    return request({
        url: 'bundle',
        method: 'get'
    })
}
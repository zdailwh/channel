import request from '@/utils/request'

// 网络列表接口
export function getNetworkList(params) {
  return request({
    url: '/api/v1/network/list',
    method: 'get',
    params
  })
}
// 频道列表
export function getChannelList(params) {
  return request({
    url: '/api/v1/channels/list',
    method: 'get',
    timeout: 1000,
    params
  })
}
// 频道创建
export function channelCreate(params) {
  return request({
    url: '/api/v1/channels/create',
    method: 'post',
    data: params
  })
}
// 频道修改 (只有已停止的频道才能修改）
export function channelUpdate({ params, LogicId }) {
  return request({
    url: '/api/v1/channels/update?LogicId=' + LogicId,
    method: 'put',
    data: params
  })
}
// 频道服务 停止、启动 action=start/stop/restart
export function channelService({ action, LogicId }) {
  return request({
    url: '/api/v1/channels/service?LogicId=' + LogicId + '&action=' + action,
    method: 'put'
  })
}
// 频道删除 (只有停止的频道才能删除)
export function channelDelete(params) {
  return request({
    url: '/api/v1/channels/delete?LogicId=' + params.LogicId,
    method: 'DELETE'
  })
}

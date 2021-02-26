import Mock from 'mockjs'

const CurEpg = {
  'EndTime': '1590395400', // 结束时间
  'Name': '“不可能”的革命者', // 节目名称
  'StartTime': '1590391800' // 开始时间
}
const NextEpg = {
  'EndTime': '1589879653', // 结束时间
  'Name': '防弹狙击手2', // 节目名称
  'StartTime': '1589877410' // 开始时间
}
const channel = {
  'id|+1': 1,
  'Bitrate': 90000001, // 输出码率 string 必选 选M K 结尾或者无，例如 8M    8000K 或者 8000000
  'DefaultTs': 'Z:\\default.ts', // 默认垫片 string
  'FilesLoca': 'Z:\\冰雪体育\\', // 节目路径 string
  'ListLocation': 'Z:\\xml\\冰雪体育.xml', // 节目单路径 string
  'ListReaderId': 1, // 节目单类型 int 1 (中广)/ 2 (DOX)
  'LogicId': 901, // 频道编号 int
  'Name': '冰雪1', // 频道名称 string (10进制数字)
  'NetworkId': 1111, // NetworkId string
  'PmtPid': 101, // PmtPid string
  'ServiceId': 151, // ServiceId string
  'ServiceType': 'HD', // 频道类型（属性） string  HD / 4K
  'TsId': 1, // TsId string
  'Url_Host': '239.0.0.1', // 组播地址 string
  'Url_Localaddr': '192.168.10.110', // 输出网卡 string 可选为空
  'Url_Port': '9001', // 端口号 string
  'Url_Type': 'udp', // 输出类型（默认UDP） string
  'VideoPid': 2701, // VideoPid string
  'State': 'Stop', // Play 或 Stop
  'EndTime': 1590494400,
  'PlayState': 0,
  'CurEpg': CurEpg,
  'NextEpg': NextEpg
}

const channels = Mock.mock({
  'items|30': [channel]
})

export default [
  {
    url: '/channels',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = channels.items

      var mockList = items
      const pageList = mockList.filter((item, index) => index < per_page * (page + 1) && index >= per_page * page)

      return {
        'total': mockList.length,
        'page': page,
        'per_page': per_page,
        'count': pageList.length,
        'where': {
        },
        'main': 0,
        'path': '/api/admin/ffmpeg/v1/inputs',
        'items': pageList
      }
    }
  }
]

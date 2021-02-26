<template>
  <div>
    <p><el-button type="primary" icon="el-icon-plus" @click="dialogAddVisible = true">添加频道</el-button></p>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column prop="ListReaderId" label="节目单类型" align="center">
        <template slot-scope="scope">{{ scope.row.ListReaderId === 2 ? 'DOX' : '中广' }}</template>
      </el-table-column>
      <el-table-column prop="ServiceType" label="频道类型" align="center" />
      <el-table-column prop="LogicId" label="频道编号" align="center" />
      <el-table-column prop="Name" label="频道名称" align="center" />
      <el-table-column prop="NetworkId" label="NetworkId" align="center" />
      <el-table-column prop="FilesLoca" label="节目路径" align="center" />
      <el-table-column prop="ListLocation" label="节目单路径" align="center" />
      <el-table-column prop="Url_Localaddr" label="输出网卡" align="center" />
      <el-table-column prop="Url_Type" label="输出类型" align="center" />
      <el-table-column prop="Url_Host" label="组播地址" align="center" />
      <el-table-column prop="Url_Port" label="端口号" align="center" />
      <el-table-column prop="DefaultTs" label="默认垫片" align="center" />
      <el-table-column prop="Bitrate" label="输出码率" align="center" />
      <el-table-column prop="ServiceId" label="service ID" align="center" />
      <el-table-column prop="PmtPid" label="PMT PID" align="center" />
      <el-table-column prop="TsId" label="TsId" align="center" />
      <el-table-column prop="VideoPid" label="VideoPid" align="center" />
      <el-table-column prop="State" fixed="right" label="操作" width="250px">
        <template slot-scope="scope">
          {{ scope.row.State === 'Play'? '已启用': scope.row.State === 'Stop'? '已停止': '' }}
          <el-switch v-model="scope.row.State" active-value="Play" inactive-value="Stop" active-color="#13ce66" inactive-color="#ff4949" style="margin-right: 10px;" @change="changeStatus(scope.row, scope.$index)" />
          <el-button v-if="scope.row.State === 'Stop'" type="danger" size="small" icon="el-icon-delete" circle @click="handleDel(scope.row, scope.$index)" />
          <el-button v-if="scope.row.State === 'Stop'" type="primary" size="small" icon="el-icon-edit" circle @click="handleUpdate(scope.row, scope.$index)" />
        </template>
      </el-table-column>
      <!--<el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.State === 'Stop'" type="danger" size="small" icon="el-icon-delete" circle @click="handleDel(scope.row, scope.$index)" />
          <el-button v-if="scope.row.State === 'Stop'" type="primary" size="small" icon="el-icon-edit" circle @click="handleUpdate(scope.row, scope.$index)" />
        </template>
      </el-table-column> -->
    </el-table>
    <div class="pageWrap">
      <el-pagination background layout="prev, pager, next" :total="tableData.length" />
    </div>

    <!-- 添加频道 -->
    <el-dialog title="创建频道" :visible.sync="dialogAddVisible" width="550px" top="50px">
      <el-form ref="formadd" :model="formadd" :rules="addrules" label-width="100px" size="medium">
        <el-form-item label="节目单类型" prop="ListReaderId">
          <el-select v-model="formadd.ListReaderId" placeholder="请选择节目单类型">
            <el-option v-for="(item,k) in readerArr" :key="k" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="频道类型" prop="ServiceType">
          <el-select v-model="formadd.ServiceType" placeholder="请选择频道类型">
            <el-option v-for="(item,k) in typeArr" :key="k" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="频道编号" prop="LogicId">
          <el-input v-model="formadd.LogicId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="频道名称" prop="Name">
          <el-input v-model="formadd.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="NetworkId" prop="NetworkId">
          <el-input v-model="formadd.NetworkId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="节目路径" prop="FilesLoca">
          <el-input v-model="formadd.FilesLoca" autocomplete="off" placeholder="如：Z:\冰雪体育\" />
        </el-form-item>
        <el-form-item label="节目单路径" prop="ListLocation">
          <el-input v-model="formadd.ListLocation" autocomplete="off" placeholder="如：Z:\xml\冰雪体育.xml" />
        </el-form-item>
        <el-form-item label="service ID" prop="ServiceId">
          <el-input v-model="formadd.ServiceId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="PMT PID" prop="PmtPid">
          <el-input v-model="formadd.PmtPid" autocomplete="off" />
        </el-form-item>
        <el-form-item label="TsId" prop="TsId">
          <el-input v-model="formadd.TsId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="输出网卡" prop="Url_Localaddr">
          <el-select v-model="formadd.Url_Localaddr" placeholder="请选择输出网卡">
            <el-option v-for="(item,k) in netCardArr" :key="k" :value="item" :label="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="输出类型" prop="Url_Type">
          <el-select v-model="formadd.Url_Type" placeholder="请选择输出类型">
            <el-option v-for="(item,k) in outputTypeArr" :key="k" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="组播地址" prop="Url_Host">
          <el-input v-model="formadd.Url_Host" autocomplete="off" />
        </el-form-item>
        <el-form-item label="端口号" prop="Url_Port">
          <el-input v-model="formadd.Url_Port" autocomplete="off" />
        </el-form-item>
        <el-form-item label="输出码率" prop="Bitrate">
          <el-input v-model="formadd.Bitrate" autocomplete="off" placeholder="选M、K结尾或者无，如8M、8000K或8000000" />
        </el-form-item>
        <el-form-item label="默认垫片" prop="DefaultTs">
          <el-input v-model="formadd.DefaultTs" autocomplete="off" placeholder="如：Z:\default.ts" />
          <!-- <input type="file" name="" @change="selectFile($event)">
          <el-input v-model="formadd.DefaultTs" autocomplete="off" type="file" /> -->
        </el-form-item>
        <el-form-item label="VideoPid" prop="VideoPid">
          <el-input v-model="formadd.VideoPid" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="channelCreate('formadd')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑频道 -->
    <el-dialog title="编辑频道" :visible.sync="dialogEditVisible" width="550px" top="50px">
      <el-form ref="formedit" :model="formedit" :rules="addrules" label-width="100px" size="medium">
        <el-form-item label="节目单类型" prop="ListReaderId">
          <el-select v-model="formedit.ListReaderId" placeholder="请选择节目单类型">
            <el-option v-for="(item,k) in readerArr" :key="k" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="频道类型" prop="ServiceType">
          <el-select v-model="formedit.ServiceType" placeholder="请选择频道类型">
            <el-option v-for="(item,k) in typeArr" :key="k" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="频道编号" prop="LogicId">
          <el-input v-model="formedit.LogicId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="频道名称" prop="Name">
          <el-input v-model="formedit.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="NetworkId" prop="NetworkId">
          <el-input v-model="formedit.NetworkId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="节目路径" prop="FilesLoca">
          <el-input v-model="formedit.FilesLoca" autocomplete="off" placeholder="如：Z:\冰雪体育\" />
        </el-form-item>
        <el-form-item label="节目单路径" prop="ListLocation">
          <el-input v-model="formedit.ListLocation" autocomplete="off" placeholder="如：Z:\xml\冰雪体育.xml" />
        </el-form-item>
        <el-form-item label="service ID" prop="ServiceId">
          <el-input v-model="formedit.ServiceId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="PMT PID" prop="PmtPid">
          <el-input v-model="formedit.PmtPid" autocomplete="off" />
        </el-form-item>
        <el-form-item label="TsId" prop="TsId">
          <el-input v-model="formedit.TsId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="输出网卡" prop="Url_Localaddr">
          <el-select v-model="formedit.Url_Localaddr" placeholder="请选择输出网卡">
            <el-option v-for="(item,k) in netCardArr" :key="k" :value="item" :label="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="输出类型" prop="Url_Type">
          <el-select v-model="formedit.Url_Type" placeholder="请选择输出类型">
            <el-option v-for="(item,k) in outputTypeArr" :key="k" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="组播地址" prop="Url_Host">
          <el-input v-model="formedit.Url_Host" autocomplete="off" />
        </el-form-item>
        <el-form-item label="端口号" prop="Url_Port">
          <el-input v-model="formedit.Url_Port" autocomplete="off" />
        </el-form-item>
        <el-form-item label="输出码率" prop="Bitrate">
          <el-input v-model="formedit.Bitrate" autocomplete="off" placeholder="选M、K结尾或者无，如8M、8000K或8000000" />
        </el-form-item>
        <el-form-item label="默认垫片" prop="DefaultTs">
          <el-input v-model="formedit.DefaultTs" autocomplete="off" placeholder="如：Z:\default.ts" />
        </el-form-item>
        <el-form-item label="VideoPid" prop="VideoPid">
          <el-input v-model="formedit.VideoPid" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="channelUpdate('formedit')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getChannelList, channelService, channelDelete, channelCreate, channelUpdate, getNetworkList } from '@/api/channel'
export default {
  data() {
    return {
      adminPwd: 'admin',
      dialogAddVisible: false,
      formadd: {
        ServiceType: '',
        Name: '',
        FilesLoca: '',
        ListLocation: '',
        ServiceId: '',
        PmtPid: '',
        Url_Localaddr: '',
        Url_Type: 'udp',
        Url_Host: '',
        Url_Port: '',
        Bitrate: '',
        DefaultTs: '',
        ListReaderId: '',
        LogicId: '',
        NetworkId: '',
        TsId: '',
        VideoPid: ''
      },
      addrules: {
        ListReaderId: [
          { required: true, message: '请选择节目单类型', trigger: 'change' }
        ],
        ServiceType: [
          { required: true, message: '请选择频道类型', trigger: 'change' }
        ],
        LogicId: [
          { required: true, message: '请输入频道编号', trigger: 'blur' }
        ],
        Name: [
          { required: true, message: '请输入频道名称', trigger: 'blur' }
        ],
        NetworkId: [
          { required: true, message: '请输入NetworkId', trigger: 'blur' }
        ],
        FilesLoca: [
          { required: true, message: '请输入节目路径', trigger: 'blur' }
        ],
        ListLocation: [
          { required: true, message: '请输入节目单路径', trigger: 'blur' }
        ],
        ServiceId: [
          { required: true, message: '请输入service ID', trigger: 'blur' }
        ],
        PmtPid: [
          { required: true, message: '请输入PMT PID', trigger: 'blur' }
        ],
        TsId: [
          { required: true, message: '请输入TsId', trigger: 'blur' }
        ],
        Url_Type: [
          { required: true, message: '请选择输出类型', trigger: 'change' }
        ],
        Url_Host: [
          { required: true, message: '请输入组播地址', trigger: 'blur' }
        ],
        Url_Port: [
          { required: true, message: '请输入端口号', trigger: 'blur' }
        ],
        Bitrate: [
          { required: true, message: '请输入输出码率', trigger: 'blur' }
        ],
        DefaultTs: [
          { required: true, message: '请输入默认垫片', trigger: 'blur' }
        ],
        VideoPid: [
          { required: true, message: '请输入VideoPid', trigger: 'blur' }
        ]
      },
      readerArr: [
        { label: '中广', value: 1 }, { label: 'DOX', value: 2 }
      ],
      typeArr: [
        { label: 'HD', value: 'HD' }, { label: '4K', value: '4K' }
      ],
      netCardArr: [],
      outputTypeArr: [
        { label: 'UDP', value: 'udp' }
      ],
      tableData: [],
      dialogEditVisible: false,
      formedit: {},
      editIndex: ''
    }
  },
  mounted() {
    this.getNetworkList()
    this.getList()
  },
  methods: {
    getNetworkList() {
      getNetworkList().then((response) => {
        console.log(response.data)
        this.netCardArr = response.data.items
      }).catch((error) => {
        console.log(error)
      })
    },
    getList() {
      const params = {
      }
      getChannelList(params).then((response) => {
        console.log(response.data)
        this.$parent.maintag = response.data.main
        this.tableData = response.data.items
      }).catch((error) => {
        console.log(error)
      })
    },
    changeStatus(row, idx) {
      this.$confirm('确定要执行此操作吗?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$prompt('请输入管理员密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (value === this.adminPwd) {
            this.doChangeStatus(row, idx)
          } else {
            this.$message({
              type: 'error',
              message: '密码错误'
            })
            if (row.State === 'Play') {
              this.$set(this.tableData[idx], 'State', 'Stop')
            } else {
              this.$set(this.tableData[idx], 'State', 'Play')
            }
          }
        }).catch(() => {
          if (row.State === 'Play') {
            this.$set(this.tableData[idx], 'State', 'Stop')
          } else {
            this.$set(this.tableData[idx], 'State', 'Play')
          }
        })
      }).catch(() => {
        if (row.State === 'Play') {
          this.$set(this.tableData[idx], 'State', 'Stop')
        } else {
          this.$set(this.tableData[idx], 'State', 'Play')
        }
      })
    },
    doChangeStatus(row, idx) {
      if (row.State === 'Play') {
        const params = {
          action: 'start',
          LogicId: row.LogicId
        }
        channelService(params).then((response) => {
          console.log(response.data)
          if (response.data === 'SUCCESS') {
            this.$message({
              type: 'success',
              message: '已启用'
            })
          } else {
            this.$message({
              type: 'info',
              message: '操作失败'
            })
            this.$set(this.tableData[idx], 'State', 'Stop')
          }
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '操作失败'
          })
          this.$set(this.tableData[idx], 'State', 'Stop')
        })
      } else if (row.State === 'Stop') {
        const params = {
          action: 'stop',
          LogicId: row.LogicId
        }
        channelService(params).then((response) => {
          console.log(response.data)
          if (response.data === 'SUCCESS') {
            this.$message({
              type: 'success',
              message: '已停止'
            })
          } else {
            this.$message({
              type: 'info',
              message: '操作失败'
            })
            this.$set(this.tableData[idx], 'State', 'Play')
          }
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '操作失败'
          })
          this.$set(this.tableData[idx], 'State', 'Play')
        })
      }
    },
    handleDel(row, idx) {
      this.$confirm('此操作将删除该频道, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.channelDel(row, idx)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    channelDel(row, idx) {
      console.log(row)
      var params = {
        LogicId: row.LogicId
      }
      channelDelete(params).then((response) => {
        console.log(response.data)
        if (response.data === 'SUCCESS') {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.tableData.splice(idx, 1)
        } else {
          this.$message({
            type: 'info',
            message: '删除失败'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message({
          type: 'info',
          message: '操作失败'
        })
      })
    },
    channelCreate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          channelCreate(this.formadd).then((response) => {
            console.log(response.data)
            if (response.data.LogicId) {
              this.$message({
                type: 'success',
                message: '频道创建成功'
              })
              this.tableData.push(response.data)
              this.dialogAddVisible = false
            } else {
              this.$message({
                type: 'info',
                message: '频道创建失败'
              })
            }
          }).catch((error) => {
            console.log(error)
            this.$message({
              type: 'info',
              message: '操作失败'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleUpdate(row, idx) {
      this.formedit = JSON.parse(JSON.stringify(row))
      this.editIndex = idx
      this.dialogEditVisible = true
    },
    channelUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          channelUpdate({ params: this.formedit, LogicId: this.formedit.LogicId }).then((response) => {
            console.log(response.data)
            if (response.data.LogicId) {
              this.$message({
                type: 'success',
                message: '频道修改成功'
              })
              this.tableData.splice(this.editIndex, 1, response.data)
              this.dialogEditVisible = false
            } else {
              this.$message({
                type: 'info',
                message: '频道修改失败'
              })
              this.dialogEditVisible = false
            }
          }).catch((error) => {
            console.log(error)
            this.$message({
              type: 'info',
              message: '操作失败'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    selectFile(e) {
      console.log(e.target.files[0])
      console.log(getObjectURL(e.target.files[0]))
    }
  }
}
// 获取上传图片的url
function getObjectURL(file) {
  var url = null
  if (window.createObjectURL !== undefined) { // basic
    url = window.createObjectURL(file)
  } else if (window.URL !== undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}
</script>

<style scoped>
</style>

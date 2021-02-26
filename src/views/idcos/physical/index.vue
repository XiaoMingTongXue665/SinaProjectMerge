<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我的物理机" name="first">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="IP地址">
                <el-input v-model="formInline.user" placeholder="IP地址"></el-input>
              </el-form-item>
              <el-form-item label="产品线">
                <el-select v-model="form.region" placeholder="请选择产品线">
                  <el-option label="产品线一" value="shanghai"></el-option>
                  <el-option label="产品线二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
              <el-form-item
                  style="float: right"
              >
                <el-button type="primary" @click="refresh" :loading="ButtonLoading">刷新</el-button>
              </el-form-item>
            </el-form>
            <el-table
                v-loading="TableLoading"
                :data="articles"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                @selection-change="handleSelectionChange"
            >
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column label="盘点号" width="110" align="center">
                <template slot-scope="scope">
                  {{ scope.row.asset_number }}
                </template>
              </el-table-column>
              <el-table-column label="管理卡IP" width="180" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.card_ip }}</span>
                </template>
              </el-table-column>
              <el-table-column label="内务IP" width="180" align="center">
                <template slot-scope="scope">
                  {{ scope.row.intranet_ip }}
                </template>
              </el-table-column>
              <el-table-column label="外网IP" width="180" align="center">
                <template slot-scope="scope">
                  {{ scope.row.public_ip }}
                </template>
              </el-table-column>
              <el-table-column label="机房" width="170" align="center">
                <template slot-scope="scope">
                  {{ scope.row.idc }}
                </template>
              </el-table-column>
              <el-table-column label="产品线" width="230" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.product }}
                </template>
              </el-table-column>
              <el-table-column label="管理员" width="110" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.administrator }}
                </template>
              </el-table-column>
              <el-table-column label="状态" width="110" align="auto">
                <template slot-scope="scope">
                  <div class="tag-group">
                    <el-tag
                        v-for="item in items"
                        :key="item.label"
                        :type="item.type"
                        size="medium"
                        effect="dark">
                      {{ item.label }}
                    </el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                  <el-button type="primary" size="mini" @click="handleIDC(row.asset_number, '开机')">
                    开机
                  </el-button>
                  <el-button type="success" size="mini" @click="handleIDC(row.asset_number, '关机')">
                    关机
                  </el-button>
                  <el-button type="warning" size="mini" @click="handleIDC(row.asset_number, '重启')">
                    重启
                  </el-button>
                  <el-button type="danger" size="mini" @click="rebuild(row)">
                    重装
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <div style="margin-top: 20px; float:left">
                <el-button type="primary" size="mini" @click="handleIDClist('开机')">开机</el-button>
                <el-button type="success" size="mini" @click="handleIDClist('关机')">关机</el-button>
                <el-button type="warning" size="mini" @click="handleIDClist('重启')">重启</el-button>
                <el-button type="danger" size="mini" @click="handleIDClist('重装')">重装</el-button>
              </div>
              <div class="block" style="margin-top: 20px; float: right">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 100, 200, 400]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total='total'>
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的产品线" name="secend">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="IP地址">
                <el-input v-model="formInline.user" placeholder="IP地址"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
              <el-form-item
                  style="float: right"
              >
                <el-button type="primary" @click="refresh">刷新</el-button>
              </el-form-item>
            </el-form>
            <el-table
                v-loading="TableLoading"
                :data="articles"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                @selection-change="handleSelectionChange"
            >
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column label="盘点号" width="110" align="center">
                <template slot-scope="scope">
                  {{ scope.row.asset_number }}
                </template>
              </el-table-column>
              <el-table-column label="管理卡IP" width="180" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.card_ip }}</span>
                </template>
              </el-table-column>
              <el-table-column label="内务IP" width="180" align="center">
                <template slot-scope="scope">
                  {{ scope.row.intranet_ip }}
                </template>
              </el-table-column>
              <el-table-column label="外网IP" width="180" align="center">
                <template slot-scope="scope">
                  {{ scope.row.public_ip }}
                </template>
              </el-table-column>
              <el-table-column label="机房" width="170" align="center">
                <template slot-scope="scope">
                  {{ scope.row.idc }}
                </template>
              </el-table-column>
              <el-table-column label="产品线" width="230" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.product }}
                </template>
              </el-table-column>
              <el-table-column label="管理员" width="110" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.administrator }}
                </template>
              </el-table-column>
              <el-table-column label="状态" width="110" align="auto">
                <template slot-scope="scope">
                  <div class="tag-group">
                    <el-tag
                        v-for="item in items"
                        :key="item.label"
                        :type="item.type"
                        size="medium"
                        effect="dark">
                      {{ item.label }}
                    </el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                  <el-button type="primary" size="mini" @click="handleIDC(row.card_ip, '开机')">
                    开机
                  </el-button>
                  <el-button type="success" size="mini" @click="handleIDC(row.card_ip, '关机')">
                    关机
                  </el-button>
                  <el-button type="warning" size="mini" @click="handleIDC(row.card_ip, '重启')">
                    重启
                  </el-button>
                  <el-button type="danger" size="mini" @click="rebuild(row)">
                    重装
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <div style="margin-top: 20px; float:left">
                <el-button type="primary" size="mini" @click="handleIDClist('开机')">开机</el-button>
                <el-button type="success" size="mini" @click="handleIDClist('关机')">关机</el-button>
                <el-button type="warning" size="mini" @click="handleIDClist('重启')">重启</el-button>
                <el-button type="danger" size="mini" @click="handleIDClist('重装')">重装</el-button>
              </div>
              <div class="block" style="margin-top: 20px; float: right">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 100, 200, 400]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total='total'>
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-dialog title="配置信息" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="盘点号" prop="asset_number">
              <el-input v-model="form.asset_number" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="管理卡IP" prop="card_ip">
              <el-input v-model="form.card_ip" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="业务IP" prop="intranet_ip">
              <el-input v-model="form.intranet_ip" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="SUDO用户" prop="sudo">
              <el-input v-model="form.sudo"></el-input>
            </el-form-item>
            <el-form-item label="操作系统" prop="os">
              <el-select v-model="form.os" style="width: 100%" placeholder="请选择活动区域">
                <el-option v-for="os in OS_CHOICE" :value="os" :key="os" :label="os"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="磁盘分区" prop="part_type">
              <el-select v-model="form.part_type" style="width: 100%" placeholder="请选择活动区域">
                <el-option v-for="part_type in PART_TYPE_CHOICE" :value="part_type" :key="part_type"
                           :label="part_type"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="RAID" prop="raid">
              <el-select v-model="form.raid" style="width: 100%" placeholder="请选择活动区域">
                <el-option v-for="raid in KICKSTART_CHOICE" :value="raid" :key="raid" :label="raid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getPhysicalListApi, getStatusAPI} from '@/api/physical'

  const OS_CHOICE = [
    'CentOS_65-x86_64',
    'CentOS_610-x86_64',
    'CentOS_73-x86_64',
    'CentOS_76-x86_64',
    'CentOS_81-x86_64'
  ]
  const PART_TYPE_CHOICE = [
    'unix_type_a',
    'unix_type_b',
    'unix_type_c',
    'unix_type_d',
    'unix_type_e',
    'unix_type_f',
    'unix_type_g'
  ]
  const KICKSTART_CHOICE = [
    '/var/lib/cobbler/kickstarts/CentOS_65-x86_64.ks',
    '/var/lib/cobbler/kickstarts/CentOS_610-x86_64.ks',
    '/var/lib/cobbler/kickstarts/CentOS_73-x86_64.ks',
    '/var/lib/cobbler/kickstarts/CentOS_76-x86_64.ks',
    '/var/lib/cobbler/kickstarts/CentOS_81-x86_64.ks'
  ]

  export default {
    name: 'ArticleIndex',
    filters: {},
    data() {
      return {
        // 表格loading
        TableLoading: true,
        // 按钮loading
        ButtonLoading: false,
        // 总数
        total: 0,
        // 当前页数
        currentPage: 1,
        // 数据列表
        articles: [],
        // 标签页
        activeName: 'first',
        // dialog中form表单数据
        form: {
          asset_number: '',
          card_ip: '',
          intranet_ip: '',
          public_ip: '',
          idc: '',
          administrator: '',
          product: ''
        },
        // 是否显示 Dialog
        dialogFormVisible: false,
        multipleSelection: [],
        formInline: {
          user: '',
          region: ''
        },
        ruleForm: {
          asset_number: '',
          card_ip: '',
          intranet_ip: '',
          public_ip: '',
          idc: '',
          administrator: '',
          product: ''
        },
        // 表单项规则
        rules: {
          os: [
            {required: true, type: 'string', message: '请选择操作系统', trigger: 'change'},
          ],
          part_type: [
            {required: true, type: 'string', message: '请选择磁盘分区', trigger: 'change'},
          ],
          sudo: [
            {required: true, type: 'string', message: '请输入sudo用户', trigger: 'change'},
          ],
          raid: [
            {required: true, type: 'string', message: '请选择RAID', trigger: 'change'},
          ]
        },
        // 下拉框选项
        OS_CHOICE: OS_CHOICE,
        PART_TYPE_CHOICE: PART_TYPE_CHOICE,
        KICKSTART_CHOICE: KICKSTART_CHOICE,
        ip_address: [],
        statusList: [],
        items: [
          {type: 'success', label: '运行中'},
          // {type: 'danger', label: '关机'},
        ]
      }
    },
    // 初始化
    created() {
      this.getPhysicalList(1, 10)
      // this.getStatus()
    },
    mounted() {
      console.log(this.$refs.ruleForm)
    },
    methods: {
      // 获取列表内容
      async getPhysicalList(page = 1, limit = 10) {
        // 展示加载中 loading
        this.TableLoading = true
        let options = {
          page,
          username: 'hongze',
          limit
        }
        getPhysicalListApi(options).then(response => {
          this.articles = response.data.data
          this.total = response.data.total
          this.TableLoading = false
          // 关闭加载中 loading
          // setTimeout(() => {   //设置延迟执行
          //   this.loading = false
          //   console.log('关闭loading');
          // }, 1000);
          this.getStatus()
        })
      },
      getStatus() {
        let ipAddressList = []

        this.articles.forEach((item) => {
          console.log(this.articles)
          ipAddressList.push(item.card_ip)
        })
        getStatusAPI({ip_address: ipAddressList, username: 'hongze'}).then(response => {
          this.statusList = response.data.data
          console.log(ipAddressList)
        })
      },
      // 顶部标签页
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 查询按钮
      search() {
        console.log('查询成功!');
      },
      // 刷新按钮
      async refresh() {
        this.ButtonLoading = true
        await this.getPhysicalList()
        setTimeout(() => {   //设置延迟执行
          this.ButtonLoading = false
        }, 1000);
        console.log('refresh!')
      },
      // 表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success',
            });
          } else {
            console.log('error 提交失败!');
            return false;
          }
        });
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 单台开机关机重启
      handleIDC(asset_number, type) {
        console.log(asset_number);
        this.$confirm(`确认${type}${asset_number}吗？`, `${type}提示`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            showClose: true,
            message: '确认成功',
            type: 'success',
          });
          console.log('确认成功')
        }).catch((error) => {
            this.$message({
              showClose: true,
              message: '取消成功'
            });
            console.log('取消成功')
          }
        )
      },
      // 重装form默认值
      rebuild(row) {
        this.dialogFormVisible = true
        this.form.intranet_ip = row.intranet_ip
        this.form.asset_number = row.asset_number
        this.form.card_ip = row.card_ip
      },
      // 每页几条
      handleSizeChange(val) {
        console.log(val)
        this.getPhysicalList(1, val)
        console.log(`每页 ${val} 条`)
      },
      // 当前页数
      handleCurrentChange(val) {
        this.getPhysicalList(val, 10)
        console.log(`当前页: ${val}`)
      },
      // 批量开机关机重启
      handleIDClist(type) {
        console.log(type)
        let ipList = []
        if (this.multipleSelection.length === 0) {
          this.$message({
            showClose: true,
            message: '请至少选择一条数据',
            type: 'warning'
          });
        } else {
          this.multipleSelection.forEach((item) => {
            ipList.push(item.card_ip)
            console.log(item.card_ip)
          })
          this.$confirm(`确认${type}${ipList}吗？`, `${type}提示`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              showClose: true,
              message: '确认成功',
              type: 'success'
            });
            console.log('确认成功')
          }).catch((error) => {
              this.$message({
                showClose: true,
                message: '取消成功'
              });
              console.log('取消成功')
            }
          )
        }
      },
      // 获取选中项
      handleSelectionChange(val) {
        // console.log(val)
        this.multipleSelection = val;
        this.multipleSelection.forEach((item) => {
          // console.log(item.card_ip)
        })
      },
    }
  }
</script>

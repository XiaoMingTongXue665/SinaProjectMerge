<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="审批管理" name="first">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="请输入搜索内容"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item
                style="float: right"
              >
                <el-button type="primary" @click="onSubmit">刷新</el-button>
              </el-form-item>
            </el-form>
            <el-table
              v-loading="listLoading"
              :data="articles"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column label="提案号" width="110" align="center">
                <template slot-scope="scope">
                  {{ scope.row.proposal_number }}
                </template>
              </el-table-column>
              <el-table-column label="用户名" width="110" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <el-table-column label="盘点号" width="110" align="center">
                <template slot-scope="scope">
                  {{ scope.row.server }}
                </template>
              </el-table-column>
              <el-table-column label="管理卡IP" width="140" align="center">
                <template slot-scope="scope">
                  {{ scope.row.card_ip }}
                </template>
              </el-table-column>
              <el-table-column label="创建时间" width="230" align="center">
                <template slot-scope="scope">
                  {{ scope.row.create_time }}
                </template>
              </el-table-column>
              <el-table-column label="种类" width="230" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.types }}
                </template>
              </el-table-column>
              <el-table-column label="状态" width="110" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.change_status }}
                </template>
              </el-table-column>
              <el-table-column label="详情" width="110" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.note }}
                </template>
              </el-table-column>
              <el-table-column label="描述" width="150" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.contexts }}
                </template>
              </el-table-column>
              <el-table-column label="是否解决" align="center" width="300" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                  <el-button type="primary" size="mini" @click="centerDialogVisible = true">
                    已解决
                  </el-button>
                  <el-button type="success" size="mini" @click="centerDialogVisible = true">
                    未解决
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="total>=0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"/>
            <el-dialog
              title="提示"
              :visible.sync="centerDialogVisible"
              width="30%"
              center>
              <span>您确定执行当前操作吗？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getRecord} from '@/api/record'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  // import {getList} from '@/api/table'

  export default {
    name: 'RecordIndex',
    components: { Pagination },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        listLoading: false,
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        articles: [],
        activeName: 'first',
        form: {
          card_ip: '',
          change_status: '',
          create_time: '',
          end_time: '',
          note: '',
          server: '',
          types: '',
          username: ''
        },
        centerDialogVisible: false,
        formLabelWidth: '120px',
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    created() {
      this.loadArticles(1)
    },
    methods: {
      loadArticles(page = 1) {
        // 展示加载中 loading
        this.loading = true
        getRecord({page, username: 'yingguang', limit: 15}).then(response => {
          this.articles = response.data.data
          // 关闭加载中 loading
          this.loading = false
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

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
              <el-table-column label="盘点号" width="110" align="center">
                <template slot-scope="scope">
                  {{ scope.row.asset_number }}
                </template>
              </el-table-column>
              <el-table-column label="创建人" width="110" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.create_username }}</span>
                </template>
              </el-table-column>
              <el-table-column label="审批人" width="110" align="center">
                <template slot-scope="scope">
                  {{ scope.row.super_username }}
                </template>
              </el-table-column>
              <el-table-column label="代理审批人" width="110" align="center">
                <template slot-scope="scope">
                  {{ scope.row.agent_username }}
                </template>
              </el-table-column>
              <el-table-column label="创建时间" width="230" align="center">
                <template slot-scope="scope">
                  {{ scope.row.create_time }}
                </template>
              </el-table-column>
              <el-table-column label="处理时间" width="230" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.end_time }}
                </template>
              </el-table-column>
              <el-table-column label="状态" width="110" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.state }}
                </template>
              </el-table-column>
              <el-table-column label="类型" width="110" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.method }}
                </template>
              </el-table-column>
              <el-table-column label="管理卡IP" width="150" align="auto">
                <template slot-scope="scope">
                  {{ scope.row.card_ip }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                  <el-button type="primary" size="mini" @click="centerDialogVisible = true">
                    批准
                  </el-button>
                  <el-button type="success" size="mini" @click="centerDialogVisible = true">
                    拒绝
                  </el-button>
                  <el-button size="mini" type="danger" @click="centerDialogVisible = true">
                    撤回
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
  import {getTicket} from '@/api/ticket'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  // import {getList} from '@/api/table'

  export default {
    name: 'TicketIndex',
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
          asset_number: '',
          card_ip: '',
          create_time: '',
          create_username: '',
          end_time: '',
          method: '',
          super_username: '',
          state: ''
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
        getTicket({page, username: 'yingguang', limit: 15}).then(response => {
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

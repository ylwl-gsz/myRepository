<template>
  <div class="hello">
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo hello"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input
              autocomplete="on"
              v-model="formInline.user"
              placeholder="姓名"
              style="margin-top:60px"
            ></el-input>
          </el-form-item>
          <el-form-item label="地区">
            <el-select v-model="formInline.region" placeholder="地区" style="margin-top:60px">
              <el-option label="请选择" value></el-option>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="北京" value="北京"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="margin-top:60px">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addClick" style="margin-top:60px">添加</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          border
          style="width: 100% ;margin-top:30px"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column fixed prop="date" label="日期" width="150" height="10px"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="province" label="地区" width="120"></el-table-column>
          <el-table-column prop="city" label="所在地" width="120"></el-table-column>
          <el-table-column prop="address" label="地址" width="300"></el-table-column>
          <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
          <el-table-column prop="sex" label="性别" width="120"></el-table-column>
          <el-table-column prop="tel" label="电话" width="150"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="editorClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delateClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
<el-pagination
  background
  layout="prev, pager, next"
  @current-change="pageClick"
  :current-page="formInline.curPage"
  :page-size="formInline.pageSize"
  :total="formInline.totalPage">
</el-pagination>
      </el-main>
    </el-container>

    <el-dialog :title="type" :visible.sync="dialogFormVisible">
      <el-form  :model="form" ref="form">
        <el-form-item
          label="日期"
          :label-width="formLabelWidth"
          prop="date"
          :rules="[
           { required: true, message: '日期不能为空', trigger: 'blur' },
              ]"
        >
          <div class="block">
            <el-date-picker
              v-model="form.date"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </el-form-item>
        <!-- <el-form-item
          v-for="(value,key) in form"
          :key ="key"
          :label="key"
          :label-width="formLabelWidth"
          :prop="key"
          :rules="[
           { required: true, message: '姓名不能为空', trigger: 'blur' },
              ]"
         ><el-input v-model="value" :key="key" autocomplete="off"></el-input>
         </el-form-item>  -->
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="name"
          :rules="[
           { required: true, message: '姓名不能为空', trigger: 'blur' },
              ]"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
       <el-form-item
          label="地区"
          :label-width="formLabelWidth"
          prop="province"
          :rules="[
           { required: true, message: '地区不能为空', trigger: 'blur' },
              ]"
        >
          <el-select v-model="form.province" placeholder="地区">
            <el-option label="上海" value="上海"></el-option>
            <el-option label="北京" value="北京"></el-option>
          </el-select>
        </el-form-item>




        <el-form-item
          label="所在地"
          :label-width="formLabelWidth"
          prop="city"
          :rules="[
           { required: true, message: '所在地不能为空', trigger: 'blur' },
              ]"
        >
          <el-input v-model="form.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          :label-width="formLabelWidth"
          prop="address"
          :rules="[
           { required: true, message: '地址不能为空', trigger: 'blur' },
              ]"
        >
          <el-input v-model="form.address" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item
          label="邮编"
          :label-width="formLabelWidth"
          prop="zip"
          :rules="[
           { required: true, message: '邮编不能为空', trigger: 'blur' },
              ]"
        >
          <el-input v-model="form.zip" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          :label-width="formLabelWidth"
          prop="sex"
          :rules="[
           { required: true, message: '性别不能为空', trigger: 'blur' },
              ]"
        >
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          :label-width="formLabelWidth"
          prop="tel"
          :rules="[
           { required: true, message: '电话不能为空', trigger: 'blur' },
              ]"
        >
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
          prop="email"
          :rules="[
           { required: true, message: '邮箱不能为空', trigger: 'blur' },
              ]"
        >
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureClick()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {

      type: "添加",
      dialogFormVisible: false,
      selectRow: {},
      formVal:["name","city","address","zip","sex","tel","email"],
      form: {
        id : Number,
        date: "",
        name: "",
        province: "",
        city: "",
        address: "",
        zip: "",
        sex: "",
        tel: "",
        email: ""
      },
      formLabelWidth: "100px",
      formInline: {
        user: "",
        region: "",
        curPage:1,
        totalPage:1,
        pageSize:3,
      },
      tableData: [],
      allInfo: [
        // {
        //   date: "2016-05-02",
        //   name: "王4虎",
        //   province: "上海",
        //   city: "普陀3区",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   zip: 200333,
        //   sex: "男",
        //   tel: "12872190812042",
        //   email: "129308@qq.com"
        // },
        // {
        //   date: "2016-05-04",
        //   name: "王3虎",
        //   province: "上海",
        //   city: "普陀4区",
        //   address: "上海市普陀区金沙江路 1517 弄",
        //   zip: 200333,
        //   sex: "女",
        //   tel: "11245453453452",
        //   email: "1293222208@qq.com"
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王2虎",
        //   province: "北京",
        //   city: "普陀5区",
        //   address: "北京市普陀区金沙江路 15129 弄",
        //   zip: 200333,
        //   sex: "男",
        //   tel: "123242353462042",
        //   email: "129311212308@qq.com"
        // },
        // {
        //   date: "2016-05-03",
        //   name: "王1虎",
        //   province: "北京",
        //   city: "普陀4区",
        //   address: "北京市普陀区金沙江路 15316 弄",
        //   zip: 200333,
        //   sex: "男",
        //   tel: "125142344812042",
        //   email: "1263465408@qq.com"
        // }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.tableData.splice(0);
      let name = this.formInline.user;
      let region = this.formInline.region;
      let list = this.allInfo;
      let reg1 = new RegExp(name);
      let reg2 = new RegExp(region);
      this.request("http://10.1.88.139:8090/vueServer/tableData",this.formInline);
      // for (let i = 0; i < list.length; i++) {
      //   if (
      //     list[i].name.indexOf(name) >= 0 &&
      //     list[i].province.indexOf(region) >= 0
      //   ) {
      //     this.tableData.push(list[i]);
      //   }
      //   if (list[i].name.match(reg1) && list[i].province.match(reg2)) {
      //     //匹配成功do something
      //     this.tableData.push(list[i]);
      //   }
      // }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    editorClick(row) {
      this.type = "编辑";
      this.dialogFormVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
      this.selectRow = row;
    },
    delateClick(row) {
      // this.tableData.splice(this.tableData.indexOf(row), 1);
      // this.allInfo.splice(this.allInfo.indexOf(row), 1);
      this.request("http://10.1.88.139:8090/vueServer/delPerson",{'id':row.id});
    },
    sureClick() {
      let row = JSON.parse(JSON.stringify(this.form));
      if (this.type === "编辑") {
        // for (var i in this.selectRow) {
        //   this.selectRow[i] = row[i];
        // }
        this.request("http://10.1.88.139:8090/vueServer/editorPerson",this.form);
      } else if(this.type === "添加") {
        // this.tableData.push(row);
        // this.allInfo.push(row);
        this.request("http://10.1.88.139:8090/vueServer/addPerson",this.form);
      }
      this.dialogFormVisible = false;
    },
    addClick() {
      this.type = "添加";
      this.form = {};
      this.dialogFormVisible = true;
    },
    request(url,request) {
      // alert(name+region)
      var _this = this;
      var param = this.$qs.stringify(request);
      this.$axios
        .post(url, param)
        .then(function(data) {
          console.log(data)
          _this.formInline.totalPage=data.data.totalElements
          // _this.formInline.curPage=data.data.Number+1
          _this.tableData = JSON.parse(JSON.stringify(data.data));
        });
    },
    pageClick(page){
    this.formInline.curPage=page;
    this.request("http://10.1.88.139:8090/vueServer/tableData",this.formInline);
    },
    // prePage(cpage){
    //      alert(cpage)
    //   console.log(cpage)
    // },
    // nextPage(cpage){
    //      alert(cpage)
    //   console.log(cpage)
    // }

  },
  created() {
    this.request("http://10.1.88.139:8090/vueServer/tableData",this.formInline);
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.hello {
  height: 43pc;
}
.demo-form-inline {
  margin-top: 0px;
  height: 100px;
}


</style>

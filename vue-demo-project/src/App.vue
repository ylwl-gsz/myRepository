
<template>
  <div id="app">
    
    <!-- <el-row style="background-color: rgb(84, 92, 100);">
      <el-col :span="8">
        <div class="grid-content">
          <img src="./assets/1.jpg" width="100%" height="70px" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>

              <el-menu-item
                v-for="(item,i) in demoList"
                :index="'2-'+i"
                @click="toDemo('#/'+item )"
                :key="i"
              >{{ item }}</el-menu-item>


              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4" @click="otherPage('https://www.baidu.com')">订单管理</el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>{{ fatherMsg2 }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->


    <router-view :fatherMsg="fatherMsg" @fatherFunction="fatherFunction" />


    <div class="btnGroup" style="text-align:center;margin-left:0px">
        <input type="botton" readonly value="保存" class="mybtn" style="font-size: smaller;float:left;margin-left:5%;"  />
       <input type="botton" readonly value="返回" @click="back" class="mybtn" style="font-size: smaller;width:20%; float:right;margin-right:5%;"  />

    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialogVisible: false,
      activeIndex: "1",
      activeIndex2: "1",
      fatherMsg: "父组件向子组件传值",
      fatherMsg2: "父组件向子组件传方法",
      demoList: ["showDemo", "tableDemo", "otherDemo"]
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {     });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick() {
      alert("button click");
    },
    toDemo(position) {
      window.location.href = position;
    },
    otherPage(position) {
      window.open(position);
    },
    fatherFunction(msg2) {
      if (msg2 != null) {
        this.fatherMsg2 = msg2;
      }
      this.dialogVisible = true;
    },

    back(){
        this.router.push("home");
    },

  }
};
</script>




<style>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  
}

.mybtn{
  margin-top:15px;
  border-radius: 5px;
  text-align: center;
  background: #F7F7F7;border:1px #C6C6C6 solid;
  width:18%;
  height: 30px
}
.btnGroup {
      left: 0;
  z-index: 10;
  border: 1px lightgray solid;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  }


</style>



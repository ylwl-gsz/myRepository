<template>
  <div class="hello"> 
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo hello"
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
        <div>{{ msg }}</div>
        <el-form>
          <el-form-item>
            <el-input v-model="msg" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div>{{ fatherMsg }}</div>
        <el-form>
          <el-form-item>
            <el-button
              type="primary"
              @click="doFatherFunction()"
              style="margin-top:60px"
            >父组件方法</el-button>
          </el-form-item>
        </el-form>
         <el-form>
          <el-form-item>
            <el-button
              type="primary"
              @click="doFatherFunction('子组件传回去的值')"
              style="margin-top:60px"
            >传值回去</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>



export default {
  data() {
    return {
      msg: "数据绑定！！！！！！！！！！！！！"
    };
  },
  props: {
    fatherMsg: String,
  },
  methods: {
    doFatherFunction(msg) {
        this.$emit("fatherFunction",msg)
    },
  },




};
</script>

<style>


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

</style>
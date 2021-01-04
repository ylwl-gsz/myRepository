<template>
 
    <scroller
      height="-1"
      :scroll-bottom-offset="200"
      :lock-x="true"
      :use-pulldown="true"
      :pulldown-config="pullconf"
       @on-pulldown-loading='refresh' 
      @on-scroll-bottom="loadMore"
       ref="scrollerBottom">
      <div>
        <div style="border: 1px #F7F7F7 solid;height:70px ">
          <div class="search-group"  >
            <div class="search"  :style="inputlength">
              <van-cell-group>
                  <van-field
                    style="height:38px;padding-left: 2px;padding-top: 5px;"
                    v-model="subject"
                    clearable
                    :left-icon="icon"
                    :border="false"
                    placeholder="请输入查询内容"
                  />
                </van-cell-group>
            </div>
            <div class="BtnClass">
               <input type="botton" readonly value="查询" @click="search" class="mybtn"   />
              <input type="botton" readonly  value="新增" @click="addTask" class="mybtn"  />

                <!-- <x-button  :button-global-height="'40px'" plain @click.native="search" style="background: #F7F7F7;border:1px #C6C6C6 solid;width:70px;display:inline-block">查询</x-button> -->
              <!-- <x-button  button-global-height="40px"   plain @click.native="addTask" style=" background: #F7F7F7;border:1px #C6C6C6 solid;width:70px;display:inline-block">新增</x-button> -->
            </div>
          </div>
        </div>
        <group class="data-list">
          <div
            v-for="item in list.slice(0,pageSize)"
            :key="item.titlle"
            @click="openTaskDetail(item.eformid,item.logid)" style="border-bottom:1px solid #C6C6C6;">
            <div style="display: inline-block;width:20%;">
              <img
                slot="header"
                src="@/assets/icon/todo.png"
                style="display:block;position:relative;top:5px;left:15px"
              />
            </div>
            <div style="display: inline-block;margin-bottom:10px;margin-top:20px">
              <div :style="subjectLenth" >{{ item.subject }}</div>
              <div style="color:#999;font-size:12px;height:30px">截止时间:{{ item.displaytime }}</div>
            </div>
          </div>
          <load-more :show-loading="showloading" :tip="tip"></load-more>
        </group>
      </div>
    </scroller>

</template>

<script>
import { Cell, CellGroup } from 'vant';

import {
  XInput,
  XButton,
  Divider,
  LoadMore,
  Card,
  XHeader,
  Scroller,
  Icon,
  Group,
} from "vux";

export default {
  components: {
    XInput,
    XButton,
    Divider,
    LoadMore,
    Card,
    XHeader,
    Scroller,
    Icon,
    Group,
    [CellGroup.name]:CellGroup,
    [Cell.name]:Cell,
    
  },

  data() {
    return {
      pullconf:{downContent: '下拉刷新', upContent: '释放后更新',loadingContent: '正在刷新...',},
      list: [],
      pageSize: 10,
      subject: "",
      onFetching: false,
      showloading: true,
      tip: "加载中",
      inputlength: {width:document.documentElement.clientWidth-185+"px"},
      subjectLenth: {width:document.documentElement.clientWidth-90+"px",'font-size':'14px','line-height':'1.2','height':'30px'},
      applyKind:this.$cordovaUtls.getQueryString("applyKind"),
      userId:'',
      userName:'',
      status:this.$cordovaUtls.getQueryString("status"),
      tenantId: appConfig.tenantId,
      icon:require("@/assets/icon/searchicon.png"),

    };
  },
  created(){

    //获取用户信息
    //  window.mx_toGetUserInfo = this.mx_toGetUserInfo;
    // this.$cordovaUtls.getUserInfo();
    this.getUser();
    if(this.applyKind == null || this.applyKind == "" || this.applyKind == undefined){
      this.applyKind = this.$route.query.applyKind;
    }
    if(this.status == null || this.status == "" || this.status == undefined){
      this.status = this.$route.query.status;
    }
    // this.search()
          

    //查询列表
  },
  methods: {

    
    getUser(){
      ms.getUser(user => {
      if (user != null && user != "null") {
        //  console.log(user)
        this.userId = user.userId;
        // this.orgId = user.orgId;
        // this.deptId = user.deptId;
        // this.orgId = user.orgId;
         this.userName = user.userName;
         this.search();
      }
    });
    },
     mx_toGetUserInfo(userInfo){
      var user = JSON.parse(userInfo);
      this.userId = user.userId;
      this.userName = user.userName;
      this.search()
    },
    //  查询列表
    search() {
      this.pageSize = 10;
      this.searchParams();
    },
    onBlur($event){
      // alert(1)
      // this.setTouched()
      // this.validate()
      setTimeout(function () {
      this.isFocus = false
      }, 100)
      this.$emit('on-blur', this.currentValue, $event)
    },
    clear(){
      alert(1)
    },
    searchParams() {
      this.getTaskListFromServer("task/getTaskList", {
        subject: this.subject,
        // pageSize: this.pageSize,
        currentPage: 1,
        userId:this.userId,
        status: this.status,
        stepname: this.applyKind,
        tenantId: this.tenantId,
      });
    },
    getTaskListFromServer(queryFromServerURL, params, backList) {
      console.log(params)
      http.ppost(queryFromServerURL, params).then(({ data }) => {
        this.list = data;
        if (data.length < this.pageSize) {
          this.showloading = false;
          this.tip = "没有更多数据了";
        } else {
          this.showloading = true;
          this.tip = "加载中";
        }
        this.$refs.scrollerBottom.reset({top: 0})      

      });
    },
    // 查询等待
    loadMore() {
      if (this.onFetching) {
      } else {
        this.onFetching = true;
        setTimeout(() => {
          this.pageSize += 10;
          // this.searchParams();
        if (this.list.length < this.pageSize) {
          this.showloading = false;
          this.tip = "没有更多数据了";
        } else {
          this.showloading = true;
          this.tip = "加载中";
        }
          this.$nextTick(() => {});
          this.onFetching = false;
        }, 2000);
      }
    },
    refresh () {
       this.pageSize = 10;
       this.subject=""
       this.search()
     // this.scrollTop = pos.top
    },
    //  跳转操作
    addTask() {
      this.$router.push({
        path: "/addTask",
        query: {
          applyKind:this.applyKind
        }});
    },
    openTaskDetail(id, flowid) {
      this.$router.push({
        path: "/wxdTaskDetail",
        query: {
          queryId: id,
          flowId: flowid,
          applyKind:this.applyKind
        },
      });
    },
  },

  computed: {
    // 不同宽度手机样式调整
    getSearchClass() {
      if (this.windowWidth > 400) {
        return "bigSize-search";
      } else {
        return "litSize-search";
      }
    },
    getBtnClass() {
      if (this.windowWidth > 400) {
        return "bigSize-btn";
      } else {
        return "litSize-btn";
      }
    },
  },
};
</script>
<style scoped>
.search {
  /* width: 61%; */
  float:left;
  margin-top: 10px;
  height: 38px;
  border:1px #A6A6A6 solid;
  border-radius: 3px;
}
.mybtn{
  border-radius: 5px;
  text-align: center;
  background: #F7F7F7;border:1px #C6C6C6 solid;
  width:70px;
  height:38px
}

.BtnClass {
  margin-left:10px;
  text-align: right;
  /* width: 38%;   */
   margin-top: 10px;
   float:left;
   height: 29px;
}
.search-group{
  margin:10px;
   height: 50px;
   margin-top: 5px;
}

.vux-x-input {
  padding: 0px;
}
.weui-btn {
  margin-top: 0px !important;
}

/deep/ .weui-cells {
  margin-top: 0;
  background-color: #ffffff;
  line-height: 1.41176471;
  font-size: 17px;
  overflow: hidden;
  position: relative;
}
.search >>> .weui-cells:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 0;
    border-top: 0px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.search >>> .weui-cells:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 0px;
    border-bottom: 0px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.data-list >>> .weui-cells:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 0;
    border-bottom: 0px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
button {
    color: inherit;
    font: none;
}
.search >>> img{
  width:28px;
  height:28px;
}
.search >>> .van-field__control{
  padding-top:2px
}


</style>
<template >
  <div style="overflow: scroll;overflow-y:hidden;overflow-x:hidden ">
    <img src="../../assets/home/Summer.png" style="width:100%" />
    <div class="list">
      <ul>
        <li v-for="(item, index) in menus" :key="index">
          <div @click="toNextPage(item)" class="curIcon">
            <i class="icon iconfont icon_color" v-html="item.image">
               
            </i>
          </div>
          <p>{{item.name}}</p>
          <span :id="item.id"  v-if="item.numFields"  style="font-size: 14px;min-width:20px;width:auto">{{item.numFields}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import appConfig from "../../../config/myConfig";

export default {

  data() {
    return {
      menus: [
            {image:'',name:'1',position:'tableDemo'},
            {image:'',name:'2'},
            {image:'',name:'3'},
            {image:'',name:'4'},
            {image:'',name:'5'},
            {image:'',name:'6'},
            {image:'',name:'7'},
            {image:'',name:'8'},
            {image:'',name:'9'}],
      activeClass: "curIcon",
      imgSrc: "",
      tenantId: appConfig.tenantId,
      stup: this.$route.query.stup,
      HID: this.$route.query.HID,
      userId: "",
      orgId: "",
      deptId: "",
      fieldsLength:{width:'25px'},
    }; 
  },
  methods: {
    getMenu() {
     
    },
    toNextPage(item) {
        this.router.push(item.position);
    },
  },
  created() {
    
  }
};
</script>

<style scoped>
@import "../../../static/iconfont/iconfont.css";

.list {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #fff;
}
ul {
  width: 100%;
  margin-left: -1px;
  padding: 0;
  position: relative;
  font-size: 0;
  border-top: 1px solid #eee;
  margin-top: 12px;
}
li {
  width: 33%;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  position: relative;
}
li p {
  margin: 0;
}
ul li:nth-child(3n + 0) {
  border-right: 0;
}
li a {
  width: 100%;
  display: block;
}
li p {
  color: #000;
}
li span {
  width: 20px;
  height: 20px;
  display: block;
  background-color: #f00;
  color: #fff;
  border-radius: 15px;
  font-style: normal;
  position: absolute;
  top: 18%;
  right: 25%;
  text-align: center;
  line-height: 20px;
  z-index: 99;
}
.list .icon {
  font-size: 45px;
  line-height: 68px;
  margin: 18px 0;
}
</style>

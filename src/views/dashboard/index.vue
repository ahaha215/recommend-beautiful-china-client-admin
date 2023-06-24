<template>
  <div class="content">
    <div class="global-statistics clearfix">
      <div class="box">
        <div class="ring left">
          <img src="./images/user-statistics.png" alt="" />
        </div>
        <h2 class="right">{{ userInfoNum }}</h2>
      </div>

      <div class="box">
        <div class="ring left">
          <img src="./images/type-statistics.png" alt="" />
        </div>
        <h2 class="right">{{ typeInfoNum }}</h2>
      </div>

      <div class="box">
        <div class="ring left">
          <img src="./images/resource-statistics.png" alt="" class="left" />
        </div>
        <h2 class="right">{{ resourceInfoNum }}</h2>
      </div>

      <div class="box">
        <div class="ring left">
          <img src="./images/posts-statistics.png" alt="" class="left" />
        </div>
        <h2 class="right">{{ postsInfoNum }}</h2>
      </div>
    </div>

    <div class="classification-statistics clearfix">
      <div class="clearfix">
        <div class="user left">
          <div id="user-statistics" style="width: 500px; height: 500px"></div>
        </div>

        <div class="type right">
          <div id="type-statistics" style="width: 500px; height: 500px"></div>
        </div>
      </div>

      <div class="resource left">
        <div id="resource-statistics" style="width: 500px; height: 500px"></div>
      </div>

      <div class="posts right">
        <div id="posts-statistics" style="width: 500px; height: 500px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  statisticsUserInfo,
  statisticsTypeInfo,
  statisticsResourceInfo,
  statisticPostsInfo,
} from "@/api/index";
import { TimeSelect } from "element-ui";
import ResizeHandler from "@/layout/mixin/ResizeHandler";

export default {
  name: "Dashboard",
  data() {
    return {
      userInfoNum: 0,
      typeInfoNum: 0,
      resourceInfoNum: 0,
      postsInfoNum: 0,
      userData: [],
      resourceData: [],
    };
  },
  mounted() {

    setTimeout(() => {
      console.log(">>>>>" + this.userInfoNum);

      // 初始化用户数据

      var userDom = document.getElementById("user-statistics");

      var userChart = echarts.init(userDom);
      var userOption;

      userOption = {
        title: {
          text: "用户数据统计",
          subtext: "男女占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: this.userData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      userOption && userChart.setOption(userOption);

      // 初始化类型数据

      var typeDom = document.getElementById("type-statistics");

      var typeChart = echarts.init(typeDom);
      var typeOption;

      typeOption = {
        title: {
          text: "类型数据统计",
          subtext: "各类型占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: this.resourceData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      typeOption && typeChart.setOption(typeOption);

      // 初始化资源数据

      var resourceDom = document.getElementById("resource-statistics");

      var resourceChart = echarts.init(resourceDom);
      var resourceOption;

      resourceOption = {
        title: {
          text: "资源数据统计",
          subtext: "各资源数目",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
          },
        },
        legend: {
          data: ["资源数"],
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "数目",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} 个",
            },
          },
        ],
        series: [
          {
            name: "Evaporation",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " 个";
              },
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
        ],
      };

      resourceOption && resourceChart.setOption(resourceOption);

      // 初始化微话数据

      var postsDom = document.getElementById("posts-statistics");

      var postsChart = echarts.init(postsDom);
      var postsOption;

      postsOption = {
        title: {
          text: "微话数据统计",
          subtext: "各微话数目",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
          },
        },
        legend: {
          data: ["资源数"],
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "数目",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} 个",
            },
          },
        ],
        series: [
          {
            name: "Evaporation",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " 个";
              },
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
        ],
      };

      postsOption && postsChart.setOption(postsOption);
    }, 100);
  
  
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      statisticsUserInfo().then((response) => {
        let maleNum = response.data.maleNum;
        let femaleNum = response.data.femaleNum;

        this.userInfoNum = maleNum + femaleNum;
        this.userData = [
          { name: "男", value: maleNum },
          { name: "女", value: femaleNum },
        ];
      });

      statisticsTypeInfo().then((response) => {
        this.typeInfoNum = response.data.typeNum;
      });

      statisticsResourceInfo().then((response) => {
        this.resourceInfoNum = response.data.resourceNum;
        this.resourceData = response.data.resourceStatisticsByTypes;
      });

      statisticPostsInfo().then((response) => {
        this.postsInfoNum = response.data.postsNum;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 50px;
  padding-left: 20px;

  .global-statistics {
    .box {
      width: 220px;
      height: 100px;
      float: left;
      margin-right: 40px;
      margin-left: 40px;
      background-color: rgb(245, 245, 245);
      padding-left: 20px;
      padding-right: 20px;
      border-radius: 12px;

      .ring {
        width: 80px;
        height: 80px;
        background-color: white;
        margin-top: 10px;
        border-radius: 50%;
        padding: 10px;

        img {
          width: 60px;
          height: 60px;
          //margin-top: 20px;
          border-radius: 50%;
        }
      }

      h2 {
        line-height: 60px;
        margin-right: 20px;
      }
    }
  }

  .classification-statistics {
    margin-top: 100px;
    margin-left: 40px;
  }
}
</style>

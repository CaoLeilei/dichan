<template>
  <div class="dc-overview__download">
    <el-row :gutter="74">
      <el-col :xs="24" :sm="12" v-for="(item, index) in downloadList" :key="index">
        <div class="download-item">
          <a :href="item.url" icon="file-icon"
             target="_blank"
             class="el-button download-btn el-button--primary"
             :download="buildFileName(item)">
<!--            <i class="file-icon"></i>-->
            <span class="file-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 28">
<!--                558cc9-->
                <path d="M5 15H4v2h1c.5 0 1-.5 1-1s-.5-1-1-1zm5 0v4c1 0 2-1 2-2s-1-2-2-2zm6-15H2C.9 0 0 .9 0 2v24c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6l-6-6zM5 18H4v2H3v-6h2c1.2 0 2 .8 2 2s-.8 2-2 2zm5 2H9v-6h1c1.7 0 3 1.3 3 3s-1.3 3-3 3zm9-5h-3v2h2v1h-2v2h-1v-6h4v1zm-4-8V1l6 6h-6z" fill="#ffffff">
                </path>
              </svg>
            </span>
            <span class="file-name">{{item.name}}</span>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'overviewDownload',
    props: {
      downloadList: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    methods: {
      buildFileName (item) {
        let urlArr = item.url.split('/');
        if (urlArr.length) {
          return urlArr[urlArr.length - 1];
        }
        return  null;
      }
    }
  };
</script>
<template>
  <div class="dc-list">
    <dc-list-module v-for="(section, index) in sectionList"
                    :key="index" :title="section.title" :desc="section.desc"
                    :list="section.cases">
    </dc-list-module>
  </div>
</template>

<script>
  import loading from '../../common/mixins/loading';
  import services from '../../services';
  import DcListModule from './list-module';

  export default {
    name: 'dcList',
    mixins: [
      loading
    ],
    components: {
      DcListModule
    },
    data () {
      return {
        secondaryList: [],
        primaryList: [],
        sectionList: []
      };
    },
    mounted () {
      this.showLoading();
      this._loadProductList().finally(() => {
        this.closeLoading();
      });
    },
    methods: {
      _loadProductList () {
        return new Promise((resolve, reject) => {
          services.getProjectList() .then(response => {
            this.sectionList = [];
            if (response && Array.isArray(response.sections)) {
              this.sectionList = response.sections;
            }
            resolve();
          }, reject);
        });
      }
    }
  };
</script>
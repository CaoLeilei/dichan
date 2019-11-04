
import { Loading } from 'element-ui';

export default {
  data () {
    return {
      loadingBlock: null
    };
  },
  methods: {
    showLoading (isBody) {
      if (!this.loadingBlock) {
        this.loadingBlock = Loading.service(
          {
            body: isBody
          }
        );
      }
    },
    closeLoading () {
      if (this.loadingBlock) {
        this.loadingBlock.close()
        this.$nextTick(() => {
          this.loadingBlock = null;
        });
      }
    }
  }
}
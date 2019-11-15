<template>
  <div class="dc-copyright">
    <div class="dc-copyright__inner">
      {{$t('components.copyright')}}
      <!-- <a :href="privacyPolicyUrl" target="_blank"></a> -->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'DcCopyright',
    computed: {
      ...mapGetters([
        'privacyPolicyUrl'
      ])
    }
  };
</script>
<template>
  <h3 class="dc-overview__title dc-overview__detail-title" >
    <span>{{title}}</span>
  </h3>
</template>

<script>
  export default {
    name: 'DcOverviewTitle',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  };
</script>
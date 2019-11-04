<template>
  <div class="row dc-overview__base-row">
    <div class="col-12 col-md-4" v-for="(item, index) in brights" :key="index">
      <div class="dc-overview__base-item" :style="{background: `url('${item.icon_url}') no-repeat top center`, backgroundSize: '85px 85px'}">
        <h3>{{item.title}}</h3>
        <div class="item-content">
          <p>{{item.desc}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'overviewBrights',
    props: {
      brights: {
        type: Array,
        default () {
          return [];
        }
      }
    }

  };
</script>
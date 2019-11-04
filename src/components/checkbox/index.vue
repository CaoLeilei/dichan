<template>
  <label class="dc-checkbox">
    <input type="checkbox" v-model="checkedValue">
    <span class=""></span>
    <slot></slot>
  </label>
</template>

<script>
  export default {
    name: 'DcCheckbox',
    props:{
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        checkedValue: false
      };
    },
    created () {
      this.checkedValue = this.value;
    },
    watch: {
      value (newValue) {
        this.checkedValue = newValue;
      }
    },
    methods: {
      onCheckboxChange () {
        console.log(this.checkedValue);
        this.$emit('change', this.checkedValue);
      }
    }
  };
</script>
<template>
  <div class="dc-footer">
    <div class="dc-footer__inner">
      <div class="dc-footer__title">
        <h2>{{$t('components.footer.title')}}</h2>
      </div>
      <div class="row">
        <div class="col-12 col-md-4">
          <div class="dc-footer__item is-phone">
            <h3>{{$t('components.footer.phoneTitle')}}</h3>
            <p>800.000.0000</p>
            <p>800.000.0000</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="dc-footer__item is-email">
            <h3>{{$t('components.footer.emailTitle')}}</h3>
            <p>info@primior</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="dc-footer__item is-info">
            <h3>{{$t('components.footer.emailTitle')}}</h3>
            <p>Request information here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DcFooter'
  };
</script>
<template>
  <div class="dc-footer">
    <div class="dc-footer__inner">
      <p>Performance calculations are performed using the daily time-weighted rate of return (DTWR) calculation method, which is used to measure the performance of your account, portfolio, or security, unaffected by the timing and size of contributions, distributions, transfers, or liquidations. Performance returns for time periods longer than 365 days have been annualized.</p>
      <p>The return calculation for a period includes dividends earned (whether paid or unpaid), plus realized and unrealized gains or losses as a result of any changes in the net asset value (NAV) of your shares, net of any advisory fees accrued or liquidation penalties charged.</p>
      <p>Performance calculations are for informational purposes only and should not be relied on for any other purpose.</p>
      <p>The estimated values for the real estate investments are based upon the current estimated net asset value per share, which may not accurately reflect the amount that might be paid for your shares in a market transaction, and thus are for informational purposes only and should not be relied upon for any other purpose.</p>
      <p>Primior operates a website at <a :href="primiorLinkUrl">primior.com</a> and certain mobile apps (the “Platform”). By using the Platform, you accept our <a :href="termsofService">Terms of Service</a> and <a :href="privacyPolicyUrl">Privacy Policy</a> . Past performance is no guarantee of future results. Any historical returns, expected returns, or probability projections may not reflect actual future performance. All securities involve risk and may result in partial or total loss. While the data we use from third parties is believed to be reliable, we cannot ensure the accuracy or completeness of data provided by investors or other third parties. Neither Primior nor any of its affiliates provide tax advice and do not represent in any manner that the outcomes described herein will result in any particular tax consequence. Prospective investors should confer with their personal tax advisors regarding the tax consequences based on their particular circumstances. Neither Primior nor any of its affiliates assume responsibility for the tax consequences for any investor of any investment.</p>
      <p>The publicly filed offering circulars of the issuers sponsored by Primior, not all of which may be currently qualified by the Securities and Exchange Commission, may be found at primior.com For investors and potential investors who are residents of the State of Washington, please send all correspondence, including any questions or comments, to contact@primior.com. </p>
    </div> 
    <!-- <div class="dc-footer__inner">
      <div class="dc-footer__title">
        <h2>{{$t('components.footer.title')}}</h2>
      </div>
      <div class="row">
        <div class="col-12 col-md-4">
          <div class="dc-footer__item is-phone">
            <h3>{{$t('components.footer.phoneTitle')}}</h3>
            <p v-html="$t('components.footer.phoneContent')"></p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="dc-footer__item is-email">
            <h3>{{$t('components.footer.emailTitle')}}</h3>
            <p v-html="$t('components.footer.emailContent')"></p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="dc-footer__item is-info">
            <h3>{{$t('components.footer.infoTitle')}}</h3>
            <p v-html="$t('components.footer.infoContent')"></p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'DcFooter',
    computed: {
      ...mapGetters([
        'privacyPolicyUrl',
        'termsofService',
        'primiorLinkUrl'
      ])
    }
  };
</script>
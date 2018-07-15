export default (function homePanels($, Drupal) {
  Drupal.behaviors.homePanels = {
    attach() {
      const $homePanel = $('body').find('#block-tre-page-title')
      const $secondaryPanel = $('body').find('#block-tre-content')
      $homePanel.attr('data-section-name', 'turning-brands-into-legacies')
      $secondaryPanel.attr('data-section-name', 'lets-start-with-you')

      $.scrollify({
        interstitialSection: 'header, footer',
        offset: 0,
        section: '.homepage .block'
      })

      $('.scroll').on('click', e => {
        e.preventDefault()
        $.scrollify.move('#lets-start-with-you')
      })
    }
  }
})(jQuery, Drupal)

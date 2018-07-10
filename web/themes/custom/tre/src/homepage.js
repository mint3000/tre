export default (function homePanels($, Drupal) {
  Drupal.behaviors.homePanels = {
    $homePanelContainer: $('body').find('.home-panels'),
    $homePanels: $('body').find('.home-panel'),
    nextPanelName: 'home-2',
    attach(context, settings) {
      var self = this

      var $bottomArrow = $('body').find('.bottom-arrow button')
      var $startButtons = $('.' + this.nextPanelName).find('[data-badge]')

      window.onpopstate = function(event) {
        if (event.state) {
          switch (event.state.page) {
            case 'start':
              self.animatePanel1()
              break
            default:
              break
          }
        } else {
          window.location.href = '/'
        }
      }

      // document.body.addEventListener(
      //   'mousewheel',
      //   function() {
      //     console.log('scrolling')
      //     self.animatePanel1()
      //   },
      //   false
      // )

      $bottomArrow.on('click', function() {
        self.animatePanel1()
        window.history.pushState(
          { page: 'start' },
          'Lets start',
          '#/lets-start'
        )
      })

      $startButtons.on('click', function(e) {
        e.preventDefault()
        var badge = $(this).attr('data-badge')
        $('.' + self.nextPanelName).removeClass('active')
        self.$homePanels
          .filter(function(index, panel) {
            return $(panel).attr('data-panel') === badge
          })
          .addClass('active')
          .animate(
            {
              opacity: 1,
              bottom: '+=0'
            },
            200
          )
        window.scrollTo(0, 0)
        window.history.pushState({ page: badge }, badge, '#/' + badge)
      })
    },
    animatePanel1() {
      var self = this
      var activePanel = this.$homePanels.filter(function(index, panel) {
        return $(panel).hasClass('active')
      })
      var nextPanel = this.$homePanels.filter(function(index, panel) {
        return $(panel).hasClass(self.nextPanelName)
      })

      $(activePanel).animate(
        {
          opacity: 0,
          bottom: '+=500'
        },
        200,
        function() {
          $(this).removeClass('active')
          $(nextPanel)
            .addClass('active')
            .animate(
              {
                opacity: 1,
                bottom: '+=0'
              },
              200
            )
          window.scrollTo(0, 0)
        }
      )
    }
  }
})(jQuery, Drupal)

import debounce from 'lodash/debounce';
import tippy from 'tippy.js';

const Panel = {
  init() {
    this._attach();
  },
  _attach() {
    let tips = this._addTips();
    let mediumBreakpoint = window.matchMedia('(min-width: 640px)').matches;

    if (!mediumBreakpoint) {
      tips.destroyAll();
    }

    window.addEventListener('resize', debounce(() => {
      if (!mediumBreakpoint) {
        console.log('resize', tips, mediumBreakpoint);
        tips.destroyAll();
      } else {
        let tips = this._addTips();
      }
    }, 500))
  },
  _addTips() {
    let tip = tippy('.svg', {
      theme: 'honeybee',
    });
    return tip;
  }
}

Panel.init();
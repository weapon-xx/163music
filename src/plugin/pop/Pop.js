import './Pop.scss';
import '../../style/common.scss';
import Vue from 'vue';
import PopTemplate from './Pop.vue';

const PopConstructor = Vue.extend(PopTemplate);

function Pop(options) {
  const pop = new PopConstructor({
    el: document.createElement('div'),
    data: options,
  });

  if (pop.$el) {
    document.querySelector('body').appendChild(pop.$el);
  }

  if (options && options.name) {
    Vue.prototype[`$${options.name}`] = pop;
  } else {
    Vue.prototype.$pop = pop;
  }
  return pop;
}

Pop.install = function install() {};

export default Pop;

import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import colorpicker from './modules/colorpicker';
import modals from './modules/modals';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,    
    colorpicker,
    modals,
  }
});
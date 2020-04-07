import Vue from "vue";
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;
import '@/assets/css/tailwind.css'
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false


const script = document.createElement('script');

script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDnJLNN3QkmDCd3LMmim4yEWmhhqZ8xmYg&libraries=places`;

document.querySelector('head').appendChild(script);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

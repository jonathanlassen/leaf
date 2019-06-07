import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import  Axios  from  'axios'
Vue.config.productionTip  =  false
Vue.prototype.$http  =  Axios;
const  accessToken  =  localStorage.getItem('access_token')

if (accessToken) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] =  accessToken
}

Vue.use(Viewer)

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;
import '@/assets/css/tailwind.css'

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const script = document.createElement('script');

script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDnJLNN3QkmDCd3LMmim4yEWmhhqZ8xmYg&libraries=places`;

document.querySelector('head').appendChild(script);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyD9Ef5NoHFWI-VkgYtxni7j1p60HogBWB0',
      libraries: 'places',
      language: 'pt',
    }
  });

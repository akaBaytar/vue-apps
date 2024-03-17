import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './data/store.js';

// global components
import BaseCard from './components/interface/BaseCard.vue';
import BaseBadge from './components/interface/BaseBadge.vue';
import BaseButton from './components/interface/BaseButton.vue';
import BaseDialog from './components/interface/BaseDialog.vue';
import BaseSpinner from './components/interface/BaseSpinner.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('BaseCard', BaseCard);
app.component('BaseBadge', BaseBadge);
app.component('BaseButton', BaseButton);
app.component('BaseDialog', BaseDialog);
app.component('BaseSpinner', BaseSpinner);

app.mount('#app');

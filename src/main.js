import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

//global component
import BaseBedge from '@/components/ui/BaseBedge';
import BaseButton from '@/components/ui/BaseButton';
import BaseCard from '@/components/ui/BaseCard';
import BaseSpinner from '@/components/ui/BaseSpinner';
import BaseDialog from '@/components/ui/BaseDialog';

const app = createApp(App);
//use component
app.component('base-bedge', BaseBedge);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.use(router);
app.use(store);
app.mount('#app');

import { createApp } from 'vue'
import router from './router'
import store from './store'
import './style.css'
import App from './App.vue'
import './common/assets/css/common.scss'
import 'vant/lib/index.css';
import {Cell,CellGroup,Checkbox,CheckboxGroup,Form,Field,Area,Popup,Radio,RadioGroup,Button,Toast} from 'vant'

const app = createApp(App)

app.use(Cell)
app.use(CellGroup)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(Form)
app.use(Field)
app.use(Area)
app.use(Popup)
app.use(Radio)
app.use(RadioGroup)
app.use(Button)
app.use(Toast)

app.use(router);
app.use(store);

app.mount('#app')

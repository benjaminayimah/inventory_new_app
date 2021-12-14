import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'
import moment from 'moment'

//import jQuery from 'jquery'
//window.$ = window.jQuery = jQuery
import 'bootstrap'
import 'popper.js'
import './assets/app.scss'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMM DD, YYYY hh:mm a')
  }
})
Vue.filter('capitalize', function(value) {
  if(!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})



Vue.config.productionTip = false

Vue.use(VueRouter);

import Home from '@/components/views/Home'
import Error404 from '@/components/views/Error404'
import AdminHome from '@/components/user/AdminHome'
import Signin from '@/components/views/Signin'
import Logout from '@/components/Logout'
import Dashboard from '@/components/user/layouts/Dashboard'
import Orders from '@/components/user/layouts/Orders'
import Allproducts from '@/components/user/layouts/Allproducts'
import Addproduct from '@/components/user/layouts/AddProduct'
import Categories from '@/components/user/layouts/Categories'
import ProductMain from '@/components/user/layouts/ProductMain'
import Inventory from '@/components/user/layouts/Inventory'






const routes = [
  { path: '/', component: Home , name: 'Home'},
  
  { path: '/signin', component: Signin, name: 'Signin',
    meta: {requiresVisitor: true}
  },
  { path: '/logout', component: Logout , name: 'Logout',
  meta: {requiresAuth: true}
  },
  { path: '/dashboard', component: AdminHome, 
  meta: {requiresAuth: true },
  children: [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/orders', name: 'Orders', component: Orders },
    { path: '/all-products', name: 'Allproducts', component: Allproducts },
    { path: '/add-product', name: 'Addproduct', component: Addproduct },
    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/product-edit/:id/:name', component: ProductMain , name: 'Productdetail'},
    { path: '/inventory', name: 'Inventory', component: Inventory },

  ]
  },
  { path: '*', component: Error404 },



];
const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.auth) {
      next({
        name: 'Signin',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.auth) {
      next({
        name: 'Dashboard'
      })
    } else{
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

import { createRouter, createWebHashHistory } from 'vue-router'
import Customers from '../views/Customers.vue'
import Home from '../views/Home.vue'
import NewCustomer from '../components/customers/NewCustomer.vue'
import EditCustomer from '../components/customers/EditCustomer.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/add-customer',
    name: 'NewCustomer',
    component: NewCustomer
  },
  {
    path: '/edit-customer/:id',
    name: 'EditCustomer',
    component: EditCustomer
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
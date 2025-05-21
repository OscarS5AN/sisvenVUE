import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

// Importar vistas principales
import Customers from '../views/Customers.vue'
import Categories from '../views/Categories.vue'
import PayModes from '../views/PayModes.vue'
import Products from '../views/Products.vue'

// Importar componentes para crear/editar
import NewCustomer from '../components/customers/NewCustomer.vue'
import EditCustomer from '../components/customers/EditCustomer.vue'
import NewCategory from '../components/categories/NewCategory.vue'
import EditCategory from '../components/categories/EditCategory.vue'
import NewPayMode from '../components/paymodes/NewPayMode.vue'
import EditPayMode from '../components/paymodes/EditPayMode.vue'
import NewProduct from '../components/products/NewProduct.vue'
import EditProduct from '../components/products/EditProduct.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Customers routes
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
  },
  // Categories routes
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/add-category',
    name: 'NewCategory',
    component: NewCategory
  },
  {
    path: '/edit-category/:id',
    name: 'EditCategory',
    component: EditCategory
  },
  // Pay Modes routes
  {
    path: '/pay-modes',
    name: 'PayModes',
    component: PayModes
  },
  {
    path: '/add-pay-mode',
    name: 'NewPayMode',
    component: NewPayMode
  },
  {
    path: '/edit-pay-mode/:id',
    name: 'EditPayMode',
    component: EditPayMode
  },
  // Products routes
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/add-product',
    name: 'NewProduct',
    component: NewProduct
  },
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: EditProduct
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
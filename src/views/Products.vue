<template>
  <div class="container mt-4">
    <h1>Products Management</h1>
    <router-link :to="{ name: 'NewProduct' }" class="btn btn-success mb-3">
      <font-awesome-icon icon="plus" /> Add New Product
    </router-link>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>${{ product.price.toFixed(2) }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category?.name || 'N/A' }}</td>
          <td>
            <router-link :to="{ name: 'EditProduct', params: { id: product.id } }" class="btn btn-warning btn-sm">
              <font-awesome-icon icon="edit" />
            </router-link>
            <button @click="deleteProduct(product.id)" class="btn btn-danger btn-sm ms-2">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ProductsView',
  data() {
    return {
      products: []
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products')
        this.products = response.data.products
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    async deleteProduct(id) {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        
        if (result.isConfirmed) {
          await axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
          await Swal.fire(
            'Deleted!',
            'Product has been deleted.',
            'success'
          )
          this.fetchProducts()
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'There was an error deleting the product.',
          'error'
        )
        console.error('Error deleting product:', error)
      }
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>
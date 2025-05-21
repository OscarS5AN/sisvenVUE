<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h3>Edit Product</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProduct">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input v-model="product.name" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Price</label>
                <input v-model.number="product.price" type="number" step="0.01" min="0" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Stock</label>
                <input v-model.number="product.stock" type="number" min="0" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Category</label>
                <select v-model.number="product.category_id" class="form-select" required>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">
                <font-awesome-icon icon="save" /> Update
              </button>
              <button type="button" @click="cancel" class="btn btn-secondary ms-2">
                <font-awesome-icon icon="times" /> Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditProduct',
  data() {
    return {
      product: {
        id: null,
        name: '',
        price: 0,
        stock: 0,
        category_id: null
      },
      categories: []
    }
  },
  methods: {
    async updateProduct() {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/products/${this.product.id}`, this.product)
        
        if (response.status === 200) {
          await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({ name: 'Products' })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.msg || 'Failed to update product'
        })
      }
    },
    cancel() {
      this.$router.push({ name: 'Products' })
    },
    async fetchProduct() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${this.$route.params.id}`)
        this.product = response.data.product
      } catch (error) {
        console.error('Error fetching product:', error)
        this.$router.push({ name: 'Products' })
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories')
        this.categories = response.data.categories
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
  },
  mounted() {
    this.fetchProduct()
    this.fetchCategories()
  }
}
</script>
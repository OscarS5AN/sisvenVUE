<template>
  <div class="container mt-4">
    <h1>Categories Management</h1>
    <router-link :to="{ name: 'NewCategory' }" class="btn btn-success mb-3">
      <font-awesome-icon icon="plus" /> Add New Category
    </router-link>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>{{ index + 1 }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description || 'N/A' }}</td>
          <td>
            <router-link :to="{ name: 'EditCategory', params: { id: category.id } }" class="btn btn-warning btn-sm">
              <font-awesome-icon icon="edit" />
            </router-link>
            <button @click="deleteCategory(category.id)" class="btn btn-danger btn-sm ms-2">
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
  name: 'CategoriesView',
  data() {
    return {
      categories: []
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories')
        this.categories = response.data.categories
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    async deleteCategory(id) {
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
          await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
          await Swal.fire(
            'Deleted!',
            'Category has been deleted.',
            'success'
          )
          this.fetchCategories()
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'There was an error deleting the category.',
          'error'
        )
        console.error('Error deleting category:', error)
      }
    }
  },
  mounted() {
    this.fetchCategories()
  }
}
</script>
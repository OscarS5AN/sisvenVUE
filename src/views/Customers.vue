<template>
  <div class="container mt-4">
    <h1>Customers Management</h1>
    <router-link :to="{ name: 'NewCustomer' }" class="btn btn-success mb-3">
      <font-awesome-icon icon="plus" /> Add New Customer
    </router-link>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Document</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="customer.id">
          <td>{{ index + 1 }}</td>
          <td>{{ customer.document_number }}</td>
          <td>{{ customer.first_name }} {{ customer.last_name }}</td>
          <td>{{ customer.email || 'N/A' }}</td>
          <td>{{ customer.phone_number || 'N/A' }}</td>
          <td>
            <router-link :to="{ name: 'EditCustomer', params: { id: customer.id } }" class="btn btn-warning btn-sm">
              <font-awesome-icon icon="edit" />
            </router-link>
            <button @click="deleteCustomer(customer.id)" class="btn btn-danger btn-sm ms-2">
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
  name: 'CustomersView',
  data() {
    return {
      customers: []
    }
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/customers')
        this.customers = response.data.customers
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    },
    async deleteCustomer(id) {
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
          await axios.delete(`http://127.0.0.1:8000/api/customers/${id}`)
          await Swal.fire(
            'Deleted!',
            'Customer has been deleted.',
            'success'
          )
          this.fetchCustomers()
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'There was an error deleting the customer.',
          'error'
        )
        console.error('Error deleting customer:', error)
      }
    }
  },
  mounted() {
    this.fetchCustomers()
  }
}
</script>
<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h3>Edit Customer</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateCustomer">
              <div class="mb-3">
                <label class="form-label">Document Number</label>
                <input v-model="customer.document_number" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">First Name</label>
                <input v-model="customer.first_name" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Last Name</label>
                <input v-model="customer.last_name" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Address</label>
                <input v-model="customer.address" type="text" class="form-control">
              </div>
              <div class="mb-3">
                <label class="form-label">Birthday</label>
                <input v-model="customer.birthday" type="date" class="form-control">
              </div>
              <div class="mb-3">
                <label class="form-label">Phone Number</label>
                <input v-model="customer.phone_number" type="text" class="form-control">
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="customer.email" type="email" class="form-control">
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
  name: 'EditCustomer',
  data() {
    return {
      customer: {
        id: null,
        document_number: '',
        first_name: '',
        last_name: '',
        address: '',
        birthday: '',
        phone_number: '',
        email: ''
      }
    }
  },
  methods: {
    async updateCustomer() {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/customers/${this.customer.id}`, this.customer)
        
        if (response.status === 200) {
          await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Customer updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({ name: 'Customers' })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.msg || 'Failed to update customer'
        })
      }
    },
    cancel() {
      this.$router.push({ name: 'Customers' })
    },
    async fetchCustomer() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/customers/${this.$route.params.id}`)
        this.customer = response.data.customer
      } catch (error) {
        console.error('Error fetching customer:', error)
        this.$router.push({ name: 'Customers' })
      }
    }
  },
  mounted() {
    this.fetchCustomer()
  }
}
</script>
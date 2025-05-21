<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h3>Add New Customer</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="saveCustomer">
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
                <font-awesome-icon icon="save" /> Save
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
  name: 'NewCustomer',
  data() {
    return {
      customer: {
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
    async saveCustomer() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/customers', this.customer)
        
        if (response.status === 201) {
          await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Customer created successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({ name: 'Customers' })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.msg || 'Failed to create customer'
        })
      }
    },
    cancel() {
      this.$router.push({ name: 'Customers' })
    }
  }
}
</script>
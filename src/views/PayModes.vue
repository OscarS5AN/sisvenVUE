<template>
  <div class="container mt-4">
    <h1>Payment Modes Management</h1>
    <router-link :to="{ name: 'NewPayMode' }" class="btn btn-success mb-3">
      <font-awesome-icon icon="plus" /> Add New Pay Mode
    </router-link>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Observation</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(payMode, index) in payModes" :key="payMode.id">
          <td>{{ index + 1 }}</td>
          <td>{{ payMode.name }}</td>
          <td>{{ payMode.observation || 'N/A' }}</td>
          <td>
            <router-link :to="{ name: 'EditPayMode', params: { id: payMode.id } }" class="btn btn-warning btn-sm">
              <font-awesome-icon icon="edit" />
            </router-link>
            <button @click="deletePayMode(payMode.id)" class="btn btn-danger btn-sm ms-2">
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
  name: 'PayModesView',
  data() {
    return {
      payModes: []
    }
  },
  methods: {
    async fetchPayModes() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pay-modes')
        this.payModes = response.data.pay_modes
      } catch (error) {
        console.error('Error fetching pay modes:', error)
      }
    },
    async deletePayMode(id) {
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
          await axios.delete(`http://127.0.0.1:8000/api/pay-modes/${id}`)
          await Swal.fire(
            'Deleted!',
            'Pay mode has been deleted.',
            'success'
          )
          this.fetchPayModes()
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'There was an error deleting the pay mode.',
          'error'
        )
        console.error('Error deleting pay mode:', error)
      }
    }
  },
  mounted() {
    this.fetchPayModes()
  }
}
</script>
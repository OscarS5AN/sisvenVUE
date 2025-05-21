<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h3>Edit Payment Mode</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="updatePayMode">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input v-model="payMode.name" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Observation</label>
                <textarea v-model="payMode.observation" class="form-control" rows="3"></textarea>
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
  name: 'EditPayMode',
  data() {
    return {
      payMode: {
        id: null,
        name: '',
        observation: ''
      }
    }
  },
  methods: {
    async updatePayMode() {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/pay-modes/${this.payMode.id}`, this.payMode)
        
        if (response.status === 200) {
          await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Payment mode updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({ name: 'PayModes' })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.msg || 'Failed to update payment mode'
        })
      }
    },
    cancel() {
      this.$router.push({ name: 'PayModes' })
    },
    async fetchPayMode() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pay-modes/${this.$route.params.id}`)
        this.payMode = response.data.pay_mode
      } catch (error) {
        console.error('Error fetching pay mode:', error)
        this.$router.push({ name: 'PayModes' })
      }
    }
  },
  mounted() {
    this.fetchPayMode()
  }
}
</script>
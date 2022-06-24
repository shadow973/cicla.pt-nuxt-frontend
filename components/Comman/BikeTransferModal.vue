<template>
    <div
      class="modal fade"
      id="bike-transfer"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="staticBackdropLabel">
             Reivindique uma bicicleta através do código CICLA
            </h6>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="bike-form">
              <form>
                <label class="custom-label-size pt-2"
                  >Digite o código de autenticação aqui</label
                >
                <input
                  v-model="authCode"
                  type="text"
                  class="form-control my-2 py-2"
                />
              </form>
              <div class="theme-btn universal-btn me-2 mt-2" id="button-3">
              <div id="circle"></div>
              <button type="submit" @click="claimBike">
                <span>Reivindique bicicleta</span>
              </button>
            </div>

            <div class="theme-btn-hover mt-2 p-0" data-bs-dismiss="modal" id="button-hover">
              <div id="circle-hover"></div>
              <a href="javascript:void(0)" style="padding: 13px 26px; font-size: 14px"
                >Cancelar</a
              >
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import api from '../../services'
export default {
    data() {
        return {
            authCode: '',
            authCodeWarn: false,
            isValid: false,
            users: null
        }
    },
    methods: {
        checkAuthCode() {
          if(this.authCode === '') {
            this.authCodeWarn = true
          } else {
            this.authCodeWarn = false
          }
        },
        checkValid() {
          this.checkAuthCode()
          if(this.authCodeWarn) {
            this.isValid = false
          } else {
            this.isValid = true
          }
        },
        async claimBike() {
            this.checkValid()
            if(this.isValid) {
              const bike = await api.product.findClaimBike(this.authCode)
              if(bike.length > 0) {
                const auth_code = bike[0].auth_code ? bike[0].auth_code : ''
                const reference_email = bike[0].transfer_email ? bike[0].transfer_email : ''
                if(this.authCode === auth_code && reference_email === this.users.email) {
                  const data = {
                    newOwnerEmail: this.users.email,
                    bike: bike[0].id,
                    initiate: false
                  }
                  await api.product.transferOwnership(data)
                  const claimData = {
                      user: this.users,
                      on_sale: false,
                      transfer_name: null,
                      transfer_email: null
                  }
                  await api.product.bikeUpdateService(bike[0].id, claimData)
                  const history = {
                    information: {
                      text: 'Esta bicicleta é transferida para',
                      transfer_name: this.users.name
                    },
                    type: 'transfer',
                    user: this.users,
                    bikes: bike[0].id
                  }
                  await api.product.addToHistory(history)
                  this.$toasted.show('Salvo com sucesso', {
                      position: 'top-center',
                      duration: 3000
                  })
                  window.location.reload('/my-account#minha_bicicleta')
                  } else {
                  this.$toasted.show('Erro ao enviar dados', {
                      position: 'top-center',
                      duration: 3000
                      })
                  }
              } else {
                this.$toasted.show('Código de autenticação inválido', {
                      position: 'top-center',
                      duration: 3000
                      })
                }
            } else {
              this.$toasted.show('Erro ao enviar dados', {
                    position: 'top-center',
                    duration: 3000
                    })
            }
        }
    },
    async mounted() {
        const userData = await api.product.userDetail()
        this.users = userData.data
    }
}
</script>

<style lang="scss" scoped>

</style>
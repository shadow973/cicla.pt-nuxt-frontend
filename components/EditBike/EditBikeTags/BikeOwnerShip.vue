<template>
  <div>
    <!-- List -->
    <div class="admin-tab-content">
      <div class="section-title">
        <!-- Form -->
        <div class="row page-content">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="inner-box">
          <form @submit.prevent="submitData">
          <div class="dashboard-wrapper row">

          <div class="form-group col-md-6 mb-3">
          <label class="form-label">Nome do proprietário</label>
          <input
          v-model="ownerName"
          @blur="checkName"
          :class="nameWarn ? 'warning-border form-control' : 'form-control'" name="Title" placeholder="Nome do proprietário" type="text">
          <span v-if="nameWarn" class="warning">*Nome do proprietário É necessário</span>
          </div>

          <div class="form-group col-md-6 mb-3">
          <label class="form-label">Email do proprietário</label>
          <input
          v-model="ownerEmail"
          @blur="checkEmail"
          :class="emailWarn || emailValidWarn ? 'warning-border form-control' : 'form-control'" name="Title" placeholder="Email do proprietário" type="text">
          <span v-if="emailWarn && !ownerEmail" class="warning">*Email do proprietário É necessário</span><br v-if="emailWarn && emailValidWarn">
          <span v-if="emailValidWarn && ownerEmail" class="warning">Email is not valid</span>
          </div>

          <div v-if="serialNumber && isTransfering" class="form-group col-md-12 mb-3">
          <label class="form-label">Número de série da cicla</label>
          <input
          disabled
          v-model="serialNumber"
          class="form-control" name="Title" placeholder="Número de série da cicla" type="text">
          </div>

          <label v-show="ownerAuthorize && isTransfering" class="form-label">Código de autenticação</label>
          <div v-show="ownerAuthorize && isTransfering" class="input-group col-md-12 mb-2">
          <input
          disabled
          v-model="ownerAuthorize"
          class="form-control"
          name="Title" placeholder="Chave de autorização" type="text">
          <input type="hidden" id="testing-code" :value="ownerAuthorize">
          <div @click="copyToclipboard" class="input-group-append cursor-pointer">
            <i class="input-group-text icon-btn fal fa-copy" data-toggle="tooltip" data-placement="top" title="Copy auth code"></i>
          </div>
          </div>

          <div class="col-md-12 mt-3">
            <div v-if="transferBtn" class="theme-btn universal-btn me-2" id="button-3">
              <div id="circle"></div>
              <button><span>Bicicleta de transferência</span></button>
            </div>
            <div v-if="cancelBtn" class="theme-btn-hover" id="button-hover" @click="cancelTransfer">
              <div id="circle-hover"></div>
              <a href="javascript:void(0)" style="padding: 15px 26px; font-size: 14px"
                >Cancelar transferência</a
              >
            </div>
          </div>
          </div>
          </form>
          </div>
          </div>
          </div>
          <!-- Form End -->
      </div>

    </div>
  </div>
</template>
<script>
import api from '../../../services'
export default {
  Name: 'BikeOwnerShip',
  props: ['bikeId'],
  data(){
    return{
      isValid: false,
      ownerName: '',
      nameWarn: false,
      ownerEmail: '',
      emailWarn: false,
      emailValidWarn: false,
      ownerAuthorize: '',
      serialNumber: '',
      isTransfering: false,
      userData: {},
      bikeInfo: null,
      transferBtn: true,
      cancelBtn: false,
      newOwner: null
    }
  },
 methods: {
  checkName(){
    if(this.ownerName === '' || this.ownerName === null) {
      this.nameWarn = true
    } else {
      this.nameWarn = false
    }
  },
  copyToclipboard() {
    let clipBoard = document.querySelector('#testing-code')
    clipBoard.setAttribute('type', 'text')
    clipBoard.select()
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        this.$toasted.show('O código de autenticação foi copiado!', {
            position: 'top-center',
            duration: 3000
          })
        } catch (err) {
          this.$toasted.show('Erro!', {
            position: 'top-center',
            duration: 3000
          })
        }

      /* unselect the range */
      clipBoard.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
  },
  authCode() {
    this.ownerAuthorize = Math.random().toString(36).substr(2)
  },
  checkEmail(){
    if(this.ownerEmail === '' || this.ownerEmail === null) {
      this.emailWarn = true
    } else if(!this.validateEmail(this.ownerEmail)) {
        this.emailValidWarn = true
      }
     else {
      this.emailWarn = false
      this.emailValidWarn = false
    }
  },
   validateEmail(value){
      const check = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
      return check.test(value)
    },
  checkValid(){
  this.checkName()
  this.checkEmail()
    if(this.nameWarn || this.emailWarn) {
      this.isValid = false
    } else {
      this.isValid = true
    }
  },
  async submitData(){
    this.checkValid()
    if(this.isValid && this.bikeInfo[0].user.email === this.userData.email) {
      this.isTransfering = true
      this.serialNumber = this.bikeInfo[0].cicla_number
      if(this.ownerAuthorize === '') {
        this.authCode()
      }
      const info = {
        auth_code: this.ownerAuthorize,
        transfer_email: this.ownerEmail,
        transfer_name: this.ownerName
      }
      const data = {
        newOwnerEmail: this.ownerEmail,
        bike: this.bikeId,
        initiate: true
      }
      await api.product.bikeUpdateService(this.bikeId, info)
      await api.product.transferOwnership(data),
      this.transferBtn = false
      this.cancelBtn = true
      this.$toasted.show('Salvo com sucesso!', {
          position: 'top-center',
          duration: 3000
      })
    } else {
      if(this.bikeInfo[0].user.email !== this.userData.email) {
        this.$toasted.show('você não é usuário autorizado!', {
          position: 'top-center',
          duration: 3000
        })
      } else {
        this.$toasted.show('Erro ao enviar dados!', {
          position: 'top-center',
          duration: 3000
        })
      }
    }
  },
  async cancelTransfer() {
    if(this.ownerName || this.ownerEmail) {
      if(this.bikeInfo[0].user.email === this.userData.email) {
        const info = {
          auth_code: null,
          transfer_email: null,
          transfer_name: null
        }
        await api.product.bikeUpdateService(this.bikeId, info)
        this.ownerName = ''
        this.ownerEmail = ''
        this.ownerAuthorize = ''
        this.isTransfering = false
        this.transferBtn = true
        this.cancelBtn = false
        this.$toasted.show('A transferência de bicicleta foi cancelada!', {
          position: 'top-center',
          duration: 3000
        })
      } else {
        this.ownerName = '',
        this.ownerEmail = ''
        this.$toasted.show('você não é usuário autorizado!', {
            position: 'top-center',
            duration: 3000
          })
      }
    }
  }
 },
  async fetch () {
    const userDetail = await api.product.userDetail()
    this.userData = userDetail.data
    const route = this.$route.params.slug
    const BikeData = await api.product.getBikeDataService(route)
    this.bikeInfo = BikeData
    this.ownerEmail = BikeData[0].transfer_email
    this.ownerName = BikeData[0].transfer_name
    if(this.ownerEmail) {
      this.serialNumber = BikeData[0].cicla_number
    } else {
      this.serialNumber = ''
    }
    if(this.ownerEmail) {
      this.ownerAuthorize = BikeData[0].auth_code
    } else {
      this.ownerAuthorize = ''
    }
    if(this.ownerAuthorize) {
      this.isTransfering = true
    } else {
      this.isTransfering = false
    }
    if(this.ownerAuthorize || this.serialNumber) {
      this.transferBtn = false
      this.cancelBtn = true
    }
  }
}
</script>
<style lang="scss" scoped>
$them-color: #fd5044;
.stolen-bike-user-bike {
  .activate-promoted-alert {
    label.card.mb-3.form-check-label {
      height: 100%;
      .card-title {
        background: #313131;
        color: #fff;
        padding: 15px;
        font-size: 20px;
        margin-bottom: 0;
      }
      .card-price {
        font-size: 40px;
        text-align: center;
        font-weight: 600;
        color: $them-color;
      }
      ul.ps-0.promot-ul li {
        margin-bottom: 10px;
        font-size: 12px;
      }
    }
  }
}
.stolen-bike-user-bike .check-list {
  padding-left: 0;
  margin-bottom: 0;
  li {
    display: flex;
    align-items: start;
    flex-wrap: nowrap;
    .stolen-check-box-link {
      color: $them-color;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: #000;
      }
    }
    .stolen-check-box {
      background: #e9e8e8;
      width: 25px;
      height: 25px;
      display: grid;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 2px solid #b9b8b8;
      margin-right: 15px;
    }
    .stolen-check-box-null {
      padding: 11px;
      background: #e9e8e8;
      border-radius: 50%;
      border: 2px solid #b9b8b8;
      margin-right: 15px;
    }
    .delete-line {
      text-decoration: line-through;
    }
  }
  li:not(:last-child) {
    margin-bottom: 10px;
  }
}
ul.ps-0.row.justify-content-around.social-media {
  margin-top: 29px;
  a {
    padding: 10px 16px;
    border-radius: 50px;
  }
  .facebook {
    background-color: #3b5998;
  }
  .twitter {
    background-color: #1d9bf0;
  }
}
div#pills-tabContent {
  border: 2px solid #eeeeee;
  border-radius: 6px;
  padding-top: 10px;
  ul#pills-tab li.nav-item {
    border: 2px solid red;
  }
}
.custom-dollor-input {
  position: relative !important;
  padding-left: 45px !important;
  width: 100% !important;
  border-radius: 4px !important;
  z-index: 1 !important;
}
span.input-group-text.dollor {
  position: absolute !important;
  left: 0 !important;
  top: 1px !important;
  bottom: 1px !important;
  z-index: 2 !important;
  border: 2px transparent;
}
.bg-green {
  background-color: #5cb85c !important;
}
div#bike-back label.custom-label-size {
  color: #1e1e1e;
  font-size: 14px;
}
.upload-bike-images h4 {
  color: #000;
}
//stolen-bike-user-bike css end
// add bike
.upload-bike-images {
  background: #f3f3f3;
  padding: 25px;
  .quote-imgs-thumbs {
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin: 1.5rem 0;
    padding: 0.75rem;
  }
  .quote-imgs-thumbs--hidden {
    display: none;
  }
  .img-preview-thumb {
    background: #fff;
    border: 1px solid#fff;
    border-radius: 0.25rem;
    margin-right: 1rem;
    width: 140px;
    height: 140px;
    object-fit: cover;
    padding: 0.25rem;
    margin-bottom: 20px;
  }
  .show-for-sr,
  .show-on-focus {
    position: absolute !important;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    border: 0;
  }
  label.button.hollow.theme-btn.upload-btn {
    width: auto;
    text-transform: capitalize;
    padding: 16px 22px;
    height: auto;
    cursor: pointer;
    &:hover {
      background: #000 !important;
    }
  }
  div.ck-editor__editable {
    min-height: 500px;
  }
  input {
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
  }
  form#img-upload-form p {
    margin: 0;
  }
}
.dashboard-wrapper {
  .icon-btn {
    padding: 16px;
  }
  button.add-btn {
    background: #fd5044;
    color: #fff;
    border: none;
    border-radius: 4px;
    width: 53px;
    height: 50px;
    margin-left: 10px;
    font-size: 22px;
  }
  strong {
    color: #000;
  }
  .tg-selectgroup {
    color: #404040;
  }
  .tg-select select:focus {
    outline: none;
  }
  .dashboardtable tbody tr {
    transition: all 0.4s ease-in-out;
    th {
      color: #333;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      text-align: left;
      background: 0 0;
      vertical-align: baseline;
      border-bottom: none;
    }
  }
  .dashboardtable {
    thead tr th .checkbox,
    tbody tr td .checkbox {
      width: 20px;
      height: 20px;
    }
    tbody tr td,
    tbody tr td h3 {
      color: #333;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      vertical-align: middle;
      margin: 0;
    }
    tbody tr td h3 + span {
      color: #282828;
      display: block;
      font-size: 12px;
      line-height: 16px;
      background: #f3f3f3;
      padding: 9px 7px;
      font-weight: bold;
    }
  }
  .photo {
    width: 110px;
    display: block;
  }
  .adcategories {
    min-width: 110px;
    display: block;
  }
  .adstatus {
    width: 80px;
    color: #fff;
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 30px;
    border-radius: 4px;
    text-align: center;
    text-transform: uppercase;
  }
  .adstatusinactive {
    color: #363b4d;
    background: #f7f7f7;
  }
  .adstatusactive {
    background: #e91e63;
  }
  .adstatusexpired {
    background: #fc9209;
  }
  .adstatusdeleted {
    background: #f91942;
  }
  .adstatussold {
    background: #363b4d;
  }
  .btns-actions {
    min-width: 150px;
    width: 100%;
    float: left;
    margin: -5px 0;
  }
  .btns-actions .btn-action {
    margin: 5px;
    width: 40px;
    height: 40px;
    float: left;
    color: #363b4d;
    line-height: 40px;
    border-radius: 4px;
    background: #f7f7f7;
    text-align: center;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  .btns-actions .btn-action i {
    display: block;
    line-height: 40px;
  }
  .dashboardtable tbody tr:hover .btn-delete {
    background: #f91942;
    color: #fff;
  }
  .dashboardtable tbody tr:hover .btn-edit {
    background: #363b4d;
    color: #fff;
  }
  .dashboardtable tbody tr:hover .btn-view {
    background: #02944b;
    color: #fff;
  }
}
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
.cod-images img {
  max-width: 450px;
  margin-top: 30px;
}
label.custom-label {
  font-size: 15px;
  color: #686868;
  height: auto;
  padding: 13px 23px;
}
.stolen-bike-box {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 2px -1px 20px 5px #f0f0f0;
  width: 100%;
  margin-bottom: 25px;
  float: left;
  &:hover h4 {
    width: 100%;
  }
  li.found span {
    color: #0fa816 !important;
  }
  a {
    width: 100%;
    color: #212529;
  }
  .stolen-bike-image {
    width: 100%;
    float: left;
    border-radius: 4px;
    overflow: hidden;
    img {
      object-fit: cover;
      min-height: 188px;
      width: 100%;
    }
  }
  .stolen-bike-info {
    width: 100%;
    float: left;
    padding-top: 20px;
    padding-left: 15px;
    h4 {
      font-size: 17px;
      font-weight: 600;
    }
  }
  .stolen-content-box {
    width: 100%;
    float: left;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    ul {
      padding: 0;
    }
    ul li {
      padding-bottom: 9px;
      font-weight: 300;
      & span {
        color: #3e3e3e;
        font-weight: 600;
        padding-right: 8px;
      }
      &:last-child span {
        color: #fd5044;
      }
    }
    ul li:last-child {
      padding-bottom: 0;
    }
  }
}
#button-3 a {
  padding: 0 !important;
}
.title {
  background: #313131;
  color: #fff;
  font-size: 20px;
  font-family: sora;
  padding: 15px;
}
.sideTabbar {
  background-color: #fff;
  box-shadow: 2px -1px 20px 5px #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
  margin-right: 45px;
  .nav-tabs .nav-link {
    display: block;
    width: 100%;
    text-align: left;
    color: #484848;
    font-size: 17px !important;
    border-bottom: 1px solid #dee2e6;
    border-left: 0;
    border-right: 0;
    padding: 17px 15px;
    border-radius: 0;
    font-weight: 300;
  }
  .nav-link.active {
    background: #fd5044;
    color: #fff;
    border-color: #fd5044;
  }
}
.bike_info {
  margin: 0 -13px;
}
.circle {
  height: 100%;
  img.profile-pic {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
}
.photo-frame .theme-btn.universal-btn.m-auto.customButton {
  padding: 0;
}
.them-title-black {
  color: #000;
  font-size: 26px;
  text-transform: uppercase;
}
.admin-tab-content {
  .form-control:focus,
  .form-select:focus {
    color: #212529;
    background-color: #fff;
    border-color: #fd5044;
    outline: 0;
    box-shadow: none;
  }
  input.form-control,
  select.form-select {
    height: 50px;
  }
  .form-label,
  .form-check-label {
    font-size: 15px;
    color: #242323;
  }
  .universal-btn#button-3 button {
    font-size: 16px !important;
  }
  .photo-frame .universal-btn#button-3 button {
    font-size: 16px !important;
    padding: 5px 20px;
  }
}
.withIcon {
  position: relative;
}
.withIcon i {
  position: absolute;
  right: 16px;
  top: 13px;
  font-size: 20px;
  color: #646464;
}
.btn-outline-danger {
  color: #fd5044;
  border-color: #fd5044;
  padding: 12px 24px;
  font-size: 16px;
}
.form-field-separator-gray {
  background: #f7f7f7;
  padding: 15px;
}
.form-field-separator {
  padding: 15px;
}
.photo-block {
  border: 1px solid #ddd;
  padding: 12px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 20px;
  .photo-frame {
    width: 100%;
    height: 240px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    .edit-image {
      background: rgba(255, 255, 255, 0.9);
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 8px;
      a {
        font-size: 14px;
      }
    }
    .edit-image i {
      color: #fd5044;
    }
    .edit-image a:hover {
      color: #fd5044;
    }
  }
}
.group_organization {
  .photo-frame {
    width: 100%;
    height: 340px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    .edit-image {
      background: rgba(255, 255, 255, 0.9);
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 8px;
    }
    .edit-image i {
      color: #fd5044;
    }
    .edit-image a,
    label {
      color: #212529;
      font-size: 14px;
    }
    .edit-image a:hover {
      color: #fd5044;
    }
    .overlay {
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      height: 340px;
      width: 100%;
      display: flex;
      flex-flow: column;
      justify-content: center;
    }
  }
  p {
    font-size: 15px;
    color: #000;
    margin-bottom: 5px;
    line-height: 2;
    a {
      color: #fd5044;
    }
  }
}
.theme-btn.universal-btn.text-white span {
  color: #fff !important;
}
#button-4 {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  button {
    position: relative;
    transition: all 0.45s ease-Out;
    display: block;
    align-items: center;
    font-size: 14px;
    background: transparent;
    border: none;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fd5044;
    border: 1px solid #fd5044;
    border-radius: 4px;
  }
}
#button-4.theme-btn.outline-btn {
  background: transparent;
}
#button-4:hover #circle2 {
  width: 200%;
  height: 500%;
  opacity: 1;
  top: -70px;
  left: -70px;
  background: #fd5044;
  color: #ffffff;
}
#circle2 {
  width: 0%;
  height: 0%;
  opacity: 0;
  line-height: 40px;
  border-radius: 50%;
  background: #ffffff;
  color: #1b1b1b;
  position: absolute;
  -webkit-transition: all 0.5s ease-Out;
  transition: all 0.5s ease-Out;
  top: 20px;
  left: 70px;
}
#button-5 {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  button {
    position: relative;
    -webkit-transition: all 0.45s ease-Out;
    transition: all 0.45s ease-Out;
    display: block;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 14px;
    background: transparent;
    border: none;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #121212;
    border: 1px solid #121212;
    border-radius: 4px;
  }
}
#button-5.theme-btn {
  background: transparent;
}
#button-5:hover #circle5 {
  width: 200%;
  height: 500%;
  opacity: 1;
  top: -70px;
  left: -70px;
  background: #121212;
  color: #ffffff;
}
#circle5 {
  width: 0%;
  height: 0%;
  opacity: 0;
  line-height: 40px;
  border-radius: 50%;
  background: #ffffff;
  color: #1b1b1b;
  position: absolute;
  -webkit-transition: all 0.5s ease-Out;
  transition: all 0.5s ease-Out;
  top: 20px;
  left: 70px;
}
.customButton {
  width: auto !important;
  padding: 15px 15px;
  height: 55px !important;
}
.customButton span i {
  font-size: 20px;
  margin-top: 5px;
  display: inline-block;
  margin-top: -5px;
}
.missingbikeSign {
  position: absolute;
  bottom: 14px;
  opacity: 0.3;
}
.missingDivsign {
  width: 65px;
  height: 65px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
  margin: 16px auto;
}
.middleSection {
  max-width: 306px;
  margin: auto;
  text-align: center;
}
/*****=========================RESPONSIVE======================****/
@media screen and (max-width: 1449px) {
  header.site-header.user-admin {
    .custom-nav-height a {
      font-size: 13px;
    }
    li.nav-item {
      padding-left: 12px;
    }
  }
}
@media screen and (max-width: 1299px) {
}
@media screen and (max-width: 1200px) {
  .sideTabbar .nav-tabs .nav-link {
    font-size: 14px !important;
  }
  header.site-header.user-admin .custom-nav-height a {
    font-size: 12px;
  }
}
@media screen and (max-width: 1100px) {
}
@media screen and (max-width: 991px) {
      .theme-btn.universal-btn.me-2 {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    margin-right: 0 !important;
}
div#button-hover {
    width: 100%;
}
  .sideTabbar {
    margin-right: 0;
  }
  .sideTabbar .nav-tabs .nav-link {
    font-size: 13px !important;
  }
  .admin-tab-content .form-label,
  .admin-tab-content .form-check-label {
    font-size: 14px;
    margin: 0;
  }
  .admin-tab-content input,
  select,
  textarea {
    font-size: 14px !important;
  }
}
@media screen and (max-width: 767px) {
  .admin-tab-content{
    padding: 0px;
}
  .sideTabbar {
    margin-bottom: 25px;
  }
  .admin-tab-content {
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 0px;
  }
  .them-title-black {
    font-size: 20px;
  }
}
@media screen and (max-width: 579px) {
}
</style>
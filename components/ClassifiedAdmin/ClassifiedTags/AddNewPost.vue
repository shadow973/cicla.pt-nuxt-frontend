<template>
  <div>
    <div class="admin-tab-content">
      <div class="section-title pb-4">
        <div class="row">
          <div class="col-md-8">
            <h4 class="them-title-black mb-0 mt-2">
            <span class="back-btn" v-if="backToSale" @click="goToSale" title="Back"><i class="fal fa-chevron-left icon-size"></i></span>
              DETALHE DO ANÚNCIO</h4>
          </div>

            <div class="col-md-4 text-end">

            <div class="acction-btn" style="justify-content: flex-end;">
            <div
            class="edit-btn me-3"
            v-if="__getSaleState"
            >
            <button @click="editSale" title="Edit"><i class="fal fa-edit pe-2"></i></button>
            </div>

            <div class="remove-btn" v-if="__getSaleState">
            <button @click="removeSale" title="Remove"><i class="fal fa-trash-alt pe-2"></i></button>
            </div>

            </div>

          </div>

        </div>

      </div>
      <!-- Add Form -->
      <div v-if="__getSaleState === false || __getSaleState === null" class="row page-content">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="inner-box">
              <div class="dashboard-wrapper row">
                <div class="form-group col-md-12 mb-3">
                  <label class="form-label">Preço</label>
                  <input
                    v-model="price"
                    @blur="checkPrice"
                    :class="priceWarn ? 'warning-border form-control' : 'form-control'"
                    placeholder="Anuncie seu preço"
                    type="text"
                  />
                  <span v-if="priceWarn" class="warning">*O preço é obrigatório</span>
                </div>

                <div class="form-group col-md-12 mb-3">
                  <label class="form-label">Observações</label>
                  <input
                    v-model="remarks"
                    @blur="checkRemarks"
                    :class="remarksWarn ? 'warning-border form-control' : 'form-control'"
                    placeholder="Observações"
                    type="text"
                  />
                   <span v-if="remarksWarn" class="warning">*Comentários são obrigatórios</span>
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Fotografias Recentes</label>
                  <div class="photo-block">
                    <div class="img-heading">Fotografia 1</div>
                    <div class="photo-frame" v-if="recentImage1">
                      <div class="circle d-grid">
                        <div class="loader" v-if="bikeIsLoading">
                          <img src="~assets/images/spinner.gif" style="width: 60px" />
                        </div>
                        <img class="profile-pic" v-else :src="recentPhoto1 ? __getBaseUrl+recentPhoto1 : recentImage1" />
                      </div>
                      <div class="edit-image d-flex justify-content-between">
                        <div>
                          <div class="p-image">
                            <div class="select-photo edit-select-photo bg-transparent" @click="removeImageBtn">
                              <i class="fal fa-trash-alt upload-button"></i>
                              <span class="upload-button">Remover bicicleta</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="photo-frame select-photo">
                      <input type="file" ref="file" @change="onChangeFileUpload($event, 'for_classified')" />
                      <div class="add-photo-icon text-center">
                        <i class="fal fa-plus-circle circle-effect"></i>
                        <p>Adicionar foto</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label pt-3"></label>
                  <div class="photo-block">
                    <div class="img-heading">Fotografia 2</div>
                    <div class="photo-frame" v-if="recentImage2">
                      <div class="circle d-grid">
                        <div class="loader" v-if="bikeIsLoading">
                          <img src="~assets/images/spinner.gif" style="width: 60px" />
                        </div>
                        <img class="profile-pic" v-else :src="recentPhoto1 ? __getBaseUrl+recentPhoto2 : recentImage2" />
                      </div>
                      <div class="edit-image d-flex justify-content-between">
                        <div>
                          <div class="p-image">
                            <div class="select-photo edit-select-photo bg-transparent" @click="removeSecondImageBtn">
                              <i class="fal fa-trash-alt"></i>
                              <span class="upload-button">Remover bicicleta</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="photo-frame select-photo">
                      <input type="file" ref="fileSecond" @change="onChangeFileUploadSecond($event, 'for_classified')" />
                      <div class="add-photo-icon text-center">
                        <i class="fal fa-plus-circle circle-effect"></i>
                        <p>Adicionar foto</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 mb-2 col-xs-6">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="posting"
                    v-model="checkBoxValue"
                    @input="checkBox"
                  />
                  <label class="form-check-label" for="posting"
                    >Concordo com todos os <a href="/terms-of-use" target="_blank">Termos e Condições </a> e com  as Regras de Publicação</label>
                </div>
                <p v-if="checkBoxWarn" class="warning">*Por favor, aceite os termos e condições.</p>

                <div class="col-md-12 mt-3">
                  <div
                    class="theme-btn universal-btn"
                    id="button-3"
                  >
                    <div id="circle"></div>
                    <button type="submit" @click="submitData">
                      <span>Publicar a sua Bicicleta</span>
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div v-else class="row page-content">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="inner-box">
              <div class="dashboard-wrapper row">
                <div class="form-group col-md-12 mb-3">
                  <label class="form-label">Preço</label>
                  <input
                    v-model="price"
                    disabled
                    class="form-control"
                    name="price"
                    placeholder="Anuncie seu preço"
                    type="text"
                  />
                </div>

                <div class="form-group col-md-12 mb-3">
                  <label class="form-label">Observações</label>
                  <input
                    v-model="remarks"
                    disabled
                    class="form-control"
                    placeholder="Observações"
                    type="text"
                  />
                </div>
                <div class="col-md-6 mb-3" v-if="recentPhoto1">
                  <label class="form-label">Fotografias Recentes</label>
                  <div class="photo-block">
                    <div class="photo-frame">
                      <div class="circle d-grid">
                        <img class="profile-pic" :src="__getBaseUrl+recentPhoto1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-3" v-if="recentPhoto2">
                  <label class="form-label pt-3"></label>
                  <div class="photo-block">
                    <div class="photo-frame">
                      <div class="circle d-grid">
                        <img class="profile-pic" :src="__getBaseUrl+recentPhoto2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../../services'
import axios from 'axios'
import { BaseUrl } from '../../../services/index.js'
import { mapActions, mapGetters } from 'vuex'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import generateConstant, { token } from '../../../utils/Constants'
export default {
  props: ['bikeId'],
  data(){
    return{
      backToSale: false,
      isValid: false,
      price: '',
      priceWarn: false,
      checkBoxValue: false,
      checkBoxWarn: false,
      remarks: '',
      remarksWarn: false,
      userData: {},
      bikeInfo: [],
      recentPhoto1: '',
      recentPhoto2: '',
      recentImage1: '',
      recentImage2: '',
      file: '',
      fileSecond: '',
      formData: null,
      formDataSecond: null,
      bikeIsLoading: false
    }
  },
  computed: {
    ...mapGetters({
      __getSaleState: 'product/getSaleState',
      __getBaseUrl: 'product/getBaseUrl',
      __getSalePrice: 'product/getSalePrice'
    })
  },
  methods:{
    ...mapActions({
      __setSaleState: 'product/setSaleState',
      __setSalePrice: 'product/setSalePrice'
    }),
    generateAuthConfig () {
      const authToken = Cookies.get(generateConstant(token))
      return {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    },
    removeImageBtn() {
      this.recentImage1 = ''
    },
    removeSecondImageBtn() {
      this.recentImage2 = ''
    },
    onChangeFileUpload(e, param) {
      this.bikeIsLoading = true
      this.file = this.$refs.file.files[0]
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.recentImage1 = e.target.result
      }
      this.formData = new FormData()
      this.formData.append('files.' + param, this.file)
      this.formData.append('data', JSON.stringify(this.formData))
      this.bikeIsLoading = false
    },
    onChangeFileUploadSecond(e, param) {
      this.bikeIsLoading = true
      this.fileSecond = this.$refs.fileSecond.files[0]
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.recentImage2 = e.target.result
      }
      this.formDataSecond = new FormData()
      this.formDataSecond.append('files.' + param, this.fileSecond)
      this.formDataSecond.append('data', JSON.stringify(this.formDataSecond))
      this.bikeIsLoading = false
    },
    dateFormat(value, format) {
      return dayjs(value).format(format)
    },
    checkPrice(){
      if(this.price === '' || this.price === null){
        this.priceWarn = true
      } else{
        this.priceWarn = false
      }
    },
    checkRemarks(){
      if(this.remarks === ''){
        this.remarksWarn = true
      } else{
        this.remarksWarn = false
      }
    },
    checkBox() {
      this.checkBoxValue = !this.checkBoxValue
    },
    checkBoxValid() {
      if(this.checkBoxValue === false) {
        this.checkBoxWarn = true
      } else {
        this.checkBoxWarn = false
      }
    },
    checkValid(){
      this.checkPrice()
      this.checkRemarks()
      this.checkBoxValid()
      if(this.priceWarn || this.remarksWarn || this.checkBoxWarn) {
        this.isValid = false
      } else{
        this.isValid = true
      }
    },
    editSale() {
      this.__setSaleState(null)
      this.backToSale = true
    },
    goToSale() {
      this.__setSaleState(true)
      this.backToSale = false
    },
    async removeSale() {
      const info = {
        price: null,
        remarks: '',
        on_sale: false,
        for_classified: null
      }
      await api.product.bikeUpdateService(this.bikeId, info)
      this.__setSaleState(false)
      this.__setSalePrice(null)
      this.$toasted.show('Removido com sucesso!', {
        position: 'top-center',
        duration: 3000
      })
      this.price = ''
      this.remarks = ''
      window.location.reload()
    },
    async submitData(){
     this.checkValid()
     if(this.isValid){
      const inputData = {
        price: this.price,
        remarks: this.remarks,
        on_sale: true,
        classified_date: new Date()
      }
      await api.product.bikeUpdateService(this.bikeId, inputData)
      if(this.recentImage1) {
        await axios.put(`${BaseUrl}/bikes/${this.bikeId}`,
          this.formData,
          this.generateAuthConfig(),
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(function (data) {
            console.log('loaded data---->', data)
          })
      }
      if(this.recentImage2) {
        await axios.put(`${BaseUrl}/bikes/${this.bikeId}`,
          this.formDataSecond,
          this.generateAuthConfig(),
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(function (data) {
            console.log('loaded data---->', data)
          })
      }
      this.__setSaleState(true)
      this.__setSalePrice(this.price)
      const history = {
        information: {
          text: 'Bicicleta anunciada para venda',
          price: this.price
        },
        type: 'sale',
        user: this.userData,
        bikes: this.bikeId
      }
      await api.product.addToHistory(history)
      this.$toasted.show('Salvo com sucesso', {
          position: 'top-center',
          duration: 3000
        })
        window.location.reload()
    } else {
      this.$toasted.show('Erro ao enviar dados', {
          position: 'top-center',
          duration: 3000
        })
    }
    }
  },
  async fetch() {
    const userInfo = await api.product.userDetail()
    this.userData = userInfo.data
    const getBikeData = await api.product.getBikeDataService(this.$route.params.slug)
    this.bikeInfo = getBikeData
    this.price = getBikeData[0].price
    this.remarks = getBikeData[0].remarks
    this.__setSaleState(getBikeData[0].on_sale)
    if(getBikeData.length > 0) {
      getBikeData.filter((data) => {
        this.bikeName = data.model
        this.bikeBrand = data.brand
        this.recentPhoto1 = data.for_classified.length > 0 ? data.for_classified[0].url : null
        this.recentPhoto2 = data.for_classified.length > 0 ? data.for_classified[1].url : null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.back-btn {
  color: white;
  background-color: black;
  border-radius: 100%;
  padding-left: 12px;
  padding-right: 12px;
}
.icon-size {
  font-size: 1.4rem;
}
.circle-effect {
  color: #b8b1b1;
}
.circle-effect:hover {
  color: red;
}
.acction-btn {
    display: flex;
    justify-content: end;

    .edit-btn button {
    background: #142d46;
    border: none;
    width: 40px;
    height: 40px;
    color: #fff;
    border-radius: 30px;
    display: grid;
    align-items: center;
    text-align: center;
    &:hover{
      background: #091827;
    }
    i {
    padding: 0 !important;
}

}

.remove-btn button {
    background: #e70303;
    border: none;
    width: 40px;
    height: 40px;
    color: #fff;
    border-radius: 30px;
    display: grid;
    align-items: center;
    text-align: center;
    &:hover{
      background: #b80404;
    }
    i {
    padding: 0 !important;
}
}

}

.input-padding{
  padding: 10px 0;
}

.inner-box{
  .form-check-input {
    margin: 0;
}
label.form-check-label {
    padding-left: 29px;
    a {
    color: #fd5044;
}
}
}

.chip.top-set-line {
.edit-bike-info {
  position: absolute;
  border: none;
  top: 21px;
  left: 22px;
  width: 72px;
  height: 34px;
  background: #000;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  &:hover {
    background: #fd5044;
    transition: all 0.45s ease-Out;
  }
}
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
    height: 300px;
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
  border: 1px solid #ddd;
  padding: 25px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 50px;
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
ul.ps-0.row.justify-content-around.social-media{
    margin-top: 29px;
    a{
        padding: 10px 16px;
        border-radius: 50px;
    }
    .facebook{
        background-color: #3B5998;
    }
    .twitter{
        background-color: #1D9BF0;
    }
}
.classified-box {
  border-radius: 4px;
  box-shadow: 2px 6px 24px -7px #ddd;
  transition: 0.5s;
  &:hover {
    box-shadow: 2px 0px 21px 9px #d3d3d3;
  }
  hr {
    margin: 8px 0 0;
  }
  a:hover {
    color: #323232;
  }
  .date-post {
    font-size: 14px;
    color: #2c2c2c;
  }
  .images {
    padding: 15px;
  }
  .chip.top-set-line {
  .buy-bike-info {
    position: absolute;
    border: none;
    top: 21px;
    left: 22px;
    width: 72px;
    height: 34px;
    background: #13C339;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
}
.stolen-bike-info{
    position: absolute;
    border: none;
    top: 21px;
    left: 22px;
    width: 72px;
    height: 34px;
    background: green;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
}
}
  .info-classified {
    width: 100%;
    padding: 0 15px;
    text-align: left;
  }

  .location {
    padding-bottom: 4px;
    font-size: 15px;
  }

  .t-name-classified {
    font-size: 18px;
    color: #1a1a1a;
    font-weight: bold;
    padding-bottom: 3px;
  }

  .price-fixed {
    font-size: 16px;

    span.items-price {
      font-size: 19px;
      color: #ff3f06;
      font-weight: bold;
    }
  }
}

span.price-type {
  font-size: 13px;
}

.classified-date {
  padding: 10px 15px;
  .post-user span {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 100px;
    display: inline-block;
  }
  img {
    overflow: hidden;
  }
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
  .circle img.profile-pic{
    height: auto;
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

.upload-bike-images{
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

  .show-for-sr, .show-on-focus {
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
    &:hover{background: #000 !important;}
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

.dashboard-wrapper{
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
        outline: none
    }

    .dashboardtable tbody tr {
        transition: all .4s ease-in-out;
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

    .dashboardtable{

        thead tr th .checkbox, tbody tr td .checkbox {
            width: 20px;
            height: 20px
        }

        tbody tr td, tbody tr td h3 {
            color: #333;
            font-size: 15px;
            font-weight: 500;
            line-height: 20px;
            vertical-align: middle;
            margin: 0
        }

        tbody tr td h3+span {
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
        display: block
    }

    .adcategories {
        min-width: 110px;
        display: block
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
        text-transform: uppercase
    }

    .adstatusinactive {
        color: #363b4d;
        background: #f7f7f7
    }

    .adstatusactive {
        background: #e91e63
    }

    .adstatusexpired {
        background: #fc9209
    }

    .adstatusdeleted {
        background: #f91942
    }

    .adstatussold {
        background: #363b4d
    }

    .btns-actions {
        min-width: 150px;
        width: 100%;
        float: left;
        margin: -5px 0
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
        -webkit-transition: all .4s ease-in-out;
        -moz-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out
    }

    .btns-actions .btn-action i {
        display: block;
        line-height: 40px
    }

    .dashboardtable tbody tr:hover .btn-delete {
        background: #f91942;
        color: #fff
    }

    .dashboardtable tbody tr:hover .btn-edit {
        background: #363b4d;
        color: #fff
    }

    .dashboardtable tbody tr:hover .btn-view {
        background: #02944b;
        color: #fff
    }
}

.table td, .table th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px
 solid #dee2e6;
}

.cod-images img {
    max-width: 450px;
    margin-top: 30px;
}





@media screen and (max-width: 579px) {
}

</style>

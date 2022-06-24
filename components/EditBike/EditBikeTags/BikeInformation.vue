<template>
  <div>
    <div class="text-center" v-if="$fetchState.pending">
    <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
    </div>
    <div v-else-if="$fetchState.error">
    <p>Erro ao buscar dados</p>
    </div>
    <div v-else class="admin-tab-content">
      <div class="section-title pb-4">
        <h4 class="them-title-black mb-0">INFORMAÇÃO COMPLETA DA BICICLETA</h4>
      </div>
      <div class="row form-field-separator">
        <div class="mb-3 col-12 col-md-6">
          <div class="d-flex justify-content-between">
            <label class="form-label">Alcunha</label>
          </div>
          <div class="icon-right">
            <input
              type="text"
              class="form-control"
              v-model="nickName"
            />
          </div>
        </div>

        <div class="mb-3 col-12 col-md-6">
          <label class="form-label"
            >Categoria</label
          >
          <input
            disabled
            class="form-control custom-h"
            v-model="selectCategory"
          />
        </div>

        <div class="mb-3 col-12 col-md-6">
          <label class="form-label">Ano</label>
          <input
            disabled
            class="form-control custom-h"
            v-model="bikeYear"
          />
        </div>

        <div class="mb-3 col-12 col-md-6">
          <label class="form-label">Marca</label>
          <input
            disabled
            class="form-control custom-h"
            v-model="selectBrand"
          />
        </div>

        <div class="mb-3 col-12 col-md-6">
          <div class="d-flex justify-content-between">
            <label class="form-label"
              >Modelo</label
            >
          </div>
          <div class="icon-right">
            <input
              disabled
              class="form-control custom-h"
              v-model="bikeModel"
            />
          </div>
        </div>

        <div class="mb-3 col-12 col-md-6">
          <label class="form-label"
            >Côr Principal</label>
          <select
            :class="selectPrimaryColorWarn ? 'warning-border' : ''"
            class="form-select custom-h"
            aria-label="Default select example"
            v-model="selectPrimaryColor"
            @blur="
              selectPrimaryColor instanceof Object
                ? (selectPrimaryColorWarn = false)
                : (selectPrimaryColorWarn = true)
            "
          >
            <option>Selecione Côr Principal</option>
            <option
              v-for="(data, index) in ColorData"
              :key="index"
              :value="data"
            >
              {{ data.name }}
            </option>
          </select>
          <span v-if="selectPrimaryColorWarn" class="warning"
            >*Côr Principal É necessário</span
          >
        </div>

        <div class="mb-3 col-12 col-md-6">
          <label class="form-label"
            >Côr Secundária</label
          >
          <select
            :class="selectSecondColorWarn ? 'warning-border' : ''"
            class="form-select custom-h"
            aria-label="Default select example"
            v-model="selectSecondColor"
            @blur="
              selectSecondColor instanceof Object
                ? (selectSecondColorWarn = false)
                : (selectSecondColorWarn = true)
            "
          >
            <option>Selecione Côr Secundária</option>
            <option
              v-for="(data, index) in ColorData"
              :key="index"
              :value="data"
            >
              {{ data.name }}
            </option>
          </select>
          <span v-if="selectSecondColorWarn" class="warning"
            >*Côr Secundária É necessária</span
          >
        </div>

        <div class="mb-3 col-12 col-md-6">
          <label class="form-label"
            >Tamanho de roda</label
          >
          <select
            :class="selectWheelSizeWarn ? 'warning-border' : ''"
            class="form-select custom-h"
            aria-label="Default select example"
            v-model="wheelSize"
            @blur="
              wheelSize instanceof Object
                ? (selectWheelSizeWarn = false)
                : (selectWheelSizeWarn = true)
            "
          >
            <option>Selecione Tamanho de roda</option>
            <option
              v-for="(data, index) in WheelSizeData"
              :key="index"
              :value="data"
            >
              {{ data.size }}
            </option>
          </select>
          <span v-if="selectWheelSizeWarn" class="warning"
            >*Tamanho de roda É necessário</span
          >
        </div>

        <div class="mb-3 col-12 col-md-6">
          <label class="form-label"
            >Materiais</label
          >
          <select
            :class="selectMaterialsWarn ? 'warning-border' : ''"
            class="form-select custom-h"
            aria-label="Default select example"
            v-model="selectMaterial"
            @blur="
              selectMaterial instanceof Object
                ? (selectMaterialsWarn = false)
                : (selectMaterialsWarn = true)
            "
          >
            <option>Selecione Materiais</option>
            <option
              v-for="(data, index) in MaterialsData"
              :key="index"
              :value="data"
            >
              {{ data.name }}
            </option>
          </select>
          <span v-if="selectMaterialsWarn" class="warning"
            >*Materiais É necessário</span
          >
        </div>

        <div class="mb-3 col-12 col-md-6">
          <label class="form-label"
            >Tipo de Suspensão</label
          >
          <select
            :class="selectSuspensionWarn ? 'warning-border' : ''"
            class="form-select custom-h"
            aria-label="Default select example"
            v-model="selectSuspension"
            @blur="
              selectSuspension instanceof Object
                ? (selectSuspensionWarn = false)
                : (selectSuspensionWarn = true)
            "
          >
            <option>Selecione Tipo de Suspensão</option>
            <option
              v-for="(data, index) in SuspensionData"
              :key="index"
              :value="data"
            >
              {{ data.type }}
            </option>
          </select>
          <span v-if="selectSuspensionWarn" class="warning"
            >*Tipo de Suspensão É necessário</span
          >
        </div>

        <div class="mb-3 col-12 col-md-6">
          <label class="form-label"
            >Número de Série (Podem ser vários)</label
          >
          <div class="icon-right">
            <input
              :disabled="checkPublish"
              type="text"
              class="form-control custom-h"
              placeholder="Número de Série (Podem ser vários)"
              v-model="bikeSerialNum"
              :class="selectBikeSerialWarn ? 'warning-border' : ''"
              @blur="
                bikeSerialNum
                  ? (selectBikeSerialWarn = false)
                  : (selectBikeSerialWarn = true)
              "
            />
            <span v-if="selectBikeSerialWarn" class="warning"
              >*Número de Série (Podem ser vários) É necessário</span
            >
          </div>
        </div>

        <div class="mb-3 col-12 col-md-6">
          <label class="form-label"
            >Número CICLA</label
          >
          <div class="icon-right">
            <input
              disabled
              type="text"
              class="form-control custom-h"
              placeholder="Número CICLA"
              v-model="bikeCiclaNum"
            />
          </div>
        </div>

        <div class="mb-3 col-12 col-md-12 mb-4">
          <label class="form-label"
            >Informação Adicional</label
          >
          <div class="icon-right">
            <input
              type="text"
              class="form-control custom-h"
              v-model="otherInformation"
            />
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="photo-block">
            <div class="img-heading">Fotografia da Bicicleta</div>
            <div class="photo-frame" v-if="url">
              <div class="circle">
                <div v-if="bikeLoading">
                  <img src="~assets/images/spinner.gif" style="width: 60px" />
                </div>
                <img
                  v-else
                  class="profile-pic"
                  :src="
                    url.formats && url.formats.medium
                      ? __getBaseUrl + url.formats.medium.url
                      : __getBaseUrl + url.url
                  "
                />
              </div>
              <div class="edit-image d-flex justify-content-between">
                <div>
                  <div class="p-image">
                    <div
                      class="select-photo edit-select-photo bg-transparent"
                    >
                      <i class="fal fa-edit upload-button"></i>
                      <input type="file" accept="image/*" @change="onFileChange($event)" />
                      <span class="upload-button">Alterar Imagem</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span @click="removeImageBtn"
                    ><i class="fal fa-trash-alt"></i
                  ></span>
                </div>
              </div>
            </div>
            <div class="photo-frame select-photo" v-else>
              <input type="file" accept="image/*" @change="onFileChange" />

              <div class="add-photo-icon text-center">
                <i class="fal fa-plus-circle"></i>
                <p>Adicionar foto</p>
              </div>
            </div>
          </div>
          <span v-if="bikeImgWarn" class="warning"
            >*Fotografia da Bicicleta É necessário</span
          >
        </div>
        <div class="col-12 col-md-4">
          <div class="photo-block">
            <div class="img-heading">Fotografia do Número de Série</div>
            <div class="photo-frame" v-if="serialPhotoUrl">
              <div class="circle">
                <div v-if="serialLoading">
                  <img src="~assets/images/spinner.gif" style="width: 60px" />
                </div>
                <img
                  v-else
                  class="profile-pic"
                  :src="
                    serialPhotoUrl.formats && serialPhotoUrl.formats.medium
                      ? __getBaseUrl + serialPhotoUrl.formats.medium.url
                      : __getBaseUrl + serialPhotoUrl.url
                  "
                />
              </div>
              <div class="edit-image d-flex justify-content-between">
                <div>
                  <div class="p-image">
                    <div
                      class="select-photo edit-select-photo bg-transparent"
                    >
                      <i class="fal fa-edit upload-button"></i>
                      <input
                        type="file"
                        accept="image/*"
                        @change="onSerialFileChange($event)"
                      />
                      <span class="upload-button">Alterar Imagem</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span @click="removeSerialImageBtn"
                    ><i class="fal fa-trash-alt"></i
                  ></span>
                </div>
              </div>
            </div>
            <div class="photo-frame select-photo" v-else>
              <input type="file" accept="image/*" @change="onSerialFileChange" />

              <div class="add-photo-icon text-center">
                <i class="fal fa-plus-circle"></i>
                <p>Adicionar foto</p>
              </div>
            </div>
          </div>
          <span v-if="serialImgWarn" class="warning"
            >*Fotografia do Número de Série É necessário</span
          >
        </div>
        <div class="col-12 col-md-4">
          <div class="photo-block">
            <div class="img-heading">Fotografia da Fatura</div>
            <div class="photo-frame" v-if="invoiceUrl">
              <div class="circle">
                <div v-if="invoiceLoading">
                  <img src="~assets/images/spinner.gif" style="width: 60px" />
                </div>
                <img
                  v-else
                  class="profile-pic"
                  :src="
                    invoiceUrl.formats && invoiceUrl.formats.medium
                      ? __getBaseUrl + invoiceUrl.formats.medium.url
                      : __getBaseUrl + invoiceUrl.url
                  "
                />
              </div>
              <div class="edit-image d-flex justify-content-between">
                <div>
                  <div class="p-image">
                    <div
                      class="select-photo edit-select-photo bg-transparent"
                    >
                      <i class="fal fa-edit upload-button"></i>
                      <input
                        type="file"
                        accept="image/*"
                        @change="onInvoiceFileChange($event)"
                      />
                      <span class="upload-button">Alterar Imagem</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span @click="removeInvoiceImageBtn"
                    ><i class="fal fa-trash-alt"></i
                  ></span>
                </div>
              </div>
            </div>
            <div class="photo-frame select-photo" v-else>
              <input type="file" accept="image/*" @change="onInvoiceFileChange" />

              <div class="add-photo-icon text-center">
                <i class="fal fa-plus-circle"></i>
                <p>Adicionar foto</p>
              </div>
            </div>
          </div>
          <span v-if="invoiceImgWarn" class="warning"
            >*Fotografia da Fatura É necessário</span
          >
        </div>
        <div class="row form-field-separator mt-1">
          <div class="col-md-12">
            <div class="theme-btn universal-btn" id="button-3">
              <div id="circle"></div>
              <button @click="updateBikeData">
                <span> Guardar <i class="fal fa-save"></i></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../services'
import { mapGetters } from 'vuex'
export default {
  props: ['bikeId'],
  data() {
    return {
      checkPublish: null,
      nickName: '',
      nickNameWarn: false,
      userData: [],
      selectCategory: '',
      selectCategoryWarn: false,
      CategoryData: [],
      bikeYear: '',
      BikeYearData: [],
      selectYearWarn: false,
      BrandData: [],
      selectBrandWarn: false,
      selectBrand: '',
      modelWarn: false,
      bikeModel: '',
      selectPrimaryColorWarn: false,
      selectPrimaryColor: '',
      ColorData: [],
      selectSecondColor: '',
      selectSecondColorWarn: false,
      WheelSizeData: [],
      selectWheelSizeWarn: false,
      wheelSize: '',
      MaterialsData: [],
      selectMaterialsWarn: false,
      selectMaterial: '',
      SuspensionData: [],
      selectSuspensionWarn: false,
      selectSuspension: '',
      bikeSerialNum: '',
      bikeCiclaNum: '',
      selectBikeSerialWarn: false,
      otherInformation: '',
      otherInformationWarn: false,
      selectBikeBrandData: [],
      selectMaterialData: [],
      selectSuspensionData: [],
      url: '',
      serialPhotoUrl: '',
      invoiceUrl: '',
      bikeLoading: false,
      serialLoading: false,
      invoiceLoading: false,
      bikeImgWarn: false,
      serialImgWarn: false,
      invoiceImgWarn: false,
      isValid: false
    }
  },
  computed:{
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl'
    })
  },
  watch: {
    selectBrand(val) {
      this.selectBikeBrandData.push(val)
    },
    selectMaterial(val) {
      this.selectMaterialData.splice(0, 1, val)
    },
    selectSuspension(val) {
      this.selectSuspensionData.splice(0, 1, val)
    },
  },
  methods: {
    async onFileChange(e) {
      this.bikeLoading = true
      let formData = new FormData();
      formData.append('files', e.target.files[0]);
      const imgData = await api.product.UploadImageService(formData)
      this.url = imgData.data[0]
      this.bikeLoading = false
    },
    removeImageBtn(){
     this.url = ''
    },
    async onSerialFileChange(e) {
      this.serialLoading = true
      let formData = new FormData();
      formData.append('files', e.target.files[0]);
      const imgData = await api.product.UploadImageService(formData)
      this.serialPhotoUrl = imgData.data[0]
      this.serialLoading = false
    },
    removeSerialImageBtn(){
     this.serialPhotoUrl = ''
    },
    async onInvoiceFileChange(e) {
      this.invoiceLoading = true
      let formData = new FormData();
      formData.append('files', e.target.files[0]);
      const imgData = await api.product.UploadImageService(formData)
      this.invoiceUrl = imgData.data[0]
      this.invoiceLoading = false
    },
    removeInvoiceImageBtn(){
     this.invoiceUrl = ''
    },
    checkValid() {
      if(this.nickName === '' || this.nickNameWarn || this.selectCategory === '' || this.selectCategoryWarn || this.bikeYear === '' ||
         this.selectYearWarn || this.selectBrand === '' || this.selectBrandWarn || this.bikeModel === '' || this.modelWarn || this.selectPrimaryColor === '' ||
         this.selectPrimaryColorWarn || this.selectSecondColor === '' || this.selectSecondColorWarn || this.wheelSize === '' || this.selectWheelSizeWarn ||
         this.selectMaterial === '' || this.selectMaterialsWarn || this.selectSuspension === '' || this.selectSuspensionWarn || this.bikeSerialNum === '' ||
         this.selectBikeSerialWarn || this.url === '' || this.bikeImgWarn || this.serialPhotoUrl === '' || this.serialImgWarn || this.invoiceUrl === ''
          || this.invoiceImgWarn || this.otherInformation === '' || this.otherInformationWarn) {
          this.isValid = false
      } else {
        this.isValid = true
      }
    },
    async updateBikeData() {
      this.checkValid()
      if(this.isValid) {
        const inputData = {
          nickName: this.nickName,
          secondary_colors: this.selectSecondColor,
          color: this.selectPrimaryColor,
          wheel_size: this.wheelSize,
          materials: this.selectMaterialData,
          suspension_types: this.selectSuspensionData,
          bike_photo: this.url,
          serial_number_photo: this.serialPhotoUrl,
          invoice_photo: this.invoiceUrl,
          other_information: this.otherInformation
        }
        await api.product.bikeUpdateService(this.bikeId, inputData)
        this.$toasted.show('Atualizado com sucesso!', {
          position: 'top-center',
          duration: 3000
        })
      } else {
        this.$toasted.show('Erro de validação!', {
          position: 'top-center',
          duration: 3000
        })
      }
    },
  },
  async fetch() {
    const userDetail = await api.product.userDetail()
    this.userData = userDetail.data
    this.CategoryData = await api.product.blogService('categories')
    this.BikeYearData = await api.product.blogService('years')
    this.BrandData = await api.product.blogService('brands')
    this.ColorData = await api.product.blogService('colors')
    this.WheelSizeData = await api.product.blogService('wheel-sizes')
    this.MaterialsData = await api.product.blogService('materials')
    this.SuspensionData = await api.product.blogService('suspension-types')
    const route = this.$route.params.slug
    const BikeData = await api.product.getBikeDataService(route)
    this.checkPublish = BikeData[0].status
    if (BikeData.length > 0) {
      BikeData.filter((data) => {
        this.nickName = data.nickName
        this.bikeModel = data.model
        this.selectCategory = data.category.name
        this.bikeYear = data.year.year
        this.wheelSize = data.wheel_size
        this.bikeSerialNum = data.serial_number
        this.bikeCiclaNum = data.cicla_number
        this.otherInformation = data.other_information
        this.selectBrand = data.brands.length > 0 ? data.brands[0].name : ''
        this.MaterialsData.forEach((mData) => {
          data.materials.filter((materialsData) => {
            if (mData.id === materialsData.id) {
              this.selectMaterial = mData
            }
          })
        })
        this.SuspensionData.forEach((susData) => {
          data.suspension_types.filter((suspensionData) => {
            if (susData.id === suspensionData.id) {
              this.selectSuspension = susData
            }
          })
        })
        this.ColorData.filter((cData) => {
          if (cData.id === data.color.id) {
            this.selectPrimaryColor = cData
          }
          data.secondary_colors.filter((colorData) => {
            if (cData.id === colorData.id) {
              this.selectSecondColor = cData
            }
          })
        })
        this.url = data.bike_photo
        this.serialPhotoUrl = data.serial_number_photo
        this.invoiceUrl = data.invoice_photo
      })
    }
  },
}
</script>

<style lang="scss" scoped>
$them-color: #fd5044;

.stolen-bike-user-bike {
  .img-heading {
    font-size: 14px;
}
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
.photo-block .select-photo {
  background: #f0f0f0;
  position: relative !important;
  cursor: pointer;
  height: 300px;
  &:hover i{
    color: #fd5044;
  }
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute !important;
    left: 0%;
    right: 0%;
    bottom: 0%;
    top: 0%;
    z-index: 99999;
    cursor: pointer;
  }
  .select-photo:hover i {
    color: #323232;
}
  .add-photo-icon {
    position: absolute !important;
    color: rgb(185, 185, 185);
    top: 23%;
    right: 0;
    left: 0;
    font-size: 73px;
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
.photo-block {
  border: 1px solid #ddd;
  padding: 12px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 20px;
.circle {
    height: 100%;
    float: left;
    width: 100%;
    img {
    height: 100%;
    object-fit: cover;
     width: 100%;
}
}
.photo-frame {
  width: 100%;
  height: 300px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
}
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
 i {
  color: #fd5044;
  cursor: pointer;
}
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

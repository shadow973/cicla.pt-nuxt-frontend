<template>
  <div>
    <section class="register-bike section-padding theme-bg-light">
      <div class="text-center" v-if="$fetchState.pending">
        <img src="~assets/images/spinner.gif" style="width: 60px" />
      </div>
      <div v-else-if="$fetchState.error">
        <p>Erro ao buscar dados</p>
      </div>
      <div v-else class="theme-container">
        <div class="pb-3 cursor-pointer" @click="backTo"><i class="fal fa-arrow-left pe-2"></i>A Minha Conta</div>
        <div class="row">
          <div class="col-lg-12">
            <!--PEN CONTENT     -->
            <div class="content">
              <!--content inner-->
              <div class="content__inner">
                <div class="overflow-hidden">
                  <!--multisteps-form-->
                  <div class="multisteps-form">
                    <!--form panels-->
                    <div class="row">
                      <div class="col-12 col-lg-12">
                        <div class="multisteps-form__progress">
                          <button
                            class="multisteps-form__progress-btn js-active"
                            type="button"
                          >
                            <div class="tabs-text">
                              <span class="tab-number">1</span
                              ><span><i class="fal fa-bicycle"></i></span> Informação da Bicicleta
                            </div>
                          </button>
                          <button
                            :class="
                              step2
                                ? 'multisteps-form__progress-btn js-active'
                                : 'multisteps-form__progress-btn'
                            "
                            type="button"
                          >
                            <div class="tabs-text">
                              <span class="tab-number">2</span
                              ><span><i class="fal fa-bicycle"></i></span>
                             Fotografia
                            </div>
                          </button>
                        </div>
                      </div>

                      <div class="col-12 col-lg-12 m-auto">
                        <form class="multisteps-form__form">
                          <!--single form panel-->
                          <div
                            :class="
                              step1
                                ? 'multisteps-form__panel shadow p-4 rounded bg-white js-active'
                                : 'multisteps-form__panel shadow rounded bg-white'
                            "
                            data-animation="scaleIn"
                          >
                            <div class="multisteps-form__content">
                              <div action="" class="row bike-add-form">
                                <div class="mb-3 col-12 col-md-6">
                                  <div class="d-flex justify-content-between">
                                    <label
                                      class="form-label"
                                      >Alcunha</label
                                    >
                                  </div>
                                  <div class="icon-right">
                                    <input
                                      :class="nickNameWarn ? 'warning-border' : ''"
                                      type="text"
                                      class="form-control custom-h"
                                      placeholder="Alcunha"
                                      @blur="validNickName"
                                      v-model="nickName"
                                    />
                                    <span v-if="nickNameWarn" class="warning"
                                      >*Alcunha é obrigatório</span
                                    >
                                  </div>
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <label
                                    class="form-label"
                                    >Categoria</label
                                  >
                                  <select
                                    :class="
                                      selectCategoryWarn ? 'warning-border' : ''
                                    "
                                    class="form-select custom-h"
                                    aria-label="Default select example"
                                    v-model="selectCategory"
                                    @blur="validCategoryData"
                                  >
                                    <option disabled>Categoria</option>
                                    <option
                                      v-for="(data, index) in CategoryData"
                                      :key="index"
                                      :value="data"
                                    >
                                      {{ data.name }}
                                    </option>
                                  </select>
                                  <span
                                    v-if="selectCategoryWarn"
                                    class="warning"
                                    >*Categoria é obrigatório</span
                                  >
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <label
                                    class="form-label"
                                    >Ano</label
                                  >
                                  <select
                                    :class="
                                      selectYearWarn ? 'warning-border' : ''
                                    "
                                    class="form-select custom-h"
                                    aria-label="Default select example"
                                    v-model="bikeYear"
                                    @blur="validYearData"
                                  >
                                    <option disabled>Ano</option>
                                    <option
                                      v-for="(data, index) in BikeYearData"
                                      :key="index"
                                      :value="data"
                                    >
                                      {{ data.year }}
                                    </option>
                                  </select>
                                  <span v-if="selectYearWarn" class="warning"
                                    >*Ano é obrigatório</span
                                  >
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <label
                                    class="form-label"
                                    >Marca</label
                                  >
                                  <select
                                    :class="
                                      selectBrandWarn ? 'warning-border' : ''
                                    "
                                    class="form-select custom-h"
                                    aria-label="Default select example"
                                    v-model="selectBrand"
                                    @blur="validBrandData"
                                  >
                                    <option disabled>Marca</option>
                                    <option
                                      v-for="(data, index) in BrandData"
                                      :key="index"
                                      :value="data"
                                    >
                                      {{ data.name }}
                                    </option>
                                  </select>
                                  <span v-if="selectBrandWarn" class="warning"
                                    >*Marca é obrigatório</span
                                  >
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <div class="d-flex justify-content-between">
                                    <label
                                      class="form-label"
                                      >Modelo</label
                                    >
                                  </div>
                                  <div class="icon-right">
                                    <input
                                      :class="modelWarn ? 'warning-border' : ''"
                                      type="text"
                                      class="form-control custom-h"
                                      placeholder="Modelo"
                                      @blur="validModelData"
                                      v-model="bikeModel"
                                    />
                                    <span v-if="modelWarn" class="warning"
                                      >*Modelo é obrigatório</span
                                    >
                                  </div>
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <label
                                    class="form-label"
                                    >Côr Principal</label
                                  >
                                  <select
                                    :class="
                                      selectPrimaryColorWarn
                                        ? 'warning-border'
                                        : ''
                                    "
                                    class="form-select custom-h"
                                    aria-label="Default select example"
                                    v-model="selectPrimaryColor"
                                    @blur="validPrimaryColorData"
                                  >
                                    <option disabled>Côr Principal</option>
                                    <option
                                      v-for="(data, index) in ColorData"
                                      :key="index"
                                      :value="data"
                                    >
                                      {{ data.name }}
                                    </option>
                                  </select>
                                  <span
                                    v-if="selectPrimaryColorWarn"
                                    class="warning"
                                    >*Côr Principal é obrigatório</span
                                  >
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <label
                                    class="form-label"
                                    >Côr Secundária</label
                                  >
                                  <select
                                    class="form-select custom-h"
                                    aria-label="Default select example"
                                    v-model="selectSecondColor"
                                  >
                                    <option disabled>Côr Secundária</option>
                                    <option
                                      v-for="(data, index) in ColorData"
                                      :key="index"
                                      :value="data"
                                    >
                                      {{ data.name }}
                                    </option>
                                  </select>
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <label
                                    class="form-label"
                                    >Tamanho de roda</label
                                  >
                                  <select
                                    :class="
                                      selectWheelSizeWarn
                                        ? 'warning-border'
                                        : ''
                                    "
                                    class="form-select custom-h"
                                    aria-label="Default select example"
                                    v-model="wheelSize"
                                    @blur="validWheelSizeData"
                                  >
                                    <option disabled>Tamanho de roda</option>
                                    <option
                                      v-for="(data, index) in WheelSizeData"
                                      :key="index"
                                      :value="data"
                                    >
                                      {{ data.size }}
                                    </option>
                                  </select>
                                  <span
                                    v-if="selectWheelSizeWarn"
                                    class="warning"
                                    >*Tamanho de roda é obrigatório</span
                                  >
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <label
                                    class="form-label"
                                    >Materiais</label
                                  >
                                  <select
                                    :class="
                                      selectMaterialsWarn
                                        ? 'warning-border'
                                        : ''
                                    "
                                    class="form-select custom-h"
                                    aria-label="Default select example"
                                    v-model="selectMaterial"
                                    @blur="validMaterialsData"
                                  >
                                    <option disabled>Materiais</option>
                                    <option
                                      v-for="(data, index) in MaterialsData"
                                      :key="index"
                                      :value="data"
                                    >
                                      {{ data.name }}
                                    </option>
                                  </select>
                                  <span
                                    v-if="selectMaterialsWarn"
                                    class="warning"
                                    >*Materiais é obrigatório</span
                                  >
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <label
                                    class="form-label"
                                    >Tipo de Suspensão</label
                                  >
                                  <select
                                    :class="
                                      selectSuspensionWarn
                                        ? 'warning-border'
                                        : ''
                                    "
                                    class="form-select custom-h"
                                    aria-label="Default select example"
                                    v-model="selectSuspension"
                                    @blur="validSuspensionData"
                                  >
                                    <option disabled>Tipo de Suspensão</option>
                                    <option
                                      v-for="(data, index) in SuspensionData"
                                      :key="index"
                                      :value="data"
                                    >
                                      {{ data.type }}
                                    </option>
                                  </select>
                                  <span
                                    v-if="selectSuspensionWarn"
                                    class="warning"
                                    >*Tipo de Suspensão é obrigatório</span
                                  >
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <label
                                    class="form-label"
                                    >Número de Série (Podem ser vários)</label
                                  >
                                  <div class="icon-right">
                                    <input
                                      type="text"
                                      class="form-control custom-h"
                                      placeholder="Número de Série (Podem ser vários)"
                                      v-model="bikeSerialNum"
                                      :class="
                                        selectBikeSerialWarn
                                          ? 'warning-border'
                                          : ''
                                      "
                                      @blur="validBikeSerial"
                                    />
                                    <span
                                      v-if="selectBikeSerialWarn"
                                      class="warning"
                                      >*Número de Série (Podem ser vários) é obrigatório</span
                                    >
                                  </div>
                                </div>

                                <div class="mb-3 col-12 col-md-6">
                                  <label
                                    class="form-label"
                                    >Informação Adicional</label
                                  >
                                  <div class="icon-right">
                                    <input
                                      type="text"
                                      class="form-control custom-h"
                                      placeholder="Informação Adicional"
                                      v-model="otherInformation"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div class="button-row d-flex mt-2">
                                <div
                                  class="theme-btn universal-btn js-btn-next"
                                  id="button-3"
                                >
                                  <div id="circle"></div>
                                  <button
                                    class="js-btn-next"
                                    type="button"
                                    @click="handleStep2(true)"
                                  >
                                    Próximo Passo <i class="fal fa-arrow-right"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!--single form panel-->
                          <div
                            :class="
                              step2
                                ? 'multisteps-form__panel shadow p-4 rounded bg-white js-active'
                                : 'multisteps-form__panel shadow rounded bg-white'" data-animation="scaleIn">
                            <div class="row">
                              <div class="col-12 col-md-6 custom-left">
                                <h5 class="them-subtitle">Carregar Fotografias</h5>
                              </div>
                            </div>
                            <!-- upload Photo-->
                            <div class="col row">
                              <div class="col-lg-4">
                                <div class="photo-block">
                                  <div class="img-heading">Fotografia da Bicicleta</div>
                                  <div class="photo-frame" v-if="url">
                                    <div class="circle">
                                      <div v-if="bikeLoading">
                                        <img src="~assets/images/spinner.gif" />
                                      </div>
                                      <img
                                        v-else
                                        class="profile-pic"
                                        :src="
                                          url.formats && url.formats.medium
                                            ? __getBaseUrl +
                                              url.formats.medium.url
                                            : __getBaseUrl + url.url
                                        "
                                      />
                                    </div>
                                    <div
                                      class="
                                        edit-image
                                        d-flex
                                        justify-content-between
                                      "
                                    >
                                      <div>
                                        <div class="p-image">
                                          <div
                                            class="
                                              select-photo
                                              edit-select-photo
                                              bg-transparent
                                            "
                                          >
                                            <i
                                              class="fal fa-edit upload-button"
                                            ></i>
                                            <input
                                              type="file"
                                              accept="image/*"
                                              @change="onFileChange($event)"
                                            />
                                            <span class="upload-button"
                                              >Alterar Imagem</span
                                            >
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

                                    <div class="add-photo-icon">
                                      <i class="fal fa-plus-circle"></i>
                                      <p>Adicionar foto</p>
                                    </div>
                                  </div>
                                </div>
                                <span v-if="bikeImgWarn" class="warning"
                                  >*A foto da bicicleta é necessária</span
                                ><br v-if="bikeCheckWarn && bikeImgWarn">
                                <span v-if="bikeCheckWarn" class="warning">*Formato de imagem inválido</span>
                              </div>
                              <div class="col-lg-4">
                                <div class="photo-block">
                                  <div class="img-heading">
                                    Fotografia do Número de Série
                                  </div>
                                  <div
                                    class="photo-frame"
                                    v-if="serialPhotoUrl"
                                  >
                                    <div class="circle">
                                      <div v-if="serialLoading">
                                        <img src="~assets/images/spinner.gif" />
                                      </div>
                                      <img
                                        v-else
                                        class="profile-pic"
                                        :src="
                                          serialPhotoUrl.formats &&
                                          serialPhotoUrl.formats.medium
                                            ? __getBaseUrl +
                                              serialPhotoUrl.formats.medium.url
                                            : __getBaseUrl + serialPhotoUrl.url
                                        "
                                      />
                                    </div>
                                    <div
                                      class="
                                        edit-image
                                        d-flex
                                        justify-content-between
                                      "
                                    >
                                      <div>
                                        <div class="p-image">
                                          <div
                                            class="
                                              select-photo
                                              edit-select-photo
                                              bg-transparent
                                            "
                                          >
                                            <i
                                              class="fal fa-edit upload-button"
                                            ></i>
                                            <input
                                              type="file"
                                              accept="image/*"
                                              @change="
                                                onSerialFileChange($event)
                                              "
                                            />
                                            <span class="upload-button"
                                              >Alterar Imagem</span
                                            >
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
                                    <input
                                      type="file"
                                      accept="image/*"
                                      @change="onSerialFileChange"
                                    />

                                    <div class="add-photo-icon">
                                      <i class="fal fa-plus-circle"></i>
                                      <p>Adicionar foto</p>
                                    </div>
                                  </div>
                                </div>
                                <span v-if="serialImgWarn" class="warning"
                                  >*A foto do número de série é obrigatória</span
                                ><br v-if="serialCheckWarn && serialImgWarn">
                                <span v-if="serialCheckWarn" class="warning">*Formato de imagem inválido</span>
                              </div>
                              <div class="col-lg-4">
                                <div class="photo-block">
                                  <div class="img-heading">Fotografia da Fatura</div>
                                  <div class="photo-frame" v-if="invoiceUrl">
                                    <div class="circle">
                                      <div v-if="invoiceLoading">
                                        <img src="~assets/images/spinner.gif" />
                                      </div>
                                      <img
                                        v-else
                                        class="profile-pic"
                                        :src="
                                          invoiceUrl.formats &&
                                          invoiceUrl.formats.medium
                                            ? __getBaseUrl +
                                              invoiceUrl.formats.medium.url
                                            : __getBaseUrl + invoiceUrl.url
                                        "
                                      />
                                    </div>
                                    <div
                                      class="
                                        edit-image
                                        d-flex
                                        justify-content-between
                                      "
                                    >
                                      <div>
                                        <div class="p-image">
                                          <div
                                            class="
                                              select-photo
                                              edit-select-photo
                                              bg-transparent
                                            "
                                          >
                                            <i
                                              class="fal fa-edit upload-button"
                                            ></i>
                                            <input
                                              type="file"
                                              accept="image/*"
                                              @change="
                                                onInvoiceFileChange($event)
                                              "
                                            />
                                            <span class="upload-button"
                                              >Alterar Imagem</span
                                            >
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
                                    <input
                                      type="file"
                                      accept="image/*"
                                      @change="onInvoiceFileChange"
                                    />

                                    <div class="add-photo-icon">
                                      <i class="fal fa-plus-circle"></i>
                                      <p>Adicionar foto</p>
                                    </div>
                                  </div>
                                </div>
                                <span v-if="invoiceImgWarn" class="warning"
                                  >*A foto da fatura é obrigatória</span>
                                  <br v-if="invoiceCheckWarn && invoiceImgWarn">
                                  <span v-if="invoiceCheckWarn" class="warning">*Formato de imagem inválido</span>
                              </div>
                            </div>
                            <div></div>
                            <div class="button-row d-flex mt-4">
                              <div
                                class="theme-btn universal-btn me-3"
                                id="button-3"
                              >
                                <div id="circle"></div>
                                <button
                                  type="button"
                                  class="js-btn-prev"
                                  @click="handleStep2(false), (form2 = true)"
                                >
                                  <i class="fal fa-arrow-left"></i> Anterior
                                </button>
                              </div>

                              <div
                                class="theme-btn universal-btn"
                                id="button-3"
                              >
                                <div id="circle"></div>
                                <button type="button" @click="submitData">
                                  Submeter <i class="fal fa-arrow-right"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <!--single form panel-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../../services'
import { mapGetters } from 'vuex'
export default {
  props: ['testData'],
  data() {
    return {
      nickName: '',
      nickNameWarn: false,
      selectCategoryWarn: false,
      selectCategory: 'Categoria',
      CategoryData: [],
      selectYearWarn: false,
      bikeYear: 'Ano',
      BikeYearData: [],
      years: [],
      WheelSizeData: [],
      wheelSort: [],
      wheelSize: 'Tamanho de roda',
      selectWheelSizeWarn: false,
      selectMaterialsWarn: false,
      selectMaterial: 'Materiais',
      MaterialsData: [],
      materialSort: [],
      selectSuspensionWarn: false,
      selectSuspension: 'Tipo de Suspensão',
      SuspensionData: [],
      bikeCheckWarn: false,
      serialCheckWarn: false,
      invoiceCheckWarn: false,
      serialImgWarn: false,
      bikeImgWarn: false,
      invoiceImgWarn: false,
      getBikeData: [],
      registerData: {},
      step1: true,
      step2: false,
      form2: false,
      BrandData: [],
      brandsSort: [],
      ColorData: [],
      colorSort: [],
      bikeModel: '',
      selectBrand: 'Marca',
      bikeSerialNum: '',
      otherInformation: '',
      selectPrimaryColor: 'Côr Principal',
      selectSecondColor: 'Côr Secundária',
      url: '',
      serialPhotoUrl: '',
      invoiceUrl: '',
      selectBikeBrandData: [],
      selectBikePColor: [],
      selectBikeSColor: [],
      selectBrandWarn: false,
      modelWarn: false,
      selectBikeSerialWarn: false,
      selectPrimaryColorWarn: false,
      selectSecondColorWarn: false,
      selectbrakeBrandWarn: false,
      selectBrakeModelWarn: false,
      imagePath: '',
      selectMaterialData: [],
      selectSuspensionData: [],
      bikeLoading: false,
      serialLoading: false,
      invoiceLoading: false,
      userData: {},
      date: new Date(),
      ciclaNumber: ''
    }
  },
  computed: {
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl',
    }),
  },
  watch: {
    selectBrand(val) {
      this.selectBikeBrandData.push(val)
    },
    selectMaterial(val) {
      this.selectMaterialData.push(val)
    },
    selectSuspension(val) {
      this.selectSuspensionData.push(val)
    },
  },
  methods: {
    generateCicla() {
        var length = 9,
            charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        this.ciclaNumber = retVal;
    },
    backTo() {
      this.$router.go(-1)
    },
    validNickName() {
      if(this.nickName === '') {
        this.nickNameWarn = true
      } else {
        this.nickNameWarn = false
      }
    },
    validCategoryData() {
      if (this.selectCategory instanceof Object) {
        this.selectCategoryWarn = false
      } else {
        this.selectCategoryWarn = true
      }
    },
    validMaterialsData() {
      if (this.selectMaterial instanceof Object) {
        this.selectMaterialsWarn = false
      } else {
        this.selectMaterialsWarn = true
      }
    },
    validSuspensionData() {
      if (this.selectSuspension instanceof Object) {
        this.selectSuspensionWarn = false
      } else {
        this.selectSuspensionWarn = true
      }
    },
    validBrandData() {
      if (this.selectBrand instanceof Object) {
        this.selectBrandWarn = false
      } else {
        this.selectBrandWarn = true
      }
    },
    validModelData() {
      if (this.bikeModel) {
        this.modelWarn = false
      } else {
        this.modelWarn = true
      }
    },
    validYearData() {
      if (this.bikeYear instanceof Object) {
        this.selectYearWarn = false
      } else {
        this.selectYearWarn = true
      }
    },
    validBikeSerial() {
      if (this.bikeSerialNum) {
        this.selectBikeSerialWarn = false
      } else {
        this.selectBikeSerialWarn = true
      }
    },
    validWheelSizeData() {
      if (this.wheelSize instanceof Object) {
        this.selectWheelSizeWarn = false
      } else {
        this.selectWheelSizeWarn = true
      }
    },
    validPrimaryColorData() {
      if (this.selectPrimaryColor instanceof Object) {
        this.selectPrimaryColorWarn = false
      } else {
        this.selectPrimaryColorWarn = true
      }
    },
    async handleStep2(val) {
      this.generateCicla()
      if (val === true) {
        if (
          this.nickName &&
          this.selectBrand instanceof Object &&
          this.bikeModel &&
          this.bikeYear instanceof Object &&
          this.bikeSerialNum &&
          this.selectMaterial instanceof Object &&
          this.selectSuspension instanceof Object &&
          this.selectCategory instanceof Object &&
          this.selectPrimaryColor instanceof Object &&
          this.wheelSize instanceof Object &&
          this.ciclaNumber
        ) {
          const InputData = {
            nickName: this.nickName,
            slug: this.nickName.replace(/\s/g,'').toLowerCase()+this.date.getTime(),
            model: this.bikeModel,
            year: this.bikeYear,
            serial_number: this.bikeSerialNum,
            brands: this.selectBikeBrandData,
            color: this.selectPrimaryColor,
            status: false,
            secondary_colors: this.selectSecondColor === 'Côr Secundária' ? this.selectSecondColor = '' : this.selectSecondColor,
            category: this.selectCategory,
            materials: this.selectMaterialData,
            wheel_size: this.wheelSize,
            suspension_types: this.selectSuspensionData,
            other_information: this.otherInformation,
            user: this.userData,
            cicla_number: this.ciclaNumber,
            latitude: this.userData.address_coordinates.latitude,
            longitude: this.userData.address_coordinates.longitude
          }
          if (this.$route.params.id || this.getBikeData.id) {
            const id = this.$route.params.id
              ? this.$route.params.id
              : this.getBikeData.id
            await api.product.bikeUpdateService(id, InputData)
          } else {
            this.registerData = await api.product.bikeRegisterService(InputData)
          }
          this.step2 = val
          this.form2 = val
          this.step1 = false
        } else {
          this.validNickName()
          this.validBikeSerial()
          this.validYearData()
          this.validModelData()
          this.validBrandData()
          this.validPrimaryColorData()
          this.validWheelSizeData()
          this.validSuspensionData()
          this.validMaterialsData()
          this.validCategoryData()
        }
      } else {
        this.step2 = val
        this.form2 = val
        this.step1 = true
      }
    },
    async submitData() {
      const bikeId =
        this.registerData && this.registerData.data
          ? this.registerData.data.id
          : this.getBikeData.id
      if (this.url && this.serialPhotoUrl && this.invoiceUrl) {
        const InputData = {
          bike_photo: this.url,
          serial_number_photo: this.serialPhotoUrl,
          invoice_photo: this.invoiceUrl
        }
        const data = await api.product.bikeUpdateService(bikeId, InputData)
        this.$toasted.show('Nova bicicleta foi enviada!', {
          position: 'top-center',
          duration: 3000
        })
        const history = {
          information: {
            text: 'A bicicleta foi registada com sucesso!'
          },
          type: 'bike',
          user: this.userData,
          bikes: bikeId
        }
        await api.product.addToHistory(history)
        this.$router.push('/my-account#minha_bicicleta')
      } else if (
        this.url === '' ||
        this.serialPhotoUrl === '' ||
        this.invoiceUrl === ''
      ) {
        this.validBikeChange()
        this.validSerialChange()
        this.validInvoiceChange()
      }
    },
    async onFileChange(e) {
      const checkFile = e.target.files[0]
      const checkType = checkFile.type.split('/').pop().toLowerCase();
      if (checkType == "gif" || checkType == "png" || checkType == "bmp" || checkType == "jpeg" || checkType == "jpg") {
        this.bikeCheckWarn = false
        this.bikeLoading = true
        let formData = new FormData()
        formData.append('files', e.target.files[0])
        const imgData = await api.product.UploadImageService(formData)
        this.url = imgData.data[0]
        this.bikeLoading = false
      } else {
        this.bikeCheckWarn = true
      }
    },
    async onSerialFileChange(e) {
      const checkFile = e.target.files[0]
      const checkType = checkFile.type.split('/').pop().toLowerCase();
      if (checkType == "gif" || checkType == "png" || checkType == "bmp" || checkType == "jpeg" || checkType == "jpg") {
        this.serialCheckWarn = false
        this.serialLoading = true
        let formData = new FormData()
        formData.append('files', e.target.files[0])
        const imgData = await api.product.UploadImageService(formData)
        this.serialPhotoUrl = imgData.data[0]
        this.serialLoading = false
      } else {
        this.serialCheckWarn = true
      }
    },
    validBikeChange() {
      if (this.url) {
        this.bikeImgWarn = false
      } else {
        this.bikeImgWarn = true
      }
    },
    validSerialChange() {
      if (this.serialPhotoUrl) {
        this.serialImgWarn = false
      } else {
        this.serialImgWarn = true
      }
    },
    validInvoiceChange() {
      if (this.invoiceUrl) {
        this.invoiceImgWarn = false
      } else {
        this.invoiceImgWarn = true
      }
    },
    async onInvoiceFileChange(e) {
      const checkFile = e.target.files[0]
      const checkType = checkFile.type.split('/').pop().toLowerCase();
      if (checkType == "gif" || checkType == "png" || checkType == "bmp" || checkType == "jpeg" || checkType == "jpg") {
        this.invoiceCheckWarn = false
        this.invoiceLoading = true
        let formData = new FormData()
        formData.append('files', e.target.files[0])
        const imgData = await api.product.UploadImageService(formData)
        this.invoiceUrl = imgData.data[0]
        this.invoiceLoading = false
      } else {
        this.invoiceCheckWarn = true
      }
    },
    removeImageBtn() {
      this.url = ''
    },
    removeSerialImageBtn() {
      this.serialPhotoUrl = ''
    },
    removeInvoiceImageBtn() {
      this.invoiceUrl = ''
    },
  },
  async fetch() {
    const userDetail = await api.product.userDetail()
    this.userData = userDetail.data
    this.CategoryData = await api.product.blogService('categories')
    this.years = await api.product.blogService('years')
    this.BikeYearData = this.years.sort((a,b) => { return b.year - a.year })
    this.brandsSort = await api.product.blogService('brands')
    this.BrandData = this.brandsSort.sort((a,b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
      }
      else if(a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
    this.colorSort = await api.product.blogService('colors')
    this.ColorData = this.colorSort.sort((a,b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
      }
      else if(a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
    this.WheelSizeData = await api.product.wheelSizes()
    this.materialSort = await api.product.blogService('materials')
    this.MaterialsData = this.materialSort.sort((a,b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
      }
      else if(a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
    this.SuspensionData = await api.product.blogService('suspension-types')
    const BikeData = await api.product.getRegisterBikeService()
    if (BikeData.length > 0) {
      BikeData.filter((data) => {
        if (data.model && data.invoice_photo) {
          this.step1 = true
          this.step2 = false
        } else {
          this.getBikeData = data
          this.step2 = true
          this.form2 = true
          this.step1 = false
          this.bikeModel = data.model
          this.selectCategory = data.category
          this.bikeYear = data.year
          this.nickName = data.nickName
          this.otherInformation = data.other_information
          this.wheelSize = data.wheel_size
          this.bikeSerialNum = data.serial_number
          this.BrandData.forEach((bData) => {
            data.brands.filter((brandData) => {
              if (bData.id === brandData.id) {
                this.selectBrand = bData
              }
            })
          })
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
        }
      })
    }
  }
}
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
.img-heading {
  color: #000;
  margin-bottom: 10px;
}

$them-color: #fd5044;
$them-color-yellow: #f2ad49;
$them-color-dark: #1b1b1b;

.photo-block .select-photo.edit-select-photo {
  height: auto !important;
  cursor: pointer;
}
.warning {
  color: red;
  font-size: 12px;
  float: left;
}
.multisteps-form {
  border-radius: 6px;
  overflow: hidden;
  .p-image span.upload-button {
    color: #000;
  }
  .form-field-separator-gray {
    background: #f7f7f7;
    padding: 15px;
  }
  .form-field-separator {
    padding: 15px;
  }

  textarea:focus {
    border: 1px solid $them-color;
    box-shadow: none !important;
  }
  .multisteps-form__progress {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    background: #fff;
    overflow: hidden;

    button.multisteps-form__progress-btn {
      .js-active .tabs-text {
        background: #fd5044;
        color: #fff;
        clip-path: polygon(0% 0%, 100% 0%, 91% 101%, 0% 100%);
        cursor: inherit !important;
      }
    }
  }
}

.multisteps-form__panel[data-animation='scaleOut'] {
  transform: scale(1.1);
}
.multisteps-form__panel[data-animation='scaleOut'].js-active {
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  transition-delay: 0s;
  transform: scale(1);
}
.multisteps-form__panel[data-animation='slideHorz'] {
  left: 50px;
}
.multisteps-form__panel[data-animation='slideHorz'].js-active {
  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: cubic-bezier(0.2, 1.13, 0.38, 1.43);
  transition-delay: 0s;
  left: 0;
}
.multisteps-form__panel[data-animation='slideVert'] {
  top: 30px;
}
.multisteps-form__panel[data-animation='slideVert'].js-active {
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  transition-delay: 0s;
  top: 0;
}
.multisteps-form__panel[data-animation='fadeIn'].js-active {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: linear;
  transition-delay: 0s;
}
.multisteps-form__panel[data-animation='scaleIn'] {
  transform: scale(0.9);
}
.multisteps-form__panel[data-animation='scaleIn'].js-active {
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  transition-delay: 0s;
  transform: scale(1);
}

.multisteps-form__progress-btn {
  transition-property: all;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  transition-delay: 0s;
  position: relative;
  padding: 20px 0;
  color: #282828;
  border: none;
  background-color: transparent;
  outline: none !important;
  cursor: pointer;
  font-size: 20px;
  &:before {
    content: '';
  }
  &:after {
    position: absolute;
    content: '';
    z-index: 1;
  }
  &:first-child {
    &:after {
      display: none;
    }
  }
}
.multisteps-form__progress-btn.js-active {
  background: #fd5044;
  color: #fff;
  clip-path: polygon(0% 0%, 100% 0%, 91% 101%, 0% 100%);

  &:before {
    transform: translateX(-50%) scale(1.2);
    background-color: currentColor;
  }
}

.multisteps-form__progress {
  button.multisteps-form__progress-btn.js-active:nth-child(2) {
    clip-path: polygon(8% 1%, 100% 2%, 91% 101%, 0% 100%);
    margin-left: -35px;
  }
  button.multisteps-form__progress-btn.js-active:last-child {
    clip-path: polygon(9% -1%, 100% 0%, 100% 101%, 0% 100%);
    margin-left: -38px;
  }

  span.tab-number {
    width: 35px;
    height: 35px;
    background: #fed0c8;
    padding: 5px 12px;
    border-radius: 100px;
    margin-right: 10px;
    display: inline-block;
    font-size: 17px;
    color: #494949;
  }
}

.bike-add-form {
  label.form-check-label {
    font-size: 14px;
    color: #000;
  }
  label.form-label {
    float: left;
    color: #545454;
    margin-bottom: 4px;
    font-size: 15px;
    text-align: left;
  }

  .icon-right.left {
    position: relative;
  }

  .icon-right.left span.left-icon {
    position: absolute;
    right: 20px;
    top: 13px;
  }

  .icon-right {
    position: relative;
    float: left;
    width: 100%;
    .input-tooltip i {
      position: absolute;
      right: 10px;
      top: 17px;
    }
  }
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

.group_organization .photo-frame {
  width: 100%;
  height: 340px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  label {
    color: #212529;
    font-size: 14px;
  }
  .edit-image {
    background: rgba(255, 255, 255, 0.9);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 8px;
    .edit-image i {
      color: #fd5044;
    }
  }
}

.multisteps-form__form {
  position: relative;
  .js-active {
    height: auto;
    opacity: 1;
    visibility: visible;
  }
}
.multisteps-form__panel {
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  opacity: 0;
  visibility: hidden;
  .custom-left {
    text-align: left;
    h5 {
      font-size: 16px !important;
      font-weight: 400px !important;
      color: #242323 !important;
      margin-bottom: 0 !important;
      line-height: 30px !important;
    }
    p {
      font-size: 15px !important;
      font-weight: 400 !important;
      color: #242323 !important;
      line-height: 30px !important;
      margin-bottom: 0;
    }
  }
  ul {
    padding-left: 0;
  }
}
.photo-block .select-photo {
  background: #f0f0f0;
  position: relative !important;
  cursor: pointer;
  height: 300px;
  &:hover i {
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
    top: 23%;
    right: 0;
    left: 0;
    font-size: 73px;
  }
}

@media (min-width: 500px) {
  .multisteps-form__progress-btn {
    text-indent: 0;
  }
}
.register-bike .custom-h {
  height: 52px;
}

.register-bike .custom-h:focus {
  border-color: #fd5044 !important;
  outline: 0;
  -webkit-box-shadow: inherit !important;
  box-shadow: inherit !important;
}
@media (max-width: 992px) {
  .multisteps-form__progress-btn {
    font-size: 16px !important;
  }
}

@media (max-width: 767px) {
  ul.d-flex.justify-content-between.custom-left.mob-block {
    display: block !important;
  }
  .photo-block .select-photo[data-v-ceeeb438] {
    height: 270px;
  }

  .universal-btn#button-3 button {
    padding: 13px 17px;
  }

  .multisteps-form .multisteps-form__progress {
    display: grid;
    grid-template-columns: none;
    background: #fff;
    overflow: hidden;
  }
  .multisteps-form__progress-btn {
    clip-path: none !important;
    text-align: left;
    padding-left: 28px !important;
  }
  .multisteps-form__progress-btn.js-active {
    clip-path: none !important;
    text-align: left;
    padding-left: 28px !important;
  }
  .multisteps-form__progress
    button.multisteps-form__progress-btn.js-active:nth-child(2) {
    margin-left: 0;
    margin-top: 10px;
  }
  .multisteps-form__progress
    button.multisteps-form__progress-btn.js-active:last-child {
    margin-left: 0;
    margin-top: 10px;
  }
  ul.custom-left li {
    display: block !important;
    width: 100% !important;
  }
}
</style>

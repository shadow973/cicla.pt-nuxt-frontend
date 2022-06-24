<template>
  <div>
    <div class="admin-tab-content">
      <div class="section-title pb-4">
        <h4 class="them-title-black mb-0">
          FAÇA ESTAS COISAS PARA A MELHOR OPORTUNIDADE DE RECUPERAÇÃO!
        </h4>
      </div>
      <ul class="check-list">
        <li>
          <div class="stolen-check-box">✓</div>
          <div class="delete-line">Listar a bicicleta em Cicla</div>
        </li>
        <li>
          <div class="stolen-check-box-null"></div>
          <div>
            Reportar o furto na Cicla,
            <a href="javascript:void(0)" class="stolen-check-box-link"
              >incluindo a localização onde ocorreu</a
            >
          </div>
        </li>
        <li>
          <div class="stolen-check-box">✓</div>
          <!--div class="delete-line"-->
              <a href="javascript:void(0)" class="stolen-check-box-link"
              >Adicionar uma fotografia atualizada da tua bicicleta</a
            >
          <!--/div-->
        </li>
        <li>
          <div class="stolen-check-box-null"></div>
          <div>
            Adicionar
            <a href="javascript:void(0)" class="stolen-check-box-link"
              >o número do processo </a
            >de furto na Polícia
          </div>
          <br />
        </li>
        <!--li class="ps-5">
          <div class="stolen-check-box-null"></div>
          <div>
            Enviar informação para
            <a href="javascript:void(0)" class="stolen-check-box-link">
              LEADSonline </a
            >(a Cicla faz isso quando insere o número do processo da Polícia)
          </div>
        </li>
        <li class="ps-5">
          <div class="stolen-check-box-null"></div>
          <div>Enviar informação para as bases de dados políciais</div>
        </li>
        <li>
          <div class="stolen-check-box-null"></div>
          <div>
            (a Cicla faz isso quando insere o número do processo da Polícia)
          </div>
        </li-->
        <li>
          <div class="stolen-check-box-null"></div>
          <div>
            <a href="javascript:void(0)" class="stolen-check-box-link"
              >Partilhar no Twitter e Facebook (A Cicla irá partilhar assim que o processo
              seja validado)
            </a>
          </div>
        </li>
        <!--li>
          <div class="stolen-check-box-null"></div>
          <div>
            Partilhar nas suas Redes Sociais
            <a href="javascript:void(0)" class="stolen-check-box-link">
              (Facebook, Instagram, etc)
            </a>
          </div>
        </li-->

        <!--li>
          <div class="stolen-check-box-null"></div>
          <div>
            Acelerar a partilha no Facebook com os Alertas Promovidos de
            Bicicletas Furtadas Cicla
          </div>
        </li-->
      </ul>
    </div>

    <div class="admin-tab-content">
      <div class="section-title">
        <div class="row">
          <div class="col-md-6">
            <h4 class="them-title-black mb-0 mt-2">DETALHES DO ROUBO</h4>
          </div>
          <div class="col-md-6 text-end">
            <div
              v-if="__getStolenState"
              class="text-end theme-btn bg-green universal-btn"
              id="button-3"
            >
              <div id="circle"></div>
              <button @click="recoverBike"><i class="fal fa-redo-alt pe-2"></i>Marcar recuperada</button>
            </div>
          </div>
        </div>
      </div>
      <form v-if="!__getStolenState" @keypress.enter.prevent @submit.prevent="submitData" class="row pt-3">
        <div class="col-md-12 col-12 mb-3">
        <div class="parent-date">
          <label class="form-label">Quando foi furtada</label>
          <!-- <date-picker
            v-model="dateTime"
            :lang="lang"
            type="datetime"
            placeholder="Selecione Data Hora"
            value-type="format"
            format="DD/MM/YYYY H:mm"
            :class="dateTimeWarn ? 'warning-border rounded date-time-picker' : 'date-time-picker'"
          ></date-picker> -->
          <input
            v-model="dateTime"
            type="datetime-local"
            placeholder="Selecione Data Hora"
            :class="dateTimeWarn ? 'warning-border form-control' : 'form-control'"
          />
          <span v-if="dateTimeWarn" class="warning">*Quando foi furtada</span>
        </div>
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Contacto Telefónico</label>
          <input
            type="text"
            v-model="number"
            @blur="checkNumber"
            :class="numberWarn ? 'warning-border form-control' : 'form-control'"
            placeholder="Contacto Telefónico"
          />
          <span v-if="numberWarn" class="warning">*Contacto Telefónico</span>
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Contacto Telefónico Alternativo</label>
          <input
            type="text"
            v-model="secondNumber"
            class="form-control"
            placeholder="Contacto Telefónico Alternativo"
          />
        </div>
        <div class="col-md-12 mb-2">
          <label for="" style="font-size: 15px; color: #242323"
            >Onde foi roubada?</label
          >
        </div>
        <div class="col-md-6 col-12 col-md-12 mb-3">
          <google-autocomplete
            id="map"
            v-model="address"
            @change="setAddress"
            classname="form-control"
            placeholder="Morada aproximada do local"
            country="pt"
            v-on:placechanged="getAddressData"
            v-on:no-results-found="checkValue"
          >
          </google-autocomplete>
        </div>
        <div class="col-md-6 col-12 mb-3">
          <input
            type="text"
            v-model="city"
            @blur="checkCity"
            :class="cityWarn ? 'warning-border form-control' : 'form-control'"
            placeholder="Localidade"
          />
          <span v-if="cityWarn" class="warning">*Localidade</span>
        </div>
        <div class="col-md-6 col-12 mb-3">
          <input
            type="text"
            v-model="postal"
            @blur="checkPostal"
            :class="postalWarn ? 'warning-border form-control' : 'form-control'"
            placeholder="Código Postal"
          />
          <span v-if="postalWarn" class="warning">*Código Postal</span>
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Valor Estimado</label>
          <div class="input-group">
            <span class="input-group-text dollor">€</span>
            <input
              type="number"
              v-model="estimated"
              @blur="checkEstimated"
              :class="
                estimatedWarn
                  ? 'warning-border form-control custom-dollor-input'
                  : 'form-control custom-dollor-input'
              "
              aria-label="Amount (to the nearest dollar)"
            />
          </div>
          <p v-if="estimatedWarn" class="warning">*Valor Estimado</p>
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Tipo de Cadeado</label>
          <select
            v-model="lockDescription"
            @blur="checkLockDescription"
            :class="
              lockDescriptionWarn ? 'warning-border form-select' : 'form-select'
            "
            aria-label="Default select example"
          >
            <option
              :value="data.title"
              v-for="data in lockDescriptionData"
              :key="data.id"
            >
              {{ data.title }}
            </option>
          </select>
          <span v-if="lockDescriptionWarn" class="warning"
            >*Tipo de Cadeado</span
          >
        </div>
        <div class="col-md-12 col-12 mb-3">
          <label class="form-label"
            >Descrição da forma como o cadeado foi derrotado</label
          >
          <select
            v-model="defeatDescription"
            class="form-select"
            aria-label="Default select example"
          >
            <option
              :value="data.title"
              v-for="data in defeatDescriptionData"
              :key="data.id"
            >
              {{ data.title }}
            </option>
          </select>
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Número da Participação na Polícia</label>
          <input type="text" v-model="policeReport" class="form-control" />
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Número CICLA</label>
          <input
            type="text"
            @blur="checkCiclaNumber"
            v-model="ciclaNumber"
            :class="ciclaNumberWarn ? 'warning-border form-control' : 'form-control'"
          />
          <span v-if="ciclaNumberWarn" class="warning">*O número Cicla é obrigatório</span>
        </div>
        <div class="col-md-12 mb-3">
          <label class="form-label">Descrição do Incidente</label>
          <textarea
            v-model="incidentDescription"
            @blur="checkIncident"
            :class="
              incidentWarn ? 'warning-border form-control' : 'form-control'
            "
            rows="4"
          ></textarea>
          <span v-if="incidentWarn" class="warning"
            >*Descrição do Incidente</span
          >
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Fotografias Recentes</label>
          <div class="photo-block">
            <div class="img-heading">Fotografia 1</div>
            <div class="photo-frame" v-if="recentImage1">
              <div class="circle d-grid">
                <div class="loader" v-if="bikeIsLoading">
                  <img src="~assets/images/spinner.gif" />
                </div>
                <img class="profile-pic" v-else :src="recentPhoto1 ? __getBaseUrl+recentPhoto1 : recentImage1" />
              </div>
              <div class="edit-image d-flex justify-content-between">
                <div>
                  <div class="p-image">
                    <div @click="removeImageBtn" class="select-photo edit-select-photo bg-transparent">
                      <i class="fal fa-trash-alt upload-button"></i>
                      <span class="upload-button">Remover bicicleta</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="photo-frame select-photo">
              <input type="file" accept="image/*" ref="file" @change="onChangeFileUpload($event, 'for_stolen')" />
              <div class="add-photo-icon text-center">
                <i class="fal fa-plus-circle"></i>
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
                    <div @click="removeSecondImageBtn" class="select-photo edit-select-photo bg-transparent">
                      <i class="fal fa-trash-alt upload-button"></i>
                      <span class="upload-button">Remover bicicleta</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="photo-frame select-photo">
              <input type="file" accept="image/*" ref="fileSecond" @change="onChangeFileUploadSecond($event, 'for_stolen')" />
              <div class="add-photo-icon text-center">
                <i class="fal fa-plus-circle"></i>
                <p>Adicionar foto</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault-5"
            />
            <label class="form-check-label" for="flexCheckDefault-5">
              Pretendo receber contactos da Cicla sobre esta bicicleta furtada
            </label>
          </div>
          <div id="reportHelp" class="form-text">
            Por ex se publicarmos nas redes sociais ou se alguém efetuar uma
            pesquisa pelo seu número de série
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <div class="theme-btn universal-btn" id="button-3">
            <div id="circle"></div>
            <button type="submit">
              <span><i class="fal fa-exchange"></i> Guardar</span>
            </button>
          </div>
        </div>
      </form>
      <form v-else class="row pt-3">
        <div class="col-md-12 mb-3">
          <label class="form-label">Quando foi furtada</label>
          <input
            type="text"
            disabled
            v-model="showDateTime"
            class="form-control"
          />
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Contacto Telefónico</label>
          <input
            type="text"
            v-model="number"
            disabled
            class="form-control"
          />
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Contacto Telefónico Alternativo</label>
          <input
            type="text"
            v-model="secondNumber"
            disabled
            class="form-control"
          />
        </div>
        <div class="col-md-12 mb-2">
          <label for="" style="font-size: 15px; color: #242323"
            >Onde foi roubada?</label
          >
        </div>
        <div class="col-md-6 col-12 col-md-12 mb-3" v-if="address">
          <input
            type="text"
            disabled
            v-model="address"
            class="form-control"
          />
        </div>
        <div class="col-md-6 col-12 mb-3">
          <input
            type="text"
            v-model="city"
            class="form-control"
            disabled
          />
        </div>
        <div class="col-md-6 col-12 mb-3">
          <input
            type="text"
            v-model="postal"
            class="form-control"
            disabled
          />
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Valor Estimado</label>
          <div class="input-group">
            <span class="input-group-text dollor">€</span>
            <input
              type="number"
              v-model="estimated"
              disabled
              class="form-control custom-dollor-input"
              aria-label="Amount (to the nearest dollar)"
            />
          </div>
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Tipo de Cadeado</label>
          <input
            v-model="lockDescription"
            class="form-control"
            disabled
            aria-label="Default select example"
          />
        </div>
        <div class="col-md-12 col-12 mb-3">
          <label class="form-label"
            >Descrição da forma em que o cadeado foi derrotado</label
          >
          <input
            v-model="defeatDescription"
            class="form-control"
            disabled
            aria-label="Default select example"
          />
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Número da Participação na Polícia</label>
          <input type="text" disabled v-model="policeReport" class="form-control" />
        </div>
        <div class="col-md-6 col-12 mb-3">
          <label class="form-label">Número CICLA</label>
          <input
            type="text"
            disabled
            v-model="ciclaNumber"
            class="form-control"
          />
        </div>
        <div class="col-md-12 mb-3">
          <label class="form-label">Descrição do Incidente</label>
          <textarea
            v-model="incidentDescription"
            class="form-control"
            disabled
            rows="4"
          ></textarea>
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
      </form>
    </div>

    <div v-if="__getStolenState" class="admin-tab-content">
      <div class="section-title pb-4">
        <h4 class="them-title-black mb-0">PARTILHAR NAS REDES SOCIAIS</h4>
      </div>
      <p>
        Partilha nas tuas redes sociais - Para que todos fiquem atentos à tua
        bicicleta!
      </p>
      <ul class="ps-0 row justify-content-around social-media">
        <li class="col-12 col-md-12">
          <ShareNetwork
            v-for="network in networks"
            :network="network.network"
            :key="network.network"
            :url="sharing.url"
            :title="sharing.title"
            :quote="sharing.quote+' '+sharing.url"
            :hashtags="sharing.hashtags"
          >
            <a :class="network.network" class="text-white"
              ><i :class="network.icon"></i> Partilhar em {{ network.name }}
            </a>
          </ShareNetwork>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import 'vue2-datepicker/locale/pt';
import { BaseUrl } from '../../../services/index.js'
import axios from 'axios'
import Cookies from 'js-cookie'
import generateConstant, { token } from '../../../utils/Constants'
import api from '../../../services'
import { mapGetters, mapActions } from 'vuex'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import dayjs from 'dayjs'
export default {
  components: {
    DatePicker
  },
  props: ['bikeId'],
  data() {
    return {
      lang: 'pt',
      showDateTime: '',
      sharing: {
        url: '',
        title: '',
        quote: '',
        hashtags: ''
      },
      networks: [
        {
          network: 'facebook',
          name: 'Facebook',
          icon: 'fab fah fa-lg fa-facebook-f',
          color: '#1877f2',
        },
        {
          network: 'twitter',
          name: 'Twitter',
          icon: 'fab fah fa-lg fa-twitter',
          color: '#1da1f2',
        },
      ],
      recentImage1: '',
      recentImage2: '',
      recentPhoto1: '',
      recentPhoto2: '',
      bikeIsLoading: false,
      isValid: false,
      dateTime: '',
      dateTimeWarn: false,
      number: '',
      numberWarn: false,
      secondNumber: '',
      address: '',
      addressHolder: '',
      city: '',
      cityWarn: false,
      postal: '',
      postalWarn: false,
      estimated: '',
      estimatedWarn: false,
      lockDescription: '',
      lockDescriptionWarn: false,
      lockDescriptionData: [],
      defeatDescription: '',
      defeatDescriptionData: [],
      policeReport: '',
      ciclaNumber: '',
      ciclaNumberWarn: false,
      incidentDescription: '',
      incidentWarn: false,
      stolen: false,
      userData: {},
      stolenImages: [],
      previewImages: '',
      showImages: [],
      file: '',
      fileSecond: '',
      formData: null,
      formDataSecond: null
    }
  },
  computed: {
    ...mapGetters({
      __getStolenState: 'product/getStolenState',
      __getBaseUrl: 'product/getBaseUrl'
    })
  },
  methods: {
    ...mapActions({
      __setStolenState: 'product/setStolenState'
    }),
    dateFormat(val) {
      this.showDateTime = dayjs(val).format('DD/MM/YYYY H:mm')
    },
    generateAuthConfig () {
      const authToken = Cookies.get(generateConstant(token))
      return {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
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
    removeImageBtn() {
      this.recentImage1 = ''
    },
    onFileSecondChange(e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.recentImage2 = e.target.result
      }
      this.stolenImages.push(e.target.files[0])
    },
    removeSecondImageBtn() {
      this.recentImage2 = ''
    },
    checkTime() {
      if (this.dateTime === '' || this.dateTime === null) {
        this.dateTimeWarn = true
      } else {
        this.dateTimeWarn = false
      }
    },
    checkNumber() {
      if (this.number === '' || this.number === null) {
        this.numberWarn = true
      } else {
        this.numberWarn = false
      }
    },
    getAddressData(addressData) {
        this.addressHolder = addressData;
    },
    checkValue(value) {
      this.address = value.name
    },
    setAddress() {
      if(this.addressHolder) {
        this.address = this.addressHolder.route+','+this.addressHolder.locality+','+this.addressHolder.country
        this.city = this.addressHolder.locality
        this.postal = this.addressHolder.postal_code
      }
    },
    checkCity() {
      if (this.city === '' || this.city === null) {
        this.cityWarn = true
      } else {
        this.cityWarn = false
      }
    },
    checkPostal() {
      if (this.postal === '' || this.postal === null) {
        this.postalWarn = true
      } else {
        this.postalWarn = false
      }
    },
    checkEstimated() {
      if (this.estimated === '' || this.estimated === null) {
        this.estimatedWarn = true
      } else {
        this.estimatedWarn = false
      }
    },
    checkLockDescription() {
      if (this.lockDescription === '' || this.lockDescription === null) {
        this.lockDescriptionWarn = true
      } else {
        this.lockDescriptionWarn = false
      }
    },
    checkIncident() {
      if (this.incidentDescription === '' || this.incidentDescription === null) {
        this.incidentWarn = true
      } else {
        this.incidentWarn = false
      }
    },
    checkCiclaNumber() {
      if(this.ciclaNumber === '' || this.ciclaNumber === null) {
        this.ciclaNumberWarn = true
      } else {
        this.ciclaNumberWarn = false
      }
    },
    checkValid() {
      this.checkTime()
      this.checkNumber()
      this.checkCity()
      this.checkPostal()
      this.checkEstimated()
      this.checkLockDescription()
      this.checkIncident()
      this.checkCiclaNumber()
      if (
        this.dateTimeWarn ||
        this.numberWarn ||
        this.cityWarn ||
        this.postalWarn ||
        this.estimatedWarn ||
        this.lockDescriptionWarn ||
        this.incidentWarn ||
        this.ciclaNumberWarn
      ) {
        this.isValid = false
      } else {
        this.isValid = true
      }
    },
    async recoverBike() {
      const info = {
        stolen: false,
        stolen_details: null,
        on_sale: null,
        price: null,
        remarks: null,
        for_stolen: null,
        longitude: '',
        latitude: ''
      }
      await api.product.stolenDetailUpdate(this.bikeId, info)
      this.__setStolenState(false)
      const history = {
        information: {
          text: 'Bicicleta recuperada!'
        },
        type: 'recover',
        user: this.userData,
        bikes: this.bikeId
      }
      await api.product.addToHistory(history)
      this.dateTime = '',
      this.number = '',
      this.secondNumber = '',
      this.address = '',
      this.city = '',
      this.postal = '',
      this.estimated = '',
      this.lockDescription = '',
      this.defeatDescription = '',
      this.policeReport = '',
      this.ciclaNumber = ''
      this.incidentDescription = ''
      window.location.reload()
    },
    async submitData() {
      const checkDate = new Date(this.dateTime)
      console.log('date: ', checkDate)
      this.checkValid()
      if (this.isValid) {
        this.dateFormat(this.dateTime)
        const info = {
          stolen: true,
          on_sale: false,
          longitude: this.addressHolder ? this.addressHolder.longitude.toString() : '',
          latitude: this.addressHolder ? this.addressHolder.latitude.toString() : '',
          stolen_details: {
            stolen_date: checkDate,
            phone_number: this.number,
            secondary_number: this.secondNumber,
            address: this.address ? this.address : '',
            city: this.city,
            postal: this.postal,
            estimated_value: this.estimated,
            lock_description: this.lockDescription,
            defeat_subscription: this.defeatDescription,
            police_report: this.policeReport,
            cicla_number: this.ciclaNumber,
            incident_description: this.incidentDescription,
          }
        }
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
        await api.product.stolenDetailUpdate(this.bikeId, info)
        const history = {
          information: {
            text: 'A bicicleta foi roubada',
            city: this.city
          },
          type: 'stolen',
          user: this.userData,
          bikes: this.bikeId
        }
        await api.product.addToHistory(history)
        this.$toasted.show('Salvo com sucesso', {
          position: 'top-center',
          duration: 3000,
        })
        this.__setStolenState(true)
        window.location.reload()
      } else {
        this.$toasted.show('Erro ao enviar dados!', {
          position: 'top-center',
          duration: 3000,
        })
      }
    },
  },
  async fetch() {
    const userDetail = await api.product.userDetail()
    this.userData = userDetail.data
    this.lockDescriptionData = await api.product.blogService(
      'locking-descriptions'
    )
    this.defeatDescriptionData = await api.product.blogService(
      'lock-defeat-descriptions'
    )
    const route = this.$route.params.slug
    const BikeData = await api.product.getBikeDataService(route)
    if (BikeData.length > 0) {
      BikeData.filter((data) => {
        this.__setStolenState(data.stolen)
        this.dateTime = data.stolen_details
          ? data.stolen_details.stolen_date
          : null
        this.number = data.stolen_details
          ? data.stolen_details.phone_number
          : null
        this.secondNumber = data.stolen_details
          ? data.stolen_details.secondary_number
          : null
        this.address = data.stolen_details ? data.stolen_details.address : null
        this.city = data.stolen_details ? data.stolen_details.city : null
        this.postal = data.stolen_details ? data.stolen_details.postal : null
        this.estimated = data.stolen_details
          ? data.stolen_details.estimated_value
          : null
        this.lockDescription = data.stolen_details
          ? data.stolen_details.lock_description
          : null
        this.defeatDescription = data.stolen_details
          ? data.stolen_details.defeat_subscription
          : null
        this.policeReport = data.stolen_details
          ? data.stolen_details.police_report
          : null
        this.ciclaNumber = data.stolen_details
          ? data.stolen_details.cicla_number
          : BikeData[0].cicla_number
        this.incidentDescription = data.stolen_details
          ? data.stolen_details.incident_description
          : null
        this.sharing.url = 'https://cicla.pt/stolen-bikes/'+data.slug
        this.sharing.title = data.stolen_details ? data.stolen_details.incident_description : null
        this.sharing.quote = data.stolen_details ? data.stolen_details.incident_description : null
      })
      this.dateFormat(this.dateTime)
    }
  }
}
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
.loader {
  width: 100px;
  margin: auto;
}
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
  a.share-network-facebook {
    padding-left: 0 !important;
}
  a {
    padding: 10px 16px;
    border-radius: 50px;
    font-size: 13px;
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

  a.share-network-facebook {
    padding-left: 0 !important;
    padding-right: 0 !important;
    display: block;
    margin-bottom: 0px;
}
a.share-network-twitter {
    padding-left: 0 !important;

}

ul.ps-0.row.justify-content-around.social-media .twitter{
    background-color: #1d9bf0;
    width: 100% !important;
    display: inline-block;
    text-align: center;
}

ul.ps-0.row.justify-content-around.social-media .facebook{
    background-color: #3b5998;
    width: 100%;
    display: block;
    text-align: center;
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
<style lang="scss">
.date-time-picker input[data-v-4bd11526] {
    min-width: 226px;
    width: 100%;
    height: 47px;
    border-radius: 5px;
    padding: 3px;
    border: 1px solid #ddd;
}
.g-input .g-form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    height: 50px;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid red;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>


<style>
.mx-datepicker.date-time-picker {
    width: 100%;
}
.mx-datepicker.warning-border input.mx-input {
    border: 1px solid #fff !important;
}
.mx-datepicker.date-time-picker input.mx-input {
    height: 50px;
    border: 1px solid #ced4da;
    box-shadow: none !important;
}
</style>

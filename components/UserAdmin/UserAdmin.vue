<template>
  <div>
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" style="width: 60px" />
    </div>
    <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
    </div>
    <div v-else>
      <section v-if="token" class="section-padding theme-bg-light">
        <div class="theme-container">
          <div class="row">
            <div class="col-md-12 text-end mb-3">
              <div
                class="transfer theme-btn universal-btn outline-btn me-2"
                data-bs-toggle="modal"
                data-bs-target="#bike-transfer"
                id="button-4"
              >
                <div id="circle2"></div>
                <button type="submit">
                  <span> Transferência de bicicleta </span>
                </button>
              </div>
              <div class="theme-btn universal-btn outline-btn" id="button-4">
                <div id="circle2"></div>
                <button
                  type="submit"
                  @click="$router.replace('/register-bikes')"
                >
                  <span> Adicionar Bicicleta </span>
                </button>
              </div>
            </div>
            <div class="col-md-4">
              <div class="sideTabbar">
                <div class="title">A Minha Conta</div>
                <ul class="nav nav-tabs flex-column" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <a href="#perfil">
                      <button
                        :class="
                          $route.hash === '#perfil'
                            ? 'nav-link active'
                            : 'nav-link'
                        "
                        id="tab1-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tab1"
                        type="button"
                        role="tab"
                      >
                        <i class="fal fa-biking"></i> &nbsp;&nbsp; Meu perfil
                      </button>
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a href="#minha_bicicleta">
                      <button
                        :class="
                          $route.hash === '#minha_bicicleta'
                            ? 'nav-link active'
                            : 'nav-link'
                        "
                        id="tab2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tab2"
                        type="button"
                        role="tab"
                      >
                        <i class="fal fa-tire"></i> &nbsp;&nbsp; A Minha Bicicleta
                      </button>
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a href="#inbox">
                      <button
                      :class="
                        $route.hash === '#inbox'
                          ? 'nav-link active'
                          : 'nav-link'
                      "
                      id="tab3-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#tab3"
                      type="button"
                      role="tab"
                    >
                      <i class="fal fa-envelope-open-text"></i> &nbsp;&nbsp;
                      Caixa de entrada
                    </button>
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a href="#redefinir_senha">
                      <button
                        :class="
                          $route.hash === '#redefinir_senha'
                            ? 'nav-link active'
                            : 'nav-link'
                        "
                        id="tab4-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tab4"
                        type="button"
                        role="tab"
                      >
                        <i class="fal fa-key"></i> &nbsp;&nbsp; Redefinir senha
                      </button>
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a>
                      <button
                        class="nav-link"
                        id="tab4-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tab4t"
                        type="button"
                        role="tab"
                        @click="logoutBtn"
                      >
                        <i class="fal fa-user-friends"></i> &nbsp;&nbsp; Sair
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-8">
              <div class="tab-content" id="adminTabContent">
                <!-- Tabs 1 -->
                <div
                  :class="
                    $route.hash === '#perfil'
                      ? 'tab-pane fade show active'
                      : 'tab-pane fade'
                  "
                  id="tab1"
                  role="tabpanel"
                  aria-labelledby="tab1-tab"
                >
                  <div class="admin-tab-content">
                    <div class="section-title">
                      <h4 class="them-title-black mb-0 pb-4">Perfil</h4>
                    </div>
                    <form @keypress.enter.prevent>
                      <div class="row">
                        <div class="form-floating col-12 col-md-6 mb-4">
                          <input
                            type="text"
                            :class="fNameWarn ? 'warning-border' : ''"
                            class="form-control custom-input"
                            id="Name"
                            placeholder="Nome"
                            v-model="fullName"
                            @blur="validFname"
                          />
                          <span v-if="fNameWarn" class="warning"
                            >*Nome é obrigatório</span
                          >
                          <label class="custom-label" for="Name">Nome</label>
                        </div>
                        <div class="form-floating col-12 col-md-6 mb-4">
                          <google-autocomplete
                            id="city"
                            types="(cities)"
                            v-model="city"
                            @change="setCity"
                            @blur="validCity"
                            :classname="cityWarn ? 'warning-border form-control' : 'form-control'"
                            placeholder="Localidade"
                            country="pt"
                            v-on:placechanged="getToData"
                            v-on:no-results-found="checkValue"
                          >
                          </google-autocomplete>
                          <span v-if="cityWarn" class="warning"
                            >*Localidade é obrigatória</span
                          >
                          <label class="custom-label" for="city"
                            >Localidade</label
                          >
                        </div>

                        <div class="form-floating col-12 col-md-6 mb-4">
                          <input
                            type="text"
                            class="form-control custom-input"
                            id="taxpayer-number"
                            placeholder="NIF"
                            v-model="taxPayer"
                          />
                          <label class="custom-label" for="taxpayer-number"
                            >NIF</label
                          >
                        </div>
                        <div class="form-floating col-12 col-md-6 mb-4">
                          <input
                            type="text"
                            class="form-control custom-input"
                            id="mobilePhone"
                            placeholder="Contacto Telefónico"
                            v-model="number"
                          />
                          <label class="custom-label" for="mobilePhone"
                            >Contacto Telefónico</label
                          >
                        </div>
                        <div class="form-floating col-12 col-md-6 mb-4">
                          <select
                            class="form-control custom-input form-select"
                            required=""
                            placeholder="Género"
                            v-model="genre"
                          >
                            <option
                              v-for="(data, index) in GenreData"
                              :key="index"
                              :value="data.value"
                            >
                              {{ data.name }}
                            </option>
                          </select>
                          <label class="custom-label" for="Gender"
                            >Género</label
                          >
                        </div>
                        <div class="col-12 col-md-6 mb-4">
                          <datepicker
                            :language="ptBR"
                            v-model="dob"
                            placeholder="Data de Aniversário"
                            format="dd/MM/yyyy"
                            class="set-date"
                            name="uniquename">
                          </datepicker>
                        </div>
                      </div>
                      <div class="form-floating text-center mb-4">
                        <div class="theme-btn universal-btn" id="button-3">
                          <div id="circle"></div>
                          <nuxt-link to="/my-account#perfil">
                            <button type="submit" @click="UpdateBtn">
                              <span>Atualizar</span>
                            </button>
                          </nuxt-link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <!-- Tabs 2 -->
                <div
                  :class="
                    $route.hash === '#minha_bicicleta'
                      ? 'tab-pane fade show active'
                      : 'tab-pane fade'
                  "
                  id="tab2"
                  role="tabpanel"
                  aria-labelledby="tab2-tab"
                >
                  <div class="admin-tab-content">
                    <div class="section-title">
                      <h4 class="them-title-black mb-0 pb-2">
                        As Minhas Bicicletas
                      </h4>
                    </div>
                    <form class="bike_info" v-if="bikeData.length > 0">
                      <div class="row form-field-separator">
                        <div
                          @click="showPendingToast(data)"
                          class="col-md-12 col-lg-6"
                          v-for="(data, index) in bikeData"
                          :key="index"
                        >
                          <div
                            :class="
                              data.status
                                ? 'stolen-bike-box'
                                : 'stolen-preview-box'
                            "
                          >
                            <nuxt-link
                              :to="data.status ? '/edit-bike/' + data.slug + '#editar' : '/my-account#minha_bicicleta'"
                            >
                              <div class="stolen-content-box">
                                <div
                                  class="stolen-bike-image"
                                  v-if="data.bike_photo && data.bike_photo.url"
                                >
                                  <div class="chip top-set-line">
                                    <button
                                      class="stolen-bike-info-btn"
                                      v-if="data.stolen"
                                    >
                                      <span>ROUBADA</span>
                                    </button>
                                    <button
                                      class="buy-bike-info"
                                      v-if="data.on_sale && !data.stolen"
                                    >
                                      <span>EM VENDA</span>
                                    </button>
                                    <button
                                      class="approval-info ps-2 pe-2"
                                      v-if="
                                        data.status === false ||
                                        data.status === null
                                      "
                                    >
                                      <span>Pendente de Aprovação</span>
                                    </button>
                                  </div>
                                  <img
                                    class="height-custom"
                                    :src="
                                      data.bike_photo &&
                                      data.bike_photo.formats &&
                                      data.bike_photo.formats.medium
                                        ? __getBaseUrl +
                                          data.bike_photo.formats.medium.url
                                        : __getBaseUrl + data.bike_photo.url
                                    "
                                    alt="img"
                                  />
                                </div>
                                <div class="stolen-bike-info">
                                  <h4 v-if="data.nickName">
                                    {{ data.nickName }}
                                  </h4>
                                  <ul>
                                    <li>
                                      <span>Número Cicla:</span>
                                      {{
                                        data.cicla_number
                                          ? data.cicla_number
                                          : 'N/A'
                                      }}
                                    </li>
                                    <li>
                                      <span>Modelo:</span>
                                      {{ data.model ? data.model : 'N/A' }}
                                    </li>
                                    <li>
                                      <span>Marca:</span>
                                      {{
                                        data.brands.length > 0 &&
                                        data.brands[0].name
                                          ? data.brands[0].name
                                          : 'N/A'
                                      }}
                                    </li>
                                    <li>
                                      <span>Cor:</span> {{ data.color.name }}
                                    </li>
                                  </ul>
                                  <div class="bike-info" v-if="data.status">
                                    <nuxt-link
                                      :to="'/edit-bike/' + data.slug"
                                      class="edit"
                                      ><i class="fal fa-edit"></i> Editar
                                      bicicleta</nuxt-link
                                    >
                                  </div>
                                </div>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div v-else>
                      <div class="form-floating text-center my-4">
                        <div class="theme-btn universal-btn" id="button-3">
                          <div id="circle"></div>
                          <nuxt-link to="/register-bikes">
                            <button type="submit">
                              <span>Adicionar Bicicleta</span>
                            </button>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Tabs 3 -->
                <div
                  v-show="list"
                  :class="
                    $route.hash === '#inbox'
                      ? 'tab-pane fade show active'
                      : 'tab-pane fade'
                  "
                  id="tab3"
                  role="tabpanel"
                  aria-labelledby="tab3-tab"
                >
                  <div class="admin-tab-content">
                    <div
                      class="
                        section-title
                        top-tabs-chat
                        d-flex
                        justify-content-between
                        align-items-center
                        pb-3
                      "
                    >
                      <h4 class="them-title-black mb-0">
                        Lista de mensagens do utilizador
                      </h4>
                    </div>

                    <!--====Replay Message======--->
                    <div
                      class="chat-list-bike"
                      v-if="messageData.length > 0"
                    >
                      <ul>
                        <li class="bg-head w-100 float-left">
                          <div class="user-name-head">Nome do utilizador</div>
                          <div class="user-name-list-head">Anúncio</div>
                          <div class="user-date-msg text-right">Data e hora</div>
                        </li>

                        <li
                          @click="checkMessage(item)"
                          v-for="item in messageData"
                          :key="item.id"
                          class="msg-list cursor-pointer"
                        >
                          <a class="w-100 float-left">
                            <div class="user-name-list-chat align-items-center">
                              <img
                                src="~assets/images/chat-user.png"
                                class="me-2"
                                style="width: 34px"
                              />
                              {{ item.sender ? item.sender.name : '' }}
                              <span
                                v-if="!item.read"
                                class="badge badge-light"
                              ></span>
                            </div>
                            <div class="user-name-list-chat-name">
                              <p class="short-msg m-0">
                                <i class="fal fa-envelope-open-text pe-2"></i>
                                {{ item.message }}
                              </p>
                            </div>
                            <div class="chat-time-date">
                              {{
                                dateFormat(item.created_at, 'DD/MM/YYYY H:mm')
                              }}
                            </div>
                          </a>
                        </li>
                        <li class="paginate">
                          <div>
                            <vs-pagination
                              class="pagination-type text-center"
                              v-if="messageLength && messageLength > 1"
                              :total-pages="messageLength"
                              @change="changePage"
                            >
                            </vs-pagination>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div v-if="messageData.length == 0" class="chat-list-bike">
                      <div>A caixa de mensagens está vazia</div>
                    </div>
                  </div>
                </div>
                <!-- Tabs 4 -->
                <div
                  :class="
                    $route.hash === '#redefinir_senha'
                      ? 'tab-pane fade show active'
                      : 'tab-pane fade'
                  "
                  id="tab4"
                  role="tabpanel"
                  aria-labelledby="tab4-tab"
                >
                  <div class="admin-tab-content">
                    <div class="section-title pb-4">
                      <h4 class="them-title-black mb-2">Redefinir senha</h4>
                    </div>

                    <div class="row">
                      <form>
                        <div class="row">
                          <div class="form-floating col-12 mb-4">
                            <input
                              type="password"
                              :class="oldPassWarn ? 'warning-border' : ''"
                              class="form-control custom-input"
                              id="oldPassword"
                              placeholder="Senha Antiga"
                              v-model="oldPassword"
                              @blur="validOldPass"
                            />
                            <span v-if="oldPassWarn" class="warning"
                              >*A senha antiga é obrigatória</span
                            >
                            <label class="custom-label" for="oldPassword"
                              >Senha Anterior</label
                            >
                          </div>
                          <div class="form-floating col-12 mb-4">
                            <input
                              type="password"
                              :class="
                                newPassWarn || passwordWarning
                                  ? 'warning-border'
                                  : ''
                              "
                              class="form-control custom-input"
                              id="newPassword"
                              placeholder="Nova Senha"
                              v-model="newPassword"
                              @blur="validNewPass"
                            />
                            <span v-if="newPassWarn" class="warning"
                              >*Nova senha é necessária</span
                            >
                            <span v-if="passwordWarning" class="warning"
                              >*Essas senhas não correspondiam. Tente novamente.</span
                            >
                            <label class="custom-label" for="newPassword"
                              >Nova Senha</label
                            >
                          </div>
                          <div class="form-floating col-12 mb-4">
                            <input
                              type="password"
                              :class="conPassWarn ? 'warning-border' : ''"
                              class="form-control custom-input"
                              id="confirmPassword"
                              placeholder="Confirme sua senha"
                              v-model="confirmPassword"
                              @blur="validConPass"
                            />
                            <span v-if="conPassWarn" class="warning"
                              >*Confirmar senha é necessária</span
                            >
                            <label class="custom-label" for="confirmPassword"
                              >Confirme sua senha</label
                            >
                          </div>
                        </div>
                        <div class="form-floating text-left mb-4">
                          <div class="theme-btn universal-btn" id="button-3">
                            <div id="circle"></div>
                            <nuxt-link to="/my-account#redefinir_senha">
                              <button type="submit" @click="ResetPasswordBtn">
                                <span>Redefinir senha</span>
                              </button>
                            </nuxt-link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <!--Tabs Details-->
                <div v-if="checkBox" class="" style="display: block">
                  <div class="admin-tab-content">
                    <div @click="closeMessage" class="back-links">
                      <i class="fal fa-chevron-left"></i> Voltar
                    </div>
                    <div class="section-title">
                      <h4 class="them-title-black mb-0 pb-4">
                        Caixa de entrada
                      </h4>
                    </div>

                    <div
                      class="chat-details"
                      v-for="info in message"
                      :key="info.id"
                    >
                      <div class="ad-details-bx">
                        <div class="ad-images">
                          <nuxt-link :to="'/classified/' + info.bike.slug"
                            ><img
                              :src="__getBaseUrl + info.bike.bike_photo.url"
                              alt="img"
                          /></nuxt-link>
                        </div>
                        <div class="ad-details-info">
                          <h4>
                            <nuxt-link :to="'/classified/' + info.bike.slug">{{
                              info.bike.model
                            }}</nuxt-link>
                          </h4>
                          <div class="ad-view">
                            <nuxt-link :to="'/classified/' + info.bike.slug"
                              >Ver anúncio</nuxt-link
                            >
                            <span class="ad-id">ID: {{ info.bike.id }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="time-chat">
                        <h5 class="p-2">{{ info.sender.name }}</h5>
                      </div>

                      <div class="my-4 text-center" v-if="chatMessage.length === 0">
                        <img src="~assets/images/spinner.gif" style="width: 60px" />
                      </div>

                      <div class="chatmessage-list">
                      <div v-for="chat in chatMessage" :key="chat.id" :class="userData.email === chat.reciever.email ? 'inbox-show' :  'sent-chat'">
                     {{ chat.message }}
                     <span class="float-right">{{ dateFormat(chat.created_at, 'DD/MM/YYYY H:mm') }}</span>
                      </div>
                      </div>
                      <div class="msg-reply">
                        <div class="" id="reply-bx">
                          <div class="msg-send-box">
                            <div class="msg-form">
                              <input
                                type="text"
                                v-model="messageBox"
                                @keypress.enter="submitMessage"
                                @blur="checkMessageBox"
                                :class="messageBoxWarn ? 'warning-border form-control custom-input' : 'form-control custom-input'"
                                placeholder="Digite Mensagem...."
                              />

                                <button type="submit" @click="submitMessage" class="send-message">
                                 <i class="fal fa-paper-plane"></i>
                                </button>
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
        </div>
        <BikeTransferModal />
      </section>
    </div>
  </div>
</template>

<script>
import { ptBR } from 'vuejs-datepicker/dist/locale'
import api from '../../services'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import BikeTransferModal from '../Comman/BikeTransferModal.vue'
import Datepicker from 'vuejs-datepicker';
export default {
  components: {
    BikeTransferModal,
    Datepicker
  },
  data() {
    return {
      cityInfo: [],
      cityVal: '',
      ptBR: ptBR,
      singleMessageData: null,
      messageBox: '',
      messageBoxWarn: false,
      messageValid: false,
      token: '',
      messageData: [],
      message: [],
      chatMessage: [],
      messageLength: 0,
      dataLength: [],
      start: 0,
      limit: 5,
      list: true,
      checkBox: false,
      fullName: '',
      fNameWarn: false,
      city: '',
      cityWarn: false,
      countryData: [],
      country: '',
      taxPayer: '',
      number: '',
      genre: '',
      GenreData: [
        {
          name: 'Masculino',
          value: 'Masculino',
        },
        {
          name: 'Feminino',
          value: 'Feminino',
        },
        {
          name: 'Outro',
          value: 'Outro',
        },
      ],
      dob: '',
      isValid: false,
      userData: {},
      bikeData: [],
      oldPassword: '',
      oldPassWarn: false,
      newPassword: '',
      newPassWarn: false,
      confirmPassword: '',
      conPassWarn: false,
      passwordWarning: false,
      addressHolder: '',
      latitude: '',
      longitude: ''
    }
  },
  computed: {
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl',
    }),
  },
  methods: {
    showPendingToast(data) {
      if(!data.status) {
        this.$toasted.show('Aguarde enquanto está em análise!', {
          position: 'top-center',
          duration: 3000
        })
      }
    },
    getToData(addressData) {
      this.addressHolder = addressData
    },
    checkValue(value) {
      this.city = value.name
    },
    setCity() {
      if(this.addressHolder) {
        this.city = this.addressHolder.locality
        this.latitude = this.addressHolder.latitude.toString()
        this.longitude = this.addressHolder.longitude.toString()
      }
    },
    checkMessageBox() {
      if(this.messageBox === ''){
        this.messageBoxWarn = true
        this.messageValid = false
      } else {
        this.messageBoxWarn = false
        this.messageValid = true
      }
    },
    async submitMessage() {
      this.checkMessageBox()
      if(this.messageValid) {
        const message = {
          bike: this.message[0].bike.id,
          sender: this.message[0].reciever.id,
          reciever: this.message[0].sender.id,
          message: this.messageBox,
          read: false
        }
        const data = {
          bike: this.message[0].bike.id,
          reciever: this.message[0].sender.id,
          message: this.messageBox
        }
        await api.product.messageService(message)
        await api.product.messageEmailService(data)
        this.$toasted.show('Mensagem enviada com sucesso!', {
          position: 'top-center',
          duration: 3000
        })
        this.messageBox = '',
        this.bikeId = '',
        this.sender = '',
        this.receiver = ''
        this.updateOnSent()
      } else {
        this.$toasted.show('Erro, algo deu errado!', {
          position: 'top-center',
          duration: 3000
        })
      }
    },
    dateFormat(value, format) {
      return dayjs(value).format(format)
    },
    async changePage(val) {
      val = val - 1
      if (val === 0) {
        this.start = 0
      } else {
        this.start = 0
        this.start = this.limit * val
      }
      const messages = await api.product.getMessage(
        this.userData.id,
        this.start,
        this.limit
      )
      this.messageData = messages.data
    },
    async updateOnSent() {
      this.chatMessage = []
      const receivedMessage = await api.product.userReceivedMessage(this.singleMessageData.reciever.id, this.singleMessageData.sender.id, this.singleMessageData.bike.id)
      const sentMessage = await api.product.userReceivedMessage(this.singleMessageData.sender.id, this.singleMessageData.reciever.id, this.singleMessageData.bike.id)
      for(const item of receivedMessage.data) {
        this.chatMessage.push(item)
      }
      for(const data of sentMessage.data) {
        this.chatMessage.push(data)
      }
      this.chatMessage.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at)
      })
    },
    async checkMessage(data) {
      this.singleMessageData = data
      this.list = false
      this.checkBox = true
      this.message.push(data)
      const messageId = data.id
      const message = {
        read: true,
      }
      await api.product.readMessageService(messageId, message)
      const receivedMessage = await api.product.userReceivedMessage(data.reciever.id, data.sender.id, data.bike.id)
      const sentMessage = await api.product.userReceivedMessage(data.sender.id, data.reciever.id, data.bike.id)
      for(const item of receivedMessage.data) {
        this.chatMessage.push(item)
      }
      for(const data of sentMessage.data) {
        this.chatMessage.push(data)
      }
      this.chatMessage.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at)
      })
    },
    closeMessage() {
      this.checkBox = false
      this.list = true
      this.message = [],
      this.chatMessage = []
    },
    validFname() {
      if (this.fullName === '') {
        this.fNameWarn = true
      } else {
        this.fNameWarn = false
      }
    },
    validCity() {
      if (this.city === '') {
        this.cityWarn = true
      } else {
        this.cityWarn = false
      }
    },
    validOldPass() {
      if (this.oldPassword === '') {
        this.oldPassWarn = true
      } else {
        this.oldPassWarn = false
      }
    },
    validNewPass() {
      if (this.newPassword === '') {
        this.newPassWarn = true
      } else {
        this.newPassWarn = false
      }
    },
    validConPass() {
      if (this.confirmPassword === '') {
        this.conPassWarn = true
      } else {
        this.conPassWarn = false
        if (this.confirmPassword !== this.newPassword) {
          this.passwordWarning = true
        }
      }
    },
    async ResetPasswordBtn() {
      try {
        if (this.oldPassword && this.newPassword && this.confirmPassword) {
        const passwordData = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          newPasswordConfirmation: this.confirmPassword
        }
        await api.product.resetPasswordService(passwordData)
        this.$toasted.show('Senha atualizada com sucesso', {
          position: 'top-center',
          duration: 3000,
        })
        window.location.replace('/my-account#redefinir_senha')
        this.oldPassword = '',
        this.newPassword = '',
        this.confirmPassword = ''
      } else if (
        this.oldPassword === '' ||
        this.newPassword === '' ||
        this.confirmPassword
      ) {
        this.validOldPass()
        this.validNewPass()
        this.validConPass()
      }
      } catch(e) {
        console.log(e)
        this.$toasted.show('Falha na atualização da senha', {
          position: 'top-center',
          duration: 3000,
        })
        window.location.replace('/my-account#redefinir_senha')
      }
    },
    valid() {
      if (this.fNameWarn && this.cityWarn) {
        this.isValid = false
      } else {
        this.isValid = true
      }
      if (this.fullName === '' || this.city === '') {
        this.validFname()
        this.validCity()
      }
    },
    async UpdateBtn() {
      try {
        this.valid()
        if (this.isValid) {
          for(let n of this.cityInfo) {
            if(n.name == this.city || n.slug == this.city) {
              this.cityVal = n
            }
          }
          const InputData = {
            name: this.fullName,
            city: this.city,
            taxpayer_number: this.taxPayer ? this.taxPayer : null,
            mobile_number: this.number ? this.number : null,
            genre: this.genre ? this.genre : null,
            date_of_birth: this.dob ? this.dob : null,
            address_coordinates: {
              latitude: this.latitude,
              longitude: this.longitude
            }
          }
          await api.product.userDetailUpdate(this.userData.id, InputData)
          this.$toasted.show('Salvo com sucesso', {
            position: 'top-center',
            duration: 3000,
          })
          window.location.replace('/my-account#perfil')
        } else {
          this.$toasted.show('Erro ao salvar dados', {
            position: 'top-center',
            duration: 3000,
          })
          window.location.replace('/my-account#perfil')
        }
      } catch (error) {
        if (error.response) {
          return error.response.data.message
        }
        window.location.replace('/my-account#perfil')
      }
    },
    logoutBtn() {
      Cookies.remove('token')
      window.location = window.location.origin + '/login'
    },
  },
  async fetch() {
    this.countryData = await api.product.blogService('countries')
    this.token = Cookies.get('token')
    const userDetail = await api.product.userDetail()
    this.userData = userDetail.data
    this.fullName = this.userData.name
    this.city = this.userData.city
    this.taxPayer = this.userData.taxpayer_number
      ? this.userData.taxpayer_number
      : ''
    this.number = this.userData.mobile_number ? this.userData.mobile_number : ''
    this.genre = this.userData.genre ? this.userData.genre : ''
    this.dob = this.userData.date_of_birth ? this.userData.date_of_birth : ''
    const bikeDetail = await api.product.getRegisterBikeDataService(
      this.userData.id
    )
    let bikeDetailData = []
    if (bikeDetail.length > 0) {
      bikeDetail.filter((pro) => {
        if (pro.bike_photo && pro.bike_photo.url) {
          bikeDetailData.push(pro)
        }
      })
    }
    this.bikeData = bikeDetailData
    this.countryData.filter((data) => {
      if (data.id === this.userData.country) {
        this.country = data
      }
    })
    const messages = await api.product.getMessage(
      this.userData.id,
      this.start,
      this.limit
    )
    this.messageData = messages.data

    let mymap = new Map();
    var unique = this.messageData.filter(el => {
      const val = mymap.get(el.sender.name);
      if(val) {
          if(el.sender.id < val) {
              mymap.delete(el.sender.name);
              mymap.set(el.sender.name, el.sender.id);
              return true;
          } else {
              return false;
          }
      }
      mymap.set(el.sender.name, el.sender.id);
      return true;
    });
    console.log('test unique: ', unique);

    const messageLength = await api.product.messageLength(this.userData.id)
    this.dataLength = messageLength.data
    this.messageLength = Math.ceil(this.dataLength.length / this.limit)
    const cityData = await api.product.getCityData()
    this.cityInfo = cityData.data
    for(let n of this.cityInfo) {
      if(n.id == this.userData.city) {
        this.city = n.name
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.chip.top-set-line {
  .buy-bike-info {
    position: absolute;
    border: none;
    top: 15px;
    left: 15px;
    width: 72px;
    height: 34px;
    background: #13c339;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
    box-shadow: 2px 13px 33px #ddd;
  }
  .approval-info {
    position: absolute;
    border: none;
    top: 15px;
    left: 15px;
    height: 34px;
    background: #000;
    opacity: 1000;
    z-index: 999;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
    box-shadow: 2px 13px 33px #ddd;
  }
  .stolen-bike-info-btn {
    position: absolute;
    border: none;
    background: #c00202;
    top: 15px;
    left: 15px;
    width: 72px;
    height: 34px;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
    box-shadow: 2px 13px 33px #ddd;
  }
}
.transfer.theme-btn.universal-btn {
  height: 48px;
  width: 210px;
}
.height-custom {
  min-height: 370px;
  max-height: 370px;
}
.chat-details {
  .time-chat {
    padding-top: 15px;
    display: block;

    h5 {
      font-size: 15px;
      margin: 0;
    }
    p {
      margin: 0;
      font-size: 13px;
    }
  }

  .ad-details-bx {
    width: 100%;
    display: flex;
    padding: 20px;
    box-shadow: 2px 3px 22px #ddd;
    border-radius: 4px;

    .ad-images img {
      width: 120px;
      border-radius: 4px;
    }
    .ad-details-info {
      padding-left: 15px;
      h4 {
        font-size: 18px;
      }
      span.ad-id {
        font-size: 15px;
        padding-left: 20px;
      }
    }

    .ad-view a {
      color: #fd5044;
      &:hover {
        text-decoration: underline;
      }
    }
  }


.chatmessage-list {
    max-height: 600px;
    overflow-y: auto;
    padding-bottom: 20px;
    padding-right: 4px;
      /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #fd5044 !important;
  }
/* width */
&::-webkit-scrollbar {
  width: 10px;
  scrollbar-color: #fd5044 #d8d8d8 !important;
  scrollbar-width: thin !important;
}

/* Track */
&::-webkit-scrollbar-track {
  background: #d8d8d8 !important;
  border-radius: 10px;
}

/* Handle */
&::-webkit-scrollbar-thumb {
  background: #fd5044 !important;
  border-radius: 10px;
}

/* Handle on hover */
&::-webkit-scrollbar-thumb:hover {
  background: #fd5044 !important;
}




}

  .inbox-show {
    background: #f1f1f1;
    font-size: 14px;
    font-weight: 500;
    margin: 10px 0;
    line-height: 26px;
    position: relative;
    max-width: 60%;
    padding: 15px;
    border-radius: 15px;
    border-bottom-left-radius: 0;
    float: left;
    width: 100%;
  }
  .sent-chat {
    background: #579ffb;
    font-size: 14px;
    font-weight: 500;
    margin: 5px 0;
    line-height: 26px;
    position: relative;
    max-width: 70%;
    padding: 15px;
    border-radius: 15px;
    border-bottom-right-radius: 0;
    color: #fff;
    float: right;
    width: 100%;
  }

  .inbox-message {
    background: #f7f7f7;
    padding: 15px;
    margin-top: 20px;
    border-radius: 6px;
  }

  .your-message-show {
    background: #fff5f4;
    padding: 15px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    margin: 20px 0;
    line-height: 26px;
    position: relative;
    max-width: 100%;
    color: #464646;
    text-align: left;
  }

  a.theme-btn.btn-hover-black {
    height: auto;
    width: auto;
    padding: 12px 30px;
    transition: 0.5s;
    &:hover {
      background: #000;
      color: #fff;
    }
  }
}
div.back-links {
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 12px;
  float: left;
  width: 100%;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #fd5044;
  }
}
.chat-list-bike ul {
  padding: 0;
  margin: 0;

  span.badge.badge-light {
    background: #46c314;
    position: absolute;
    left: -2px;
    top: 4px;
    padding: 4px;
    width: 8px;
    height: 8px;
    display: block;
    border-radius: 50%;
  }

  li.msg-list {
    background: #f2f3f5;
    float: left;
    width: 100%;
    border-radius: 4px;
    margin: 2px 0;
  }
  .paginate {
    float: left;
    width: 100%;
    border-radius: 4px;
  }
  .bg-head {
    background: #fd5044;
    padding: 14px 12px;
    border-radius: 4px;
    margin-bottom: 3px;
    .user-name-head {
      width: 25%;
      font-size: 13px;
      color: #ffffff;
      float: left;
    }

    .user-name-list-head {
      color: #ffffff;
      font-size: 13px;
      width: 50%;
      float: left;
    }
    .user-date-msg {
      color: #fff;
      font-size: 13px;
      text-align: right;
    }
  }
  .user-name-list-chat {
    width: 25%;
    float: left;
    font-size: 14px;
    position: relative;
  }

  li.msg-list a {
    padding: 12px 12px;
    width: 100%;
    float: left;
    color: #000;

    .short-msg {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .chat-time-date {
      text-align: right;
      font-size: 13px;
    }
  }

  .user-name-list-chat-name {
    width: 50%;
    float: left;
    padding-left: 9px;
    .bike-name {
      margin: 0;
      font-weight: 500;
    }
  }
}

/****Chat Form*******/

.msg-send-box {
  margin-top: 40px;
  border-radius: 4px;
  width: 100%;
    float: left;
  .msg-form {
    position: relative;
    textarea.form-control.custom-input {
    height: 45px;
    width: 100%;
    padding: 9px;
    resize: none !important;
    border-radius: 0;
    border: none !important;
    border-bottom: 1px solid #ddd !important;
    font-size: 14px;
    min-height: 20px !important;
    }

button.send-message {
position: absolute;
    right: 0;
    bottom: 10px;
    border-radius: 50%;
    display: grid;
    align-items: center;
    border: none;
    text-align: center;
    color: #fd5044;
    background: transparent;
    font-size: 21px;
    padding: 4px 15px;

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
    position: relative;

    img {
      object-fit: cover;
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
.stolen-preview-box {
  background: #fff;
  opacity: 0.6;
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
    position: relative;

    img {
      object-fit: cover;
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
.bg-img {
  background-image: url(../../assets/images/photo-2.jpg);
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
  width: 100%;
  float: left;

  button.sent-btn {
    border: none;
    background: #080808;
    padding: 9px 22px;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    transition: 0.5s;
    &:hover {
      color: #fff;
      background: #fd5044;
    }
  }

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
.mail-text {
  font-size: 13px;
  color: grey;
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
   .top-tabs-chat{
     .them-title-black{
    font-size: 18px;
}
   }
}

@media screen and (max-width: 991px) {

     .top-tabs-chat{
     .them-title-black{
    font-size: 16px;
}
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

       .top-tabs-chat{
             flex-wrap: wrap;
     .them-title-black{
    font-size: 16px;
}
   }

.chat-details{
 .ad-details-bx{
   display: block;
    padding: 15px;
    .ad-details-info{
    padding-left: 0;
    }

  .ad-images img{
    width: 50px;
    border-radius: 4px;
    }

 h4{
    font-size: 14px !important;
    padding-top: 5px !important;
    }




 }

.sent-chat{
    width: 100%;
      max-width: 90%;
}
.inbox-show{
       width: 100%;
      max-width: 90%;
}


}


  .stolen-bike-box .stolen-bike-info{
    padding-top: 0;
    padding-left: 0;
}

  .chat-list-bike {
    ul .bg-head {
      & .user-name-head {
        width: 100%;
        font-size: 13px;
        color: #ffffff;
        float: left;
      }

      & .user-name-list-head {
        color: #ffffff;
        font-size: 13px;
        width: 100%;
        float: left;
      }

      .user-date-msg {
        width: 100%;
        text-align: left !important;
      }
    }

    .user-name-list-chat-name {
      width: 100% !important;
      padding-left: 0 !important;
    }

    .chat-time-date {
      text-align: left !important;
    }
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

  .your-message-show {
    margin-left: 10%;
  }

  .chat-list-bike ul .user-name-list-chat {
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 10px;
  }
}

@media screen and (max-width: 579px) {
  .transfer.theme-btn.universal-btn {
    height: 48px;
    width: 100%;
    margin-bottom: 15px;
  }
  .theme-btn.universal-btn.outline-btn {
    width: 100%;
  }
}
</style>
<style>
.set-date input {
    overflow: visible;
    width: 100%;
    padding: 11px;
    border: 1px solid rgb(167, 160, 160);
    border-radius: 3px;
}
</style>

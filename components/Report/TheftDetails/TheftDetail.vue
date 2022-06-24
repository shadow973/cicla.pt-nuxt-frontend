<template>
    <div class="admin-tab-content">
        <div class="section-title pb-4">
        <h4 class="them-title-black mb-0">DETALHES DO ROUBO</h4>
        </div>
        <form @submit.prevent class="row">
        <div class="col-md-12 mb-3">
            <label class="form-label">When was it stolen?</label>
            <input 
            v-model="stolenDate"
            @blur="stolenDate === '' ? stolenDateWarn = true : stolenDateWarn = false"
            :class="stolenDateWarn ? 'warning-border form-control' : 'form-control'" 
            type="datetime-local" 
            />
            <p v-if="stolenDateWarn" class="warning">*Please enter stolen date.</p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <label class="form-label">Phone Number</label>
            <input
            v-model="phone"
            @blur="phone === '' ? phoneWarn = true : phoneWarn = false"
            :class="phoneWarn ? 'warning-border form-control' : 'form-control'"
            type="text"
            placeholder="Phone Number"
            />
            <p v-if="phoneWarn" class="warning">*Phone number is required</p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <label class="form-label">Secondary phone Number</label>
            <input
            v-model="secondPhone"
            @blur="secondPhone === '' ? secondPhoneWarn = true : secondPhoneWarn = false"
            :class="secondPhoneWarn ? 'warning-border form-control' : 'form-control'"
            type="text"
            placeholder="Secondary phone Number"
            />
            <p v-if="secondPhoneWarn" class="warning">*Secondary phone number is required</p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <div class="form-check">
            <input
                v-model="showToLoggedIns"
                class="form-check-input"
                type="checkbox"
                value="true"
                id="flexCheckDefault-1"
            />
            <label
                class="form-check-label"
                for="flexCheckDefault-1"
            >
                Show phone to logged in users
            </label>
            </div>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <div class="form-check">
            <input
                v-model="showToShops"
                class="form-check-input"
                type="checkbox"
                value="true"
                id="flexCheckDefault-2"
            />
            <label
                class="form-check-label"
                for="flexCheckDefault-2"
            >
                Show to bike shop users
            </label>
            </div>
        </div>
        <div class="col-md-12 col-12 mb-3">
            <div class="form-check">
            <input
                v-model="showToLaws"
                class="form-check-input"
                type="checkbox"
                value="true"
                id="flexCheckDefault-3"
            />
            <label
                class="form-check-label"
                for="flexCheckDefault-3"
            >
                Show to verified law enforcement partners
            </label>
            </div>
        </div>
        <div class="col-md-12 mb-2">
            <label for="" style="font-size: 15px; color: #242323"
            >Where was it stolen?</label
            >
        </div>
        <div class="col-md-6 mb-3">
            <select
            v-model="country"
            @blur="country === '' ? countryWarn = true : countryWarn = false"
            :class="countryWarn ? 'warning-border form-control form-select custom-input' : 'form-control form-select custom-input'"
            >
            <option value="" selected>Select Location</option>
            <option value="Afganistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antigua &amp; Barbuda">
                Antigua &amp; Barbuda
            </option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bonaire">Bonaire</option>
            <option value="Bosnia &amp; Herzegovina">
                Bosnia &amp; Herzegovina
            </option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Ter">
                British Indian Ocean Ter
            </option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Canary Islands">Canary Islands</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">
                Central African Republic
            </option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">
                Christmas Island
            </option>
            <option value="Cocos Island">Cocos Island</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote DIvoire">Cote DIvoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Curaco">Curacao</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">
                Dominican Republic
            </option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">
                Equatorial Guinea
            </option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">
                Falkland Islands
            </option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">
                French Polynesia
            </option>
            <option value="French Southern Ter">
                French Southern Ter
            </option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Great Britain">Great Britain</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea North">Korea North</option>
            <option value="Korea Sout">Korea South</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau">Macau</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Malawi">Malawi</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">
                Marshall Islands
            </option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Midway Islands">Midway Islands</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Nambia">Nambia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherland Antilles">
                Netherland Antilles
            </option>
            <option value="Netherlands">
                Netherlands (Holland, Europe)
            </option>
            <option value="Nevis">Nevis</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau Island">Palau Island</option>
            <option value="Palestine">Palestine</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">
                Papua New Guinea
            </option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Pitcairn Island">Pitcairn Island</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Republic of Montenegro">
                Republic of Montenegro
            </option>
            <option value="Republic of Serbia">
                Republic of Serbia
            </option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Barthelemy">St Barthelemy</option>
            <option value="St Eustatius">St Eustatius</option>
            <option value="St Helena">St Helena</option>
            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Maarten">St Maarten</option>
            <option value="St Pierre &amp; Miquelon">
                St Pierre &amp; Miquelon
            </option>
            <option value="St Vincent &amp; Grenadines">
                St Vincent &amp; Grenadines
            </option>
            <option value="Saipan">Saipan</option>
            <option value="Samoa">Samoa</option>
            <option value="Samoa American">Samoa American</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome &amp; Principe">
                Sao Tome &amp; Principe
            </option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad &amp; Tobago">
                Trinidad &amp; Tobago
            </option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks &amp; Caicos Is">
                Turks &amp; Caicos Is
            </option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">
                United Arab Emirates
            </option>
            <option value="United States of America">
                United States of America
            </option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City State">
                Vatican City State
            </option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (Brit)">
                Virgin Islands (Brit)
            </option>
            <option value="Virgin Islands (USA)">
                Virgin Islands (USA)
            </option>
            <option value="Wake Island">Wake Island</option>
            <option value="Wallis &amp; Futana Is">
                Wallis &amp; Futana Is
            </option>
            <option value="Yemen">Yemen</option>
            <option value="Zaire">Zaire</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            </select>
            <p v-if="countryWarn" class="warning">*Please select location</p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <input
            v-model="addressIntersection"
            @blur="addressIntersection === '' ? addressIntersectionWarn = true : addressIntersectionWarn = false"
            :class="addressIntersectionWarn ? 'warning-border form-control' : 'form-control'"
            type="text"
            placeholder="Address or intersection"
            />
            <p v-if="addressIntersectionWarn" class="warning">*Address/Intersection is required </p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <input
            v-model="city"
            @blur="city === '' ? cityWarn = true : cityWarn = false"
            :class="cityWarn ? 'warning-border form-control' : 'form-control'"
            type="text"
            placeholder="City"
            />
            <p v-if="cityWarn" class="warning">*City is required </p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <input
            v-model="postalCode"
            @blur="postalCode === '' ? postalCodeWarn = true : postalCodeWarn = false"
            :class="postalCodeWarn ? 'warning-border form-control' : 'form-control'"
            type="text"
            class="form-control"
            placeholder="Postal code"
            />
            <p v-if="postalCodeWarn" class="warning">*Postal code is required </p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <label class="form-label">Estimated value</label>
            <div class="input-group">
            <span class="input-group-text dollor">$</span>
            <input
                v-model="estimatedValue"
                @blur="estimatedValue === '' ? estimatedValueWarn = true : estimatedValueWarn = false"
                :class="estimatedValueWarn ? 'warning-border form-control custom-dollor-input' : 'form-control custom-dollor-input'"
                type="number"
                aria-label="Amount (to the nearest dollar)"
            />
            </div>
            <p class="warning" v-if="estimatedValueWarn">*Please enter estimated value</p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <label class="form-label">Locking description</label>
            <select
            v-model="lockingDescription"
            @blur="lockingDescription === '' ? lockingDescriptionWarn = true : lockingDescriptionWarn = false"
            :class="lockingDescriptionWarn ? 'warning-border form-select' : 'form-select'"
            aria-label="Default select example"
            >
            <option value="" selected>Locking Description</option>
            <option value="1">U-lock</option>
            <option value="2">Two U-locks</option>
            <option value="3">U-lock and cable</option>
            <option value="1">Chain with padlock</option>
            <option value="2">Cable lock</option>
            <option value="3">
                Heavy duty bicycle security chain
            </option>
            <option value="1">Not locked</option>
            <option value="2">Other</option>
            </select>
            <p v-if="lockingDescriptionWarn" class="warning">*Please select locking description</p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <label class="form-label">Lock defeat description</label>
            <select
            v-model="lockDefeatDesc"
            @blur="lockDefeatDesc === '' ? lockDefeatDescWarn = true : lockDefeatDescWarn = false"
            :class="lockDefeatDescWarn ? 'warning-border form-select' : 'form-select'"
            aria-label="Default select example"
            >
            <option selected value="">Lock defeat description</option>
            <option value="1">
                Lock was cut, and left at the scene
            </option>
            <option value="2">
                Lock was opened, and left unharmed at the scene
            </option>
            <option value="3">
                Lock is missing, along with the bike
            </option>
            <option value="1">
                Object that bike was locked to was broken, removed, or
                otherwise compromised
            </option>
            <option value="2">
                Other situation, please describe below
            </option>
            <option value="3">Bike was not locked</option>
            </select>
            <p v-if="lockDefeatDescWarn" class="warning">*Please select lock defeat description</p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <label class="form-label">Department & city</label>
            <input 
            type="text"
            v-model="departmentCity"
            placeholder="Department/City"
            @blur="departmentCity === '' ? departmentCityWarn = true : departmentCityWarn = false" 
            :class="departmentCityWarn ? 'warning-border form-control' : 'form-control'" 
            />
            <p v-if="departmentCityWarn" class="warning">*Department/City is required</p>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <label class="form-label">Police report #</label>
            <input 
            type="text"
            v-model="policeReport"
            placeholder="Police report"
            @blur="policeReport === '' ? policeReportWarn = true : policeReportWarn = false" 
            :class="policeReportWarn ? 'warning-border form-control' : 'form-control'" 
            class="form-control" 
            />
            <p v-if="policeReportWarn" class="warning">*Police report is required</p>
            <div id="reportHelp" class="form-text">
            Without a valid report number, your bike won't be
            included in partner searches by
            <a href="javascript:void(0)">LeadsOnline</a>
            </div>
        </div>
        <div class="col-md-12 mb-3">
            <label class="form-label"
            >Description of the incident</label
            >
            <textarea 
            v-model="incidentDesc"
            @blur="incidentDesc === '' ? incidentDescWarn = true : incidentDescWarn = false" 
            :class="incidentDescWarn ? 'warning-border form-control' : 'form-control'" 
            class="form-control" 
            rows="4"></textarea>
            <p v-if="incidentDescWarn" class="warning">*Incident description is required</p>
        </div>
        <hr />
        <div class="col-md-12 mb-3">
            <div class="form-check">
            <input
                v-model="ownershipProof"
                class="form-check-input"
                type="checkbox"
                value="true"
                id="flexCheckDefault-4"
            />
            <label
                class="form-check-label"
                for="flexCheckDefault-4"
            >
                Do you have proof of ownership of this bike?
            </label>
            </div>
            <div id="reportHelp" class="form-text">
            If this bike was added to the Index by a bike shop, that
            counts as proof of ownership
            </div>
        </div>
        <hr />
        <div class="col-md-12 mb-3">
            <div class="form-check">
            <input
                class="form-check-input"
                v-model="notification"
                type="checkbox"
                value="true"
                id="flexCheckDefault-5"
            />
            <label
                class="form-check-label"
                for="flexCheckDefault-5"
            >
                Receive notifications from Cicla about this
                stolen bike
            </label>
            </div>
            <div id="reportHelp" class="form-text">
            e.g. if we tweet about it or see someone searching for
            its serial number
            </div>
        </div>
        <hr />
        <div class="col-md-12 mb-3">
            <div class="theme-btn universal-btn" id="button-3">
            <div id="circle"></div>
            <button type="submit" @click="saveData">
                <span
                ><i class="fal fa-exchange"></i> Save Change</span
                >
            </button>
            </div>
        </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                stolenDate: "",
                stolenDateWarn: false,
                phone: "",
                phoneWarn: false,
                secondPhone: "",
                secondPhoneWarn: false,
                showToLoggedIns: false,
                showToShops: false,
                showToLaws: false,
                country: "",
                countryWarn: false,
                addressIntersection: "",
                addressIntersectionWarn: false,
                city: "",
                cityWarn: false,
                postalCode: "",
                postalCodeWarn: false,
                estimatedValue: "",
                estimatedValueWarn: false,
                lockingDescription: "",
                lockingDescriptionWarn: false,
                lockDefeatDesc: "",
                lockDefeatDescWarn: false,
                departmentCity: "",
                departmentCityWarn: false,
                policeReport: "",
                policeReportWarn: false,
                incidentDesc: "",
                incidentDescWarn: false,
                ownershipProof: false,
                notification: false,
                isValid: false
            }
        },
        methods: {
            saveData() {
                this.checkValid()
                if(this.isValid) {
                    const inputValues = {
                        date: this.stolenDate,
                        phone: this.phone,
                        secondPhone: this.secondPhone,
                        logedins: this.showToLoggedIns,
                        shops: this.showToShops,
                        laws: this.showToLaws,
                        country: this.country,
                        addressIntersection: this.addressIntersection,
                        city: this.city,
                        postal: this.postalCode,
                        estimatedValue: this.estimatedValue,
                        lockingDesc: this.lockingDescription,
                        lockDefeat: this.lockDefeatDesc,
                        departmentCity: this.departmentCity,
                        policeReport: this.policeReport,
                        incidentDesc: this.incidentDesc,
                        owner: this.ownershipProof,
                        notice: this.notification
                    }
                    console.log(inputValues)
                    this.stolenDate = ""
                    this.phone = ""
                    this.secondPhone = ""
                    this.showToLoggedIns = false
                    this.showToShops = false
                    this.showToLaws = false
                    this.country = false
                    this.addressIntersection = ""
                    this.city = ""
                    this.postalCode = ""
                    this.estimatedValue = ""
                    this.lockingDescription = ""
                    this.lockDefeatDesc = ""
                    this.departmentCity = ""
                    this.policeReport = ""
                    this.incidentDesc = ""
                    this.ownershipProof = false
                    this.notification = false
                    this.$toasted.show('Salvo com sucesso', {
                        position: 'top-center',
                        duration: 3000
                    })
                } else {
                    this.$toasted.show('Dados inválidos', {
                        position: 'top-center',
                        duration: 3000
                    })
                }
            },
            checkValid() {
                if(this.stolenDate === '' || this.stolenDateWarn || this.phone === '' || this.phoneWarn || this.secondPhone === '' || 
                this.secondPhoneWarn || this.country === '' || this.countryWarn || this.addressIntersection === '' || this.addressIntersectionWarn
                || this.city === '' || this.cityWarn || this.postalCode === '' || this.postalCodeWarn || this.estimatedValue === '' ||
                this.estimatedValueWarn || this.lockingDescription === '' || this.lockingDescriptionWarn || this.lockDefeatDesc === '' || 
                this.lockDefeatDescWarn || this.departmentCity === '' || this.departmentCityWarn || this.policeReport === '' || this.policeReportWarn
                || this.incidentDesc === '' || this.incidentDescWarn) {
                    this.isValid = false
                } else {
                    this.isValid = true
                }
                if(this.stolenDate === '') {
                    this.stolenDateWarn = true
                } else {
                    this.stolenDateWarn = false
                }
                if(this.phone === '') {
                    this.phoneWarn = true
                } else {
                    this.phoneWarn = false
                }
                if(this.secondPhone === '') {
                    this.secondPhoneWarn = true
                } else {
                    this.secondPhoneWarn = false
                }
                if(this.country === '') {
                    this.countryWarn = true
                } else {
                    this.countryWarn = false
                }
                if(this.addressIntersection === '') {
                    this.addressIntersectionWarn = true
                } else {
                    this.addressIntersectionWarn = false
                }
                if(this.city === '') {
                    this.cityWarn = true
                } else {
                    this.cityWarn = false
                }
                if(this.postalCode === '') {
                    this.postalCodeWarn = true
                } else {
                    this.postalCodeWarn = false
                }
                if(this.estimatedValue === '') {
                    this.estimatedValueWarn = true
                } else {
                    this.estimatedValueWarn = false
                }
                if(this.lockingDescription === '') {
                    this.lockingDescriptionWarn = true
                } else {
                    this.lockingDescriptionWarn = false
                }
                if(this.lockDefeatDesc === '') {
                    this.lockDefeatDescWarn = true
                } else {
                    this.lockDefeatDescWarn = false
                }
                if(this.departmentCity === '') {
                    this.departmentCityWarn = true
                } else {
                    this.departmentCityWarn = false
                }
                if(this.policeReport === '') {
                    this.policeReportWarn = true
                } else {
                    this.policeReportWarn = false
                }
                if(this.incidentDesc === '') {
                    this.incidentDescWarn = true
                } else {
                    this.incidentDescWarn = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow:#f2ad49;
$them-color-dark: #1b1b1b;
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
textarea.form-control.font-size-textarea {
    font-size: 13px;
}
.custom-label-size {
    font-weight: normal;
    color: #464646;
    padding-bottom: 7px;
    font-size: 14px;
}
.admin-tab-content {
    border: 1px solid #ddd;
    padding: 25px;
    background: #fff;
    border-radius: 6px;
    margin-bottom: 50px;
    .form-control:focus, .form-select:focus {
        color: #212529;
        background-color: #fff;
        border-color: #fd5044;
        outline: 0;
        box-shadow: none;
    }

    input.form-control,  select.form-select {
        height: 50px;
    }
    .form-label,  .form-check-label {
        font-size: 15px;
        color: #242323;
    }
    .universal-btn#button-3 button{
        font-size: 16px !important;
    }  

    .photo-frame .universal-btn#button-3 button{
        font-size: 16px !important;
        padding: 5px 20px;
    }  
  }


.bike-form .form-control:focus, .bike-form .form-select:focus {
    color: #212529;
    background-color: #fff;
    border-color: #fd5044;
    outline: 0;
    box-shadow: none;
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
.form-field-separator-gray{
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
                background: rgba(255,255,255,0.9);
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
            .edit-image a:hover{
                color: #fd5044;
            }
        }
       
}

.group_organization{
      .photo-frame {
            width: 100%;
            height: 340px;
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            background-position: center;
            background-size: cover;

            .edit-image {
                background: rgba(255,255,255,0.9);
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                padding: 8px;
            }
            .edit-image i {
                color: #fd5044;
            }
            .edit-image a, label{
                color: #212529;
                font-size: 14px;
            }
            .edit-image a:hover{
                color: #fd5044;
            }  
            .overlay {
                background: rgba(0,0,0,0.5);
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
        p{
            font-size: 15px;
            color: #000;
            margin-bottom: 5px;
            line-height: 2;
            a{
                color: #fd5044;
            }
        }

}
.theme-btn.universal-btn.text-white span {
    color: #fff !important;
}

#button-4  {
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
#button-4.theme-btn.outline-btn{
    background: transparent;
}
#button-4:hover #circle2 {
	width: 200%;
	height: 500%;
	opacity: 1;
	top: -70px;
	left: -70px;
    background: #fd5044;
	color: #FFFFFF;
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
	-webkit-transition: all .5s ease-Out;
	transition: all .5s ease-Out;
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
#button-5.theme-btn{
    background: transparent;
}
#button-5:hover #circle5 {
	width: 200%;
	height: 500%;
	opacity: 1;
	top: -70px;
	left: -70px;
    background: #121212;
	color: #FFFFFF;
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
	-webkit-transition: all .5s ease-Out;
	transition: all .5s ease-Out;
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


.stolen-bike-user-bike{
    .activate-promoted-alert{
        label.card.mb-3.form-check-label {
            height: 100%;
        .card-title{
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
.stolen-bike-user-bike .check-list{
    padding-left: 0;
    margin-bottom: 0;
    li{
        display: flex;
        align-items: start;
        flex-wrap: nowrap;
    .stolen-check-box-link{
        color: $them-color;
        transition: all 0.3s ease-in-out;
        &:hover{
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
    .delete-line{
        text-decoration: line-through;
    }
}
li:not(:last-child){
    margin-bottom: 10px;
}
}
ul.ps-0.row.justify-content-around.social-media{
    margin-top: 29px;
    a{
       padding: 12px 39px;
        border-radius: 4px;
    }
    .facebook{
        background-color: #3b5998;
    }
    .twitter{
        background-color: #1d9bf0;
    }
}
div#pills-tabContent{
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
.bg-green{
    background-color:#5cb85c !important;
}
//stolen-bike-user-bike css end

//media
@media screen and (max-width: 767px) {
  .sideTabbar{
    margin-right: 0;
    margin-bottom: 20px;
}

.sideTabbar .nav-tabs .nav-link{
    font-size: 14px !important;
}
.them-title-black{
    font-size: 16px;
}

.admin-tab-content{
    padding: 15px;
}


ul.ps-0.row.justify-content-around.social-media a{
    padding: 12px 23px;
    border-radius: 4px;
    float: left;
    width: 100%;
}
    .mob-mt{
        margin-top: 15px !important;
    }
    .admin-tab-content{
        margin-bottom: 30px !important;
    }
}
</style>
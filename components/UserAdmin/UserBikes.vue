<template>
    <div>
          <section class="section-padding theme-bg-light float-start">
    <div class="theme-container">
      <div class="my-bikes">
          <div class="row align-items-center mb-4">
              <div class="col-md-6"><h3>Your Bikes</h3></div>
               <div class="col-md-6 text-end"><div class="theme-btn universal-btn outline-btn" id="button-4">
            <div id="circle2"></div>
            <button type="submit"><span>  Add new bike </span></button>
            </div></div>
          </div>
            
          <div class="stolen-bike-box">
          <a href="#!">
            <div class="stolen-content-box">
              <div class="stolen-bike-image">
                <img src="~assets/images/stolen-bike.jpg" alt="img">
              </div>
              <div class="stolen-bike-info">
              <h4>2021 Rad Power Bikes Mini step through</h4>
              <ul>
              <li><span>Model:</span> C13I0921</li>
              <li><span>Location:</span> Edmonton - CA</li>
              <li><span>colors:</span> Black , White</li>
              </ul>
              <div class="bike-info">
                  <a href="#!" class="edit"><i class="fal fa-edit"></i> Edit Bike</a>
                   <a href="#!" class="stolen"><i class="fal fa-motorcycle"></i> Mark bike stolen</a>
              </div>
              </div>
            </div>
          </a>
        </div>


          <div class="stolen-bike-box">
          <a href="#!">
            <div class="stolen-content-box">
              <div class="stolen-bike-image">
                <img src="~assets/images/stolen-bike.jpg" alt="img">
              </div>
              <div class="stolen-bike-info">
              <h4><span class="text-danger"><b>STOLEN</b></span> 2021 Rad Power Bikes Mini step through</h4>
              <ul>
              <li><span>Model:</span> C13I0921</li>
              <li><span>Location:</span> Edmonton - CA</li>
              <li><span>colors:</span> Black , White</li>
              </ul>
              <div class="bike-info">
                  <a href="#!" class="edit"><i class="fal fa-edit"></i> Edit Bike</a>
              </div>
              </div>
            </div>
          </a>
        </div>

      </div>

    </div>
  </section>
    </div>
</template>

<script>
    export default {
        data () {
            return { 
            }
        }
    }
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
// List Box
.my-bikes {
    max-width: 800px;
    margin: auto;

    .bike-info {
    width: 100%;
    float: left;
    padding-bottom: 15px;

& a.edit {
    color: #000 !important;
    font-weight: 600;
    float: left;
}

& a.stolen {
    color: #f00 !important;
    font-weight: 600;
    float: left;
    padding-top: 4px;
}




}
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
        color: $them-color;
    }
    li.found span {
        color: #0fa816 !important;
    }

     a {
        width: 100%;
        color: #212529;
    }

    .stolen-bike-image {
        width: 32%;
        float: left;
        border-radius: 4px;
        overflow: hidden;

       img {
            object-fit: cover;
            min-height: 188px;
        }
    }

    .stolen-bike-info {
        width: 68%;
        float: left;
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

section.contact-images {
    width: 100%;
    padding: 40px 0px;
    ul.d-flex.justify-content-between {
        padding-left: 0;
        margin-bottom: 0;
        img{
            opacity: 0.6;
            transition: all 0.3s ease-in-out;
            &:hover{
                opacity: 1;
            }
        }
    }
}


@media only screen and (max-width: 767px) {
       .stolen-bike-info {
    padding-left: 0 !important;
}
.stolen-bike-box{
    background: #fff;
    padding: 0;
.mt-5.mobile-margin {
    margin: 0 !important;
}
     .stolen-bike-info{
    width: 100%;
    float: left;
    padding-left: 15px;
}
}
.stolen-bike-box .stolen-bike-image{
    width: 100%;
}

}
</style>
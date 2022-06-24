<template>
    <div class="admin-tab-content">
        <div class="section-title pb-4">
        <h4 class="them-title-black mb-2">
           MARQUE ESTA BICICLETA RECUPERADA
        </h4>
        </div>
        <div class="theme-btn bg-green universal-btn" id="button-3" data-bs-toggle="modal" data-bs-target="#bike-back">
        <div id="circle"></div>
        <button>Esta bicicleta foi recuperada!</button>
        </div>
    </div>
</template>

<script>
    export default {
        
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
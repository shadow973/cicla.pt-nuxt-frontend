<template>
  <div class="col-12 col-md-5">
    <div class="contact-us-bg-img" data-aos="fade" data-aos-once="true">
      <div class="contact-us-content">
        <h4 class="them-title" v-if="data.sub_title">{{data.sub_title}} </h4>
        <ul class="office-information" v-if="data.sub_content">
          <li v-for="(info,index) in data.sub_content" :key="index">
            <a href="javascript:volid(0)" class="d-flex">
              <i :class="info.icon" ></i>
              <p>{{ info.title }}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:["data"],
  
}
</script>
<style lang="scss">
$them-color: #fd5044;
.contact-us.contact-label {
  width: 100%;
  background-color: #f9fbfc;

  form .form-floating > .custom-input:focus ~ .custom-label,
  form .form-floating > .custom-input:not(:placeholder-shown) ~ .custom-label,
  form .form-floating > .form-select ~ .custom-label {
    opacity: 1;
    transform: scale(0.85) translateY(-11px) translateX(0.8rem) !important;
    color: #6a6a6a !important;
    background-color: #ffffff;
    height: 26px;
    color: #686868;
    font-size: 16px;
    padding: 0;
  }

  label.custom-label {
    padding: 13px 10px;
    font-size: 15px;
    color: #686868;
  }

  .contact-us-bg-img {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url(~assets/images/contact-us-bg-img.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    height: 100%;
    z-index: 1;
    padding: 45px 40px;
    border-radius: 5px;
    .contact-us-content {
      width: 100%;
      h4 {
        text-transform: uppercase;
        margin-bottom: 40px;
      }
      .office-information {
        padding-left: 0px;
        margin-bottom: 0;
        li {
          margin-bottom: 32px;
        }
        p {
          margin-bottom: 0;
          font-size: 18px;
          line-height: 30px;
          font-weight: 400;
          color: #fff;
          transition: all 0.3s ease-in-out;
        }
        a {
          transition: all 0.3s ease-in-out;
          color: #fff;
        }
        & li:hover a {
          color: $them-color !important;
        }
        & li:hover a p {
          color: $them-color !important;
        }
        i {
          font-size: 30px;
        }
      }
    }
  }
  .get-in-get-touch {
    border: 1px solid #b3b3b3;
    border-radius: 5px;
    padding: 40px;
    margin-left: 60px;
    background: #ffffff;
    p {
      font-size: 15px;
      font-weight: 400;
      color: #000;
      line-height: 26px;
      margin-bottom: 0;
      padding-bottom: 30px;
    }
  }
}

section.contact-images {
  width: 100%;
  padding: 60px 0px;
  ul.d-flex.justify-content-between {
    padding-left: 0;
    margin-bottom: 0;
    img {
      opacity: 0.6;
      transition: all 0.3s ease-in-out;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
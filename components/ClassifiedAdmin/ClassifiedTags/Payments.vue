<template>
  <div>
    <div class="admin-tab-content pb-0">
      <div class="section-title text-center">
        <h4 class="them-title-black mb-2">COD System</h4>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <div class="cod-images mw-50 mx-auto">
          <img src="images/cod.jpg" alt="img" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>



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

  header.site-header.user-admin .custom-nav-height a {
    font-size: 12px;
  }
}

@media screen and (max-width: 1100px) {
}

@media screen and (max-width: 991px) {

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

  .admin-tab-content {
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 0px;
  }
  .them-title-black {
    font-size: 20px;
  }
}
.cod-images img {
    max-width: 450px;
    margin-top: 30px;
}
@media screen and (max-width: 579px) {
}

</style>


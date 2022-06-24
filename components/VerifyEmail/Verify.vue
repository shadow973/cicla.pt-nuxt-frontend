<template>

<section class="theme-bg-light section-padding">
    <div class="theme-container">
        <div class="row">
            <div class="col-md-12">
            <div class="verify-mail-box">
                <img src="~/assets/images/email-verify.png" alt="img">
            <h3 class="text-uppercase">Obrigado por se registar na Cicla!</h3>
            <h5 class="mb-3">Por favor valide o seu Email</h5>
            <p>Enviámos um email para <span class="verify-email-show">{{__getEmail}} </span> com um link de confirmação. <br>Por favor siga esse link para finalizar o registo.</p>
            <p>Não recebeu um email nosso? Por favor verifique a sua pasta de SPAM.<br> Caso não encontre podemos voltar a enviar aqui</p>

            <div class="theme-btn universal-btn m-auto customButton" id="button-3">
                <div id="circle"></div>
                <button type="submit" @click="verify" class="d-flex text-capitalize"><span> <i class="fal fa-sync"></i> Re-enviar o email de confirmação </span></button>
                </div>
            </div>              
            </div>
        </div>
    </div>
</section>
</template>

<script>
import api from '../../services'
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            __getEmail: 'product/getEmail'
        })
    },
    methods: {
        async verify() {
            const email = {
                email: this.__getEmail
            }
            await api.product.emailConfirmation(email)
            this.$toasted.show('Verificação enviada com sucesso.', {
                position: 'top-center',
                duration: 3000
            })
            window.location = window.location.origin + '/login'
        },
    }
}
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow:#f2ad49;
$them-color-dark: #1b1b1b;

// Left Sidebar
.verify-mail-box {
    text-align: center;
    background: #fff;
    padding: 50px;
    max-width: 820px;
    margin: auto;
    box-shadow: 2px 3px 74px -5px #ddd;
    border-radius: 20px;
	img {
		max-width: 80%;
		margin-bottom: 30px;
	}
	p {
		font-size: 16px;
	}
	span.verify-email-show {
	  color: $them-color;
	  font-weight: bold;
	}
}

</style>
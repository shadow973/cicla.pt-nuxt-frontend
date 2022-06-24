<template>
        <section class="bike-register text-center section-padding theme-bg-light">
        <div class="theme-container">
        <div class="section-title pb-5">
            <h4 class="them-title mb-0" v-if="data" >#{{ data.name }}</h4>
        </div>
        <div data-aos="fade" data-aos-once="true">
            <div class="faqs-section row" v-if="data.content && data.content.length>0">
                <div class="faq accordion col-md-8 mx-auto" :class="{expanded: visibleValue !== index}" @click="visibleSection(index)" v-for="(faq,index) in data.content" :key="index">
                  <div class="question-wrapper">
                    <div class="d-flex align-items-center"><span class="q-mark d-block">Q.</span>
                      <p class="question" title="">{{ faq.title }}</p>
                    </div><i class="fal fa-chevron-down"></i>
                  </div>
                  <div class="answer-wrapper" :class="{class: visibleValue === index}" style="display: none;">
                    <p class="answer">{{ faq.description }}</p>
                  </div>
                </div>
            </div>
        </div>
        </div>

        </section>
</template> 
<script>
export default {
  props : ["data"],
  data(){
    return{
      visibleValue: ''
    }
  },
  methods:{
    visibleSection(val){
      if(this.visibleValue === val){
        this.visibleValue = ''
      } else {
        this.visibleValue = val
      }
    }
  }
}
</script>
<style lang="scss">
$them-color: #fd5044;
$them-color-yellow:#f2ad49;
$them-color-dark: #1b1b1b;

// FAQ

.faq.accordion.expanded .question-wrapper {
    background: #f0f0f0;
    color: #000;
}
.faq.accordion.expanded .question-wrapper span.q-mark.d-block {
    color: rgb(238, 41, 41);
}

.faq.accordion.expanded .question-wrapper .question {
	font-size: 20px;
	color: #141414;
	line-height: 1.5;
	padding: 20px;
	margin-bottom: 0;
}

.faq.accordion{
    margin-bottom: 15px;
     .question-wrapper {
        position: relative;
        background: $them-color;
        cursor: pointer;
        color: #f0f0f0;
    }


    .q-mark {
        color: #ffffff;
        padding: 18px 0 18px 18px;
    }
.question {
	font-size: 20px;
	color: #ffffff;
	line-height: 1.5;
	padding: 20px;
	margin-bottom: 0;
}
.material-icons {
	&.drop {
		padding: 20px;
		font-size: 2rem;
		color: #d40119;
		transition: transform 0.5s ease-in-out;
	}
}

.answer {
    font-size: 16px;
    color: #5c5c5c;
    padding: 16px;
    background-color: #fff;
    overflow: hidden;
    text-align: left;
    box-shadow: 2px 3px 12px #e6e6e6;
}
.accordion {
	background-color: #fff;
	color: #444;
	cursor: pointer;
	width: 100%;
	margin-bottom: 20px;
	text-align: left;
	border: none;
	outline: none;
	transition: 0.4s;
	box-shadow: 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2);
	border-radius: 4px;
}

.question-wrapper {
    position: relative;
    i.fal.fa-chevron-down {
        position: absolute;
        right: 25px;
        top: 25px;
    }
}
.answer-wrapper.class {
    display: block !important;
}
}

@media screen and (max-width: 767px){
.faq.accordion.expanded .question-wrapper .question {
    font-size: 14px;
    padding: 10px;
    text-align: left;
}

.faq.accordion .question {
    font-size: 14px;
    padding: 10px;
    text-align: left
}
}


</style>
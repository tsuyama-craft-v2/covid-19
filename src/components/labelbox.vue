<template>
  <div class="containar-lg">
    <section class="row p-0">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary" @click="toggleTsuyama()">
          津山
        </button>
        <button type="button" class="btn btn-primary" @click="toggleOkayama()">
          岡山
        </button>
        <button type="button" class="btn btn-primary" @click="toggleZenkoku()">
          全国
        </button>
      </div>
    </section>
    <section class="row m-1">
      <section class="containar">感染者数</section>
    </section>
    <section class="row mx-1">
      <div class="containar" v-if="kansensya.tsuyama">
        <p class="lead">{{ lavelValue.infected_tsuyama }}<br /></p>
        <p class="ueo">{{ lavelValue.infected_data3 }}</p>
      </div>
      <div class="containar" v-if="kansensya.okayama">
        <p class="lead">{{ lavelValue.infected_okayama }}<br /></p>
        <p class="ueo">{{ lavelValue.infected_data2 }}</p>
      </div>
      <div class="containar" v-if="kansensya.zenkoku">
        <p class="lead">{{ lavelValue.infected_zenkoku }}<br /></p>
        <p class="ueo">{{ lavelValue.infected_data1 }}</p>
      </div>
    </section>

    <section class="row m-1">
      <section class="containar">PCR検査数</section>
    </section>
    <section class="row mx-1">
      <div class="containar" v-if="kansensya.tsuyama">
        <p class="lead">{{ lavelValue.pcr_tsuyama }}<br /></p>
        <p class="ueo">{{ lavelValue.pcr_data3 }}</p>
      </div>
      <div class="containar" v-if="kansensya.okayama">
        <p class="lead">{{ lavelValue.pcr_okayama }}<br /></p>
        <p class="ueo">{{ lavelValue.pcr_data2 }}</p>
      </div>
      <div class="containar" v-if="kansensya.zenkoku">
        <p class="lead">{{ lavelValue.pcr_zenkoku }}<br /></p>
        <p class="ueo">{{ lavelValue.pcr_data1 }}</p>
      </div>
    </section>

    <section class="row p-1">
      <section class="containar">死者数</section>
    </section>
    <section class="row px-1">
      <div class="containar" v-if="kansensya.tsuyama">
        <p class="lead">{{ lavelValue.dead_tsuyama }}<br /></p>
        <p class="ueo">{{ lavelValue.dead_data3 }}</p>
      </div>
      <div class="containar" v-if="kansensya.okayama">
        <p class="lead">{{ lavelValue.dead_okayama }}<br /></p>
        <p class="ueo">{{ lavelValue.dead_data2 }}</p>
      </div>
      <div class="containar" v-if="kansensya.zenkoku">
        <p class="lead">{{ lavelValue.dead_zenkoku }}<br /></p>
        <p class="ueo">{{ lavelValue.dead_data1 }}</p>
      </div>
    </section>

    <section class="row p-1">
      <section class="containar">退院者数</section>
    </section>
    <section class="row px-1">
      <div class="containar" v-if="kansensya.tsuyama">
        <p class="lead">{{ lavelValue.discharge_tsuyama }}<br /></p>
        <p class="ueo">{{ lavelValue.discharge_data3 }}</p>
      </div>
      <div class="containar" v-if="kansensya.okayama">
        <p class="lead">{{ lavelValue.discharge_okayama }}<br /></p>
        <p class="ueo">{{ lavelValue.dead_data2 }}</p>
      </div>
      <div class="containar" v-if="kansensya.zenkoku">
        <p class="lead">{{ lavelValue.discharge_zenkoku }}<br /></p>
        <p class="ueo">{{ lavelValue.discharge_data1 }}</p>
      </div>
    </section>

    <section class="row p-1">
      <section class="containar">病床使用数</section>
    </section>
    <section class="row px-1">
      <div class="containar" v-if="kansensya.okayama">
        <p class="lead">
          {{ lavelValue.bedUse }}/{{ lavelValue.bedAll }}<br />
        </p>
        <p class="ueo">{{ lavelValue.dead }}</p>
      </div>
      <div class="containar" v-if="kansensya.tsuyama||kansensya.zenkoku">
        <p class="lead">No data</p>
      </div>
    </section>

    <!--<div
      style="text-align: left"
      class="btn"
      v-if="kansensya.tsuyama || kansensya.okayama"
    >
      <button
        v-if="msg == '感染者数'"
        type="button"
        class="btn btn-outline-primary"
        @click="$router.push('/Detailspage_munic')"
      >
        市町村ごとの感染者数
      </button>
      <button
        v-if="msg == '感染者数'"
        type="button"
        class="btn btn-outline-primary"
        @click="$router.push('/Detailspage_tsuyama')"
      >
        詳細
      </button>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "LabelBox",
  data() {
    return {
      kansensya: {
        tsuyama: true,
        okayama: false,
        zenkoku: false,
      },
    };
  },
  computed: {
    zenkokuId: function () {
      return this.idname + "zenkoku";
    },
    okayamaId: function () {
      return this.idname + "okayama";
    },
    tsuyamaId: function () {
      return this.idname + "tsuyama";
    },
  },
  methods: {
    toggleTsuyama() {
      this.kansensya.tsuyama = true;
      this.kansensya.okayama = false;
      this.kansensya.zenkoku = false;
      this.$emit(
        "toggle",
        this.kansensya.tsuyama,
        this.kansensya.okayama,
        this.kansensya.zenkoku
      );
    },
    toggleOkayama() {
      this.kansensya.tsuyama = false;
      this.kansensya.okayama = true;
      this.kansensya.zenkoku = false;
      this.$emit(
        "toggle",
        this.kansensya.tsuyama,
        this.kansensya.okayama,
        this.kansensya.zenkoku
      );
    },
    toggleZenkoku() {
      this.kansensya.tsuyama = false;
      this.kansensya.okayama = false;
      this.kansensya.zenkoku = true;
      this.$emit(
        "toggle",
        this.kansensya.tsuyama,
        this.kansensya.okayama,
        this.kansensya.zenkoku
      );
    },
  },
  props: {
    msg: {
      type: String,
    },
    idname: {
      type: String,
    },
    lavelValue: {
      type: Object,
    },
  },
};
</script>

<style>
/*
.box27 {
  position: relative;
  margin: 3rem auto;
  padding: 20px;
  border: solid 3px #f84c4c;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  height: 9rem;
}
@media screen and (min-width: 480px) {
  .box27 {
    margin: 5rem auto;
    height: 16rem;
  }
}
.box27 .box-title {
  position: absolute;
  display: inline-block;
  top: -27px;
  left: -3px;
  padding: 0 9px;
  height: 25px;
  line-height: 25px;
  font-size: 1rem;
  background: #f84c4c;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px 5px 0 0;
}
@media screen and (min-width: 480px) {
  .box27 .box-title {
    font-size: 2rem;
    top: -45px;
    padding: 9px;
  }
}

.tab-label {
  color: White;
  background: LightGray;
  margin: 0 0;
  padding: 3px 10px;
  order: -1;
  font-size: 12px;
  height: 1.3rem;
}
@media screen and (min-width: 480px) {
  .tab-label {
    font-size: 24px;
    margin: 0 auto;
    height: 2rem;
  }
}
.text {
  width: 100%;
  display: none;
  color: black;
  font-size: 25px;
  font-family: MS sans-serif;
  margin-top: 1em;
}
/*.ueo {
  font-size: 0.8rem;
  text-align: center;
}*/
.btn .municipalities {
  padding: 5px 10px;
  margin-right: 5%;
}
.btn_Detailes {
  padding: 5px 10px;
}
@media screen and (min-width: 480px) {
  .text {
    font-size: 40px;
  }
  .ueo {
    font-size: 1rem;
  }
}

/* タブ、ラジオボタン非表示 */
input[name="TAB"] {
  display: none;
}

/* アクティブなタブ */
input[name="TAB"]:checked + .tab-label {
  background: DeepSkyBlue;
}
.tab-switch:checked + .tab-label + .text {
  display: block;
}
</style>

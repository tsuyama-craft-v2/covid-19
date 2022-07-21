<template>
  <div class="containar-lg">
    <section class="row">
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
    <section class="row">
      <section class="containar">感染者数</section>
    </section>
    <section class="row">
      <div class="containar" v-if="kansensya.tsuyama">
        {{ labelvalue.infected_tsuyama }}<br />
        <p class="ueo">{{ labelvalue.infected_data3 }}</p>
      </div>
      <div class="containar" v-if="kansensya.okayama">
        {{ labelvalue.infected_okayama }}<br />
        <p class="ueo">{{ labelvalue.infected_data2 }}</p>
      </div>
      <div class="containar" v-if="kansensya.zenkoku">
        {{ labelvalue.infected_zenkoku }}<br />
        <p class="ueo">{{ labelvalue.infected_data1 }}</p>
      </div>
    </section>
    <section class="row">
      <section class="containar">死者数</section>
    </section>

    <div
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
    </div>
  </div>


  <form>
    <div class="box27">
      <span class="box-title">{{ msg }}</span>

      <input
        type="radio"
        :id="tsuyamaId"
        name="TAB"
        class="tab-switch"
        checked="checked"
      /><label :for="tsuyamaId" class="tab-label">津山</label>
      <div class="text">
        {{ labelvalue.tsuyama }}<br />
        <p class="ueo">{{ labelvalue.data3 }}</p>
        <div style="text-align: left" class="btn">
          <button
            v-if="msg == '感染者数'"
            type="button"
            class="municipalities"
            @click="$router.push('/Detailspage_munic')"
          >
            市町村ごとの感染者数
          </button>
          <button
            v-if="msg == '感染者数'"
            type="button"
            class="btn_Detailes"
            @click="$router.push('/Detailspage_tsuyama')"
          >
            詳細
          </button>
        </div>
      </div>

      <input type="radio" :id="okayamaId" name="TAB" class="tab-switch" /><label
        :for="okayamaId"
        class="tab-label"
        >岡山</label
      >
      <div class="text">
        {{ labelvalue.okayama }}<br />
        <p class="ueo">{{ labelvalue.data2 }}</p>
        <div style="text-align: left" class="btn">
          <button
            v-if="msg == '感染者数'"
            type="button"
            class="municipalities"
            @click="$router.push('/Detailspage_munic')"
          >
            市町村ごとの感染者数
          </button>
          <button
            v-if="msg == '感染者数'"
            type="button"
            class="btn_Detailes"
            @click="$router.push('/Detailspage')"
          >
            詳細
          </button>
        </div>
      </div>

      <input type="radio" :id="zenkokuId" name="TAB" class="tab-switch" /><label
        :for="zenkokuId"
        class="tab-label"
        >全国</label
      >
      <div class="text">
        {{ labelvalue.zenkoku }}<br />
        <p class="ueo">{{ labelvalue.data1 }}</p>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "labelbox",
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
    },
    toggleOkayama() {
      this.kansensya.tsuyama = false;
      this.kansensya.okayama = true;
      this.kansensya.zenkoku = false;
    },
    toggleZenkoku() {
      this.kansensya.tsuyama = false;
      this.kansensya.okayama = false;
      this.kansensya.zenkoku = true;
    },
    toggleMode(data) {
      switch (data) {
        case "tsuyama":
          this.kansensya.tsuyama = true;
          this.kansensya.okayama = false;
          this.kansensya.zenkoku = false;
          break;
        case "okayama":
          this.kansensya.tsuyama = false;
          this.kansensya.okayama = true;
          this.kansensya.zenkoku = false;
          break;
        case "zenkoku":
          this.kansensya.tsuyama = false;
          this.kansensya.okayama = false;
          this.kansensya.zenkoku = true;
          break;
      }
    },
  },
  props: {
    msg: {
      type: String,
    },
    idname: {
      type: String,
    },
    labelvalue: {
      type: Object,
    },
  },
};
</script>

<style>
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
.ueo {
  font-size: 0.8rem;
  text-align: center;
}
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

<template>
  <MainMenu current="mainpage_vietnam"></MainMenu>
  <!--<MainMenu judge="0" />-->
  <div class="containar" v-if="readyToshowMainPage">
    <section>
      <div class="row p-3 m-3">
        <LabelBox
          class="col-lg-4 p-0 border border-primary"
          msg="感染者数"
          idname="kansen"
          :lavelValue="infected"
          @toggle="toggle"
        />
        <div class="col-lg-7 ps-lg-5 ms-lg-5" v-if="kansensya.tsuyama||kansensya.zenkoku">
          <h1>Tsuyama liệu Covid</h1>
          <ChartBar/>
        </div>
        <div class="col-lg-7 ps-lg-5 ms-lg-5" v-if="kansensya.okayama">
          <h1>Okayama liệu Covid</h1>
          <DetailPage/>
        </div>
      </div>
    </section>
  </div>
  <div
    v-else
    class="align-items-center d-flex justify-content-center"
    style="height: 400px"
  >
    <div
      class="spinner-border text-primary"
      style="width: 6rem; height: 6rem"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="containar" v-if="readyToshowMainPage">
    <section>
      <div class="row p-3 m-3">
        <div class="col">
          <h1>Theo đô thị liệu Covid</h1>
          <ChartHorBar/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ChartBar from "../components/ChartBar_Vietnam.vue";
import ChartHorBar from "../components/ChartHorBar_Vietnam.vue";
import LabelBox from "../components/LabelBox_Vietnam.vue";
import MainMenu from "../components/MainMenu_Vietnam.vue";
import axios from "axios";
import { parse } from "csv";
import Encoding from "encoding-japanese";
import DetailPage from '../components/DetailPage.vue';

export default {
  name: "MainPage_Vietnam",
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      kenDetails: [],
      kenUtiwake: [],
      kenPcr: [],
      kenDead: [],
      kenIryou: [],
      Zenkoku: [],
      last: [],
      //ZenkokuDetail: [],
      kansensya: {
        tsuyama: true,
        okayama: false,
        zenkoku: false,
      },
    };
  },
  components: {
    LabelBox,
    ChartBar,
    MainMenu,
    ChartHorBar,
    DetailPage,
  },
  computed: {
    readyToshowMainPage: function () {
      return (
        this.kenDetails.length > 0 &&
        this.kenUtiwake.length > 0 &&
        this.kenPcr.length > 0 &&
        this.kenDead.length > 0 &&
        this.kenIryou.length > 0 &&
        this.Zenkoku.length > 0
      );
    },
    zenkokuId: function () {
      return "zenkoku";
    },
    use: function () {
      return (
        Number(
          this.kenDead[this.kenDead.length - 1]["患者_入院中_入院予定含む"]
        ) +
        Number(
          this.kenDead[this.kenDead.length - 1]["患者_宿泊療養施設に入所中"]
        )
      );
    },
    all: function () {
      return (
        Number(this.kenIryou[this.kenIryou.length - 1]["確保数_病床"]) +
        Number(this.kenIryou[this.kenIryou.length - 1]["確保数_宿泊療養施設"])
      );
    },
    update: function () {
      let hiduke =
        this.kenDead[this.kenDead.length - 1]["公表_年月日"].split("/");
      for (let i = 1; i < 3; i++) {
        if (hiduke[i].length == 1) {
          hiduke[i] = "0" + hiduke[i];
        }
      }
      const hidukedata =
        "※" + hiduke[0] + "年" + hiduke[1] + "月" + hiduke[2] + "日時点";
      return hidukedata;
    },
    infected: function () {
      //const filteredZenkoku = this.ZenkokuDetail.reduce((p,x)=>p+x["PCR 検査陽性者数(単日)"],0)
      const filteredZenkoku = this.Zenkoku.reduce(
        (sum, each) => sum + each["npatients"],
        0
      );
      let a = this.kenUtiwake[this.kenUtiwake.length - 1]["公表年月日"].replace(
        "年",
        "/"
      );
      a = a.replace("月", "/");
      a = a.replace("日", "/");
      a = a.split("/");
      for (let i = 1; i < 3; i++) {
        if (a[i].length == 1) {
          a[i] = "0" + a[i];
        }
      }
      const hiduke = "※" + a[0] + "/" + a[1] + "/" + a[2] + "ngày thời điểm";
      let gata = this.last.split("-");
      gata = "※" + gata[0] + "/" + gata[1] + "/" + gata[2] + "ngày thời điểm";

      //pcr____________________________________________
      const filteredZenkokuPcr = this.Zenkoku.reduce(
        (sum, each) => sum + each["ninspections"],
        0
      );
      const filteredOkayamaPcr = this.kenPcr.filter(function (each) {
        if (each.集計時点_年月日 != "") return true;
      });
      const hiduke_pcr =
        filteredOkayamaPcr[filteredOkayamaPcr.length - 1].集計時点_年月日.split(
          "/"
        );
      if (hiduke_pcr[2].length == 1) {
        hiduke_pcr[2] = "0" + hiduke_pcr[2];
      }
      const hiduke_pcrData =
        "※" +
        hiduke_pcr[0] +
        "年" +
        hiduke_pcr[1] +
        "月" +
        hiduke_pcr[2] +
        "日時点";
      let gata_pcr = this.last.split("-");
      gata_pcr =
        "※" + gata_pcr[0] + "年" + gata_pcr[1] + "月" + gata_pcr[2] + "日時点";
      //_________________________________________________

      //dead_____________________________________________
      const filteredZenkokuDead = this.Zenkoku.reduce(
        (sum, each) => sum + each["ndeaths"],
        0
      );
      let hiduke_dead =
        this.kenDead[this.kenDead.length - 1]["公表_年月日"].split("/");
      for (let i = 1; i < 3; i++) {
        if (hiduke_dead[i].length == 1) {
          hiduke_dead[i] = "0" + hiduke_dead[i];
        }
      }
      const hiduke_deadData =
        "※" +
        hiduke_dead[0] +
        "年" +
        hiduke_dead[1] +
        "月" +
        hiduke_dead[2] +
        "日時点";
      let gata_dead = this.last.split("-");
      gata_dead =
        "※" +
        gata_dead[0] +
        "年" +
        gata_dead[1] +
        "月" +
        gata_dead[2] +
        "日時点";

      //_________________________________________________

      //discharge________________________________________
      const filteredZenkokuDis = this.Zenkoku.reduce(
        (sum, each) => sum + each["nexits"],
        0
      );
      let hiduke_discharge =
        this.kenDead[this.kenDead.length - 1]["公表_年月日"].split("/");
      for (let i = 1; i < 3; i++) {
        if (hiduke_discharge[i].length == 1) {
          hiduke_discharge[i] = "0" + hiduke_discharge[i];
        }
      }
      const hiduke_dischargeData =
        "※" + hiduke[0] + "年" + hiduke[1] + "月" + hiduke[2] + "日時点";
      let gata_discharge = this.last.split("-");
      gata_discharge =
        "※" +
        gata_discharge[0] +
        "年" +
        gata_discharge[1] +
        "月" +
        gata_discharge[2] +
        "日時点";
      //_________________________________________________

      return {
        //zenkoku:filteredZenkoku,
        infected_zenkoku: filteredZenkoku + "人",
        infected_okayama: this.kenUtiwake.length + "人",
        infected_tsuyama:
          this.kenUtiwake.filter(function (each) {
            if (each.患者＿居住地 == "津山市") return true;
          }).length + "người",
        infected_data1: gata,
        infected_data2: hiduke,
        infected_data3: hiduke,

        //pcr
        pcr_zenkoku: filteredZenkokuPcr + "人",
        pcr_okayama:
          this.kenPcr.reduce(function (accu, value) {
            return accu + Number(value["検査実施人数"]);
          }, 0) + "人",
        pcr_tsuyama: "Không có dữ liệu",
        pcr_data1: gata_pcr,
        pcr_data2: hiduke_pcrData,
        pcr_data3: "",

        //dead
        dead_zenkoku: filteredZenkokuDead + "人",
        dead_okayama: this.kenDead[this.kenDead.length - 1]["患者_死亡"] + "人",
        dead_tsuyama: "Không có dữ liệu",
        dead_data1: gata_dead,
        dead_data2: hiduke_deadData,
        dead_data3: "",

        //discharge
        discharge_zenkoku: filteredZenkokuDis + "人",
        discharge_okayama:
          this.kenDead[this.kenDead.length - 1]["患者_退院等"] + "人",
        discharge_tsuyama: "Không có dữ liệu",
        discharge_data1: gata_discharge,
        discharge_data2: hiduke_dischargeData,
        discharge_data3: "",

        //病床使用数
        bedUse:
          Number(
            this.kenDead[this.kenDead.length - 1]["患者_入院中_入院予定含む"]
          ) +
          Number(
            this.kenDead[this.kenDead.length - 1]["患者_宿泊療養施設に入所中"]
          ),
        bedAll:
          Number(this.kenIryou[this.kenIryou.length - 1]["確保数_病床"]) +
          Number(
            this.kenIryou[this.kenIryou.length - 1]["確保数_宿泊療養施設"]
          ),
      };
    },
    pcr: function () {
      const filteredZenkokuPcr = this.Zenkoku.reduce(
        (sum, each) => sum + each["ninspections"],
        0
      );
      const filteredOkayamaPcr = this.kenPcr.filter(function (each) {
        if (each.集計時点_年月日 != "") return true;
      });
      const hiduke =
        filteredOkayamaPcr[filteredOkayamaPcr.length - 1].集計時点_年月日.split(
          "/"
        );
      if (hiduke[2].length == 1) {
        hiduke[2] = "0" + hiduke[2];
      }
      const hidukedata =
        "※" + hiduke[0] + "年" + hiduke[1] + "月" + hiduke[2] + "日時点";
      let gata = this.last.split("-");
      gata = "※" + gata[0] + "年" + gata[1] + "月" + gata[2] + "日時点";

      return {
        pzenkoku: filteredZenkokuPcr + "人",
        pokayama:
          this.kenPcr.reduce(function (accu, value) {
            return accu + Number(value["検査実施人数"]);
          }, 0) + "人",
        ptsuyama: "No data",
        pdata1: gata,
        pdata2: hidukedata,
        pdata3: "",
      };
    },
    dead: function () {
      const filteredZenkokuDead = this.Zenkoku.reduce(
        (sum, each) => sum + each["ndeaths"],
        0
      );
      let hiduke =
        this.kenDead[this.kenDead.length - 1]["公表_年月日"].split("/");
      for (let i = 1; i < 3; i++) {
        if (hiduke[i].length == 1) {
          hiduke[i] = "0" + hiduke[i];
        }
      }
      const hidukedata =
        "※" + hiduke[0] + "年" + hiduke[1] + "月" + hiduke[2] + "日時点";
      let gata = this.last.split("-");
      gata = "※" + gata[0] + "年" + gata[1] + "月" + gata[2] + "日時点";

      return {
        zenkoku: filteredZenkokuDead + "人",
        okayama: this.kenDead[this.kenDead.length - 1]["患者_死亡"] + "人",
        tsuyama: "No data",
        data1: gata,
        data2: hidukedata,
        data3: "",
      };
    },
    discharge: function () {
      const filteredZenkokuDis = this.Zenkoku.reduce(
        (sum, each) => sum + each["nexits"],
        0
      );
      let hiduke =
        this.kenDead[this.kenDead.length - 1]["公表_年月日"].split("/");
      for (let i = 1; i < 3; i++) {
        if (hiduke[i].length == 1) {
          hiduke[i] = "0" + hiduke[i];
        }
      }
      const hidukedata =
        "※" + hiduke[0] + "年" + hiduke[1] + "月" + hiduke[2] + "日時点";
      let gata = this.last.split("-");
      gata = "※" + gata[0] + "年" + gata[1] + "月" + gata[2] + "日時点";

      return {
        zenkoku: filteredZenkokuDis + "人",
        okayama: this.kenDead[this.kenDead.length - 1]["患者_退院等"] + "人",
        tsuyama: "No data",
        data1: gata,
        data2: hidukedata,
        data3: "",
      };
    },
  },
  created() {
    this.get_csv(
      "https://tsuyama-craft.github.io/covid-19/data/kansenshasuu0420.csv",
      true,
      "SJIS",
      "UNICODE",
      this.setKenDetails
    );
    this.get_csv(
      "https://tsuyama-craft.github.io/covid-19/data/pcr.csv",
      true,
      "UTF8",
      "UNICODE",
      this.setKenPcr
    );
    this.get_csv(
      "https://tsuyama-craft.github.io/covid-19/data/kansenshashousaijouhou.csv",
      true,
      "SJIS",
      "UNICODE",
      this.setKenUchiwake
    );
    this.get_csv(
      "https://tsuyama-craft.github.io/covid-19/data/kanjahasseijoukyou.csv",
      true,
      "UTF8",
      "UNICODE",
      this.setKenDead
    );
    this.get_csv(
      "https://tsuyama-craft.github.io/covid-19/data/330001okayamacovid19medicalsystem.csv",
      true,
      "UTF8",
      "UNICODE",
      this.setKenIryou
    );
    //this.get_csv("http://localhost:8080/content/pcr_positive_daily.csv",true,'UTF8','UNICODE', this.setZenkokuDetail);
    this.get_csv(
      "https://www.stopcovid19.jp/data/covid19japan.csv",
      true,
      "UTF8",
      "UNICODE",
      this.setZenkoku
    );
    this.lastupdata();
  },
  methods: {
    toggle(...args){
      [this.kansensya.tsuyama, this.kansensya.okayama, this.kansensya.zenkoku] = args
      console.log(this.kansensya.tsuyama,this.kansensya.okayama,this.kansensya.zenkoku)
    },
    delayMethod() {},
    lastupdata: function () {
      axios
        .get("https://www.stopcovid19.jp/data/covid19japan.json")
        .then((response) => {
          this.last = response.data["lastUpdate"];
        })
        .catch((error) => console.log(error));
    },
    setKenUchiwake: function (kenUtiwake) {
      this.kenUtiwake = kenUtiwake;
      this.$store.commit("Enter2", this.kenUtiwake);
    },
    setKenPcr: function (kenPcr) {
      this.kenPcr = kenPcr;
    },
    setKenDead: function (kenDead) {
      this.kenDead = kenDead;
    },
    setKenIryou: function (kenIryou) {
      this.kenIryou = kenIryou;
    },
    setZenkoku: function (Zenkoku) {
      this.Zenkoku = Zenkoku;
    },
    // setZenkokuDetail: function(ZenkokuDetail){
    //   this.ZenkokuDetail = ZenkokuDetail
    // },
    setKenDetails: function (kenDetails) {
      this.kenDetails = kenDetails;
      this.$store.commit("Enter", this.kenDetails);
    },
    get_csv(url, col, from, to, setter) {
      axios
        .get(url, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          const buffer = Buffer.from(response.data);
          let csv = Encoding.convert(buffer, {
            from: from,
            to: to,
            type: "string",
          });
          csv = csv.replace(/^\ufeff/, "");
          parse(
            csv,
            {
              columns: col,
              quote: '"',
              ltrim: true,
              rtrim: true,
              delimiter: ",",
              cast: true,
            },
            (error, output) => {
              setter(Object.freeze(output));
            }
          );
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.box {
  margin: 100px;
  padding: 100px;
}
.flex {
  width: 100%;
  margin: 0;
}
.box {
  width: 60%;
  margin: 10% auto;
}
@media screen and (min-width: 480px) {
  .box {
    font-size: 50%;
    margin: 5% auto;
  }
}
h1 {
  position: relative;
  color: #6eb0f9;
  line-height: 1.4;
  -webkit-box-reflect: below -10px -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0.6)
    );
  margin: 30px 0;
  font-size: 24px;
}
@media screen and (min-width: 480px) {
  h1 {
    font-size: 36px;
  }
}
.loader {
  color: #6eb0f9;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em,
      0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em,
      0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em,
      0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em,
      0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}*/
#late {
  opacity: 0;
  animation: appeare 0s ease 2s 1 normal forwards running;
}

@keyframes appeare {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36200568"],{"17a0":function(t,n,e){"use strict";e("1ec3")},"1ec3":function(t,n,e){},ee4b:function(t,n,e){"use strict";e.r(n);var i=e("7a23"),o=function(t){return Object(i["w"])("data-v-6cafda22"),t=t(),Object(i["u"])(),t},c={class:"pagelink"},u=Object(i["i"])("施設情報"),a=o((function(){return Object(i["g"])("a",null,"＞",-1)})),s=Object(i["i"])("津山市施設一覧"),l=o((function(){return Object(i["g"])("a",null,"＞",-1)})),h=o((function(){return Object(i["g"])("a",null,"施設詳細情報",-1)})),r=o((function(){return Object(i["g"])("h1",null,"施設詳細情報",-1)})),b={key:0,class:"syousai"},j=o((function(){return Object(i["g"])("th",null,"施設名",-1)})),O=o((function(){return Object(i["g"])("th",null,"電話番号",-1)})),m={key:0},f={key:1},_={key:2},g={key:0},p={key:1},d=["href"],y=o((function(){return Object(i["g"])("th",null,"住所",-1)})),w=o((function(){return Object(i["g"])("th",null,"地図",-1)})),k={key:0},L=["src"],U={key:1};function v(t,n,e,o,v,R){var C=Object(i["A"])("mainmenu"),S=Object(i["A"])("router-link");return Object(i["t"])(),Object(i["f"])(i["a"],null,[Object(i["j"])(C,{judge:"1"}),Object(i["g"])("div",c,[Object(i["j"])(S,{to:"/shisetupage"},{default:Object(i["G"])((function(){return[u]})),_:1}),a,Object(i["j"])(S,{to:{name:"Shisetu_itiranpage",params:{location_no:e.location_no}}},{default:Object(i["G"])((function(){return[s]})),_:1},8,["to"]),l,h]),r,t.count>=0?(Object(i["t"])(),Object(i["f"])("table",b,[Object(i["g"])("tbody",null,[Object(i["g"])("tr",null,[j,Object(i["g"])("td",null,Object(i["C"])(R.placeName),1)]),Object(i["g"])("tr",null,[O,Object(i["g"])("td",null,Object(i["C"])(R.placeTEL),1)]),Object(i["g"])("tr",null,[12==e.location_no?(Object(i["t"])(),Object(i["f"])("th",m,"設置場所")):Object(i["e"])("",!0),1==e.location_no||2==e.location_no||3==e.location_no?(Object(i["t"])(),Object(i["f"])("th",f,"診療科目")):(Object(i["t"])(),Object(i["f"])("th",_,"URL")),Object(i["g"])("td",null,[12==e.location_no?(Object(i["t"])(),Object(i["f"])("a",g,Object(i["C"])(R.placeURL),1)):Object(i["e"])("",!0),1==e.location_no||2==e.location_no||3==e.location_no?(Object(i["t"])(),Object(i["f"])("a",p,"もうしばらくお待ちください")):(Object(i["t"])(),Object(i["f"])("a",{key:2,href:R.toPlace},Object(i["C"])(R.placeURL),9,d))])]),Object(i["g"])("tr",null,[y,Object(i["g"])("td",null,Object(i["C"])(R.place),1)]),Object(i["g"])("tr",null,[w,1!=e.location_no&&2!=e.location_no&&3!=e.location_no?(Object(i["t"])(),Object(i["f"])("td",k,[Object(i["g"])("iframe",{src:R.gMaps,height:"450",frameborder:"0",style:{border:"0"},allowfullscreen:""},null,8,L)])):(Object(i["t"])(),Object(i["f"])("td",U,"もうしばらくお待ちください"))])])])):Object(i["e"])("",!0)],64)}e("a9e3");var R=e("ad3a"),C={name:"Shisetu_syousaipage",props:{no:{type:String},location_no:{type:String}},components:{mainmenu:R["a"]},data:function(){return{item:this.$store.state.facilityTableData,j:0,i:0,gmaps:{type:String},count:{type:Number}}},mounted:function(){this.count=this.rowGet()},computed:{toPlace:function(){return this.item[this.count]["URL"]},gMaps:function(){return"12"==this.location_no?"https://www.google.com/maps?output=embed&z=15&ll="+this.item[this.count]["世界_10進_Y"]+","+this.item[this.count]["世界_10進_X"]+"&q="+this.item[this.count]["施設名"]:"https://www.google.com/maps?output=embed&z=15&ll="+this.item[this.count]["世界_10進_Y"]+","+this.item[this.count]["世界_10進_X"]+"&q="+this.item[this.count]["名称"]},placeName:function(){return"1"==this.location_no||"2"==this.location_no||"3"==this.location_no?this.item[this.count]["Unnamed: 10"]:"12"==this.location_no?this.item[this.count]["施設名"]:this.item[this.count]["名称"]},placeTEL:function(){return"1"==this.location_no||"2"==this.location_no||"3"==this.location_no?this.item[this.count]["Unnamed: 18"]:"12"==this.location_no?this.item[this.count]["電話"]:this.item[this.count]["TEL"]},placeURL:function(){return"12"==this.location_no?this.item[this.count]["設置場所"]:this.item[this.count]["URL"]},place:function(){return"1"==this.location_no||"2"==this.location_no||"3"==this.location_no?this.item[this.count]["Unnamed: 15"]:this.item[this.count]["住所"]}},methods:{rowGet:function(){for(this.i=0;this.i<this.item.length;this.i++)("12"==this.location_no&&this.item[this.i]["施設名"]==this.no||"12"!=this.location_no&&this.item[this.i]["名称"]==this.no)&&(this.j=this.i);return this.j}}},S=(e("17a0"),e("d959")),G=e.n(S);const T=G()(C,[["render",v],["__scopeId","data-v-6cafda22"]]);n["default"]=T}}]);
//# sourceMappingURL=chunk-36200568.7fb20f26.js.map
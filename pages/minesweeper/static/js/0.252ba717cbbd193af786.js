webpackJsonp([0],{"001P":function(t,e){},FWPo:function(t,e){},g1M4:function(t,e){},vDQv:function(t,e){},wDQo:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("ZaBw"),s=(i("S6Il"),{name:"test",title:"Scroll container",components:{Swiper:n.Swiper,SwiperSlide:n.SwiperSlide},data:function(){return{swiperOption:{direction:"vertical",slidesPerView:"auto",freeMode:!0,scrollbar:{},mousewheel:!0}}}}),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("swiper",{staticClass:"swiper",attrs:{options:this.swiperOption}},[e("swiper-slide",[this._t("default")],2)],1)},staticRenderFns:[]};var r=function(){this.mineNum=0,this.flagbuf=!1,this.isOpen=0},l={data:function(){return{show:!0}},components:{scroll:i("VU/8")(s,o,!1,function(t){i("FWPo")},"data-v-1b39709c",null).exports},computed:{mine:function(){return Math.random()}},methods:{setbomb:function(t){for(var e=0;e<19*t-10;e++){var i=Math.floor(Math.random()*(this.box-1));-1===this.list[i].mineNum?e--:(this.list[i].mineNum=-1,this.countBomb(i))}},countBomb:function(t){for(var e=t-10;e<t-7;e++)for(var i=0;i<3;i++){var n=e+9*i;if(n>=0&&n<this.box){var s=0===t?1:t%9,o=0===n?1:n%9;o>=s-1&&o<=s+1&&-1!=this.list[n].mineNum&&(this.list[n].mineNum=this.list[n].mineNum?this.list[n].mineNum+1:1)}}},clickbox:function(t){if(!this.list[t].isOpen)switch(this.list[t].mineNum){case-1:alert("boom!!"),this.$emit("reset",!0);break;case 0:this.openblank(t);break;case 1:this.openbox(t,1);break;case 2:this.openbox(t,2);break;case 3:this.openbox(t,3);break;default:this.openbox(t,4)}},openbox:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.domlist[t].classList.add(["open-0","open-1","open-2","open-3","open-4"][i]),this.list[t].isOpen=!0,this.minebuff-=1,console.log(this.minebuff),0===this.minebuff&&setTimeout(function(){alert("u win!!!"),e.$emit("reset",!0)},0)},openblank:function(t){for(var e=t-10;e<t-7;e++)for(var i=0;i<3;i++){var n=e+9*i;if(n>=0&&n<this.box){var s=0===t?1:t%9,o=0===n?1:n%9;o>=s-1&&o<=s+1&&(0!==this.list[n].mineNum||this.list[n].isOpen?this.clickbox(n):(this.openbox(n),this.openblank(n)))}}this.domlist[t].classList.add("open-0"),this.list[t].isOpen=!0},init:function(){this.box=90*this.level,this.minebuff=71*this.level+10,this.list=new Array(this.box);for(var t=0;t<this.box;t++)this.list[t]=new r;this.setbomb(this.level)}},props:{level:{type:Number}},created:function(){this.init()},mounted:function(){this.domlist=document.querySelectorAll(".mine-item")}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",[t._t("default")],2),t._v(" "),i("scroll",[i("div",{staticClass:"mine-container"},t._l(t.list,function(e,n){return i("div",{key:n,staticClass:"mine-item",on:{click:function(e){return t.clickbox(n)}}},[t._v(t._s(e.mineNum?e.mineNum:0))])}),0)])],1)},staticRenderFns:[]};var c={data:function(){return{level:0,initbuf:!1}},methods:{ChangeLevel:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.level=t},reset:function(t){this.initbuf=t,this.$nextTick(function(){this.initbuf=!1})}},mounted:function(){},components:{minesweeper:i("VU/8")(l,a,!1,function(t){i("g1M4")},"data-v-51ff1435",null).exports}},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[0===t.level?i("div",{staticClass:"level-container"},[i("div",{staticClass:"level-title"},[t._v("难度选择")]),t._v(" "),i("div",{staticClass:"level-item",on:{click:function(e){return t.ChangeLevel(1)}}},[t._v("初级")]),t._v(" "),i("div",{staticClass:"level-item",on:{click:function(e){return t.ChangeLevel(2)}}},[t._v("中级")]),t._v(" "),i("div",{staticClass:"level-item",on:{click:function(e){return t.ChangeLevel(3)}}},[t._v("高级")])]):i("div",{staticClass:"mine-container"},[t.initbuf?t._e():i("minesweeper",{attrs:{level:t.level},on:{reset:t.reset}},[i("div",{attrs:{id:"choice"},on:{click:function(e){return t.ChangeLevel(0)}}},[t._v("选择难度")])])],1)])},staticRenderFns:[]};var v={data:function(){return{start:!0}},components:{Level:i("VU/8")(c,u,!1,function(t){i("001P")},"data-v-4c045e55",null).exports}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"g-container"},[this.start?e("div",[e("Level")],1):e("div",[this._v("开始游戏")])])},staticRenderFns:[]};var f=i("VU/8")(v,h,!1,function(t){i("vDQv")},null,null);e.default=f.exports}});
//# sourceMappingURL=0.252ba717cbbd193af786.js.map
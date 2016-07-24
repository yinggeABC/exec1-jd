/**
 * Created by weimin on 16-7-21.
 */
utils = {
linear: function linear(ele,tarEle,duration){
    var _this=this;
    var begin={};
    var target={};
    var change={};
    for (var key in tarEle){
        if (tarEle.hasOwnProperty(key)){
             begin[key] = getComputedStyle(ele,null)[key];
             target[key]=tarEle[key];
            change[key] = target[key]-parseFloat(begin[key]);
        }
    }
    var time=0;
    var reg=/left|right|top|bottom|height|width/ig;
    var timer=setInterval(function(){
        if (time>=duration){
            for (var key in begin){
                ele.style[key]=reg.test(key)?tarEle[key]+"px":tarEle[key];
            }
            clearInterval(timer);
            return;
        } else{
            time+=50;
            for (var key in begin){
                var tar = utils.calPos(time,parseFloat(begin[key]),change[key],duration);
                ele.style[key]=reg.test(key)?tar+"px":tar;
            }
        }
    },50);

},
    calPos:function calPos(time,begin,change,duration){
        return begin+time/duration*change;
    }
}
window.onload=function(){
var floatBanner = new FloatBanner;
    var horBanner = new HorBanner;
}

function FloatBanner (){
     this.lunbo=document.getElementsByClassName("lunbo")[0];
     this.lunboOne = document.getElementById("one");
     this.oneLis = this.lunboOne.getElementsByTagName("li");
     this.oUl = document.getElementById("two");
     this.oLis = this.oUl.getElementsByTagName("li");
     this.btnLeft = document.getElementsByClassName("slidePage")[0].getElementsByClassName("leftBtn")[0];
     this.btnRight = document.getElementsByClassName("slidePage")[0].getElementsByClassName("rightBtn")[0];
    return this.init();
}
FloatBanner.prototype = {
    constructor: FloatBanner,
    init: function init() {
        var _this = this;
        _this.count = 0;
        _this.lunboOne.timer = setInterval(function () {
            _this.autoMove();
        }, 2000);
        _this.manualClick();
        _this.moveInOut();
        _this.clickLi();
        return this;
    },
    autoMove: function autoMove() {
        this.count++;
        this.autoImg();
    },
    clickLi:function clickLi(){
        var _this=this;
      this.oUl.onclick = function(ev) {
          clearInterval(_this.lunboOne.timer);
          ev = ev || window.event;
          ev.target = ev.target || ev.srcElement;
          var numStr = ev.target.innerHTML;
          _this.count = numStr-1;
          _this.autoImg();
      }

    },
    autoImg: function autoImg() {
        var ind = this.count % 5;
        for (var i = 0; i < this.oneLis.length; i++) {
            var curLi = this.oneLis.item(i);
            if (i == ind) {
                curLi.style.display = "list-item";
                this.oLis[i].className = "bg";
                utils.linear(curLi, {"opacity": 1}, 800);
                continue;
            }
            curLi.style.opacity = 0;
            this.oLis[i].className = "";
            curLi.style.display = "none";
        }
    },
    manualClick: function manualClick() {
        var _this = this;
        this.btnLeft.onclick = function () {
            clearInterval(_this.lunboOne.timer);
            _this.count--;
            _this.autoImg();
        };
        this.btnRight.addEventListener("click", function(){
            clearInterval(_this.lunboOne.timer);
            _this.autoMove();
        },false);
    },
    moveInOut:function moveIn(){
        var _this=this;
        this.lunbo.onmouseover = function(){
            clearInterval(_this.lunboOne.timer);
        }
        this.lunbo.onmouseout = function(){
            _this.lunboOne.timer = setInterval(function () {
                _this.autoMove();
            }, 2000);
        }
    }

}

function HorBanner(){
    this.sliderMain = document.getElementsByClassName("slider-main")[0];
    this.sliderMain1=document.getElementsByClassName("slider-main1")[0];
    this.count=0;
    return this.init();
}
HorBanner.prototype = {
    constructor:HorBanner,
    init: function(){
        var _this=this;
        this.timer = setInterval(_this.moveHor.bind(_this),2800);
        window.onfocus = function(){
           _this.timer= setInterval(_this.moveHor.bind(_this),2800);
        }
        window.onblur = function(){
            clearInterval(_this.timer);
        }
    },
    moveHor: function moveHor(){
        if (this.count==4){
            this.sliderMain.style.left=0;
            this.sliderMain1.style.left=0;
            this.count=0;
        }
        this.count++;
        // _this.sliderMain.style.left=-_this.count*200+"px";
        utils.linear(this.sliderMain,{left:-this.count*1020},800);
        utils.linear(this.sliderMain1,{left:-this.count*439},800);

    }
}
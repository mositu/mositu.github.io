$(function () {
    var currentIndex = 0;
    var screenAnimateElements = {
      '.header' : [
        '.header-logo',
        '.header-nav',
      ],
       '.outline' : [
        '.outline',
      ],
      '.screen-1' : [
        '.screen-1-text-h1',
        '.screen-1-text-p',
      ],
  
      '.screen-2' : [
        '.screen-2-text-1',
        '.screen-2-text-2',
        '.screen-2-text-3',
        '.screen-2-text-br',
        '.screen-2-pic1',
        '.screen-2-pic2',
      ],
  
      '.screen-3' : [
        '.screen-3-pic',
        '.screen-3-text',
        '.screen-3-icon-box',
      ],
  
      '.screen-4' : [
        '.screen-4-text',
        '.screen-4-itembox',
      ],
      '.screen-5' : [
        '.screen-5-text',
        '.screen-5-pic',
      ]
    };
    // 滑动动画
    function slip(className,index) {
        $(className).css('left', function () {
            return (index*100)+'px'
          });
    }
  
    // 播放动画
    function animatePlay (screenCls) {
      var animateElems = screenAnimateElements[screenCls];
      console.log(screenAnimateElements[screenCls]);
      for (var i = 0; i < animateElems.length; i++) {
        var element = $(animateElems[i]);
        element.attr('class', element[0].className.replace('_animate_init', '_animate_done'));
      }
    }
  
    // 跳转
    function switchTo (screenidx) {
      document.documentElement.scrollTop = (screenidx)*640;
      currentIndex = screenidx;
      slip('.nav-item-tip',currentIndex);
     
    }
  
    // 自动播放第一屏动画和头部
    setTimeout(animatePlay('.screen-1'),100);
    setTimeout(animatePlay('.header'),100);
    $('.screen-6-button').on('click',function () {
      switchTo(0);
    })
    $('.header-nav , .outline').on('click', function(event){
      if (event.target.tagName == 'A') {
        $this = $(event.target);
        switchTo($this.index());
      }
    });
    $('.header-nav').on('mouseout', function(event){
      if (event.target.tagName == 'A') {
        slip('.nav-item-tip',currentIndex);
      }
    });
    $('.header-nav').on('mouseover', function(event){
      if (event.target.tagName == 'A') {
        index =$(event.target).index();
        slip('.nav-item-tip',index);
      }
    });
    window.onscroll = function () {
    var top  = document.documentElement.scrollTop;
		screenHeigh = window.innerHeight;
    if( top < 10 ){
      $('.header').removeClass('header-active')
    }
    if( top < ( 640*1 - 150) ){
      $('.outline').attr('class', 'outline outline_animate_init');
      currentIndex = 0;
      slip('.nav-item-tip',currentIndex);
    }
    if( top + screenHeigh > 10 ){
      $('.header').addClass('header-active');
    }
    if( top + screenHeigh > ( 640*1 - 150) ){
      animatePlay('.screen-2');
      animatePlay('.outline');
      currentIndex = 1;
      slip('.nav-item-tip',currentIndex);
    }
    if( top + screenHeigh > ( 640*2 - 150) ){
      animatePlay('.screen-3');
      currentIndex = 2;
      slip('.nav-item-tip',currentIndex);
    }
    if( top + screenHeigh > ( 640*3 - 150) ){
      animatePlay('.screen-4');
      currentIndex = 3;
      slip('.nav-item-tip',currentIndex);
    }
    if( top + screenHeigh > ( 640*4 - 150) ){
      animatePlay('.screen-5');
      currentIndex = 4;
      slip('.nav-item-tip',currentIndex);
    }
  }
  });
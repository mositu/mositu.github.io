(function ($) {
    'use strict'
    function loadImg(url, imgLoaded, imgFailed) {
        var image = new Image();
        image.onerror = function () {
            if (typeof imgFailed === 'function') imgFailed(url);
        }
        image.onload = function () {
            if (typeof imgLoaded === 'function') {
                imgLoaded(url);
            }
        };
        image.src = url;
    }

    function Slider($elem) {
        this.$elem = $elem;
        this.$items = $elem.find('.slider-item');
        this.$imgs = $elem.find('.slider-img');
        this.$indicators = this.$elem.find('.slider-indicator');
        this.$controls = this.$elem.find('.slider-control');
        this.currentidx = 0;
        this.maxindex = this.$items.length - 1;

        this.init();
    }
    Slider.prototype.switchTo = function (currentidx, nextindex) {
        this.$items.hide();
        this.$indicators.eq(currentidx).removeClass('slider-indicator-active');
        this.$items.eq(nextindex).show();
        this.$indicators.eq(nextindex).addClass('slider-indicator-active');
        this.currentidx = nextindex;
        if (!this.$items.eq(nextindex).data('loaded')) {
            this.$items.eq(nextindex).trigger('loadOnce', nextindex);
        }
        // console.log(this);
    }
    Slider.prototype.init = function (index) {
        this.$items.one('loadOnce', function (e) {
            // console.log(e.target);
            var $this = $(e.target).find('.slider-img');
            $this.each(function (index) {
                // console.log(this);
                var $this = $(this);
                var src = $this.data('src');
                loadImg(src, function () {
                    // console.log($this);
                    $this.attr('src', src);
                }, function () {
                    $this.attr('src', 'img/focus-slider/placeholder.png');
                });
                $this.data('loaded', 'true');
            });

        });
        this.$items.eq(0).trigger('loadOnce');


    }

    $.fn.extend({
        slider: function () {
            return this.each(function () {
                var $this = $(this),
                    slider = $this.data('slider');
                if (!slider) {//解决多次调用问题
                    $this.data('slider', slider = new Slider($this));
                }
                slider.$controls.on('click', function (e) {
                    // console.log(slider.currentidx);
                    var currentidx = slider.currentidx;
                    var maxindex = slider.maxindex;

                    if (/left/.test(e.target.className)) {
                        var index = currentidx <= 0 ? 3 : currentidx - 1;
                        slider.switchTo(currentidx, index);
                    } else {
                        var index = currentidx >= maxindex ? 0 : currentidx + 1;
                        slider.switchTo(currentidx, index);
                    }
                    e.preventDefault();
                });
                slider.$indicators.on('click', function (e) {
                    var index = $(e.target).index()
                    slider.switchTo(slider.currentidx, index);
                    e.preventDefault();
                });
            })
        }
    })

})(jQuery);

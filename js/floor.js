(function ($) {
    var tops = [],
        length = $('.floor').length;

    for (let index = 0; index < length; index++) {
        tops[index] = $('.floor').eq(index).offset().top;
    }

    function loadImg(url, imgLoaded, imgFailed) {
        var image = new Image();
        image.onerror = function () {
            if (typeof imgFailed === 'function') imgFailed(url);
        }
        image.onload = function () {
            if (typeof imgLoaded === 'function') {
                setTimeout(() => {
                    imgLoaded(url);
                }, 1000);
            }
        };
        image.src = url;
    }

    function buildFloor(floorData) {
        var html = '';

        html += '<div class="container">';
        html += buildFloorHead(floorData);
        html += buildFloorBody(floorData);
        html += '</div>';

        return html;
    };

    function buildFloorHead(floorData) {
        var html = '';
        html += '<div class="floor-head">';
        html += '<h2 class="floor-title fl"><span class="floor-title-num">' + floorData.num + 'F</span><span class="floor-title-text">' + floorData.text + '</span></h2>';
        html += '<ul class="tab-item-wrap fr">';
        for (var i = 0; i < floorData.tabs.length; i++) {
            html += '<li class="fl"><a href="javascript:;" class="tab-item">' + floorData.tabs[i] + '</a></li>';
            if (i !== floorData.tabs.length - 1) {
                html += '<li class="floor-divider fl text-hidden">分隔线</li>';
            }
        }
        html += '</ul>';
        html += '</div>';
        return html;
    };

    function buildFloorBody(floorData) {
        var html = '';
        html += '<div class="floor-body">';
        for (var i = 0; i < floorData.items.length; i++) {
            html += '<ul class="tab-panel">';
            for (var j = 0; j < floorData.items[i].length; j++) {
                html += '<li class="floor-item fl">';
                html += '<p class="floor-item-pic"><a href="###" target="_blank"><img src="img/floor/loading.gif" class="floor-img" data-src="img/floor/' + floorData.num + '/' + (i + 1) + '/' + (j + 1) + '.png" alt="" /></a></p>';
                html += '<p class="floor-item-name"><a href="###" target="_blank" class="link">' + floorData.items[i][j].name + '</a></p>';
                html += '<p class="floor-item-price">' + floorData.items[i][j].price + '</p>';
                html += '</li>';
            }

            html += '</ul>';
        }

        html += '</div>';

        return html;
    };

    function switchTab($elem, index = 0) {
        var $clickElem = $elem.find('.tab-panel').eq(index);
        $elem.find('.tab-panel').siblings().hide();
        $elem.find('.tab-panel').eq(index).show();
        $elem.find('.tab-item').removeClass('tab-item-active')
        $elem.find('.tab-item').eq(index).addClass('tab-item-active')
        if ($clickElem.data('loaded')) {
            return
        } else {
            $clickElem.find('.floor-img').each(function () {
                var $this = $(this),
                    src = $this.data('src');
                loadImg(src, function () {
                    $this.attr('src', src);
                }, function () {
                    $this.attr('src', 'img/focus-slider/placeholder.png');
                });
                $this.data('loaded', 'true');
            })
        }
    }

    function floorInit($elem, index) {
        var data = window.floorData[index],
            html = buildFloor(data);
        $elem.html(html);
        // $elem.find('.tab-panel').eq(0).show();
        switchTab($elem);

    }
    function getData($elem, index) {
        if (!window.floorData) {
            $.ajax({
                type: "get",
                url: "js/floor-detail.json",
                dataType: "json",
                success: function (response) {
                    window.floorData = response;
                    floorInit($elem, index);
                    $elem.off('init')
                }
            });
        }
        else {
            floorInit($elem, index);
            $elem.off('init')
        }
    }
    $('.floor').on('init', function (e, index) {
        getData($(e.target), index);
    });
    $('.floor').on('click', '.tab-item', function (e) {
        var $this = $(e.currentTarget),
            $tabitems = $(e.delegateTarget).find('.tab-item');
        if ($this.is('[class*="active"]')) {
            return;
        } else {
            var index = ($tabitems.index($this));
            switchTab($(e.delegateTarget), index)

        }

    });

    $(window).on('scroll', function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            screenHeigh = window.innerHeight;
        if (scrollTop + screenHeigh > tops[0]) {
            $('.floor').eq(0).trigger('init', 0)
        }
        if (scrollTop + screenHeigh > tops[1]) {
            $('.floor').eq(1).trigger('init', 1);
        }
        if (scrollTop + screenHeigh > tops[2]) {
            $('.floor').eq(2).trigger('init', 2);
        }
        if (scrollTop + screenHeigh > tops[3]) {
            $('.floor').eq(3).trigger('init', 3);
        }
        if (scrollTop + screenHeigh > tops[4]) {
            $('.floor').eq(4).trigger('init', 4);
        }
    });

})(jQuery)
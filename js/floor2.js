(function ($) {

    function Floor($elem) {
        this.$elem = $elem;
        this.index = $elem.index('.floor');
        // this.init();
    }

    Floor.prototype.init = function ($elem) {
        this.data = window.floorData[this.index];
        var html = this.buildFloor(this.data);
        this.$elem.html(html);
        this.$tabItem = this.$elem.find('.tab-item');
        this.$tabPanel = this.$elem.find('.tab-panel');
        this.switchTab(0);
    }

    Floor.prototype.buildFloor = function(floorData) {
        var html = '';

        html += '<div class="container">';
        html += this.buildFloorHead(floorData);
        html += this.buildFloorBody(floorData);
        html += '</div>';

        return html;
    };

    Floor.prototype.buildFloorHead = function(floorData) {
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

    Floor.prototype.buildFloorBody = function(floorData) {
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
    Floor.prototype.switchTab = function (index) {
        this.$tabPanel.hide();
        this.$tabPanel.eq(index).show();
    }
    
    

    // 可视区域高度
    var h = window.innerHeight;
    //滚动区域高度
    var s = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(h);
    console.log(s);


    $.fn.extend({
        floor: function () {
            return this.each(function () {
                var $this=$(this);
                floor = $this.data('floor');
                if(!floor){//解决多次调用问题
                    $this.data('floor',floor=new Floor($this)); 
                }
                $this.one('loaddata', function (e) {
                    if (!window.floorData) {
                       $.ajax({
                           type: "get",
                           url: "js/floor-detail.json",
                           dataType: "json",
                           success: function (response) {
                               window.floorData = response;
                           }
                       });
                    }
                });

            })
        }
    })

    
})(jQuery)
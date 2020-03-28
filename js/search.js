(function($) {
    'use strict'

    var $search = $('.search'),
        $form = $search.find('.search-form'),
        $input = $search.find('.search-inputbox'),
        $layer = $search.find('.search-layer');

    $('.search-inputbox').on('input',function () {
        var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1484204931352_18291&callback=jsonp18292&k=1&area=c2c&bucketid=6&q=' + encodeURIComponent($.trim($input.val()));
        $.ajax({
            url: url,
            dataType: 'jsonp',
        }).done(function (data) {
            var html = '',
                dataLength = data.result.length;
            if(dataLength === 0){
                $layer.html('').hide();
            }
            for (var i = 0; i < dataLength; i++) {
                html += '<li class="search-layer-item text-ellipsis">' + data.result[i][0] + '</li>';
            }
            $layer.html(html).show();
        }).fail(function() {
            $layer.hide().html('');
        });
    })

    $layer.on('click', '.search-layer-item', function (e) {
        $input.val(e.target.innerText)
        $layer.hide();
        $form.submit();
    });

    $input.on('focus', function() {
        $layer.show();
    }).on('click', function() {
        return false;
    })

    $(document).on('click', function() {
        $layer.hide();
    })

})(jQuery);
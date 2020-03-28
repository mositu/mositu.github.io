(function ($) {
    // dropdown
    $('.dropdown').dropdown();

    // nav-site
    $('.menu.dropdown').on('dropdown-json', function (e) {
        var $this = $(this),
            dataLoad = $this.data('jsonload');

        if (!$this.data('loaded')) {
            var $layer = $this.find('.dropdown-layer'),
                html = '';

            $.getJSON(dataLoad, function (data) {
                setTimeout(function () {
                    for (var i = 0; i < data.length; i++) {
                        html += '<li><a href="' + data[i].url + '" target="_blank" class="menu-item">' + data[i].name + '</a></li>'
                    }
                    $layer.html(html);
                    $this.data('loaded', true);
                }, 1000);
            });
        }
    });

    // category-list
    $('.category-list .dropdown').on('dropdown-json', function (e) {
        var $this = $(this),
            dataLoad = $this.data('jsonload');

        if (!$this.data('loaded')) {
            var $layer = $this.find('.dropdown-layer'),
                html = '';

            $.getJSON(dataLoad, function (data) {
                setTimeout(function () {
                    for (var i = 0; i < data.length; i++) {
                        html += '<dl class="category-details cf"><dt class="category-details-title fl"><a href="###" target="_blank" class="category-details-title-link">' + data[i].title + '</a></dt><dd class="category-details-item fl">';
                        for (var j = 0; j < data[i].items.length; j++) {
                            html += '<a href="###" target="_blank" class="link">' + data[i].items[j] + '</a>';
                        }
                        html += '</dd></dl>';
                    }
                    $layer.html(html);
                    $this.data('loaded', true);
                }, 1000);
            });
        }
    });
    // slider
    $('.slider').slider();
    $('#backToTop').on('click', function (e) {
        $(window).scrollTop(0);
    });

})(jQuery);
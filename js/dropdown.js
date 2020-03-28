(function ($) {
    'use strict'

    function Dropdown($elem) {
        this.$elem = $elem;
        this.$layer = this.$elem.find('.dropdown-layer');

        // this.init();

    }
    Dropdown.prototype.show = function () {
        this.$layer.show();
    }
    Dropdown.prototype.hide = function () {
        this.$layer.hide();
    }

    $.fn.extend({
        dropdown: function () {
            return this.each(function () {
                var $this = $(this),
                    dropdown = $this.data('dropdown');
                if (!dropdown) {//解决多次调用dropdown问题
                    $this.data('dropdown', dropdown = new Dropdown($this));

                }
                dropdown.$elem.hover(function (e) {
                    // over
                    dropdown.show();
                    if ($this.data('jsonload')) {
                        dropdown.$elem.trigger('dropdown-json')
                    }
                    e.stopPropagation();
                }, function (e) {
                    // out
                    dropdown.hide();
                    e.stopPropagation();
                }
                );

            })
        }
    })

})(jQuery);
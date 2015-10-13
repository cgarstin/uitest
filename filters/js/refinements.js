var Asos = Asos || {};

Asos.Refinements = function (opts) {
    opts = opts || {};
    this.init();
};

Asos.Refinements.prototype.toggleClearButtons = function (e) {
    e.preventDefault();
    var panel = $(e.delegateTarget),
        clearAll = $('[data-clear="all"]');

    if ( panel.find(':checked').length > 0 ) {
        panel.find('.clear-filter').addClass('is-visible');
        clearAll.addClass('is-visible');
    } else {
        panel.find('.clear-filter').removeClass('is-visible');
    }
    if ( $('.panel').find(':checked').length > 0 ) {
        clearAll.addClass('is-visible');
    } else {
        clearAll.removeClass('is-visible');
    }
};

Asos.Refinements.prototype.clearAllFilters = function (e) {
    e.preventDefault();
    $(e.delegateTarget).find(':checked').attr('checked', false).change();
};

Asos.Refinements.prototype.setEventListeners = function () {
    var self = this;
    $('.panel')
        .on('change', 'input', function (e) {
            self.toggleClearButtons(e);
        })
        .on('click', '.clear-filter', function (e) {
            self.clearAllFilters(e);
        });
    $(document).on('click', '.clear-filter[data-clear="all"]', function (e) {
        self.clearAllFilters(e);
    });
};

Asos.Refinements.prototype.checkPreselectedItems = function (filters) {
    for (var i = 0; i < filters.length; i++) {
        var filterType = filters[i].split(':')[0],
            filterValue = filters[i].split(':')[1].split(',');

        for (var item = 0; item < filterValue.length; item++) {
            var deserialisedSelector = '#' + filterType + '_' + filterValue[item];
            $(deserialisedSelector).not(':checked').click();
        }
    }
};

Asos.Refinements.prototype.deserialise = function () {
    var refinements = location.search.match(/[?&]refine=([^&]+)/)[1],
        filters = refinements.split('|');
        this.checkPreselectedItems(filters);
        
};

Asos.Refinements.prototype.init = function () {
    this.setEventListeners();
    if ( /[?&]refine=/.test(location.search) ) {
        this.deserialise();
    }
};

$(function (event) {
    Asos.refinements = new Asos.Refinements();
});



//clear and clear all
/*
$(function() {

    //handle checkboxes
    $('input[type=checkbox]').change(function(event) {
        if ($(event.target).closest('ul').find(':checked').length) {
            $(event.target).closest('.panel').attr('data-hasselections', 'true');
        } else {
            $(event.target).closest('.panel').attr('data-hasselections', 'false');
        }

        if ($(':checked', $('.refinements')).length) {
            $('.refinements').attr('data-hasanyselected', 'true');
        } else {
            $('.refinements').attr('data-hasanyselected', 'false');
        }
    });

    //handle clear buttons
    $('.clear-filter').click(function(event) {
        $(event.target)
        .nextAll()
        .find(':checked')
        .attr('checked', false)
        .change()
        .end();
    });

});

//deserialise
$(function() {
    var refinements = location.search.slice(8).split('|');
    $.each(refinements, function(i, panelData) {
        var panelName = panelData.split(':')[0];
        var panelValues = panelData.split(':')[1].split(',');
        if (panelName == 'size') {
            var refinementValues = $('[data-id=size] [type=checkbox]');
            $.each(panelValues, function(i, val) {
                refinementValues.eq((val-3)/2).attr('checked', true).change();
            });
        } else if (panelName == 'colour') {
            var refinementValues = $('[data-id=base_colour] [type=checkbox]');
            $.each(panelValues, function(i, val) {
                refinementValues.eq(val).attr('checked', true).change();
            });
        } else {
            var refinementValues = $('[data-id=brand] [type=checkbox]');
            $.each(panelValues, function(i, val) {
                refinementValues.filter('#brand_' + val).attr('checked', true).change();
            });
        }
    });
});
*/
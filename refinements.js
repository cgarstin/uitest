//clear and clear all
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

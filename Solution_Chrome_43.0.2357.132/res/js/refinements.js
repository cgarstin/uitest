var refinments = (function () {
	function init($container) {
		//Default to document if no container is set
		if(!$container) $container = $(document);

		bindUIActions($container);
		deserialiseRefinements(this)
	}
	function bindUIActions($container) {
		$container.on('change', '[type=checkbox]', function(e) {
			toggleClearButtons($(e.target).closest('.panel'), $container);
		});
		$container.on('click', '.clear-filter', function(e) {
			clearRefinementFilters($(e.target).parent());
		});
	} 
	function deserialiseRefinements() {
		//Check if refinement settings are present within any query string in the url
		if (/[?&]refine=/.test(location.search)) {
			//Create an array of refinements
			var refinements = location.search.match(/[?&]refine=([^&]+)/)[1].split('|');

			//Loop through each refinment
			for (var i = 0; i < refinements.length; i++) {
				var panelData = refinements[i];

				//Get the panel name
				var panelName = panelData.split(':')[0];

				//Create an array of each panel value
				var panelValues = panelData.split(':')[1].split(',');

				//Loop through each value, check the corresponding input and trigger a change event
				for (var j = 0; j < panelValues.length; j++) {
					$('#' + panelName + '_' + panelValues[j]).prop("checked", true).change();
				};
			};
		}
		
	}
	function toggleClearButtons($element, $container) {
		//Get the clear button that correspond to the element
		var $clear = $('[data-clear="' + $element.data('id') + '"]');

		//Get the clear all button
		var $clearAll = $('[data-clear="all"]');

		//Check if there are any checked inputs within the container 
		if ($(':checked', $container).length) {
			//Show the clear all button
			$clearAll.addClass('visible');

			//Now check if there are any checked inputs within the target element 
			if ($(':checked', $element).length) {
				//Show the clear button for the target element
				$clear.addClass('visible');
			} else {
				//Otherwise hide the clear button for the target element
				$clear.removeClass('visible');
			}
		} else {
			//Otherwise hide all clear buttons
			$clearAll.removeClass('visible');
			$clear.removeClass('visible');
			
		}
	}
	function clearRefinementFilters($element) {
		//uncheck all inputs within the target element
		$element.find(':checked').attr('checked', false).change().end();
	}
	return {
		init: init
	};
})();

refinments.init($('.refinements'));
four51.app.filter('onproperty', ['$451', function($451) {
	var defaults = {
		'OrderStats': 'Type',
		'Message': 'Box'
	};

	return function(input, query) {
		if (!input || input.length === 0) return;
		if (!query) return input;
		query.Property = query.Property || defaults[query.Model];
		return $451.filter(input, query);
	}
}]);

four51.app.filter('kb', function() {
	return function(value) {
		return isNaN(value) ? value : parseFloat(value) / 1024;
	}
});

four51.app.filter('r', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key == value) {
				result = $sce.trustAsHtml(c.value);
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('rc', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key.toLowerCase() == value.toLowerCase()) {
				result = $sce.trustAsHtml(c.value);
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('rl', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key.toLowerCase() == value.toLowerCase()) {
				result = $sce.trustAsHtml(c.value.toLowerCase());
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('noliverates', function() {
	return function(value) {
		var output = [];
		angular.forEach(value, function(v) {
			if (v.ShipperRateType != 'ActualRates')
				output.push(v);
		});
		return output;
	}
});

four51.app.filter('paginate', function() {
	return function(input, start) {
		if (typeof input != 'object' || !input) return;
		start = +start; //parse to int
		return input.slice(start);
	}
});

//Temporarily add xlat filters for QA

four51.app.filter('xlat', function() {
    return function(value, parameters) {
        return value;
    };
});

four51.app.filter('culturecurrency', function() {
    return function(value) {
        if (value) {
            /**
             * Number.prototype.format(n, x, s, c)
             *
             * @param integer n: length of decimal
             * @param integer x: length of whole part
             * @param mixed   s: sections delimiter
             * @param mixed   c: decimal delimiter
             **/
            Number.prototype.formatCurrency = function(n, x, s, c) {
                var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                    num = this.toFixed(Math.max(0, ~~n));

                return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
            };

            var result = "";
            result = "$" + value.formatCurrency(2, 3, ',', '.');

            return result;
        }
    }
});
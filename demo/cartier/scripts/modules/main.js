require.config({
	baseUrl: "scripts/",
    paths: {
		$: 'lib/zepto.min',
		animate: 'lib/fx',
		wx: 'lib/jweixin-1.0.0',
		cjs: 'lib/createjs.min',
		hammer: 'lib/hammer.min'
	},
	shim: {
		'animate': ['$'],
		'modules/fn': ['$', 'cjs'],
		'modules/app': ['$', 'animate', 'cjs', 'hammer'],
	}
});
require(['require', 'modules/app'], function(require) {
	
	$(function() {
		
		var wx = require('wx');
		
		
		
	});
	
});
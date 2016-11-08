({
    baseUrl: "./",
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
	},
    name: "modules/main",
    out: "app.min.js",
    optimize: "uglify"
})
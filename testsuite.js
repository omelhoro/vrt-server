var fs = require( 'fs' );
var phantomcss = require('phantomcss');


const picFolder = fs.workingDirectory + '/pictures';

casper.test.begin( 'Websites online', function(test) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( picFolder + '/screenshots' ),
		failedComparisonsRoot: fs.absolute( picFolder + '/failures' ),
		addLabelToFailedImage: true,
		onComplete: function(allTests, noOfFails, noOfErrors){
			console.log("JSON: ", JSON.stringify(allTests));
			allTests.forEach(function(test){
 	 			if(test.fail) {
				}
			});
		},
		// onFail: function failCallback(){
		// 	console.log(arguments);
		// },
		/*
		screenshotRoot: '/screenshots',
		failedComparisonsRoot: '/failures'
		casper: specific_instance_of_casper,
		libraryRoot: '/phantomcss',
		fileNameGetter: function overide_file_naming(){},
		onPass: function passCallback(){},
		onTimeout: function timeoutCallback(){},
		onComplete: function completeCallback(){},
		hideElements: '#thing.selector',
		addLabelToFailedImage: true,
		outputSettings: {
			errorColor: {
				red: 255,
				green: 255,
				blue: 0
			},
			errorType: 'movement',
			transparency: 0.3
		}*/
	} );

	// casper
	casper.
		start('https://www.timeanddate.com/')
		.then(function() {
			return phantomcss.screenshot('#clk_box', 'timeanddate-clk_box');
		});

	casper.then(function() {
		// return casper.
		// 	start('https://top-berufsunfahigkeitsversicherung.fischerops.com/')
		// 	.viewport(1024, 768)
		// 	.then(function() {
		// 		return phantomcss.screenshot('body', 'berufsunfähigkeit-versicherung-body');
		// });
	})


	casper.then(function() {
		phantomcss.compareAll()
	});

	/*
	Casper runs tests
	*/
	casper.run( function () {
		// console.log( '\nTHE END.' );
		casper.test.done();
	});

});

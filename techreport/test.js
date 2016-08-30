var run = require('./run.js');
var exp = require('./experiment.js');

var ret = run(
{
	programOpts:  {
		model: 'sbn',
		modelLearnType: 'ML',
		optimize_verbose: true,
		doELBOProgress: false
	},
	// programOpts:  {
	// 	model: 'lda',
	// 	modelLearnType: 'MeanField',
	// 	optimize_verbose: true,
	// 	optimize_nSteps: 500,
	// 	doELBOProgress: false
	// },
	runOpts:  {

	}
});
console.log(ret);

// ----------------------------------------------------------------------------

// var runOpts = {

// };

// var baseProgramOpts = {
// 	model: 'bn_oneLatent'
// };

// var data = 
// exp.start(baseProgramOpts,
// 	exp.condition('model', ['bn_twoLatents_indep', 'bn_twoLatents_dep'],
// 		exp.condition('localGuideType', ['MeanField', 'Recognition'],
// 			exp.row(function(programOpts) {
// 				return run({
// 					programOpts: programOpts,
// 					runOpts: runOpts
// 				});
// 			})
// 		)
// 	)
// );

// var dataLPAndESS = exp.filterData(data, function(colname) {
// 	return colname !== 'elboProgress';
// });
// exp.saveDataToCSV(dataLPAndESS, __dirname + '/dataLPAndESS.csv');

// var elboProgress = exp.filterData(data, function(colname) {
// 	return colname !== 'dataLogProb' && colname !== 'guideESS';
// });
// elboProgress = exp.normalizeArrayColumn(elboProgress, 'elboProgress');
// exp.saveDataToCSV(elboProgress, __dirname + '/elboProgress.csv');
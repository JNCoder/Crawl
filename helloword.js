

//1、evaluate()里的代码就像在浏览器里执行一样，所以像标准的DOM操作、CSS选择等都可以正常进行。
//2、onConsoleMessage获取console命令的Message
//3、onResourceRequested获取request的Message
//4、onResourceReceived获取response的Message

//var page = require('webpage').create();
//page.open('http://www.baidu.com', function(){
//	page.render('baidu.png');
//	phantom.exit();
//});

//var page = require('webpage').create();
//var url = require('system').args[1]
//page.onConsoleMessage = function(msg) {
//	conolse.log('aaa_' + msg);
//}
//page.open(url, function(status) {
//	console(status)
//	page.evaluate(function() {
//		console.log(document.title);
//	});
//	phantom.exit();
//});

//var page = require('webpage').create();
//var url = 'http://www.baidu.com'
//page.onConsoleMessage = funciton(msg) {
//	console.log(msg)
//};
//page.onResourceRequested = function(request) {
//	console.log(request)
//};
//page.onResourceReceived = function(response) {
//	console.log(response)
//};
//page.open(url)
//
//var page = require('webpage').create();
//page.onResourceRequested = function(request) {
//	console.log('Request ' + JSON.stringify(request, undefined, 4));
//};
//page.onResourceReceived = function(response) {
//	console.log('Receive ' + JSON.stringify(response, undefined, 4));
//};
//page.open(url);

//var page = require('webpage').create();
//var system = require('system');
//var t, address;
//if (system.args.length == 1) {
//	console.log('Usage: loadspeed.js <some URL>');
//	phantom.exit();
//}
//t = Date.now();
//address = system.args[1];
//page.open(address, function(status){
//	if (status != 'success') {
//		console.log('FAIL to load the address');
//	} else {
//		t = Date.now() - t;
//		console.log('Loading time ' + t + ' msec');
//	}
//	phantom.exit();
//});

var page = require('webpage').create();
page.onConsoleMessage = function(msg) {
	console(msg);
};
page.open('https://www.baidu.com', function (status) {
	if (status == 'success') {
		/*
			page.libraryPath = '/Users/cdsb/Codes/Crawl/command';
		*/
		page.includeJs('https://code.jquery.com/jquery-3.1.1.min.js', function () {
			page.evaluate(function () {
				$(".s_ipt").attr('value', 'aaa');
				$("#su").click();
			});
			phantomjs.exit(0);
		});
	} else {
		phantom.exit(1);
	}
});

/*

page.onError = function(msg, trace) {
	var msgStack = ['PHANTOM ERROR: ' + msg];
	if (trace &amp;&amp; trace.length) {
		msgStack.push('TRACE:');
		trace.forEach(function(t) {
			msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
		});
	}
	console.error(msgStack.join('\n'));
	phantom.exit(1);
};


	https://code.jquery.com/jquery-3.1.1.min.js
*/


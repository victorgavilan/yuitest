var YUITest=exports;YUITest.version="@VERSION@";exports.YUITest=YUITest;YUITest.EventTarget=function(){this._handlers={};};YUITest.EventTarget.prototype={constructor:YUITest.EventTarget,attach:function(a,b){if(typeof this._handlers[a]=="undefined"){this._handlers[a]=[];}this._handlers[a].push(b);},subscribe:function(a,b){this.attach.apply(this,arguments);},fire:function(d){if(typeof d=="string"){d={type:d};}if(!d.target){d.target=this;}if(!d.type){throw new Error("Event object missing 'type' property.");}if(this._handlers[d.type] instanceof Array){var b=this._handlers[d.type];for(var c=0,a=b.length;c<a;c++){b[c].call(this,d);}}},detach:function(d,e){if(this._handlers[d] instanceof Array){var b=this._handlers[d];for(var c=0,a=b.length;c<a;c++){if(b[c]===e){b.splice(c,1);break;}}}},unsubscribe:function(a,b){this.detach.apply(this,arguments);}};YUITest.Util={mix:function(b,a){for(var c in a){if(a.hasOwnProperty(c)){b[c]=a[c];}}return b;},JSON:typeof JSON!="undefined"?JSON:{stringify:function(){throw new Error("No JSON utility specified.");}}};YUITest.Object={_forceEnum:["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toString","toLocaleString","valueOf"],_hasEnumBug:!{valueOf:0}.propertyIsEnumerable("valueOf"),_isObject:function(c,b){var a=typeof c;return(c&&(a==="object"||(!b&&(a==="function"||typeof a==="function"))))||false;},keys:Object.keys||function(e){if(!YUITest.Object.isObject(e)){throw new TypeError("Object.keys called on a non-object");}var d=[],c,b,a;for(b in e){if(owns(e,b)){d.push(b);}}if(YUITest.Object._hasEnumBug){for(c=0,a=YUITest.Object._forceEnum.length;c<a;++c){b=YUITest.Object._forceEnum[c];if(owns(e,b)){d.push(b);}}}return d;}};YUITest.AssertionError=function(a){this.message=a;this.name="Assert Error";};YUITest.AssertionError.prototype={constructor:YUITest.AssertionError,getMessage:function(){return this.message;},toString:function(){return this.name+": "+this.getMessage();}};YUITest.ComparisonFailure=function(b,a,c){YUITest.AssertionError.call(this,b);this.expected=a;this.actual=c;this.name="ComparisonFailure";};YUITest.ComparisonFailure.prototype=new YUITest.AssertionError;YUITest.ComparisonFailure.prototype.constructor=YUITest.ComparisonFailure;YUITest.ComparisonFailure.prototype.getMessage=function(){return this.message+"\nExpected: "+this.expected+" ("+(typeof this.expected)+")"+"\nActual: "+this.actual+" ("+(typeof this.actual)+")";};YUITest.ShouldError=function(a){YUITest.AssertionError.call(this,a||"This test should have thrown an error but didn't.");this.name="ShouldError";};YUITest.ShouldError.prototype=new YUITest.AssertionError();YUITest.ShouldError.prototype.constructor=YUITest.ShouldError;YUITest.ShouldFail=function(a){YUITest.AssertionError.call(this,a||"This test should fail but didn't.");this.name="ShouldFail";};YUITest.ShouldFail.prototype=new YUITest.AssertionError();YUITest.ShouldFail.prototype.constructor=YUITest.ShouldFail;YUITest.UnexpectedError=function(a){YUITest.AssertionError.call(this,"Unexpected error: "+a.message);this.cause=a;this.name="UnexpectedError";this.stack=a.stack;};YUITest.UnexpectedError.prototype=new YUITest.AssertionError();YUITest.UnexpectedError.prototype.constructor=YUITest.UnexpectedError;YUITest.UnexpectedValue=function(b,a){YUITest.AssertionError.call(this,b);this.unexpected=a;this.name="UnexpectedValue";};YUITest.UnexpectedValue.prototype=new YUITest.AssertionError();YUITest.UnexpectedValue.prototype.constructor=YUITest.UnexpectedValue;YUITest.UnexpectedValue.prototype.getMessage=function(){return this.message+"\nUnexpected: "+this.unexpected+" ("+(typeof this.unexpected)+") ";};YUITest.Wait=function(b,a){this.segment=(typeof b=="function"?b:null);this.delay=(typeof a=="number"?a:0);};YUITest.Assert={_asserts:0,_formatMessage:function(b,a){if(typeof b=="string"&&b.length>0){return b.replace("{message}",a);}else{return a;}},_getCount:function(){return this._asserts;},_increment:function(){this._asserts++;},_reset:function(){this._asserts=0;},fail:function(a){throw new YUITest.AssertionError(YUITest.Assert._formatMessage(a,"Test force-failed."));},pass:function(a){YUITest.Assert._increment();},areEqual:function(b,c,a){YUITest.Assert._increment();if(b!=c){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(a,"Values should be equal."),b,c);}},areNotEqual:function(a,c,b){YUITest.Assert._increment();if(a==c){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(b,"Values should not be equal."),a);}},areNotSame:function(a,c,b){YUITest.Assert._increment();if(a===c){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(b,"Values should not be the same."),a);}},areSame:function(b,c,a){YUITest.Assert._increment();if(b!==c){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(a,"Values should be the same."),b,c);}},isFalse:function(b,a){YUITest.Assert._increment();if(false!==b){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(a,"Value should be false."),false,b);}},isTrue:function(b,a){YUITest.Assert._increment();if(true!==b){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(a,"Value should be true."),true,b);}},isNaN:function(b,a){YUITest.Assert._increment();if(!isNaN(b)){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(a,"Value should be NaN."),NaN,b);}},isNotNaN:function(b,a){YUITest.Assert._increment();if(isNaN(b)){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(a,"Values should not be NaN."),NaN);}},isNotNull:function(b,a){YUITest.Assert._increment();if(b===null){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(a,"Values should not be null."),null);}},isNotUndefined:function(b,a){YUITest.Assert._increment();if(typeof b=="undefined"){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(a,"Value should not be undefined."),undefined);}},isNull:function(b,a){YUITest.Assert._increment();if(b!==null){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(a,"Value should be null."),null,b);
}},isUndefined:function(b,a){YUITest.Assert._increment();if(typeof b!="undefined"){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(a,"Value should be undefined."),undefined,b);}},isArray:function(c,b){YUITest.Assert._increment();var a=false;if(Array.isArray){a=!Array.isArray(c);}else{a=Object.prototype.toString.call(c)!="[object Array]";}if(a){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(b,"Value should be an array."),c);}},isBoolean:function(b,a){YUITest.Assert._increment();if(typeof b!="boolean"){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(a,"Value should be a Boolean."),b);}},isFunction:function(b,a){YUITest.Assert._increment();if(!(b instanceof Function)){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(a,"Value should be a function."),b);}},isInstanceOf:function(b,c,a){YUITest.Assert._increment();if(!(c instanceof b)){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(a,"Value isn't an instance of expected type."),b,c);}},isNumber:function(b,a){YUITest.Assert._increment();if(typeof b!="number"){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(a,"Value should be a number."),b);}},isObject:function(b,a){YUITest.Assert._increment();if(!b||(typeof b!="object"&&typeof b!="function")){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(a,"Value should be an object."),b);}},isString:function(b,a){YUITest.Assert._increment();if(typeof b!="string"){throw new YUITest.UnexpectedValue(YUITest.Assert._formatMessage(a,"Value should be a string."),b);}},isTypeOf:function(a,c,b){YUITest.Assert._increment();if(typeof c!=a){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(b,"Value should be of type "+a+"."),a,typeof c);}},throwsError:function(d,e,c){YUITest.Assert._increment();var a=false;try{e();}catch(b){if(typeof d=="string"){if(b.message!=d){a=true;}}else{if(typeof d=="function"){if(!(b instanceof d)){a=true;}}else{if(typeof d=="object"&&d!==null){if(!(b instanceof d.constructor)||b.message!=d.message){a=true;}}else{a=true;}}}if(a){throw new YUITest.UnexpectedError(b);}else{return;}}throw new YUITest.AssertionError(YUITest.Assert._formatMessage(c,"Error should have been thrown."));}};YUITest.ArrayAssert={_indexOf:function(b,c){if(b.indexOf){return b.indexOf(c);}else{for(var a=0;a<b.length;a++){if(b[a]===c){return a;}}return -1;}},_some:function(b,c){if(b.some){return b.some(c);}else{for(var a=0;a<b.length;a++){if(c(b[a])){return true;}}return false;}},contains:function(c,b,a){YUITest.Assert._increment();if(this._indexOf(b,c)==-1){YUITest.Assert.fail(YUITest.Assert._formatMessage(a,"Value "+c+" ("+(typeof c)+") not found in array ["+b+"]."));}},containsItems:function(c,d,b){YUITest.Assert._increment();for(var a=0;a<c.length;a++){if(this._indexOf(d,c[a])==-1){YUITest.Assert.fail(YUITest.Assert._formatMessage(b,"Value "+c[a]+" ("+(typeof c[a])+") not found in array ["+d+"]."));}}},containsMatch:function(c,b,a){YUITest.Assert._increment();if(typeof c!="function"){throw new TypeError("ArrayAssert.containsMatch(): First argument must be a function.");}if(!this._some(b,c)){YUITest.Assert.fail(YUITest.Assert._formatMessage(a,"No match found in array ["+b+"]."));}},doesNotContain:function(c,b,a){YUITest.Assert._increment();if(this._indexOf(b,c)>-1){YUITest.Assert.fail(YUITest.Assert._formatMessage(a,"Value found in array ["+b+"]."));}},doesNotContainItems:function(c,d,b){YUITest.Assert._increment();for(var a=0;a<c.length;a++){if(this._indexOf(d,c[a])>-1){YUITest.Assert.fail(YUITest.Assert._formatMessage(b,"Value found in array ["+d+"]."));}}},doesNotContainMatch:function(c,b,a){YUITest.Assert._increment();if(typeof c!="function"){throw new TypeError("ArrayAssert.doesNotContainMatch(): First argument must be a function.");}if(this._some(b,c)){YUITest.Assert.fail(YUITest.Assert._formatMessage(a,"Value found in array ["+b+"]."));}},indexOf:function(e,d,a,c){YUITest.Assert._increment();for(var b=0;b<d.length;b++){if(d[b]===e){if(a!=b){YUITest.Assert.fail(YUITest.Assert._formatMessage(c,"Value exists at index "+b+" but should be at index "+a+"."));}return;}}YUITest.Assert.fail(YUITest.Assert._formatMessage(c,"Value doesn't exist in array ["+d+"]."));},itemsAreEqual:function(c,d,b){YUITest.Assert._increment();if(typeof c!="object"||typeof d!="object"){YUITest.Assert.fail(YUITest.Assert._formatMessage(b,"Value should be an array."));}if(c.length!=d.length){YUITest.Assert.fail(YUITest.Assert._formatMessage(b,"Array should have a length of "+c.length+" but has a length of "+d.length+"."));}for(var a=0;a<c.length;a++){if(c[a]!=d[a]){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(b,"Values in position "+a+" are not equal."),c[a],d[a]);}}},itemsAreEquivalent:function(d,e,a,c){YUITest.Assert._increment();if(typeof a!="function"){throw new TypeError("ArrayAssert.itemsAreEquivalent(): Third argument must be a function.");}if(d.length!=e.length){YUITest.Assert.fail(YUITest.Assert._formatMessage(c,"Array should have a length of "+d.length+" but has a length of "+e.length));}for(var b=0;b<d.length;b++){if(!a(d[b],e[b])){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(c,"Values in position "+b+" are not equivalent."),d[b],e[b]);}}},isEmpty:function(b,a){YUITest.Assert._increment();if(b.length>0){YUITest.Assert.fail(YUITest.Assert._formatMessage(a,"Array should be empty."));}},isNotEmpty:function(b,a){YUITest.Assert._increment();if(b.length===0){YUITest.Assert.fail(YUITest.Assert._formatMessage(a,"Array should not be empty."));}},itemsAreSame:function(c,d,b){YUITest.Assert._increment();if(c.length!=d.length){YUITest.Assert.fail(YUITest.Assert._formatMessage(b,"Array should have a length of "+c.length+" but has a length of "+d.length));}for(var a=0;a<c.length;a++){if(c[a]!==d[a]){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(b,"Values in position "+a+" are not the same."),c[a],d[a]);}}},lastIndexOf:function(e,d,a,c){for(var b=d.length;b>=0;b--){if(d[b]===e){if(a!=b){YUITest.Assert.fail(YUITest.Assert._formatMessage(c,"Value exists at index "+b+" but should be at index "+a+"."));
}return;}}YUITest.Assert.fail(YUITest.Assert._formatMessage(c,"Value doesn't exist in array."));}};YUITest.ObjectAssert={areEqual:function(d,f,c){YUITest.Assert._increment();var b=YUITest.Object.keys(d),e=YUITest.Object.keys(f);if(b.length!=e.length){YUITest.Assert.fail(YUITest.Assert._formatMessage(c,"Object should have "+b.length+" keys but has "+e.length));}for(var a in d){if(d.hasOwnProperty(a)){if(d[a]!=f[a]){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(c,"Values should be equal for property "+a),d[a],f[a]);}}}},hasKey:function(a,b,c){YUITest.ObjectAssert.ownsOrInheritsKey(a,b,c);},hasKeys:function(b,a,c){YUITest.ObjectAssert.ownsOrInheritsKeys(b,a,c);},inheritsKey:function(a,b,c){YUITest.Assert._increment();if(!(a in b&&!b.hasOwnProperty(a))){YUITest.Assert.fail(YUITest.Assert._formatMessage(c,"Property '"+a+"' not found on object instance."));}},inheritsKeys:function(c,a,d){YUITest.Assert._increment();for(var b=0;b<c.length;b++){if(!(propertyName in a&&!a.hasOwnProperty(c[b]))){YUITest.Assert.fail(YUITest.Assert._formatMessage(d,"Property '"+c[b]+"' not found on object instance."));}}},ownsKey:function(a,b,c){YUITest.Assert._increment();if(!b.hasOwnProperty(a)){YUITest.Assert.fail(YUITest.Assert._formatMessage(c,"Property '"+a+"' not found on object instance."));}},ownsKeys:function(c,a,d){YUITest.Assert._increment();for(var b=0;b<c.length;b++){if(!a.hasOwnProperty(c[b])){YUITest.Assert.fail(YUITest.Assert._formatMessage(d,"Property '"+c[b]+"' not found on object instance."));}}},ownsNoKeys:function(b,d){YUITest.Assert._increment();var c=0,a;for(a in b){if(b.hasOwnProperty(a)){c++;}}if(c!==0){YUITest.Assert.fail(YUITest.Assert._formatMessage(d,"Object owns "+c+" properties but should own none."));}},ownsOrInheritsKey:function(a,b,c){YUITest.Assert._increment();if(!(a in b)){YUITest.Assert.fail(YUITest.Assert._formatMessage(c,"Property '"+a+"' not found on object."));}},ownsOrInheritsKeys:function(c,a,d){YUITest.Assert._increment();for(var b=0;b<c.length;b++){if(!(c[b] in a)){YUITest.Assert.fail(YUITest.Assert._formatMessage(d,"Property '"+c[b]+"' not found on object."));}}}};YUITest.DateAssert={datesAreEqual:function(b,d,a){YUITest.Assert._increment();if(b instanceof Date&&d instanceof Date){var c="";if(b.getFullYear()!=d.getFullYear()){c="Years should be equal.";}if(b.getMonth()!=d.getMonth()){c="Months should be equal.";}if(b.getDate()!=d.getDate()){c="Days of month should be equal.";}if(c.length){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(a,c),b,d);}}else{throw new TypeError("YUITest.DateAssert.datesAreEqual(): Expected and actual values must be Date objects.");}},timesAreEqual:function(b,d,a){YUITest.Assert._increment();if(b instanceof Date&&d instanceof Date){var c="";if(b.getHours()!=d.getHours()){c="Hours should be equal.";}if(b.getMinutes()!=d.getMinutes()){c="Minutes should be equal.";}if(b.getSeconds()!=d.getSeconds()){c="Seconds should be equal.";}if(c.length){throw new YUITest.ComparisonFailure(YUITest.Assert._formatMessage(a,c),b,d);}}else{throw new TypeError("YUITest.DateAssert.timesAreEqual(): Expected and actual values must be Date objects.");}}};YUITest.Mock=function(d){d=d||{};var a,b;try{function e(){}e.prototype=d;a=new e();}catch(c){a={};}for(b in d){if(d.hasOwnProperty(b)){if(typeof d[b]=="function"){a[b]=function(f){return function(){YUITest.Assert.fail("Method "+f+"() was called but was not expected to be.");};}(b);}}}return a;};YUITest.Mock.expect=function(f,b){if(!f.__expectations){f.__expectations={};}if(b.method){var a=b.method,g=b.args||[],j=b.returns,e=(typeof b.callCount=="number")?b.callCount:1,h=b.error,c=b.run||function(){},d;f.__expectations[a]=b;b.callCount=e;b.actualCallCount=0;for(d=0;d<g.length;d++){if(!(g[d] instanceof YUITest.Mock.Value)){g[d]=YUITest.Mock.Value(YUITest.Assert.areSame,[g[d]],"Argument "+d+" of "+a+"() is incorrect.");}}if(e>0){f[a]=function(){try{b.actualCallCount++;YUITest.Assert.areEqual(g.length,arguments.length,"Method "+a+"() passed incorrect number of arguments.");for(var m=0,k=g.length;m<k;m++){g[m].verify(arguments[m]);}c.apply(this,arguments);if(h){throw h;}}catch(l){YUITest.TestRunner._handleError(l);}return j;};}else{f[a]=function(){try{YUITest.Assert.fail("Method "+a+"() should not have been called.");}catch(i){YUITest.TestRunner._handleError(i);}};}}else{if(b.property){f.__expectations[b.property]=b;}}};YUITest.Mock.verify=function(a){try{for(var c in a.__expectations){if(a.__expectations.hasOwnProperty(c)){var b=a.__expectations[c];if(b.method){YUITest.Assert.areEqual(b.callCount,b.actualCallCount,"Method "+b.method+"() wasn't called the expected number of times.");}else{if(b.property){YUITest.Assert.areEqual(b.value,a[b.property],"Property "+b.property+" wasn't set to the correct value.");}}}}}catch(d){YUITest.TestRunner._handleError(d);}};YUITest.Mock.Value=function(c,a,b){if(this instanceof YUITest.Mock.Value){this.verify=function(e){var d=[].concat(a||[]);d.push(e);d.push(b);c.apply(null,d);};}else{return new YUITest.Mock.Value(c,a,b);}};YUITest.Mock.Value.Any=YUITest.Mock.Value(function(){});YUITest.Mock.Value.Boolean=YUITest.Mock.Value(YUITest.Assert.isBoolean);YUITest.Mock.Value.Number=YUITest.Mock.Value(YUITest.Assert.isNumber);YUITest.Mock.Value.String=YUITest.Mock.Value(YUITest.Assert.isString);YUITest.Mock.Value.Object=YUITest.Mock.Value(YUITest.Assert.isObject);YUITest.Mock.Value.Function=YUITest.Mock.Value(YUITest.Assert.isFunction);YUITest.Results=function(a){this.name=a;this.passed=0;this.failed=0;this.errors=0;this.ignored=0;this.total=0;this.duration=0;};YUITest.Results.prototype.include=function(a){this.passed+=a.passed;this.failed+=a.failed;this.ignored+=a.ignored;this.total+=a.total;this.errors+=a.errors;};YUITest.TestCase=function(a){this._should={};for(var b in a){this[b]=a[b];}if(typeof this.name!="string"){this.name="testCase"+(+new Date());}};YUITest.TestCase.prototype={constructor:YUITest.TestCase,callback:function(){return YUITest.TestRunner.callback.apply(YUITest.TestRunner,arguments);
},resume:function(a){YUITest.TestRunner.resume(a);},wait:function(c,a){var b=(typeof c=="number"?c:a);b=(typeof b=="number"?b:10000);if(typeof c=="function"){throw new YUITest.Wait(c,b);}else{throw new YUITest.Wait(function(){YUITest.Assert.fail("Timeout: wait() called but resume() never called.");},b);}},assert:function(b,a){YUITest.Assert._increment();if(!b){throw new YUITest.AssertionError(YUITest.Assert._formatMessage(a,"Assertion failed."));}},fail:function(a){YUITest.Assert.fail(a);},init:function(){},destroy:function(){},setUp:function(){},tearDown:function(){}};YUITest.TestSuite=function(a){this.name="";this.items=[];if(typeof a=="string"){this.name=a;}else{if(a instanceof Object){for(var b in a){if(a.hasOwnProperty(b)){this[b]=a[b];}}}}if(this.name===""){this.name="testSuite"+(+new Date());}};YUITest.TestSuite.prototype={constructor:YUITest.TestSuite,add:function(a){if(a instanceof YUITest.TestSuite||a instanceof YUITest.TestCase){this.items.push(a);}return this;},setUp:function(){},tearDown:function(){}};YUITest.TestFormat=function(){function a(b){return b.replace(/[<>"'&]/g,function(c){switch(c){case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&apos;";case"&":return"&amp;";}});}return{JSON:function(b){return YUITest.Util.JSON.stringify(b);},XML:function(c){function b(e){var d="<"+e.type+' name="'+a(e.name)+'"';if(typeof(e.duration)=="number"){d+=' duration="'+e.duration+'"';}if(e.type=="test"){d+=' result="'+e.result+'" message="'+a(e.message)+'">';}else{d+=' passed="'+e.passed+'" failed="'+e.failed+'" ignored="'+e.ignored+'" total="'+e.total+'">';for(var f in e){if(e.hasOwnProperty(f)){if(e[f]&&typeof e[f]=="object"&&!(e[f] instanceof Array)){d+=b(e[f]);}}}}d+="</"+e.type+">";return d;}return'<?xml version="1.0" encoding="UTF-8"?>'+b(c);},JUnitXML:function(b){function c(e){var d="";switch(e.type){case"test":if(e.result!="ignore"){d='<testcase name="'+a(e.name)+'" time="'+(e.duration/1000)+'">';if(e.result=="fail"){d+='<failure message="'+a(e.message)+'"><![CDATA['+e.message+"]]></failure>";}d+="</testcase>";}break;case"testcase":d='<testsuite name="'+a(e.name)+'" tests="'+e.total+'" failures="'+e.failed+'" time="'+(e.duration/1000)+'">';for(var f in e){if(e.hasOwnProperty(f)){if(e[f]&&typeof e[f]=="object"&&!(e[f] instanceof Array)){d+=c(e[f]);}}}d+="</testsuite>";break;case"testsuite":for(var f in e){if(e.hasOwnProperty(f)){if(e[f]&&typeof e[f]=="object"&&!(e[f] instanceof Array)){d+=c(e[f]);}}}break;case"report":d="<testsuites>";for(var f in e){if(e.hasOwnProperty(f)){if(e[f]&&typeof e[f]=="object"&&!(e[f] instanceof Array)){d+=c(e[f]);}}}d+="</testsuites>";}return d;}return'<?xml version="1.0" encoding="UTF-8"?>'+c(b);},TAP:function(c){var d=1;function b(e){var f="";switch(e.type){case"test":if(e.result!="ignore"){f="ok "+(d++)+" - "+e.name;if(e.result=="fail"){f="not "+f+" - "+e.message;}f+="\n";}else{f="#Ignored test "+e.name+"\n";}break;case"testcase":f="#Begin testcase "+e.name+"("+e.failed+" failed of "+e.total+")\n";for(var g in e){if(e.hasOwnProperty(g)){if(e[g]&&typeof e[g]=="object"&&!(e[g] instanceof Array)){f+=b(e[g]);}}}f+="#End testcase "+e.name+"\n";break;case"testsuite":f="#Begin testsuite "+e.name+"("+e.failed+" failed of "+e.total+")\n";for(var g in e){if(e.hasOwnProperty(g)){if(e[g]&&typeof e[g]=="object"&&!(e[g] instanceof Array)){f+=b(e[g]);}}}f+="#End testsuite "+e.name+"\n";break;case"report":for(var g in e){if(e.hasOwnProperty(g)){if(e[g]&&typeof e[g]=="object"&&!(e[g] instanceof Array)){f+=b(e[g]);}}}}return f;}return"1.."+c.total+"\n"+b(c);}};}();YUITest.CoverageFormat={JSON:function(a){return YUITest.Util.JSON.stringify(a);},XdebugJSON:function(b){var a={};for(var c in b){if(b.hasOwnProperty(c)){a[c]=b[c].lines;}}return YUITest.Util.JSON.stringify(b);}};YUITest.TestRunner=function(){function c(e,g){if(!g.length){return true;}else{if(e){for(var f=0,d=e.length;f<d;f++){if(g.indexOf(","+e[f]+",")>-1){return true;}}}return false;}}function b(d){this.testObject=d;this.firstChild=null;this.lastChild=null;this.parent=null;this.next=null;this.results=new YUITest.Results();if(d instanceof YUITest.TestSuite){this.results.type="testsuite";this.results.name=d.name;}else{if(d instanceof YUITest.TestCase){this.results.type="testcase";this.results.name=d.name;}}}b.prototype={appendChild:function(d){var e=new b(d);if(this.firstChild===null){this.firstChild=this.lastChild=e;}else{this.lastChild.next=e;this.lastChild=e;}e.parent=this;return e;}};function a(){YUITest.EventTarget.call(this);this.masterSuite=new YUITest.TestSuite("yuitests"+(new Date()).getTime());this._cur=null;this._root=null;this._log=true;this._waiting=false;this._running=false;this._lastResults=null;this._context=null;this._groups="";}a.prototype=YUITest.Util.mix(new YUITest.EventTarget(),{constructor:YUITest.TestRunner,TEST_CASE_BEGIN_EVENT:"testcasebegin",TEST_CASE_COMPLETE_EVENT:"testcasecomplete",TEST_SUITE_BEGIN_EVENT:"testsuitebegin",TEST_SUITE_COMPLETE_EVENT:"testsuitecomplete",TEST_PASS_EVENT:"pass",TEST_FAIL_EVENT:"fail",ERROR_EVENT:"error",TEST_IGNORE_EVENT:"ignore",COMPLETE_EVENT:"complete",BEGIN_EVENT:"begin",_addTestCaseToTestTree:function(e,f){var g=e.appendChild(f),h,d;for(h in f){if((h.indexOf("test")===0||h.indexOf(" ")>-1)&&typeof f[h]=="function"){g.appendChild(h);}}},_addTestSuiteToTestTree:function(d,g){var f=d.appendChild(g);for(var e=0;e<g.items.length;e++){if(g.items[e] instanceof YUITest.TestSuite){this._addTestSuiteToTestTree(f,g.items[e]);}else{if(g.items[e] instanceof YUITest.TestCase){this._addTestCaseToTestTree(f,g.items[e]);}}}},_buildTestTree:function(){this._root=new b(this.masterSuite);for(var d=0;d<this.masterSuite.items.length;d++){if(this.masterSuite.items[d] instanceof YUITest.TestSuite){this._addTestSuiteToTestTree(this._root,this.masterSuite.items[d]);}else{if(this.masterSuite.items[d] instanceof YUITest.TestCase){this._addTestCaseToTestTree(this._root,this.masterSuite.items[d]);}}}},_handleTestObjectComplete:function(e){var d;
if(e&&(typeof e.testObject=="object")){d=e.parent;if(d){d.results.include(e.results);d.results[e.testObject.name]=e.results;}if(e.testObject instanceof YUITest.TestSuite){this._execNonTestMethod(e,"tearDown",false);e.results.duration=(new Date())-e._start;this.fire({type:this.TEST_SUITE_COMPLETE_EVENT,testSuite:e.testObject,results:e.results});}else{if(e.testObject instanceof YUITest.TestCase){this._execNonTestMethod(e,"destroy",false);e.results.duration=(new Date())-e._start;this.fire({type:this.TEST_CASE_COMPLETE_EVENT,testCase:e.testObject,results:e.results});}}}},_next:function(){if(this._cur===null){this._cur=this._root;}else{if(this._cur.firstChild){this._cur=this._cur.firstChild;}else{if(this._cur.next){this._cur=this._cur.next;}else{while(this._cur&&!this._cur.next&&this._cur!==this._root){this._handleTestObjectComplete(this._cur);this._cur=this._cur.parent;}this._handleTestObjectComplete(this._cur);if(this._cur==this._root){this._cur.results.type="report";this._cur.results.timestamp=(new Date()).toLocaleString();this._cur.results.duration=(new Date())-this._cur._start;this._lastResults=this._cur.results;this._running=false;this.fire({type:this.COMPLETE_EVENT,results:this._lastResults});this._cur=null;}else{if(this._cur){this._cur=this._cur.next;}}}}}return this._cur;},_execNonTestMethod:function(h,d,i){var e=h.testObject,g={type:this.ERROR_EVENT};try{if(i&&e["async:"+d]){e["async:"+d](this._context);return true;}else{e[d](this._context);}}catch(f){h.results.errors++;g.error=f;g.methodName=d;if(e instanceof YUITest.TestCase){g.testCase=e;}else{g.testSuite=testSuite;}this.fire(g);}return false;},_run:function(){var f=false;var e=this._next();if(e!==null){this._running=true;this._lastResult=null;var d=e.testObject;if(typeof d=="object"&&d!==null){if(d instanceof YUITest.TestSuite){this.fire({type:this.TEST_SUITE_BEGIN_EVENT,testSuite:d});e._start=new Date();this._execNonTestMethod(e,"setUp",false);}else{if(d instanceof YUITest.TestCase){this.fire({type:this.TEST_CASE_BEGIN_EVENT,testCase:d});e._start=new Date();if(this._execNonTestMethod(e,"init",true)){return;}}}if(typeof setTimeout!="undefined"){setTimeout(function(){YUITest.TestRunner._run();},0);}else{this._run();}}else{this._runTest(e);}}},_resumeTest:function(i){var d=this._cur;this._waiting=false;if(!d){return;}var j=d.testObject;var g=d.parent.testObject;if(g.__yui_wait){clearTimeout(g.__yui_wait);delete g.__yui_wait;}var m=j.indexOf("fail:")===0||(g._should.fail||{})[j];var e=(g._should.error||{})[j];var h=false;var k=null;try{i.call(g,this._context);if(YUITest.Assert._getCount()==0){throw new YUITest.AssertionError("Test has no asserts.");}else{if(m){k=new YUITest.ShouldFail();h=true;}else{if(e){k=new YUITest.ShouldError();h=true;}}}}catch(l){if(g.__yui_wait){clearTimeout(g.__yui_wait);delete g.__yui_wait;}if(l instanceof YUITest.AssertionError){if(!m){k=l;h=true;}}else{if(l instanceof YUITest.Wait){if(typeof l.segment=="function"){if(typeof l.delay=="number"){if(typeof setTimeout!="undefined"){g.__yui_wait=setTimeout(function(){YUITest.TestRunner._resumeTest(l.segment);},l.delay);this._waiting=true;}else{throw new Error("Asynchronous tests not supported in this environment.");}}}return;}else{if(!e){k=new YUITest.UnexpectedError(l);h=true;}else{if(typeof e=="string"){if(l.message!=e){k=new YUITest.UnexpectedError(l);h=true;}}else{if(typeof e=="function"){if(!(l instanceof e)){k=new YUITest.UnexpectedError(l);h=true;}}else{if(typeof e=="object"&&e!==null){if(!(l instanceof e.constructor)||l.message!=e.message){k=new YUITest.UnexpectedError(l);h=true;}}}}}}}}if(h){this.fire({type:this.TEST_FAIL_EVENT,testCase:g,testName:j,error:k});}else{this.fire({type:this.TEST_PASS_EVENT,testCase:g,testName:j});}this._execNonTestMethod(d.parent,"tearDown",false);YUITest.Assert._reset();var f=(new Date())-d._start;d.parent.results[j]={result:h?"fail":"pass",message:k?k.getMessage():"Test passed",type:"test",name:j,duration:f};if(h){d.parent.results.failed++;}else{d.parent.results.passed++;}d.parent.results.total++;if(typeof setTimeout!="undefined"){setTimeout(function(){YUITest.TestRunner._run();},0);}else{this._run();}},_handleError:function(d){if(this._waiting){this._resumeTest(function(){throw d;});}else{throw d;}},_runTest:function(g){var d=g.testObject,e=g.parent.testObject,h=e[d],f=d.indexOf("ignore:")===0||!c(e.groups,this._groups)||(e._should.ignore||{})[d];if(f){g.parent.results[d]={result:"ignore",message:"Test ignored",type:"test",name:d.indexOf("ignore:")===0?d.substring(7):d};g.parent.results.ignored++;g.parent.results.total++;this.fire({type:this.TEST_IGNORE_EVENT,testCase:e,testName:d});if(typeof setTimeout!="undefined"){setTimeout(function(){YUITest.TestRunner._run();},0);}else{this._run();}}else{g._start=new Date();this._execNonTestMethod(g.parent,"setUp",false);this._resumeTest(h);}},getName:function(){return this.masterSuite.name;},setName:function(d){this.masterSuite.name=d;},add:function(d){this.masterSuite.add(d);return this;},clear:function(){this.masterSuite=new YUITest.TestSuite("yuitests"+(new Date()).getTime());},isWaiting:function(){return this._waiting;},isRunning:function(){return this._running;},getResults:function(d){if(!this._running&&this._lastResults){if(typeof d=="function"){return d(this._lastResults);}else{return this._lastResults;}}else{return null;}},getCoverage:function(d){if(!this._running&&typeof _yuitest_coverage=="object"){if(typeof d=="function"){return d(_yuitest_coverage);}else{return _yuitest_coverage;}}else{return null;}},callback:function(){var f=arguments,e=this._context,d=this;return function(){for(var g=0;g<arguments.length;g++){e[f[g]]=arguments[g];}d._run();};},resume:function(d){if(this._waiting){this._resumeTest(d||function(){});}else{throw new Error("resume() called without wait().");}},run:function(e){e=e||{};var f=YUITest.TestRunner,d=e.oldMode;if(!d&&this.masterSuite.items.length==1&&this.masterSuite.items[0] instanceof YUITest.TestSuite){this.masterSuite=this.masterSuite.items[0];
}f._groups=(e.groups instanceof Array)?","+e.groups.join(",")+",":"";f._buildTestTree();f._context={};f._root._start=new Date();f.fire(f.BEGIN_EVENT);f._run();}});return new a();}();
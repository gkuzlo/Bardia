/*
 * JavaScriptUtil is a part of JavaScripTools (http://javascriptools.sourceforge.net).
 * This file was compressed using JavaScriptZip (http://javascriptzip.sourceforge.net).
 * Author: Luis Fernando Planella Gonzalez (lfpg.dev at gmail dot com)
 * Version: 2.2.5
 * JavaScripTools is distributed under the GNU Lesser General Public License (LGPL).
 * For more information, see http://www.gnu.org/licenses/lgpl-2.1.txt
*/
var JST_CHARS_NUMBERS="0123456789";var JST_CHARS_LOWER="";var JST_CHARS_UPPER="";for(var i=50;i<500;i++){var c=String.fromCharCode(i);var lower=c.toLowerCase();var upper=c.toUpperCase();if(lower!=upper){JST_CHARS_LOWER+=lower;JST_CHARS_UPPER+=upper}}
var JST_CHARS_LETTERS=JST_CHARS_LOWER+JST_CHARS_UPPER;var JST_CHARS_ALPHA=JST_CHARS_LETTERS+JST_CHARS_NUMBERS;var JST_CHARS_BASIC_LOWER="abcdefghijklmnopqrstuvwxyz";var JST_CHARS_BASIC_UPPER="ABCDEFGHIJKLMNOPQRSTUVWXYZ";var JST_CHARS_BASIC_LETTERS=JST_CHARS_BASIC_LOWER+JST_CHARS_BASIC_UPPER;var JST_CHARS_BASIC_ALPHA=JST_CHARS_BASIC_LETTERS+JST_CHARS_NUMBERS;var JST_CHARS_WHITESPACE=" \t\n\r";var MILLIS_IN_SECOND=1000;var MILLIS_IN_MINUTE=60*MILLIS_IN_SECOND;var MILLIS_IN_HOUR=60*MILLIS_IN_MINUTE;var MILLIS_IN_DAY=24*MILLIS_IN_HOUR;var JST_FIELD_MILLISECOND=0;var JST_FIELD_SECOND=1;var JST_FIELD_MINUTE=2;var JST_FIELD_HOUR=3;var JST_FIELD_DAY=4;var JST_FIELD_MONTH=5;var JST_FIELD_YEAR=6;
function getObject(objectName,source){if(isEmpty(objectName)){return null}
if(!isInstance(objectName,String)){return objectName}
if(isEmpty(source)){source=self}
if(isInstance(source,String)){sourceName=source;source=self.frames[sourceName];if(source==null) source=parent.frames[sourceName];if(source==null) source=top.frames[sourceName];if(source==null) source=getObject(sourceName);if(source==null) return null}
var document=(source.document)?source.document:source;if(document.getElementById){var collection=document.getElementsByName(objectName);if(collection.length==1) return collection[0];if(collection.length>1){if(typeof(collection)=="array"){return collection}
var ret=new Array(collection.length);for(var i=0;i<collection.length;i++){ret[i]=collection[i]}
return ret}
return document.getElementById(objectName)} else {if(document[objectName]) return document[objectName];if(document.all[objectName]) return document.all[objectName];if(source[objectName]) return source[objectName]}
return null}
function isInstance(object,clazz){if((object==null)||(clazz==null)){return false}
if(object instanceof clazz){return true}
if((clazz==String)&&(typeof(object)=="string")){return true}
if((clazz==Number)&&(typeof(object)=="number")){return true}
if((clazz==Array)&&(typeof(object)=="array")){return true}
if((clazz==Function)&&(typeof(object)=="function")){return true}
var base=object.base;while(base!=null){if(base==clazz){return true}
base=base.base}
return false}
function booleanValue(object,trueChars){if(object==true||object==false){return object} else {object=String(object);if(object.length==0){return false} else {var first=object.charAt(0).toUpperCase();trueChars=isEmpty(trueChars)?"T1YS":trueChars.toUpperCase();return trueChars.indexOf(first)!=-1
}}}
function isUndefined(object){return typeof(object)=="undefined"}
function invoke(functionName,args){var arguments;if(args==null||isUndefined(args)){arguments="()"} else if(!isInstance(args,Array)){arguments="(args)"} else {arguments="(";for(var i=0;i<args.length;i++){if(i>0){arguments+=","}
arguments+="args["+i+"]"}
arguments+=")"}
return eval(functionName+arguments)}
function invokeAsMethod(object,method,args){return method.apply(object,args)}
function ensureArray(object){if(typeof(object)=='undefined'||object==null){return []}
if(object instanceof Array){return object}
return [object]}
function indexOf(object,array,startingAt){if((object==null)||!(array instanceof Array)){return-1}
if(startingAt==null){startingAt=0}
for(var i=startingAt;i<array.length;i++){if(array[i]==object){return i}}
return-1}
function inArray(object,array){return indexOf(object,array)>=0}
function removeFromArray(array){if(!isInstance(array,Array)){return null}
var ret=[];var toRemove=removeFromArray.arguments.slice(1);for(var i=0;i<array.length;i++){var current=array[i];if(!inArray(current,toRemove)){ret[ret.length]=current}}
return ret}
function arrayConcat(){var ret=[];for(var i=0;i<arrayConcat.arguments.length;i++){var current=arrayConcat.arguments[i];if(!isEmpty(current)){if(!isInstance(current,Array)){current=[current]
}
for(j=0;j<current.length;j++){ret[ret.length]=current[j]}}}
return ret}
function arrayEquals(array1,array2){if(!isInstance(array1,Array)||!isInstance(array2,Array)){return false}
if(array1.length!=array2.length){return false}
for(var i=0;i<array1.length;i++){if(array1[i]!=array2[i]){return false}}
return true}
function checkAll(object,flag){if(typeof(object)=="string"){object=getObject(object)}
if(object!=null){if(!isInstance(object,Array)){object=[object]}
for(i=0;i<object.length;i++){object[i].checked=flag}}}
function observeEvent(object,eventName,handler){object=getObject(object);if(object!=null){if(object.addEventListener){object.addEventListener(eventName,function(e){return invokeAsMethod(object,handler,[e])},false)} else if(object.attachEvent){object.attachEvent("on"+eventName,function(){return invokeAsMethod(object,handler,[window.event])})} else {object["on"+eventName]=handler}}}
function typedCode(event){var code=0;if(event==null&&window.event){event=window.event}
if(event!=null){if(event.keyCode){code=event.keyCode} else if(event.which){code=event.which}}
return code}
function stopPropagation(event){if(event==null&&window.event){event=window.event}
if(event!=null){if(event.stopPropagation!=null){event.stopPropagation()} else if(event.cancelBubble!==null){event.cancelBubble=true}}
return false}
function preventDefault(event){if(event==null&&window.event){event=window.event}
if(event!=null){if(event.preventDefault!=null){event.preventDefault()} else if(event.returnValue!==null){event.returnValue=false}}
return false}
function prepareForCaret(object){object=getObject(object);if(object==null||!object.type){return null}
if(object.createTextRange){var handler=function(){object.caret=document.selection.createRange().duplicate()}
observeEvent(object,"onclick",handler);observeEvent(object,"ondblclick",handler);observeEvent(object,"onselect",handler);observeEvent(object,"onkeyup",handler)}}
function isCaretSupported(object){object=getObject(object);if(object==null||!object.type){return false}
if(navigator.userAgent.toLowerCase().indexOf("opera")>=0){return false}
return object.setSelectionRange!=null||object.createTextRange!=null}
function isInputSelectionSupported(object){object=getObject(object);if(object==null||!object.type){return false}
return object.setSelectionRange!=null||object.createTextRange!=null}
function getInputSelection(object){object=getObject(object);if(object==null||!object.type){return null}
try {if(object.createTextRange&&object.caret){return object.caret.text} else if(object.setSelectionRange){var selStart=object.selectionStart;var selEnd=object.selectionEnd;return object.value.substring(selStart,selEnd)}} catch(e){}
return ""}
function getInputSelectionRange(object){object=getObject(object);if(object==null||!object.type){return null}
try {if(object.selectionEnd){return [object.selectionStart,object.selectionEnd]} else if(object.createTextRange&&object.caret){var end=getCaret(object);return [end-object.caret.text.length,end]}} catch(e){}
return null}
function setInputSelectionRange(object,start,end){object=getObject(object);if(object==null||!object.type){return}
try {if(start<0){start=0}
if(end>object.value.length){end=object.value.length}
if(object.setSelectionRange){object.focus();object.setSelectionRange(start,end)} else if(object.createTextRange){object.focus();var range;if(object.caret){range=object.caret;range.moveStart("textedit",-1);range.moveEnd("textedit",-1)} else {range=object.createTextRange()}
range.moveEnd('character',end);range.moveStart('character',start);range.select()}} catch(e){}}
function getCaret(object){object=getObject(object);if(object==null||!object.type){return null}
try {if(object.createTextRange&&object.caret){var range=object.caret.duplicate();range.moveStart('textedit',-1);return range.text.length} else if(object.selectionStart||object.selectionStart==0){return object.selectionStart}} catch(e){}
return null}
function setCaret(object,pos){setInputSelectionRange(object,pos,pos)}
function setCaretToEnd(object){object=getObject(object);if(object==null||!object.type){return}
try {if(object.createTextRange){var range=object.createTextRange();range.collapse(false);range.select()} else if(object.setSelectionRange){var length=object.value.length;object.setSelectionRange(length,length);object.focus()}} catch(e){}}
function setCaretToStart(object){object=getObject(object);if(object==null||!object.type){return}
try {if(object.createTextRange){var range=object.createTextRange();range.collapse(true);range.select()} else if(object.setSelectionRange){object.focus();object.setSelectionRange(0,0)}} catch(e){}}
function selectString(object,string){if(isInstance(object,String)){object=getObject(object)}
if(object==null||!object.type){return}
var match=new RegExp(string,"i").exec(object.value);if(match){setInputSelectionRange(object,match.index,match.index+match[0].length)}}
function replaceSelection(object,string){object=getObject(object);if(object==null||!object.type){return}
if(object.setSelectionRange){var selectionStart=object.selectionStart;var selectionEnd=object.selectionEnd;object.value=object.value.substring(0,selectionStart)+string+object.value.substring(selectionEnd);if(selectionStart!=selectionEnd){setInputSelectionRange(object,selectionStart,selectionStart+string.length)} else {setCaret(object,selectionStart+string.length)}} else if(object.createTextRange&&object.caret){object.caret.text=string}}
function clearOptions(select){select=getObject(select);var ret=[];if(select!=null){for(var i=0;i<select.options.length;i++){var option=select.options[i];ret[ret.length]=new Option(option.text,option.value)}
select.options.length=0}
return ret}
function addOption(select,option,sort,textProperty,valueProperty,selectedProperty){select=getObject(select);if(select==null||option==null){return}
textProperty=textProperty||"text";valueProperty=valueProperty||"value";selectedProperty=selectedProperty||"selected"
if(isInstance(option,Map)){option=option.toObject()}
if(isUndefined(option[valueProperty])){valueProperty=textProperty}
var selected=false;if(!isUndefined(option[selectedProperty])){selected=option[selectedProperty]}
option=new Option(option[textProperty],option[valueProperty],selected,selected);select.options[select.options.length]=option;if(booleanValue(sort)){sortOptions(select)}}
function addOptions(select,options,sort,textProperty,valueProperty,selectedProperty){select=getObject(select);if(select==null){return}
for(var i=0;i<options.length;i++){addOption(select,options[i],false,textProperty,valueProperty,selectedProperty)}
if(!select.multiple&&select.selectedIndex<0&&select.options.length>0){select.selectedIndex=0}
if(booleanValue(sort)){sortOptions(select)}}
function compareOptions(opt1,opt2){if(opt1==null&&opt2==null){return 0}
if(opt1==null){return-1}
if(opt2==null){return 1}
if(opt1.text==opt2.text){return 0} else if(opt1.text>opt2.text){return 1} else {return-1}}
function setOptions(select,options,addEmpty,sort,textProperty,valueProperty,selectedProperty){select=getObject(select);var ret=clearOptions(select);var addEmptyIsString=isInstance(addEmpty,String);if(addEmptyIsString||booleanValue(addEmpty)){select.options[0]=new Option(addEmptyIsString?addEmpty:"")}
addOptions(select,options,sort,textProperty,valueProperty,selectedProperty);return ret}
function sortOptions(select,sortFunction){select=getObject(select);if(select==null){return}
var options=clearOptions(select);if(isInstance(sortFunction,Function)){options.sort(sortFunction)} else {options.sort(compareOptions)}
setOptions(select,options)}
function transferOptions(source,dest,all,sort){source=getObject(source);dest=getObject(dest);if(source==null||dest==null){return}
if(booleanValue(all)){addOptions(dest,clearOptions(source),sort)} else {var sourceOptions=[];var destOptions=[];for(var i=0;i<source.options.length;i++){var option=source.options[i];var options=(option.selected)?destOptions:sourceOptions;options[options.length]=new Option(option.text,option.value)}
setOptions(source,sourceOptions,false,sort);addOptions(dest,destOptions,sort)}}
function getValue(object){object=getObject(object);if(object==null){return null}
if(object.length&&!object.type){var ret=[];for(var i=0;i<object.length;i++){var temp=getValue(object[i]);if(temp!=null){ret[ret.length]=temp}}
return ret.length==0?null:ret.length==1?ret[0]:ret}
if(object.type){if(object.type.indexOf("select")>=0){var ret=[];if(!object.multiple&&object.selectedIndex<0&&object.options.length>0){ret[ret.length]=object.options[0].value} else {for(i=0;i<object.options.length;i++){var option=object.options[i];if(option.selected){ret[ret.length]=option.value;if(!object.multiple){break}}}}
return ret.length==0?null:ret.length==1?ret[0]:ret}
if(object.type=="radio"||object.type=="checkbox"){return booleanValue(object.checked)?object.value:null} else {return object.value}} else if(typeof(object.innerHTML)!="undefined"){return object.innerHTML} else {return null}}
function setValue(object,value){if(object==null){return}
if(typeof(object)=="string"){object=getObject(object)}
var values=ensureArray(value);for(var i=0;i<values.length;i++){values[i]=values[i]==null?"":""+values[i]}
if(object.length&&!object.type){while(values.length<object.length){values[values.length]=""}
for(var i=0;i<object.length;i++){var obj=object[i];setValue(obj,inArray(obj.type,["checkbox","radio"])?values:values[i])}
return}
if(object.type){if(object.type.indexOf("select")>=0){for(var i=0;i<object.options.length;i++){var option=object.options[i];option.selected=inArray(option.value,values)}
return} else if(object.type=="radio"||object.type=="checkbox"){object.checked=inArray(object.value,values);return} else {object.value=values.length==0?"":values[0];return}} else if(typeof(object.innerHTML)!="undefined"){object.innerHTML=values.length==0?"":values[0]}}
function decode(object){var args=decode.arguments;for(var i=1;i<args.length;i+=2){if(i<args.length-1){if(args[i]==object){return args[i+1]}} else {return args[i]}}
return null}
function select(){var args=select.arguments;for(var i=0;i<args.length;i+=2){if(i<args.length-1){if(booleanValue(args[i])){return args[i+1]}} else {return args[i]}}
return null}
function isEmpty(object){return object==null||String(object)==""||typeof(object)=="undefined"||(typeof(object)=="number"&&isNaN(object))}
function ifEmpty(object,emptyValue){return isEmpty(object)?emptyValue:object}
function ifNull(object,nullValue){return object==null?nullValue:object}
function replaceAll(string,find,replace){return String(string).split(find).join(replace)}
function repeat(string,times){var ret="";for(var i=0;i<Number(times);i++){ret+=string}
return ret}
function ltrim(string,chars){string=string?String(string):"";chars=chars||JST_CHARS_WHITESPACE;var pos=0;while(chars.indexOf(string.charAt(pos))>=0&&(pos<=string.length)){pos++}
return string.substr(pos)}
function rtrim(string,chars){string=string?String(string):"";chars=chars||JST_CHARS_WHITESPACE;var pos=string.length-1;while(chars.indexOf(string.charAt(pos))>=0&&(pos>=0)){pos--}
return string.substring(0,pos+1)}
function trim(string,chars){chars=chars||JST_CHARS_WHITESPACE;return ltrim(rtrim(string,chars),chars)}
function lpad(string,size,chr){string=String(string);if(size<0){return ""}
if(isEmpty(chr)){chr=" "} else {chr=String(chr).charAt(0)}
while(string.length<size){string=chr+string}
return left(string,size)}
function rpad(string,size,chr){string=String(string);if(size<=0){return ""}
chr=String(chr);if(isEmpty(chr)){chr=" "} else {chr=chr.charAt(0)}
while(string.length<size){string+=chr}
return left(string,size)}
function crop(string,pos,size){string=String(string);if(size==null){size=1}
if(size<=0){return ""}
return left(string,pos)+mid(string,pos+size)}
function lcrop(string,size){if(size==null){size=1}
return crop(string,0,size)}
function rcrop(string,size){string=String(string);if(size==null){size=1}
return crop(string,string.length-size,size)}
function capitalize(text,separators){text=String(text);separators=separators||JST_CHARS_WHITESPACE+'.?!';var out="";var last='';for(var i=0;i<text.length;i++){var current=text.charAt(i);if(separators.indexOf(last)>=0){out+=current.toUpperCase()} else {out+=current.toLowerCase()}
last=current}
return out}
function onlySpecified(string,possible){string=String(string);possible=String(possible);for(var i=0;i<string.length;i++){if(possible.indexOf(string.charAt(i))==-1){return false}}
return true}
function onlyNumbers(string){return onlySpecified(string,JST_CHARS_NUMBERS)}
function onlyLetters(string){return onlySpecified(string,JST_CHARS_LETTERS)}
function onlyAlpha(string){return onlySpecified(string,JST_CHARS_ALPHA)}
function onlyBasicLetters(string){return onlySpecified(string,JST_CHARS_BASIC_LETTERS)}
function onlyBasicAlpha(string){return onlySpecified(string,JST_CHARS_BASIC_ALPHA)}
function left(string,n){string=String(string);return string.substring(0,n)}
function right(string,n){string=String(string);return string.substr(string.length-n)}
function mid(string,pos,n){string=String(string);if(n==null){n=string.length}
return string.substring(pos,pos+n)}
function insertString(string,pos,value){string=String(string);var prefix=left(string,pos);var suffix=mid(string,pos)
return prefix+value+suffix}
function functionName(funct,unnamed){if(typeof(funct)=="function"){var src=funct.toString();var start=src.indexOf("function");var end=src.indexOf("(");if((start>=0)&&(end>=0)){start+=8;var name=trim(src.substring(start,end));return isEmpty(name)?(unnamed||"[unnamed]"):name}} if(typeof(funct)=="object"){return functionName(funct.constructor)}
return null}
function debug(object,separator,sort,includeObject,objectSeparator){if(object==null){return "null"}
sort=booleanValue(sort==null?true:sort);includeObject=booleanValue(includeObject==null?true:sort);separator=separator||"\n";objectSeparator=objectSeparator||"--------------------";var properties=[];for(var property in object){var part=property+" = ";try {part+=object[property]} catch(e){part+="<Error retrieving value>"}
properties[properties.length]=part}
if(sort){properties.sort()}
var out="";if(includeObject){try {out=object.toString()+separator} catch(e){out="<Error calling the toString() method>"
}
if(!isEmpty(objectSeparator)){out+=objectSeparator+separator}}
out+=properties.join(separator);return out}
function escapeCharacters(string,extraChars,onlyExtra){var ret=String(string);extraChars=String(extraChars||"");onlyExtra=booleanValue(onlyExtra);if(!onlyExtra){ret=replaceAll(ret,"\n","\\n");ret=replaceAll(ret,"\r","\\r");ret=replaceAll(ret,"\t","\\t");ret=replaceAll(ret,"\"","\\\"");ret=replaceAll(ret,"\'","\\\'");ret=replaceAll(ret,"\\","\\\\")}
for(var i=0;i<extraChars.length;i++){var chr=extraChars.charAt(i);ret=replaceAll(ret,chr,"\\\\u"+lpad(new Number(chr.charCodeAt(0)).toString(16),4,'0'))}
return ret}
function unescapeCharacters(string,onlyExtra){var ret=String(string);var pos=-1;var u="\\\\u";onlyExtra=booleanValue(onlyExtra);do {pos=ret.indexOf(u);if(pos>=0){var charCode=parseInt(ret.substring(pos+u.length,pos+u.length+4),16);ret=replaceAll(ret,u+charCode,String.fromCharCode(charCode))}} while(pos>=0);if(!onlyExtra){ret=replaceAll(ret,"\\n","\n");ret=replaceAll(ret,"\\r","\r");ret=replaceAll(ret,"\\t","\t");ret=replaceAll(ret,"\\\"", "\"");ret=replaceAll(ret,"\\\'","\'");ret=replaceAll(ret,"\\\\","\\")}
return ret}
function writeCookie(name,value,document,expires,path,domain,secure){document=document||self.document;var str=name+"="+(isEmpty(value)?"":encodeURIComponent(value));if(path!=null) str+="; path="+path;if(domain!=null) str+="; domain="+domain;if(secure!=null&&booleanValue(secure)) str+="; secure";if(expires===false) expires=new Date(2500,12,31);if(expires instanceof Date) str+="; expires="+expires.toGMTString();document.cookie=str}
function readCookie(name,document){document=document||self.document;var prefix=name+"=";var cookie=document.cookie;var begin=cookie.indexOf("; "+prefix);if(begin==-1){begin=cookie.indexOf(prefix);if(begin!=0) return null} else
begin+=2;var end=cookie.indexOf(";",begin);if(end==-1)
end=cookie.length;return decodeURIComponent(cookie.substring(begin+prefix.length,end))}
function deleteCookie(name,document,path,domain){writeCookie(name,null,document,path,domain)}
function getDateField(date,field){if(!isInstance(date,Date)){return null}
switch(field){case JST_FIELD_MILLISECOND:return date.getMilliseconds();case JST_FIELD_SECOND:return date.getSeconds();case JST_FIELD_MINUTE:return date.getMinutes();case JST_FIELD_HOUR:return date.getHours();case JST_FIELD_DAY:return date.getDate();case JST_FIELD_MONTH:return date.getMonth();case JST_FIELD_YEAR:return date.getFullYear()}
return null}
function setDateField(date,field,value){if(!isInstance(date,Date)){return}
switch(field){case JST_FIELD_MILLISECOND:date.setMilliseconds(value);break;case JST_FIELD_SECOND:date.setSeconds(value);break;case JST_FIELD_MINUTE:date.setMinutes(value);break;case JST_FIELD_HOUR:date.setHours(value);break;case JST_FIELD_DAY:date.setDate(value);break;case JST_FIELD_MONTH:date.setMonth(value);break;case JST_FIELD_YEAR:date.setFullYear(value);break}}
function dateAdd(date,amount,field){if(!isInstance(date,Date)){return null}
if(amount==0){return new Date(date.getTime())}
if(!isInstance(amount,Number)){amount=1}
if(field==null) field=JST_FIELD_DAY;if(field<0||field>JST_FIELD_YEAR){return null}
var time=date.getTime();if(field<=JST_FIELD_DAY){var mult=1;switch(field){case JST_FIELD_SECOND:mult=MILLIS_IN_SECOND;break;case JST_FIELD_MINUTE:mult=MILLIS_IN_MINUTE;break;case JST_FIELD_HOUR:mult=MILLIS_IN_HOUR;break;case JST_FIELD_DAY:mult=MILLIS_IN_DAY;break}
var time=date.getTime();time+=mult*amount;return new Date(time)}
var ret=new Date(time);var day=ret.getDate();var month=ret.getMonth();var year=ret.getFullYear();if(field==JST_FIELD_YEAR){year+=amount} else if(field==JST_FIELD_MONTH){month+=amount}
while(month>11){month-=12;year++}
day=Math.min(day,getMaxDay(month,year));ret.setDate(day);ret.setMonth(month);ret.setFullYear(year);return ret}
function dateDiff(date1,date2,field){if(!isInstance(date1,Date)||!isInstance(date2,Date)){return null}
if(field==null) field=JST_FIELD_DAY;if(field<0||field>JST_FIELD_YEAR){return null}
if(field<=JST_FIELD_DAY){var div=1;switch(field){case JST_FIELD_SECOND:div=MILLIS_IN_SECOND;break;case JST_FIELD_MINUTE:div=MILLIS_IN_MINUTE;break;case JST_FIELD_HOUR:div=MILLIS_IN_HOUR;break;case JST_FIELD_DAY:div=MILLIS_IN_DAY;break}
return Math.round((date2.getTime()-date1.getTime())/div)}
var years=date2.getFullYear()-date1.getFullYear();if(field==JST_FIELD_YEAR){return years} else if(field==JST_FIELD_MONTH){var months1=date1.getMonth();var months2=date2.getMonth();if(years<0){months1+=Math.abs(years)*12} else if(years>0){months2+=years*12}
return(months2-months1)}
return null}
function truncDate(date,field){if(!isInstance(date,Date)){return null}
if(field==null) field=JST_FIELD_DAY;if(field<0||field>JST_FIELD_YEAR){return null}
var ret=new Date(date.getTime());if(field>JST_FIELD_MILLISECOND){ret.setMilliseconds(0)}
if(field>JST_FIELD_SECOND){ret.setSeconds(0)}
if(field>JST_FIELD_MINUTE){ret.setMinutes(0)}
if(field>JST_FIELD_HOUR){ret.setHours(0)}
if(field>JST_FIELD_DAY){ret.setDate(1)}
if(field>JST_FIELD_MONTH){ret.setMonth(0)}
return ret}
function getMaxDay(month,year){month=new Number(month)+1;year=new Number(year);switch(month){case 1:case 3:case 5:case 7:case 8:case 10:case 12:return 31;case 4:case 6:case 9:case 11:return 30;case 2:if((year%4)==0){return 29} else {return 28}
default:return 0}}
function getFullYear(year){year=Number(year);if(year<1000){if(year<50||year>100){year+=2000} else {year+=1900}}
return year}
function setOpacity(object,value){object=getObject(object);if(object==null){return}
value=Math.round(Number(value));if(isNaN(value)||value>100){value=100}
if(value<0){value=0}
var style=object.style;if(style==null){return}
style.MozOpacity=value/100;style.filter="alpha(opacity="+value+")"}
function getOpacity(object){object=getObject(object);if(object==null){return}
var style=object.style;if(style==null){return}
if(style.MozOpacity){return Math.round(style.MozOpacity*100)} else if(style.filter){var regExp=new RegExp("alpha\\(opacity=(\d*)\\)");var array=regExp.exec(style.filter);if(array!=null&&array.length>1){return parseInt(array[1],10)}}
return 100}
function Pair(key,value){this.key=key==null?"":key;this.value=value;
this.toString=function(){return this.key+"="+this.value}}
function Value(key,value){this.base=Pair;this.base(key,value)}
function Map(pairs){this.pairs=pairs||[];this.afterSet=null;this.afterRemove=null;
this.putValue=function(pair){this.putPair(pair)}
this.putPair=function(pair){if(isInstance(pair,Pair)){for(var i=0;i<this.pairs.length;i++){if(this.pairs[i].key==pair.key){this.pairs[i].value=pair.value}}
this.pairs[this.pairs.length]=pair;if(this.afterSet!=null){this.afterSet(pair,this)}}}
this.put=function(key,value){this.putValue(new Pair(key,value))}
this.putAll=function(map){if(!(map instanceof Map)){return}
var entries=map.getEntries();for(var i=0;i<entries.length;i++){this.putPair(entries[i])}}
this.size=function(){return this.pairs.length}
this.get=function(key){for(var i=0;i<this.pairs.length;i++){var pair=this.pairs[i];if(pair.key==key){return pair.value}}
return null}
this.getKeys=function(){var ret=[];for(var i=0;i<this.pairs.length;i++){ret[ret.length]=this.pairs[i].key}
return ret}
this.getValues=function(){var ret=[];for(var i=0;i<this.pairs.length;i++){ret[ret.length]=this.pairs[i].value}
return ret}
this.getEntries=function(){return this.getPairs()}
this.getPairs=function(){var ret=[];for(var i=0;i<this.pairs.length;i++){ret[ret.length]=this.pairs[i]}
return ret}
this.remove=function(key){for(var i=0;i<this.pairs.length;i++){var pair=this.pairs[i];if(pair.key==key){this.pairs.splice(i,1);if(this.afterRemove!=null){this.afterRemove(pair,this)}
return pair}}
return null}
this.clear=function(key){var ret=this.pairs;for(var i=0;i<ret.length;i++){this.remove(ret[i].key)}
return ret}
this.toString=function(){return functionName(this.constructor)+": {"+this.pairs+"}"}
this.toObject=function(){ret={};for(var i=0;i<this.pairs.length;i++){var pair=this.pairs[i];ret[pair.key]=pair.value}
return ret}}
function StringMap(string,nameSeparator,valueSeparator,isEncoded){this.nameSeparator=nameSeparator||"&";this.valueSeparator=valueSeparator||"=";this.isEncoded=isEncoded==null?true:booleanValue(isEncoded);var pairs=[];string=trim(string);if(!isEmpty(string)){var namesValues=string.split(nameSeparator);for(i=0;i<namesValues.length;i++){var nameValue=namesValues[i].split(valueSeparator);var name=trim(nameValue[0]);var value="";if(nameValue.length>0){value=trim(nameValue[1]);if(this.isEncoded){value=decodeURIComponent(value)}}
var pos=-1;for(j=0;j<pairs.length;j++){if(pairs[j].key==name){pos=j;break}}
if(pos>=0){var array=pairs[pos].value;if(!isInstance(array,Array)){array=[array]}
array[array.length]=value;pairs[pos].value=array} else {pairs[pairs.length]=new Pair(name,value)}}}
this.base=Map;this.base(pairs);
this.getString=function(){var ret=[];for(var i=0;i<this.pairs.length;i++){var pair=this.pairs[i];ret[ret.length]=pair.key+this.valueSeparator+this.value}
return ret.join(this.nameSeparator)}}
function QueryStringMap(location){this.location=location||self.location;var string=String(this.location.search);if(!isEmpty(string)){string=string.substr(1)}
this.base=StringMap;this.base(string,"&","=",true);this.putPair=function(){alert("Cannot put a value on a query string")}
this.remove=function(){alert("Cannot remove a value from a query string")}}
function CookieMap(document){this.document=document||self.document;this.base=StringMap;this.base(document.cookie,";","=",true);this.afterSet=function(pair){writeCookie(pair.key,pair.value,this.document)}
this.afterRemove=function(pair){deleteCookie(pair.key,this.document)}}
function ObjectMap(object){this.object=object;var pairs=[];for(var property in this.object){pairs[pairs.length]=new Pair(property,this.object[property])}
this.base=Map;this.base(pairs);this.afterSet=function(pair){this.object[pair.key]=pair.value}
this.afterRemove=function(pair){try {delete object[pair.key]} catch(exception){object[pair.key]=null}}}
function StringBuffer(initialCapacity){this.initialCapacity=initialCapacity||10;this.buffer=new Array(this.initialCapacity);this.append=function(value){this.buffer[this.buffer.length]=value;return this}
this.clear=function(){delete this.buffer;this.buffer=new Array(this.initialCapacity)}
this.toString=function(){return this.buffer.join("")}
this.length=function(){return this.toString().length}}
/*
 * InputMask is a part of JavaScripTools (http://javascriptools.sourceforge.net).
 * This file was compressed using JavaScriptZip (http://javascriptzip.sourceforge.net).
 * Author: Luis Fernando Planella Gonzalez (lfpg.dev at gmail dot com)
 * Version: 2.2.5
 * JavaScripTools is distributed under the GNU Lesser General Public License (LGPL).
 * For more information, see http://www.gnu.org/licenses/lgpl-2.1.txt
*/
var JST_NUMBER_MASK_APPLY_ON_BACKSPACE=true;var JST_MASK_VALIDATE_ON_BLUR=true;var JST_DEFAULT_ALLOW_NEGATIVE=true;var JST_DEFAULT_LEFT_TO_RIGHT=false;var JST_DEFAULT_DATE_MASK_VALIDATE=true;var JST_DEFAULT_DATE_MASK_VALIDATION_MESSAGE="";var JST_DEFAULT_DATE_MASK_YEAR_PAD_FUNCTION=getFullYear;var JST_DEFAULT_DATE_MASK_AM_PM_PAD_FUNCTION=function(value){if(isEmpty(value)) return "";switch(left(value,1)){case 'a':return 'am';case 'A':return 'AM';case 'p':return 'pm';case 'P':return 'PM'}
return value}
var JST_FIELD_DECIMAL_SEPARATOR=new Literal(typeof(JST_DEFAULT_DECIMAL_SEPARATOR)=="undefined"?",":JST_DEFAULT_DECIMAL_SEPARATOR);var JST_DEFAULT_LIMIT_OUTPUT_TEXT="${left}";numbers=new Input(JST_CHARS_NUMBERS);optionalNumbers=new Input(JST_CHARS_NUMBERS);optionalNumbers.optional=true;oneToTwoNumbers=new Input(JST_CHARS_NUMBERS,1,2);year=new Input(JST_CHARS_NUMBERS,1,4,getFullYear);dateSep=new Literal("/");dateTimeSep=new Literal(" ");timeSep=new Literal(":");
var JST_MASK_NUMBERS=[numbers];var JST_MASK_DECIMAL=[numbers,JST_FIELD_DECIMAL_SEPARATOR,optionalNumbers];var JST_MASK_UPPER=[new Upper(JST_CHARS_LETTERS)];var JST_MASK_LOWER=[new Lower(JST_CHARS_LETTERS)];var JST_MASK_CAPITALIZE=[new Capitalize(JST_CHARS_LETTERS)];var JST_MASK_LETTERS=[new Input(JST_CHARS_LETTERS)];var JST_MASK_ALPHA=[new Input(JST_CHARS_ALPHA)];var JST_MASK_ALPHA_UPPER=[new Upper(JST_CHARS_ALPHA)];var JST_MASK_ALPHA_LOWER=[new Lower(JST_CHARS_ALPHA)];var JST_MASK_DATE=[oneToTwoNumbers,dateSep,oneToTwoNumbers,dateSep,year];var JST_MASK_DATE_TIME=[oneToTwoNumbers,dateSep,oneToTwoNumbers,dateSep,year,dateTimeSep,oneToTwoNumbers,timeSep,oneToTwoNumbers];var JST_MASK_DATE_TIME_SEC=[oneToTwoNumbers,dateSep,oneToTwoNumbers,dateSep,year,dateTimeSep,oneToTwoNumbers,timeSep,oneToTwoNumbers,timeSep,oneToTwoNumbers];delete numbers;delete optionalNumbers;delete oneToTwoNumbers;delete year;delete dateSep;delete dateTimeSep;delete timeSep;
var JST_IGNORED_KEY_CODES=[45,35,36,33,34,37,39,38,40,127,4098];if(navigator.userAgent.toLowerCase().indexOf("khtml")<0){JST_IGNORED_KEY_CODES[JST_IGNORED_KEY_CODES.length]=46}
for(var i=0;i<32;i++){JST_IGNORED_KEY_CODES[JST_IGNORED_KEY_CODES.length]=i}
for(var i=112;i<=123;i++){JST_IGNORED_KEY_CODES[JST_IGNORED_KEY_CODES.length]=i}
function InputMask(fields,control,keyPressFunction,keyDownFunction,keyUpFunction,blurFunction,updateFunction,changeFunction){if(isInstance(fields,String)){fields=maskBuilder.parse(fields)} else if(isInstance(fields,MaskField)){fields=[fields]}
if(isInstance(fields,Array)){for(var i=0;i<fields.length;i++){var field=fields[i];if(!isInstance(field,MaskField)){alert("Invalid field: "+field);return}}} else {alert("Invalid field array: "+fields);return}
this.fields=fields;control=validateControlToMask(control);if(!control){alert("Invalid control to mask");return} else {this.control=control;prepareForCaret(this.control);this.control.supportsCaret=isCaretSupported(this.control)}
this.control.mask=this;this.control.pad=false;this.control.ignore=false;this.keyDownFunction=keyDownFunction||null;this.keyPressFunction=keyPressFunction||null;this.keyUpFunction=keyUpFunction||null;this.blurFunction=blurFunction||null;this.updateFunction=updateFunction||null;this.changeFunction=changeFunction||null;function onKeyDown(event){if(window.event){event=window.event}
this.keyCode=typedCode(event);if(this.mask.keyDownFunction!=null){var ret=invokeAsMethod(this,this.mask.keyDownFunction,[event,this.mask]);if(ret==false){return preventDefault(event)}}}
observeEvent(this.control,"keydown",onKeyDown);function onKeyPress(event){if(window.event){event=window.event}
var keyCode=this.keyCode||typedCode(event);var ignore=event.altKey||event.ctrlKey||inArray(keyCode,JST_IGNORED_KEY_CODES);if(!ignore){var range=getInputSelectionRange(this);if(range!=null&&range[0]!=range[1]){replaceSelection(this,"")}}
this.caretPosition=getCaret(this);this.setFixedLiteral=null;var typedChar=this.typedChar=ignore?"":String.fromCharCode(typedCode(event));var fieldDescriptors=this.fieldDescriptors=this.mask.getCurrentFields();var currentFieldIndex=this.currentFieldIndex=this.mask.getFieldIndexUnderCaret();var accepted=false;if(!ignore){var currentField=this.mask.fields[currentFieldIndex];accepted=currentField.isAccepted(typedChar);if(accepted){if(currentField.upper){typedChar=this.typedChar=typedChar.toUpperCase()} else if(currentField.lower){typedChar=this.typedChar=typedChar.toLowerCase()}
if(currentFieldIndex==this.mask.fields.length-2){var nextFieldIndex=currentFieldIndex+1;var nextField=this.mask.fields[nextFieldIndex];if(nextField.literal){var currentFieldIsComplete=!currentField.acceptsMoreText(fieldDescriptors[currentFieldIndex].value+typedChar);if(currentFieldIsComplete){this.setFixedLiteral=nextFieldIndex}}}} else {var previousFieldIndex=currentFieldIndex-1;if(currentFieldIndex>0&&this.mask.fields[previousFieldIndex].literal&&isEmpty(fieldDescriptors[previousFieldIndex].value)){this.setFixedLiteral=previousFieldIndex;accepted=true} else if(currentFieldIndex<this.mask.fields.length-1){var descriptor=fieldDescriptors[currentFieldIndex];var nextFieldIndex=currentFieldIndex+1;var nextField=this.mask.fields[nextFieldIndex];if(nextField.literal&&nextField.text.indexOf(typedChar)>=0){this.setFixedLiteral=nextFieldIndex;accepted=true}} else if(currentFieldIndex==this.mask.fields.length-1&&currentField.literal){this.setFixedLiteral=currentFieldIndex;accepted=true}}}
if(this.mask.keyPressFunction!=null){var ret=invokeAsMethod(this,this.mask.keyPressFunction,[event,this.mask]);if(ret==false){return preventDefault(event)}}
if(ignore){return}
var shouldApplyMask=!ignore&&accepted;if(shouldApplyMask){applyMask(this.mask,false)}
this.keyCode=null;return preventDefault(event)}
observeEvent(this.control,"keypress",onKeyPress);function onKeyUp(event){if(window.event){event=window.event}
if(this.mask.keyUpFunction!=null){var ret=invokeAsMethod(this,this.mask.keyUpFunction,[event,this.mask]);if(ret==false){return preventDefault(event)}}}
observeEvent(this.control,"keyup",onKeyUp);function onFocus(event){this._lastValue=this.value}
observeEvent(this.control,"focus",onFocus);function onBlur(event){if(window.event){event=window.event}
document.fieldOnBlur=this;try {var valueChanged=this._lastValue!=this.value;if(valueChanged&&JST_MASK_VALIDATE_ON_BLUR){applyMask(this.mask,true)}
if(this.mask.changeFunction!=null){if(valueChanged&&this.mask.changeFunction!=null){var e={};for(property in event){e[property]=event[property]}
e.type="change";invokeAsMethod(this,this.mask.changeFunction,[e,this.mask])}}
if(this.mask.blurFunction!=null){var ret=invokeAsMethod(this,this.mask.blurFunction,[event,this.mask]);if(ret==false){return preventDefault(event)}}
return true} finally {document.fieldOnBlur=null}}
observeEvent(this.control,"blur",onBlur);this.isComplete=function(){applyMask(this,true);var descriptors=this.getCurrentFields();if(descriptors==null||descriptors.length==0){return false}
for(var i=0;i<this.fields.length;i++){var field=this.fields[i];if(field.input&&!field.isComplete(descriptors[i].value)&&!field.optional){return false}}
return true}
this.update=function(){applyMask(this,true)}
this.getCurrentFields=function(value){value=value||this.control.value;var descriptors=[];var currentIndex=0;var lastInputIndex=-1;for(var i=0;i<this.fields.length;i++){var field=this.fields[i];var fieldValue="";var descriptor={};if(field.literal){if(lastInputIndex>=0){var lastInputField=this.fields[lastInputIndex];var lastInputDescriptor=descriptors[lastInputIndex];if(field.text.indexOf(mid(value,currentIndex,1))<0&&lastInputField.acceptsMoreText(lastInputDescriptor.value)){descriptor.begin=-1} else {descriptor.begin=currentIndex}}
if(currentIndex>=value.length){break}
if(value.substring(currentIndex,currentIndex+field.text.length)==field.text){currentIndex+=field.text.length}} else {var upTo=field.upTo(value,currentIndex);if(upTo<0&&currentIndex>=value.length){break}
fieldValue=upTo<0?"":field.transformValue(value.substring(currentIndex,upTo+1));descriptor.begin=currentIndex;descriptor.value=fieldValue;currentIndex+=fieldValue.length;lastInputIndex=i}
descriptors[i]=descriptor}
var lastWithValue=descriptors.length-1;for(var i=0;i<this.fields.length;i++){var field=this.fields[i];if(i>lastWithValue){descriptors[i]={value:"",begin:-1}} else {if(field.literal){var descriptor=descriptors[i];if(descriptor.begin<0){descriptor.value="";continue}
var previousField=null;var previousValueComplete=false;for(var j=i-1;j>=0;j--){var current=this.fields[j];if(current.input){previousField=current;previousValueComplete=current.isComplete(descriptors[j].value);if(previousValueComplete){break} else {previousField=null}}}
var nextField=null;var nextValueExists=null;for(var j=i+1;j<this.fields.length&&j<descriptors.length;j++){var current=this.fields[j];if(current.input){nextField=current;nextValueExists=!isEmpty(descriptors[j].value);if(nextValueExists){break} else {nextField=null}}}
if((previousValueComplete&&nextValueExists)||(previousField==null&&nextValueExists)||(nextField==null&&previousValueComplete)){descriptor.value=field.text} else {descriptor.value="";descriptor.begin=-1}}}}
return descriptors}
this.getFieldIndexUnderCaret=function(){var value=this.control.value;var caret=getCaret(this.control);if(caret==null) caret=value.length;var lastPosition=0;var lastInputIndex=null;var lastInputAcceptsMoreText=false;var lastWasLiteral=false;var returnNextInput=isEmpty(value)||caret==0;for(var i=0;i<this.fields.length;i++){var field=this.fields[i];if(field.input){if(returnNextInput||lastPosition>value.length){return i}
var upTo=field.upTo(value,lastPosition)
if(upTo<0){return i}
if(field.max<0){var nextField=null;if(i<this.fields.length-1){nextField=this.fields[i+1]}
if(caret-1<=upTo&&(nextField==null||nextField.literal)){return i}}
var fieldValue=value.substring(lastPosition,upTo+1);var acceptsMoreText=field.acceptsMoreText(fieldValue);var positionToCheck=acceptsMoreText?caret-1:caret
if(caret>=lastPosition&&positionToCheck<=upTo){return i}
lastInputAcceptsMoreText=acceptsMoreText;lastPosition=upTo+1;lastInputIndex=i} else {if(caret==lastPosition){returnNextInput=!lastInputAcceptsMoreText}
lastPosition+=field.text.length}
lastWasLiteral=field.literal}
return this.fields.length-1}
this.isOnlyFilter=function(){if(this.fields==null||this.fields.length==0){return true}
if(this.fields.length>1){return false}
var field=this.fields[0];return field.input&&field.min<=1&&field.max<=0}
this.transformsCase=function(){if(this.fields==null||this.fields.length==0){return false}
for(var i=0;i<this.fields.length;i++){var field=this.fields[i];if(field.upper||field.lower||field.capitalize){return true}}
return false}}
function NumberMask(parser,control,maxIntegerDigits,allowNegative,keyPressFunction,keyDownFunction,keyUpFunction,blurFunction,updateFunction,leftToRight,changeFunction){if(!isInstance(parser,NumberParser)){alert("Illegal NumberParser instance");return}
this.parser=parser;control=validateControlToMask(control);if(!control){alert("Invalid control to mask");return} else {this.control=control;prepareForCaret(this.control);this.control.supportsCaret=isCaretSupported(this.control)}
this.maxIntegerDigits=maxIntegerDigits||-1;this.allowNegative=allowNegative||JST_DEFAULT_ALLOW_NEGATIVE;this.leftToRight=leftToRight||JST_DEFAULT_LEFT_TO_RIGHT;this.control.mask=this;this.control.ignore=false;this.control.swapSign=false;this.control.toDecimal=false;this.control.oldValue=this.control.value;this.keyDownFunction=keyDownFunction||null;this.keyPressFunction=keyPressFunction||null;this.keyUpFunction=keyUpFunction||null;this.blurFunction=blurFunction||null;this.updateFunction=updateFunction||null;this.changeFunction=changeFunction||null;function onKeyDown(event){if(window.event){event=window.event}
var keyCode=typedCode(event);this.ignore=event.altKey||event.ctrlKey||inArray(keyCode,JST_IGNORED_KEY_CODES);if(this.mask.keyDownFunction!=null){var ret=invokeAsMethod(this,this.mask.keyDownFunction,[event,this.mask]);if(ret==false){return preventDefault(event)}}
return true}
observeEvent(this.control,"keydown",onKeyDown);function onKeyPress(event){if(window.event){event=window.event}
var keyCode=typedCode(event);var typedChar=String.fromCharCode(keyCode);if(this.mask.keyPressFunction!=null){var ret=invokeAsMethod(this,this.mask.keyPressFunction,[event,this.mask]);if(ret==false){return preventDefault(event)}}
if(this.ignore){return true}
this.oldValue=this.value;if(typedChar=='-'){if(this.mask.allowNegative){if(this.value==''){this.ignore=true;return true}
this.swapSign=true;applyNumberMask(this.mask,false,false)}
return preventDefault(event)}
if(this.mask.leftToRight&&typedChar==this.mask.parser.decimalSeparator&&this.mask.parser.decimalDigits!=0){this.toDecimal=true;if(this.supportsCaret){return preventDefault(event)}}
this.swapSign=false;this.toDecimal=false;this.accepted=false;if(this.mask.leftToRight&&typedChar==this.mask.parser.decimalSeparator){if(this.mask.parser.decimalDigits==0||this.value.indexOf(this.mask.parser.decimalSeparator)>=0){this.accepted=true;return preventDefault(event)} else {return true}}
this.accepted=onlyNumbers(typedChar);if(!this.accepted){return preventDefault(event)}}
observeEvent(this.control,"keypress",onKeyPress);function onKeyUp(event){if(this.mask.parser.decimalDigits<0&&!this.mask.leftToRight){alert("A NumberParser with unlimited decimal digits is not supported on NumberMask when the leftToRight property is false");this.value="";return false}
if(window.event){event=window.event}
var keyCode=typedCode(event);var isBackSpace=(keyCode==8)&&JST_NUMBER_MASK_APPLY_ON_BACKSPACE;if(this.supportsCaret&&(this.toDecimal||(!this.ignore&&this.accepted)||isBackSpace)){if(isBackSpace&&this.mask.getAsNumber()==0){this.value=""}
applyNumberMask(this.mask,false,isBackSpace)}
if(this.mask.keyUpFunction!=null){var ret=invokeAsMethod(this,this.mask.keyUpFunction,[event,this.mask]);if(ret==false){return preventDefault(event)}}
return true}
observeEvent(this.control,"keyup",onKeyUp);function onFocus(event){if(this.mask.changeFunction!=null){this._lastValue=this.value}}
observeEvent(this.control,"focus",onFocus);function onBlur(event){if(window.event){event=window.event}
if(JST_MASK_VALIDATE_ON_BLUR){if(this.value=='-'){this.value=''} else {applyNumberMask(this.mask,true,false)}}
if(this.mask.changeFunction!=null){if(this._lastValue!=this.value&&this.mask.changeFunction!=null){var e={};for(property in event){e[property]=event[property]}
e.type="change";invokeAsMethod(this,this.mask.changeFunction,[e,this.mask])}}
if(this.mask.blurFunction!=null){var ret=invokeAsMethod(this,this.mask.blurFunction,[event,this.mask]);if(ret==false){return preventDefault(event)}}
return true}
observeEvent(this.control,"blur",onBlur);this.isComplete=function(){return this.control.value!=""}
this.getAsNumber=function(){var number=this.parser.parse(this.control.value);if(isNaN(number)){number=null}
return number}
this.setAsNumber=function(number){var value="";if(isInstance(number,Number)){value=this.parser.format(number)}
this.control.value=value;this.update()}
this.update=function(){applyNumberMask(this,true,false)}}
function DateMask(parser,control,validate,validationMessage,keyPressFunction,keyDownFunction,keyUpFunction,blurFunction,updateFunction,changeFunction){if(isInstance(parser,String)){parser=new DateParser(parser)}
if(!isInstance(parser,DateParser)){alert("Illegal DateParser instance");return}
this.parser=parser;this.extraKeyPressFunction=keyPressFunction||null;function maskKeyPressFunction(event,dateMask){dateMask.showValidation=true;if(dateMask.extraKeyPressFunction!=null){var ret=invokeAsMethod(this,dateMask.extraKeyPressFunction,[event,dateMask]);if(ret==false){return false}}
return true}
this.extraBlurFunction=blurFunction||null;function maskBlurFunction(event,dateMask){var control=dateMask.control;if(dateMask.validate&&control.value.length>0){var controlValue=control.value.toUpperCase();controlValue=controlValue.replace(/A[^M]/,"AM");controlValue=controlValue.replace(/A$/,"AM");controlValue=controlValue.replace(/P[^M]/,"PM");controlValue=controlValue.replace(/P$/,"PM");var date=dateMask.parser.parse(controlValue);if(date==null){var msg=dateMask.validationMessage;if(dateMask.showValidation&&!isEmpty(msg)){dateMask.showValidation=false;msg=replaceAll(msg,"${value}",control.value);msg=replaceAll(msg,"${mask}",dateMask.parser.mask);alert(msg)}
control.value="";control.focus()} else {control.value=dateMask.parser.format(date)}}
if(dateMask.extraBlurFunction!=null){var ret=invokeAsMethod(this,dateMask.extraBlurFunction,[event,dateMask]);if(ret==false){return false}}
return true}
var fields=[];var old='';var mask=this.parser.mask;while(mask.length>0){var field=mask.charAt(0);var size=1;var maxSize=-1;var padFunction=null;while(mask.charAt(size)==field){size++}
mask=mid(mask,size);var accepted=JST_CHARS_NUMBERS;switch(field){case 'd':case 'M':case 'h':case 'H':case 'm':case 's':maxSize=2;break;case 'y':padFunction=JST_DEFAULT_DATE_MASK_YEAR_PAD_FUNCTION;if(size==2){maxSize=2} else {maxSize=4}
break;case 'a':case 'A':case 'p':case 'P':maxSize=2;padFunction=JST_DEFAULT_DATE_MASK_AM_PM_PAD_FUNCTION;accepted='aApP';break;case 'S':maxSize=3;break}
var input;if(maxSize==-1){input=new Literal(field)} else {input=new Input(accepted,size,maxSize);if(padFunction==null){input.padFunction=new Function("text","return lpad(text, "+maxSize+", '0')")} else {input.padFunction=padFunction}}
fields[fields.length]=input}
this.base=InputMask;this.base(fields,control,maskKeyPressFunction,keyDownFunction,keyUpFunction,maskBlurFunction,updateFunction,changeFunction);this.validate=validate==null?JST_DEFAULT_DATE_MASK_VALIDATE:booleanValue(validate);this.showValidation=true;this.validationMessage=validationMessage||JST_DEFAULT_DATE_MASK_VALIDATION_MESSAGE;this.control.dateMask=this;this.getAsDate=function(){return this.parser.parse(this.control.value)}
this.setAsDate=function(date){var value="";if(isInstance(date,Date)){value=this.parser.format(date)}
this.control.value=value;this.update()}}
function SizeLimit(control,maxLength,output,outputText,updateFunction,keyUpFunction,blurFunction,keyDownFunction,keyPressFunction,changeFunction){control=validateControlToMask(control);if(!control){alert("Invalid control to limit size");return} else {this.control=control;prepareForCaret(control)}
if(!isInstance(maxLength,Number)){alert("Invalid maxLength");return}
this.control=control;this.maxLength=maxLength;this.output=output||null;this.outputText=outputText||JST_DEFAULT_LIMIT_OUTPUT_TEXT;this.updateFunction=updateFunction||null;this.keyDownFunction=keyDownFunction||null;this.keyPressFunction=keyPressFunction||null;this.keyUpFunction=keyUpFunction||null;this.blurFunction=blurFunction||null;this.changeFunction=changeFunction||null;this.control.sizeLimit=this;function onKeyDown(event){if(window.event){event=window.event}
var keyCode=typedCode(event);this.ignore=inArray(keyCode,JST_IGNORED_KEY_CODES);if(this.sizeLimit.keyDownFunction!=null){var ret=invokeAsMethod(this,this.sizeLimit.keyDownFunction,[event,this.sizeLimit]);if(ret==false){return preventDefault(event)}}}
observeEvent(this.control,"keydown",onKeyDown);function onKeyPress(event){if(window.event){event=window.event}
var keyCode=typedCode(event);var typedChar=String.fromCharCode(keyCode);var allowed=this.ignore||this.value.length<this.sizeLimit.maxLength;if(this.sizeLimit.keyPressFunction!=null){var ret=invokeAsMethod(this,this.sizeLimit.keyPressFunction,[event,this.sizeLimit]);if(ret==false){return preventDefault(event)}}
if(!allowed){preventDefault(event)}}
observeEvent(this.control,"keypress",onKeyPress);function onKeyUp(event){if(window.event){event=window.event}
if(this.sizeLimit.keyUpFunction!=null){var ret=invokeAsMethod(this,this.sizeLimit.keyUpFunction,[event,this.sizeLimit]);if(ret==false){return false}}
return checkSizeLimit(this,false)}
observeEvent(this.control,"keyup",onKeyUp);function onFocus(event){if(this.mask&&this.mask.changeFunction!=null){this._lastValue=this.value}}
observeEvent(this.control,"focus",onFocus);function onBlur(event){if(window.event){event=window.event}
var ret=checkSizeLimit(this,true);if(this.mask&&this.mask.changeFunction!=null){if(this._lastValue!=this.value&&this.sizeLimit.changeFunction!=null){var e={};for(property in event){e[property]=event[property]}
e.type="change";invokeAsMethod(this,this.sizeLimit.changeFunction,[e,this.sizeLimit])}}
if(this.sizeLimit.blurFunction!=null){var ret=invokeAsMethod(this,this.sizeLimit.blurFunction,[event,this.sizeLimit]);if(ret==false){return false}}
return ret}
observeEvent(this.control,"blur",onBlur);this.update=function(){checkSizeLimit(this.control,true)}
this.update()}
function validateControlToMask(control){control=getObject(control)
if(control==null){return false} else if(!(control.type)||(!inArray(control.type,["text","textarea","password"]))){return false} else {if(/MSIE/.test(navigator.userAgent)&&!window.opera){observeEvent(self,"unload",function(){control.mask=control.dateMask=control.sizeLimit=null})}
return control}}
function applyMask(mask,isBlur){var fields=mask.fields;if((fields==null)||(fields.length==0)){return}
var control=mask.control;if(isEmpty(control.value)&&isBlur){return true}
var value=control.value;var typedChar=control.typedChar;var typedIndex=control.caretPosition;var setFixedLiteral=control.setFixedLiteral;var currentFieldIndex=mask.getFieldIndexUnderCaret();var fieldDescriptors=mask.getCurrentFields();var currentDescriptor=fieldDescriptors[currentFieldIndex];if(isBlur||!isEmpty(typedChar)){var out=new StringBuffer(fields.length);var caretIncrement=1;for(var i=0;i<fields.length;i++){var field=fields[i];var descriptor=fieldDescriptors[i];var padValue=(setFixedLiteral==i+1);if(currentFieldIndex==i+1&&field.literal&&typedIndex==descriptor.begin){caretIncrement+=field.text.length} else if(field.literal&&currentFieldIndex>i){descriptor.value=field.text;caretIncrement+=field.text.length+1} else if(currentFieldIndex==i){if(!isEmpty(typedIndex)&&!isEmpty(typedChar)&&field.isAccepted(typedChar)){var fieldStartsAt=descriptor.begin<0?value.length:descriptor.begin;var insertAt=Math.max(0,typedIndex-fieldStartsAt);if(field.input&&field.acceptsMoreText(descriptor.value)){descriptor.value=insertString(descriptor.value,insertAt,typedChar)} else {var prefix=left(descriptor.value,insertAt);var suffix=mid(descriptor.value,insertAt+1);descriptor.value=prefix+typedChar+suffix}}}
if(isBlur&&!isEmpty(descriptor.value)&&i==fields.length-1&&field.input){padValue=true
}
if(padValue){var oldValue=descriptor.value;descriptor.value=field.pad(descriptor.value);var inc=descriptor.value.length-oldValue.length;if(inc>0){caretIncrement+=inc}}
out.append(descriptor.value)}
value=out.toString()}
fieldDescriptors=mask.getCurrentFields(value);var out=new StringBuffer(fields.length);for(var i=0;i<fields.length;i++){var field=fields[i];var descriptor=fieldDescriptors[i];if(field.literal&&(setFixedLiteral==i||(i<fields.length-1&&!isEmpty(fieldDescriptors[i+1].value)))){descriptor.value=field.text}
out.append(descriptor.value)}
control.value=out.toString();if(control.caretPosition!=null&&!isBlur){if(control.pad){setCaretToEnd(control)} else {setCaret(control,typedIndex+control.value.length-value.length+caretIncrement)}}
if(mask.updateFunction!=null){mask.updateFunction(mask)}
control.typedChar=null;control.fieldDescriptors=null;control.currentFieldIndex=null;return false}
function nonDigitsToCaret(value,caret){if(caret==null){return null}
var nonDigits=0;for(var i=0;i<caret&&i<value.length;i++){if(!onlyNumbers(value.charAt(i))){nonDigits++}}
return nonDigits}
function applyNumberMask(numberMask,isBlur,isBackSpace){var control=numberMask.control;var value=control.value;if(value==""){return true}
var parser=numberMask.parser;var maxIntegerDigits=numberMask.maxIntegerDigits;var swapSign=false;var toDecimal=false;var leftToRight=numberMask.leftToRight;if(control.swapSign==true){swapSign=true;control.swapSign=false}
if(control.toDecimal==true){toDecimal=value.indexOf(parser.decimalSeparator)<0;control.toDecimal=false}
var intPart="";var decPart="";var isNegative=value.indexOf('-')>=0||value.indexOf('(')>=0;if(value==""){value=parser.format(0)}
value=replaceAll(value,parser.groupSeparator,'')
value=replaceAll(value,parser.currencySymbol,'')
value=replaceAll(value,'-','')
value=replaceAll(value,'(','')
value=replaceAll(value,')','')
value=replaceAll(value,' ','')
var pos=value.indexOf(parser.decimalSeparator);var hasDecimal=(pos>=0);var caretAdjust=0;if(leftToRight){if(hasDecimal){intPart=value.substr(0,pos);decPart=value.substr(pos+1)} else {intPart=value}
if(isBlur&&parser.decimalDigits>0){decPart=rpad(decPart,parser.decimalDigits,'0')}} else {var decimalDigits=parser.decimalDigits;value=replaceAll(value,parser.decimalSeparator,'');intPart=left(value,value.length-decimalDigits);decPart=lpad(right(value,decimalDigits),decimalDigits,'0')}
var zero=onlySpecified(intPart+decPart,'0');if((!isEmpty(intPart)&&!onlyNumbers(intPart))||(!isEmpty(decPart)&&!onlyNumbers(decPart))){control.value=control.oldValue;return true}
if(leftToRight&&parser.decimalDigits>=0&&decPart.length>parser.decimalDigits){decPart=decPart.substring(0,parser.decimalDigits)}
if(maxIntegerDigits>=0&&intPart.length>maxIntegerDigits){caretAdjust=maxIntegerDigits-intPart.length-1;intPart=left(intPart,maxIntegerDigits)}
if(zero){isNegative=false} else if(swapSign){isNegative=!isNegative}
if(!isEmpty(intPart)){while(intPart.charAt(0)=='0'){intPart=intPart.substr(1)}}
if(isEmpty(intPart)){intPart="0"}
if((parser.useGrouping)&&(!isEmpty(parser.groupSeparator))){var group,temp="";for(var i=intPart.length;i>0;i-=parser.groupSize){group=intPart.substring(intPart.length-parser.groupSize);intPart=intPart.substring(0,intPart.length-parser.groupSize);temp=group+parser.groupSeparator+temp}
intPart=temp.substring(0,temp.length-1)}
var out=new StringBuffer();var oneFormatted=parser.format(isNegative?-1:1);var appendEnd=true;pos=oneFormatted.indexOf('1');out.append(oneFormatted.substring(0,pos));out.append(intPart);if(leftToRight){if(toDecimal||!isEmpty(decPart)){out.append(parser.decimalSeparator).append(decPart);appendEnd=!toDecimal}} else {if(parser.decimalDigits>0){out.append(parser.decimalSeparator)}
out.append(decPart)}
if(appendEnd&&oneFormatted.indexOf(")")>=0){out.append(")")}
var caret=getCaret(control);var oldNonDigitsToCaret=nonDigitsToCaret(control.value,caret),hadSymbol;var caretToEnd=toDecimal||caret==null||caret==control.value.length;if(caret!=null&&!isBlur){hadSymbol=control.value.indexOf(parser.currencySymbol)>=0||control.value.indexOf(parser.decimalSeparator)>=0}
control.value=out.toString();if(caret!=null&&!isBlur){if(!hadSymbol&&((value.indexOf(parser.currencySymbol)>=0)||(value.indexOf(parser.decimalSeparator)>=0))){caretToEnd=true}
if(!caretToEnd){var newNonDigitsToCaret=nonDigitsToCaret(control.value,caret);if(isBackSpace){caretAdjust=0}
setCaret(control,caret+caretAdjust+newNonDigitsToCaret-oldNonDigitsToCaret)} else {setCaretToEnd(control)}}
if(numberMask.updateFunction!=null){numberMask.updateFunction(numberMask)}
return false}
function checkSizeLimit(control,isBlur){var sizeLimit=control.sizeLimit;var max=sizeLimit.maxLength;var diff=max-control.value.length;if(control.value.length>max){control.value=left(control.value,max);setCaretToEnd(control)}
var size=control.value.length;var charsLeft=max-size;if(sizeLimit.output!=null){var text=sizeLimit.outputText;text=replaceAll(text,"${size}",size);text=replaceAll(text,"${left}",charsLeft);text=replaceAll(text,"${max}",max);setValue(sizeLimit.output,text)}
if(isInstance(sizeLimit.updateFunction,Function)){sizeLimit.updateFunction(control,size,max,charsLeft)}
return true}
function MaskField(){this.literal=false;this.input=false;this.upTo=function(text,fromIndex){return-1}}
function Literal(text){this.base=MaskField;this.base();this.text=text;this.literal=true;this.isAccepted=function(chr){return onlySpecified(chr,this.text)}
this.upTo=function(text,fromIndex){return text.indexOf(this.text,fromIndex)}}
function Input(accepted,min,max,padFunction,optional){this.base=MaskField;this.base();this.accepted=accepted;if(min!=null&&max==null){max=min}
this.min=min||1;this.max=max||-1;this.padFunction=padFunction||null;this.input=true;this.upper=false;this.lower=false;this.capitalize=false;this.optional=booleanValue(optional);if(this.min<1){this.min=1}
if(this.max==0){this.max=-1}
if((this.max<this.min)&&(this.max>=0)){this.max=this.min}
this.upTo=function(text,fromIndex){text=text||"";fromIndex=fromIndex||0;if(text.length<fromIndex){return-1}
var toIndex=-1;for(var i=fromIndex;i<text.length;i++){if(this.isAccepted(text.substring(fromIndex,i+1))){toIndex=i} else {break}}
return toIndex}
this.acceptsMoreText=function(text){if(this.max<0) return true;return(text||"").length<this.max}
this.isAccepted=function(text){return((this.accepted==null)||onlySpecified(text,this.accepted))&&((text.length<=this.max)||(this.max<0))}
this.checkLength=function(text){return(text.length>=this.min)&&((this.max<0)||(text.length<=this.max))}
this.isComplete=function(text){text=String(text);if(isEmpty(text)){return this.optional}
return text.length>=this.min}
this.transformValue=function(text){text=String(text);if(this.upper){return text.toUpperCase()} else if(this.lower){return text.toLowerCase()} else if(this.capitalize){return capitalize(text)} else {return text}}
this.pad=function(text){text=String(text);if((text.length<this.min)&&((this.max>=0)||(text.length<=this.max))||this.max<0){var value;if(this.padFunction!=null){value=this.padFunction(text,this.min,this.max)} else {value=text}
if(value.length<this.min){var padChar=' ';if(this.accepted==null||this.accepted.indexOf(' ')>0){padChar=' '} else if(this.accepted.indexOf('0')>0){padChar='0'} else {padChar=this.accepted.charAt(0)}
return left(lpad(value,this.min,padChar),this.min)} else {return value}} else {return text}}}
function Lower(accepted,min,max,padFunction,optional){this.base=Input;this.base(accepted,min,max,padFunction,optional);this.lower=true}
function Upper(accepted,min,max,padFunction,optional){this.base=Input;this.base(accepted,min,max,padFunction,optional);this.upper=true}
function Capitalize(accepted,min,max,padFunction,optional){this.base=Input;this.base(accepted,min,max,padFunction,optional);this.capitalize=true}
function FieldBuilder(){
this.literal=function(text){return new Literal(text)}
this.input=function(accepted,min,max,padFunction,optional){return new Input(accepted,min,max,padFunction,optional)}
this.upper=function(accepted,min,max,padFunction,optional){return new Upper(accepted,min,max,padFunction,optional)}
this.lower=function(accepted,min,max,padFunction,optional){return new Lower(accepted,min,max,padFunction,optional)}
this.capitalize=function(accepted,min,max,padFunction,optional){return new Capitalize(accepted,min,max,padFunction,optional)}
this.inputAll=function(min,max,padFunction,optional){return this.input(null,min,max,padFunction,optional)}
this.upperAll=function(min,max,padFunction,optional){return this.upper(null,min,max,padFunction,optional)}
this.lowerAll=function(min,max,padFunction,optional){return this.lower(null,min,max,padFunction,optional)}
this.capitalizeAll=function(min,max,padFunction,optional){return this.capitalize(null,min,max,padFunction,optional)}
this.inputNumbers=function(min,max,padFunction,optional){return this.input(JST_CHARS_NUMBERS,min,max,padFunction,optional)}
this.inputLetters=function(min,max,padFunction,optional){return this.input(JST_CHARS_LETTERS,min,max,padFunction,optional)}
this.upperLetters=function(min,max,padFunction,optional){return this.upper(JST_CHARS_LETTERS,min,max,padFunction,optional)}
this.lowerLetters=function(min,max,padFunction,optional){return this.lower(JST_CHARS_LETTERS,min,max,padFunction,optional)}
this.capitalizeLetters=function(min,max,padFunction,optional){return this.capitalize(JST_CHARS_LETTERS,min,max,padFunction,optional)}}
var fieldBuilder=new FieldBuilder();
function MaskBuilder(){
this.parse=function(string){if(string==null||!isInstance(string,String)){return this.any()}
var fields=[];var start=null;var lastType=null;var switchField=function(type,text){switch(type){case '_':return fieldBuilder.inputAll(text.length);case '#':return fieldBuilder.inputNumbers(text.length);case 'a':return fieldBuilder.inputLetters(text.length);case 'l':return fieldBuilder.lowerLetters(text.length);case 'u':return fieldBuilder.upperLetters(text.length);case 'c':return fieldBuilder.capitalizeLetters(text.length);default:return fieldBuilder.literal(text)}}
for(var i=0;i<string.length;i++){var c=string.charAt(i);if(start==null){start=i}
var type;var literal=false;if(c=='\\'){if(i==string.length-1){break}
string=left(string,i)+mid(string,i+1);c=string.charAt(i);literal=true}
if(literal){type='?'} else {switch(c){case '?':case '_':type='_';break;case '#':case '0':case '9':type='#';break;case 'a':case 'A':type='a';break;case 'l':case 'L':type='l';break;case 'u':case 'U':type='u';break;case 'c':case 'C':type='c';break;default:type='?'}}
if(lastType!=type&&lastType!=null){var text=string.substring(start,i);fields[fields.length]=switchField(lastType,text);start=i;lastType=type} else {lastType=type
}}
if(start<string.length){var text=string.substring(start);fields[fields.length]=switchField(lastType,text)}
return fields}
this.accept=function(accepted,max){return [fieldBuilder.input(accepted,max)]}
this.any=function(max){return [fieldBuilder.any(max)]}
this.numbers=function(max){return [fieldBuilder.inputNumbers(max)]}
this.decimal=function(){var decimalField=fieldBuilder.inputNumbers();decimalField.optional=true;return [fieldBuilder.inputNumbers(),JST_FIELD_DECIMAL_SEPARATOR,decimalField]}
this.letters=function(max){return [fieldBuilder.inputLetters(max)]}
this.upperLetters=function(max){return [fieldBuilder.upperLetters(max)]}
this.lowerLetters=function(max){return [fieldBuilder.lowerLetters(max)]}
this.capitalizeLetters=function(max){return [fieldBuilder.capitalizeLetters(max)]}}
var maskBuilder=new MaskBuilder();
/*
 * Parsers is a part of JavaScripTools (http://javascriptools.sourceforge.net).
 * This file was compressed using JavaScriptZip (http://javascriptzip.sourceforge.net).
 * Author: Luis Fernando Planella Gonzalez (lfpg.dev at gmail dot com)
 * Version: 2.2.5
 * JavaScripTools is distributed under the GNU Lesser General Public License (LGPL).
 * For more information, see http://www.gnu.org/licenses/lgpl-2.1.txt
*/
var JST_DEFAULT_DECIMAL_DIGITS=-1;var JST_DEFAULT_DECIMAL_SEPARATOR=",";var JST_DEFAULT_GROUP_SEPARATOR=".";var JST_DEFAULT_USE_GROUPING=false;var JST_DEFAULT_CURRENCY_SYMBOL="R$";var JST_DEFAULT_USE_CURRENCY=false;var JST_DEFAULT_NEGATIVE_PARENTHESIS=false;var JST_DEFAULT_GROUP_SIZE=3;var JST_DEFAULT_SPACE_AFTER_CURRENCY=true;var JST_DEFAULT_CURRENCY_INSIDE=false;var JST_DEFAULT_DATE_MASK="dd/MM/yyyy";var JST_DEFAULT_ENFORCE_LENGTH=true;var JST_DEFAULT_TRUE_VALUE="true";var JST_DEFAULT_FALSE_VALUE="false";var JST_DEFAULT_USE_BOOLEAN_VALUE=true;
function Parser(){
this.parse=function(text){return text}
this.format=function(value){return value}
this.isValid=function(text){return isEmpty(text)||(this.parse(text)!=null)}}
function NumberParser(decimalDigits,decimalSeparator,groupSeparator,useGrouping,currencySymbol,useCurrency,negativeParenthesis,groupSize,spaceAfterCurrency,currencyInside){this.base=Parser;this.base();this.decimalDigits=(decimalDigits==null)?JST_DEFAULT_DECIMAL_DIGITS:decimalDigits;this.decimalSeparator=(decimalSeparator==null)?JST_DEFAULT_DECIMAL_SEPARATOR:decimalSeparator;this.groupSeparator=(groupSeparator==null)?JST_DEFAULT_GROUP_SEPARATOR:groupSeparator;this.useGrouping=(useGrouping==null)?JST_DEFAULT_USE_GROUPING:booleanValue(useGrouping);this.currencySymbol=(currencySymbol==null)?JST_DEFAULT_CURRENCY_SYMBOL:currencySymbol;this.useCurrency=(useCurrency==null)?JST_DEFAULT_USE_CURRENCY:booleanValue(useCurrency);this.negativeParenthesis=(negativeParenthesis==null)?JST_DEFAULT_NEGATIVE_PARENTHESIS:booleanValue(negativeParenthesis);this.groupSize=(groupSize==null)?JST_DEFAULT_GROUP_SIZE:groupSize;this.spaceAfterCurrency=(spaceAfterCurrency==null)?JST_DEFAULT_SPACE_AFTER_CURRENCY:booleanValue(spaceAfterCurrency);this.currencyInside=(currencyInside==null)?JST_DEFAULT_CURRENCY_INSIDE:booleanValue(currencyInside);this.parse=function(string){string=trim(string);if(isEmpty(string)){return null}
string=replaceAll(string,this.groupSeparator,"");string=replaceAll(string,this.decimalSeparator,".");string=replaceAll(string,this.currencySymbol,"");var isNegative=(string.indexOf("(")>=0)||(string.indexOf("-")>=0);string=replaceAll(string,"(","");string=replaceAll(string,")","");string=replaceAll(string,"-","");string=trim(string);if(!onlySpecified(string,JST_CHARS_NUMBERS+".")){return null}
var ret=parseFloat(string);ret=isNegative?(ret*-1):ret;return this.round(ret)}
this.format=function(number){if(isNaN(number)){number=this.parse(number)}
if(isNaN(number)) return null;var isNegative=number<0;number=Math.abs(number);var ret="";var parts=String(this.round(number)).split(".");var intPart=parts[0];var decPart=parts.length>1?parts[1]:"";if((this.useGrouping)&&(!isEmpty(this.groupSeparator))){var group,temp="";for(var i=intPart.length;i>0;i-=this.groupSize){group=intPart.substring(intPart.length-this.groupSize);intPart=intPart.substring(0,intPart.length-this.groupSize);temp=group+this.groupSeparator+temp}
intPart=temp.substring(0,temp.length-1)}
ret=intPart;if(this.decimalDigits!=0){if(this.decimalDigits>0){while(decPart.length<this.decimalDigits){decPart+="0"}}
if(!isEmpty(decPart)){ret+=this.decimalSeparator+decPart}}
if(isNegative&&!this.currencyInside){if(this.negativeParenthesis){ret="("+ret+")"} else {ret="-"+ret}}
if(this.useCurrency){ret=this.currencySymbol+(this.spaceAfterCurrency?" ":"")+ret}
if(isNegative&&this.currencyInside){if(this.negativeParenthesis){ret="("+ret+")"} else {ret="-"+ret}}
return ret}
this.round=function(number){if(this.decimalDigits<0){return number} else if(this.decimalDigits==0){return Math.round(number)}
var mult=Math.pow(10,this.decimalDigits);return Math.round(number*mult)/mult}}
function DateParser(mask,enforceLength,completeFieldsWith){this.base=Parser;this.base();this.mask=(mask==null)?JST_DEFAULT_DATE_MASK:String(mask);this.enforceLength=(enforceLength==null)?JST_DEFAULT_ENFORCE_LENGTH:booleanValue(enforceLength);this.completeFieldsWith=completeFieldsWith||null;this.numberParser=new NumberParser(0);this.compiledMask=[];var LITERAL=0;var MILLISECOND=1;var SECOND=2;var MINUTE=3;var HOUR_12=4;var HOUR_24=5;var DAY=6;var MONTH=7;var YEAR=8;var AM_PM_UPPER=9;var AM_PM_LOWER=10;this.parse=function(string){if(isEmpty(string)){return null}
string=trim(String(string)).toUpperCase();var pm=string.indexOf("PM")!=-1;string=replaceAll(replaceAll(string,"AM",""),"PM","");var parts=[0,0,0,0,0,0,0];var partValues=["","","","","","",""];var entries=[null,null,null,null,null,null,null];for(var i=0;i<this.compiledMask.length;i++){var entry=this.compiledMask[i];var pos=this.getTypeIndex(entry.type);if(pos==-1){if(entry.type==LITERAL){string=string.substr(entry.length)} else {}} else {var partValue=0;if(i==(this.compiledMask.length-1)){partValue=string;string=""} else {var nextEntry=this.compiledMask[i+1];if(nextEntry.type==LITERAL){var nextPos=string.indexOf(nextEntry.literal);if(nextPos==-1){partValue=string
string=""} else {partValue=left(string,nextPos);string=string.substr(nextPos)}} else {partValue=string.substring(0,entry.length);string=string.substr(entry.length)}}
if(!onlyNumbers(partValue)){return null}
partValues[pos]=partValue;entries[pos]=entry;parts[pos]=isEmpty(partValue)?this.minValue(parts,entry.type):this.numberParser.parse(partValue)}}
if(!isEmpty(string)){return null}
if(pm&&(parts[JST_FIELD_HOUR]<12)){parts[JST_FIELD_HOUR]+=12}
if(parts[JST_FIELD_MONTH]>0){parts[JST_FIELD_MONTH]--}
if(parts[JST_FIELD_YEAR]<100){if(parts[JST_FIELD_YEAR]<50){parts[JST_FIELD_YEAR]+=2000} else {parts[JST_FIELD_YEAR]+=1900}}
for(var i=0;i<parts.length;i++){var entry=entries[i]
var part=parts[i];var partValue=partValues[i];if(part<0){return null} else if(entry!=null){if(this.enforceLength&&((entry.length>=0)&&(partValue.length<entry.length))){return null}
part=parseInt(partValue,10);if(isNaN(part)&&this.completeFieldsWith!=null){part=parts[i]=getDateField(this.completeFieldsWith,i)}
if((part<this.minValue(parts,entry.type))||(part>this.maxValue(parts,entry.type))){return null}} else if(i==JST_FIELD_DAY&&part==0){part=parts[i]=1}}
return new Date(parts[JST_FIELD_YEAR],parts[JST_FIELD_MONTH],parts[JST_FIELD_DAY],parts[JST_FIELD_HOUR],parts[JST_FIELD_MINUTE],parts[JST_FIELD_SECOND],parts[JST_FIELD_MILLISECOND])}
this.format=function(date){if(!(date instanceof Date)){date=this.parse(date)}
if(date==null){return ""}
var ret="";var parts=[date.getMilliseconds(),date.getSeconds(),date.getMinutes(),date.getHours(),date.getDate(),date.getMonth(),date.getFullYear()];for(var i=0;i<this.compiledMask.length;i++){var entry=this.compiledMask[i];switch(entry.type){case LITERAL:ret+=entry.literal;break;case AM_PM_LOWER:ret+=(parts[JST_FIELD_HOUR]<12)?"am":"pm";break;case AM_PM_UPPER:ret+=(parts[JST_FIELD_HOUR]<12)?"AM":"PM";break;case MILLISECOND:case SECOND:case MINUTE:case HOUR_24:case DAY:ret+=lpad(parts[this.getTypeIndex(entry.type)],entry.length,"0");break;case HOUR_12:ret+=lpad(parts[JST_FIELD_HOUR]%12,entry.length,"0");break;case MONTH:ret+=lpad(parts[JST_FIELD_MONTH]+1,entry.length,"0");break;case YEAR:ret+=lpad(right(parts[JST_FIELD_YEAR],entry.length),entry.length,"0");break}}
return ret}
this.maxValue=function(parts,type){switch(type){case MILLISECOND:return 999;case SECOND:return 59;case MINUTE:return 59;case HOUR_12:case HOUR_24:return 23;case DAY:return getMaxDay(parts[JST_FIELD_MONTH],parts[JST_FIELD_YEAR]);case MONTH:return 12;case YEAR:return 9999;default:return 0}}
this.minValue=function(parts,type){switch(type){case DAY:case MONTH:case YEAR:return 1;default:return 0}}
this.getFieldType=function(field){switch(field.charAt(0)){case "S":return MILLISECOND;case "s":return SECOND;case "m":return MINUTE;case "h":return HOUR_12;case "H":return HOUR_24;case "d":return DAY;case "M":return MONTH;case "y":return YEAR;case "a":return AM_PM_LOWER;case "A":return AM_PM_UPPER;default:return LITERAL}}
this.getTypeIndex=function(type){switch(type){case MILLISECOND:return JST_FIELD_MILLISECOND;case SECOND:return JST_FIELD_SECOND;case MINUTE:return JST_FIELD_MINUTE;case HOUR_12:case HOUR_24:return JST_FIELD_HOUR;case DAY:return JST_FIELD_DAY;case MONTH:return JST_FIELD_MONTH;case YEAR:return JST_FIELD_YEAR;default:return-1}}
var Entry=function(type,length,literal){this.type=type;this.length=length||-1;this.literal=literal}
this.compile=function(){var current="";var old="";var part="";this.compiledMask=[];for(var i=0;i<this.mask.length;i++){current=this.mask.charAt(i);if((part=="")||(current==part.charAt(0))){part+=current} else {var type=this.getFieldType(part);this.compiledMask[this.compiledMask.length]=new Entry(type,part.length,part);part="";i--}}
if(part!=""){var type=this.getFieldType(part);this.compiledMask[this.compiledMask.length]=new Entry(type,part.length,part)}}
this.setMask=function(mask){this.mask=mask;this.compile()}
this.setMask(this.mask)}
function BooleanParser(trueValue,falseValue,useBooleanValue){this.base=Parser;this.base();this.trueValue=trueValue||JST_DEFAULT_TRUE_VALUE;this.falseValue=falseValue||JST_DEFAULT_FALSE_VALUE;this.useBooleanValue=useBooleanValue||JST_DEFAULT_USE_BOOLEAN_VALUE;this.parse=function(string){if(this.useBooleanValue&&booleanValue(string)){return true}
return string==JST_DEFAULT_TRUE_VALUE}
this.format=function(bool){return booleanValue(bool)?this.trueValue:this.falseValue}}
function StringParser(){this.base=Parser;this.base();this.parse=function(string){return String(string)}
this.format=function(string){return String(string)}}
function MapParser(map,directParse){this.base=Parser;this.base();this.map=isInstance(map,Map)?map:new Map();this.directParse=booleanValue(directParse);this.parse=function(value){if(directParse){return value}
var pairs=this.map.getPairs();for(var k=0;k<pairs.length;k++){if(value==pairs[k].value){return pairs[k].key}}
return null}
this.format=function(value){return this.map.get(value)}}
function EscapeParser(extraChars,onlyExtra){this.base=Parser;this.base();this.extraChars=extraChars||"";this.onlyExtra=booleanValue(onlyExtra);this.parse=function(value){if(value==null){return null}
return unescapeCharacters(String(value),extraChars,onlyExtra)}
this.format=function(value){if(value==null){return null}
return escapeCharacters(String(value),onlyExtra)}}
function CustomParser(formatFunction,parseFunction){this.base=Parser;this.base();this.formatFunction=formatFunction||function(value){return value};this.parseFunction=parseFunction||function(value){return value};this.parse=function(value){return parseFunction.apply(this,arguments)}
this.format=function(value){return formatFunction.apply(this,arguments)}}
function WrapperParser(wrappedParser,formatFunction,parseFunction){this.base=Parser;this.base();this.wrappedParser=wrappedParser||new CustomParser();this.formatFunction=formatFunction||function(value){return value};this.parseFunction=parseFunction||function(value){return value};this.format=function(value){var formatted=this.wrappedParser.format.apply(this.wrappedParser,arguments);var args=[];args[0]=formatted;args[1]=arguments[0];for(var i=1,len=arguments.length;i<len;i++){args[i+1]=arguments[i]}
return formatFunction.apply(this,args)}
this.parse=function(value){var parsed=parseFunction.apply(this,arguments);arguments[0]=parsed;return this.wrappedParser.parse.apply(this.wrappedParser,arguments)}}
var bardia = {
	INVISIBLE: 0,
	READONLY: 1,
	VISIBLE: 2
};
bardia.oop = {
}
bardia.oop.Class = (function() {

    function create(body) {

        function klass(config) {
            this.initialize(config); 
        }

        for (fun in body) {
            klass.prototype[fun] = body[fun];
        }

        return klass;
    }

    function extend(target, source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }

        return target;
    }

    function inherit(_function, body) {
        var klass = function(config) {
            this.initialize(config); 
        }

    	var fun = null;
    	for (fun in _function.prototype) {
    		klass.prototype[fun] = _function.prototype[fun];
    	}
    	
        for (fun in body) {
            klass.prototype[fun] = body[fun];
        }

    	return klass;
    }

    return {
        create: create,
        extend: extend,
        inherit: inherit
    };
    
})();
/**
 *
 */
bardia.dom = {

};

/**
 * creates an element
 */
$_element = (function() {
    function create(jsonRoot) {
        return new bardia.dom.Element(jsonRoot);
    }
    return create;
})();
/**
 *
 */
bardia.dom.Element = bardia.oop.Class.create({

    initialize: function(jsonRoot) {
        this.children = [];

        if (jsonRoot instanceof HTMLElement) {
            this.wrapOnly(jsonRoot);
        } else if (jsonRoot) {
            this.createRoot(jsonRoot);
        }
    },

    wrapOnly: function(jsonRoot) {
        this.domNode = jsonRoot;
        jsonRoot.wrapper = this;
    },

    createRoot: function(jsonRoot) {
        var h = this;
        
        this.domNode = document.createElement(jsonRoot.$_tag);
        this.domNode.wrapper = this;

        for (attr in jsonRoot) {
            if (attr.indexOf("$_") != 0) {
                this.domNode.setAttribute(attr, jsonRoot[attr]);
            }
        }

        if (jsonRoot.$_append && jsonRoot.$_append.forEach) {		// kolekcja obiektow w JSON
            jsonRoot.$_append.forEach(function(child) {
                h.createSubElement(child);
            });
        } else if (jsonRoot.$_append && jsonRoot.$_append.$_tag) { // jeden obiekt w json
        	h.createSubElement(jsonRoot.$_append);
        } else if (jsonRoot.$_append) {
            this.domNode.innerHTML = jsonRoot.$_append;				// zwykly tekst
        }

        if (jsonRoot.$_props) {
        	this.$_props = jsonRoot.$_props
            for (prop in jsonRoot.$_props) {
            	this.domNode[prop] = jsonRoot.$_props[prop];
            }
        }
        
        if (jsonRoot.$_on) {
            for (eventName in jsonRoot.$_on) {
                this.domNode.addEventListener(eventName, jsonRoot.$_on[eventName]);
            }
        }
    },

    createSubElement: function(jsonSubElement) {
        var subElement = new bardia.dom.Element(jsonSubElement);
        this.insert(subElement);
    },

    insert: function(subElement) {
        try {
            if (subElement) {
            	if (subElement.dom) {
            		this.domNode.appendChild(subElement.dom());
            		this.children.push(subElement);
            	} else if ((typeof subElement) == 'string') {
            		var element = document.createTextNode(subElement);
            		this.domNode.appendChild(element);
            	} else if ((typeof subElement) == 'number') {
            		var element = document.createTextNode(subElement);
            		this.domNode.appendChild(element);
            	}                   
            }
        } catch (e) {
            alert("insert: subElement=" + subElement + " " + e);
        }
        
        return subElement;
    },

    update: function(element) {
    	var h = this;
    	
    	(this.children || []).forEach(function(child) {
    		try {
	    		delete child.dom().wrapper; 
	    		h.dom().removeChild(child.dom());
    		} catch (e) {
    			console.log("error removing child node");
    		}
    	});
    	
    	if (this.children) {
    		this.children.splice(0, this.children.length);
    	}
    	
        while (this.dom().firstChild) {
            this.dom().removeChild(this.dom().firstChild);
        }

        if (element) { 
        	this.insert(element);
        }
    },

    dom: function() {
        return this.domNode;
    },

    find: function(id) {
        var result = null;
        try {
        	//result = this.domNode.querySelector("#" + id);
        	result = this.domNode.querySelector("[id='" + id + "']");
        } catch (e) {
        	alert(e + "   " + id);
        }

        if (result !== null) {
            return result.wrapper;
        } else {
            return null;   
        }
    },
    
    findByClass: function(className) {
        var result = null;
        try {
        	result = this.domNode.querySelector(className);
        } catch (e) {
        	alert(e + "   " + className);
        }

        if (result != null && result.wrapper) {
        	return result.wrapper;
        } else if (result != null && !result.wrapper) {
        	return $_element(result);
        } else {
            return null;   
        }    	
    },

    addClassName: function(className) {
    	var classes = this.dom().classList;

    	if (!classes.contains(className)) {
    		classes.add(className);
    	}
    },

    removeClassName: function(className) {
    	var classes = this.dom().classList;

    	if (classes.contains(className)) {
    		classes.remove(className);
    	}
    },

    hasClassName: function(className) {
    	var classes = this.dom().classList;
    	return classes.contains(className);
    },
    
    clone: function() {
    	return new bardia.dom.Element(this.domNode.cloneNode(true));
    },
    
    setStyle: function(style) {
    	var s = null;
    	for (s in style) {
    		this.dom().style[s] = style[s];
    	}
    },    
});
/**
 *
 */
$_upgradeElement = (function() {
    
    function materialize(root) {
        componentHandler.upgradeElement(root.dom());
        (root.children || []).forEach(function(node) {
            $_upgradeElement(node);
        });
    }

    return materialize;
})();
bardia.utils = {
}

function $msg(message) {
    return message;
}

bardia.utils.DateUtils = bardia.oop.Class.create({

    initialize: function(config) {

    },

    formatDateYYYYMMDD: function(date) {
    	var result = "";
    	try {
    		result = date.getFullYear() + "-" + this.formatMM((date.getMonth() + 1)) + "-" + this.formatDD(date.getDate());
    	} catch (e) {
    		result = "";
    	}
    	return result;
    },
    
    formatDateHHmm: function(date) {
    	var result = "";
    	try {
    		result = this.formatMM((date.getHours())) + ":" + this.formatMM(date.getMinutes());
    	} catch (e) {
    		alert(e);
    		result = "";
    	}
    	return result;
    },
    
    /**
      var du = new bardia.utils.DateUtils();
      return du.formatDateHHmm() + " " + du.formatDateYYYYMMDDHHmm() 
     */
    formatDateYYYYMMDDHHmm: function(date) {
    	var result = "";
    	try {
    		result = date.getFullYear() + "-" + this.formatMM((date.getMonth() + 1)) + "-" + this.formatDD(date.getDate() + " " + this.formatHH(date.getHours())) + ":" + this.formatMM(date.getMinutes());
    	} catch (e) {
    		result = "";
    	}
    	return result;
    },
    
    formatDateHHmmSS: function(date) {
    	var result = "";
    	try {
    		result = this.formatMM(date.getHours()) + ":" + this.formatMM(date.getMinutes()) + ":" + this.formatMM(date.getSeconds());
    	} catch (e) {
    		alert(e);
    		result = "";
    	}
    	return result;
    },
    
    daySecondsToHHMM: function(daySeconds) {
    	var result = "";
    	
    		if (daySeconds) {
	    		var hours = (daySeconds - (daySeconds % 3600)) / 3600;
	    		
	    		var restSeconds = (daySeconds - hours * 3600);
	    		var minutes = (restSeconds - (restSeconds % 60)) / 60;
	    		
	    		result = this.formatHH(hours) + ":" + this.formatMM(minutes);
    		}
    		
    	return result;
    },
    /*
     * bardia.utils.DATE_FORMAT = "yyyy-MM-ddTHH:mm:ss.SSS+SSSS";
     */
    parseDate: function(dateStr) {
        if (!dateStr) {
            return "";
        }

        var parser = new DateParser(bardia.utils.DATE_FORMAT);
            result = parser.parse(dateStr);

        return result;
    },
    
    formatMM: function(month) {
    	if (month <= 9) {
    		return "0" + month;
    	} else {
    		return "" + month;
    	}
    },
    
    formatDD: function(day) {
    	if (day <= 9) {
    		return "0" + day;
    	} else {
    		return "" + day;
    	}
    },
    
    formatHH: function(hour) {
    	if (hour <= 9) {
    		return "0" + hour;
    	} else {
    		return "" + hour;
    	}
    },
    
    /**
     * bardia.utils.DateUtils
     * createFormatYYYYMMDD
     */
    createFormatYYYYMMDD: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateYYYYMMDD(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;
    },

    createFormatHHmm: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateHHmm(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;
    },
    
    createFormatHHmmSS: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateHHmmSS(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;
    },
    /**
     * new bardia.utils.DateUtils().createFormatDateYYYYMMDDHHmm()
     */
    createFormatDateYYYYMMDDHHmm: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateYYYYMMDDHHmm(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;    	
    },

    getLeftMinutesTo: function(dateMillis, nowMillis) {
    	var diff = dateMillis - nowMillis;
    	var diffSec = diff / 1000;
    	var diffMins = diffSec / 60;

    	return diffMins.toFixed(0);
    },
    
    convertIntToTime: function(intValue) {
 	   var result = "00:00";
 	       try {
 	    	   result = this.formatNumber(((intValue - intValue % 60) / 60), 2) + ":" + this.formatNumber((intValue % 60), 2)
 	       } catch (e) {
 	    	   console.log("ERROR: convertIntToTime");
 	       }
 	   return result;
    },
    
    convertDaySecondsToTime: function(daySeconds) {
  	   var result = "00:00:00";
  	       try {
  	    	   var hours = (daySeconds - (daySeconds % 3600)) / 3600;
  	    	   var minutes = ((daySeconds - (hours * 3600)) / 60).toFixed(0);
  	    	   var seconds = daySeconds % 60;
  	    	   
  	    	   result = this.formatNumber(hours, 2) + ":" + this.formatNumber(minutes, 2) + ":" + this.formatNumber(seconds, 2)
  	       } catch (e) {
  	    	   console.log("ERROR: convertDaySecondsToTime");
  	       }
  	   return result;
     },
    
    formatNumber: function(num, len) {
        var result = null;
        try {
            result = "" + parseInt(num);
            while (result.length < len) {
                result = "0" + result;
            }
        } catch (e) {
            alert("bardia.utils.DateUtils.formatNumber" + e);
        }

        if (isNaN(parseInt(num))) {
            result = "";
        }

        return result;
    },

    formatTimeSecNoZerosSec: function(date) {	
    	if (!date) {
    		return "";
    	}
    	var result = this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
		if (date.getSeconds() > 0) {
			result += ":" + this.formatNumber(date.getSeconds(), 2);
		}
		return result;
    },

    formatSeconds: function(daySeconds) {
    	var result = "";
    	return result;
    },

    EOW: function () {
    	return this.parseDate("4712-12-31T00:00:00.000+0000");
    },

    BOW: function () {
    	return new Date(0);
    },
    
    stripTime: function(d) {
    	var result = new Date(d.getTime());
    	result.setHours(0);
    	result.setMinutes(0);
    	result.setSeconds(0);
    	result.setMilliseconds(0);
    	return result;
    }
});

bardia.utils.DateUtils.pattern = "";
bardia.utils.DATE_FORMAT = "yyyy-MM-ddTHH:mm:ss.SSS+SSSS";

bardia.utils.Map = bardia.oop.Class.create({

    initialize: function() {
    	this.dict = {};
    },
    
	size: function() {
		return Object.keys(this.dict).length;
	},

	isEmpty: function() {
		return Object.keys(this.dict).length == 0;
	},

	get: function(key){
		return this.dict[key];
	},

	containsKey: function(key){
		if( this.get(key) !== undefined) {
			return true;
		} else {
			return false;
		}
	},

	put: function(key, value) {
		this.dict[key] = value;
	},

	remove: function(key) {
		'use strict';
		delete this.dict[key];
	},

	clear: function(){
		this.dict = {};
	},

	forEach: function(callback) {
		var len = this.size();
		for (i = 0; i < len; i++) {
			var item = this.get( Object.keys(this.dict)[i] );
			callback(item);
		}
	}
});

bardia.utils.onImportScriptError = function() {
	window.location.href = window.location.href;
}

bardia.utils.ScriptImporter = bardia.oop.Class.create({

	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
			importedScripts: new bardia.utils.Map()
		}, config));
	},

	js: function(url) {
		var h = this;

		if (h.importedScripts.containsKey(url)) {
			return;
		}

		var xhttp = new XMLHttpRequest();	

		xhttp.open("GET", url + "?" + new Date().getTime(), false);
		xhttp.send(null);

		if (xhttp.readyState == 4 && (xhttp.status == 200 || xhttp.status == 0)) {
			try {
				h.importedScripts.put(url, {
					imported: true
				});
				globalEval(xhttp.responseText);
			} catch (e) {
				console.log("" + e + " Error importing script " + url);
				if (bardia.utils.onImportScriptError) {
					bardia.utils.onImportScriptError(xhttp);
				}
			}
		}
	},
	
	css: function(url) {
		var h = this;

		if (h.importedScripts.containsKey(url)) {
			return;
		}

		try {
			var css = $_element({
				$_tag: "link",
				rel: "stylesheet",
				href: url + "?" + new Date().getTime()
			});
			document.getElementsByTagName("head")[0].appendChild(css.dom());
			h.importedScripts.put(url, {
				imported: true
			});
		} catch (e) {
			alert(""+ e + " Error importing css " + url);
		}
	},
});

var globalEval = function globalEval(src) {
    if (window.execScript) {
        window.execScript(src);
        return;
    }
    var fn = function() {
        window.eval.call(window,src);
    };
    fn();
};

var IMPORTER = new bardia.utils.ScriptImporter({
});

function importScript(path) {
	IMPORTER.js(path);
};

function importCss(path) {
	IMPORTER.css(path);
};
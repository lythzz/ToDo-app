(()=>{"use strict";function e(){localStorage.clear(),localStorage.setItem("list",JSON.stringify(n.get()))}class t{constructor(e){this.name=e,this.taskList=[],this.selected=!1}setName(e){this.name=e}getName(){return this.name}addTask(e){this.taskList.push(e)}deleteTask(e){this.tasks=this.tasks.filter((t=>t.name!==e))}}const n=function(){let e=JSON.parse(localStorage.getItem("list"));null!=e&&null!=e||(e=[{name:"home",taskList:[],selected:!0},{name:"today",taskList:[],selected:!1},{name:"week",taskList:[],selected:!1}]);const t=()=>{for(let t=0;t<e.length;t++)if(e[t].selected)return t},n=t=>{for(let n=0;n<e.length;n++)if(e[n].name==t)return n};return{get:()=>e,add:t=>e.push(t),checkNames:t=>{for(let n=0;n<e.length;n++)if(e[n].name==t)return!0},select:t=>e[t].selected=!0,clearSelected:()=>e.forEach((e=>{e.selected=!1})),getIndex:n,getSelected:t,remove:t=>{delete e[t];for(let n=t;n<e.length;n++)e[n]=e[n+1];e.pop()},checkTaskName:n=>{const a=t();for(let t=0;t<e[a].taskList.length;t++)if(e[a].taskList[t].name==n)return!0},removeTask:a=>{let r=t();r!=n("today")&&r!=n("week")||(r=n(a.origin)),e[r].taskList=e[r].taskList.filter((e=>e.name!==a.name))},editTask:(a,r,o)=>{let i=t();i!=n("today")&&i!=n("week")||(i=n(r.origin)),e[i].taskList.forEach((t=>{if(t.name=a){const n=e[i].taskList.indexOf(t);e[i].taskList[n]=o,console.log(e[i])}}))},editQueue:{}}}();class a{constructor(e,t,n="No date"){this.name=e,this.description=t,this.dueDate=n,this.done=!1}}const r={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function o(e){return(t={})=>{const n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}const i={date:o({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:o({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:o({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},s={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function c(e){return(t,n)=>{let a;if("formatting"===(n?.context?String(n.context):"standalone")&&e.formattingValues){const t=e.defaultFormattingWidth||e.defaultWidth,r=n?.width?String(n.width):t;a=e.formattingValues[r]||e.formattingValues[t]}else{const t=e.defaultWidth,r=n?.width?String(n.width):e.defaultWidth;a=e.values[r]||e.values[t]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function u(e){return(t,n={})=>{const a=n.width,r=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],o=t.match(r);if(!o)return null;const i=o[0],s=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth],c=Array.isArray(s)?function(e,t){for(let t=0;t<e.length;t++)if(e[t].test(i))return t}(s):function(e,t){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&e[t].test(i))return t}(s);let u;return u=e.valueCallback?e.valueCallback(c):c,u=n.valueCallback?n.valueCallback(u):u,{value:u,rest:t.slice(i.length)}}}var d;const l={code:"en-US",formatDistance:(e,t,n)=>{let a;const o=r[e];return a="string"==typeof o?o:1===t?o.one:o.other.replace("{{count}}",t.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a},formatLong:i,formatRelative:(e,t,n,a)=>s[e],localize:{ordinalNumber:(e,t)=>{const n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:c({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:c({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:e=>e-1}),month:c({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:c({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:c({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(d={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:e=>parseInt(e,10)},(e,t={})=>{const n=e.match(d.matchPattern);if(!n)return null;const a=n[0],r=e.match(d.parsePattern);if(!r)return null;let o=d.valueCallback?d.valueCallback(r[0]):r[0];return o=t.valueCallback?t.valueCallback(o):o,{value:o,rest:e.slice(a.length)}}),era:u({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:u({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:e=>e+1}),month:u({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:u({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:u({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let m={};function h(){return m}Math.pow(10,8);const f=6048e5,g=864e5;function y(e){const t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new e.constructor(+e):"number"==typeof e||"[object Number]"===t||"string"==typeof e||"[object String]"===t?new Date(e):new Date(NaN)}function w(e){const t=y(e);return t.setHours(0,0,0,0),t}function k(e){const t=y(e),n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),+e-+n}function b(e,t){return e instanceof Date?new e.constructor(t):new Date(t)}function p(e){const t=y(e);return function(e,t){const n=w(e),a=w(t),r=+n-k(n),o=+a-k(a);return Math.round((r-o)/g)}(t,function(e){const t=y(e),n=b(e,0);return n.setFullYear(t.getFullYear(),0,1),n.setHours(0,0,0,0),n}(t))+1}function v(e,t){const n=h(),a=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,r=y(e),o=r.getDay(),i=(o<a?7:0)+o-a;return r.setDate(r.getDate()-i),r.setHours(0,0,0,0),r}function S(e){return v(e,{weekStartsOn:1})}function M(e){const t=y(e),n=t.getFullYear(),a=b(e,0);a.setFullYear(n+1,0,4),a.setHours(0,0,0,0);const r=S(a),o=b(e,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const i=S(o);return t.getTime()>=r.getTime()?n+1:t.getTime()>=i.getTime()?n:n-1}function L(e){const t=y(e),n=+S(t)-+function(e){const t=M(e),n=b(e,0);return n.setFullYear(t,0,4),n.setHours(0,0,0,0),S(n)}(t);return Math.round(n/f)+1}function T(e,t){const n=y(e),a=n.getFullYear(),r=h(),o=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,i=b(e,0);i.setFullYear(a+1,0,o),i.setHours(0,0,0,0);const s=v(i,t),c=b(e,0);c.setFullYear(a,0,o),c.setHours(0,0,0,0);const u=v(c,t);return n.getTime()>=s.getTime()?a+1:n.getTime()>=u.getTime()?a:a-1}function D(e,t){const n=y(e),a=+v(n,t)-+function(e,t){const n=h(),a=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,r=T(e,t),o=b(e,0);return o.setFullYear(r,0,a),o.setHours(0,0,0,0),v(o,t)}(n,t);return Math.round(a/f)+1}function q(e,t){return(e<0?"-":"")+Math.abs(e).toString().padStart(t,"0")}const x={y(e,t){const n=e.getFullYear(),a=n>0?n:1-n;return q("yy"===t?a%100:a,t.length)},M(e,t){const n=e.getMonth();return"M"===t?String(n+1):q(n+1,2)},d:(e,t)=>q(e.getDate(),t.length),a(e,t){const n=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(e,t)=>q(e.getHours()%12||12,t.length),H:(e,t)=>q(e.getHours(),t.length),m:(e,t)=>q(e.getMinutes(),t.length),s:(e,t)=>q(e.getSeconds(),t.length),S(e,t){const n=t.length,a=e.getMilliseconds();return q(Math.trunc(a*Math.pow(10,n-3)),t.length)}},E={G:function(e,t,n){const a=e.getFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if("yo"===t){const t=e.getFullYear(),a=t>0?t:1-t;return n.ordinalNumber(a,{unit:"year"})}return x.y(e,t)},Y:function(e,t,n,a){const r=T(e,a),o=r>0?r:1-r;return"YY"===t?q(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):q(o,t.length)},R:function(e,t){return q(M(e),t.length)},u:function(e,t){return q(e.getFullYear(),t.length)},Q:function(e,t,n){const a=Math.ceil((e.getMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return q(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){const a=Math.ceil((e.getMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return q(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){const a=e.getMonth();switch(t){case"M":case"MM":return x.M(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){const a=e.getMonth();switch(t){case"L":return String(a+1);case"LL":return q(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(e,t,n,a){const r=D(e,a);return"wo"===t?n.ordinalNumber(r,{unit:"week"}):q(r,t.length)},I:function(e,t,n){const a=L(e);return"Io"===t?n.ordinalNumber(a,{unit:"week"}):q(a,t.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getDate(),{unit:"date"}):x.d(e,t)},D:function(e,t,n){const a=p(e);return"Do"===t?n.ordinalNumber(a,{unit:"dayOfYear"}):q(a,t.length)},E:function(e,t,n){const a=e.getDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){const r=e.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return q(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){const r=e.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return q(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){const a=e.getDay(),r=0===a?7:a;switch(t){case"i":return String(r);case"ii":return q(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){const a=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){const a=e.getHours();let r;switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){const a=e.getHours();let r;switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){let t=e.getHours()%12;return 0===t&&(t=12),n.ordinalNumber(t,{unit:"hour"})}return x.h(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getHours(),{unit:"hour"}):x.H(e,t)},K:function(e,t,n){const a=e.getHours()%12;return"Ko"===t?n.ordinalNumber(a,{unit:"hour"}):q(a,t.length)},k:function(e,t,n){let a=e.getHours();return 0===a&&(a=24),"ko"===t?n.ordinalNumber(a,{unit:"hour"}):q(a,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getMinutes(),{unit:"minute"}):x.m(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getSeconds(),{unit:"second"}):x.s(e,t)},S:function(e,t){return x.S(e,t)},X:function(e,t,n){const a=e.getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return C(a);case"XXXX":case"XX":return N(a);default:return N(a,":")}},x:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"x":return C(a);case"xxxx":case"xx":return N(a);default:return N(a,":")}},O:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+P(a,":");default:return"GMT"+N(a,":")}},z:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+P(a,":");default:return"GMT"+N(a,":")}},t:function(e,t,n){return q(Math.trunc(e.getTime()/1e3),t.length)},T:function(e,t,n){return q(e.getTime(),t.length)}};function P(e,t=""){const n=e>0?"-":"+",a=Math.abs(e),r=Math.trunc(a/60),o=a%60;return 0===o?n+String(r):n+String(r)+t+q(o,2)}function C(e,t){return e%60==0?(e>0?"-":"+")+q(Math.abs(e)/60,2):N(e,t)}function N(e,t=""){const n=e>0?"-":"+",a=Math.abs(e);return n+q(Math.trunc(a/60),2)+t+q(a%60,2)}const W=(e,t)=>{switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}},Y=(e,t)=>{switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}},O={p:Y,P:(e,t)=>{const n=e.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return W(e,t);let o;switch(a){case"P":o=t.dateTime({width:"short"});break;case"PP":o=t.dateTime({width:"medium"});break;case"PPP":o=t.dateTime({width:"long"});break;default:o=t.dateTime({width:"full"})}return o.replace("{{date}}",W(a,t)).replace("{{time}}",Y(r,t))}},F=/^D+$/,j=/^Y+$/,H=["D","DD","YY","YYYY"];function Q(e){if(!(t=e,t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)||"number"==typeof e))return!1;var t;const n=y(e);return!isNaN(Number(n))}const A=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,z=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,B=/^'([^]*?)'?$/,G=/''/g,X=/[a-zA-Z]/;function I(e,t,n){const a=h(),r=n?.locale??a.locale??l,o=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,i=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,s=y(e);if(!Q(s))throw new RangeError("Invalid time value");let c=t.match(z).map((e=>{const t=e[0];return"p"===t||"P"===t?(0,O[t])(e,r.formatLong):e})).join("").match(A).map((e=>{if("''"===e)return{isToken:!1,value:"'"};const t=e[0];if("'"===t)return{isToken:!1,value:$(e)};if(E[t])return{isToken:!0,value:e};if(t.match(X))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return{isToken:!1,value:e}}));r.localize.preprocessor&&(c=r.localize.preprocessor(s,c));const u={firstWeekContainsDate:o,weekStartsOn:i,locale:r};return c.map((a=>{if(!a.isToken)return a.value;const o=a.value;return(!n?.useAdditionalWeekYearTokens&&function(e){return j.test(e)}(o)||!n?.useAdditionalDayOfYearTokens&&function(e){return F.test(e)}(o))&&function(e,t,n){const a=function(e,t,n){const a="Y"===e[0]?"years":"days of the month";return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(e,t,n);if(console.warn(a),H.includes(e))throw new RangeError(a)}(o,t,String(e)),(0,E[o[0]])(s,o,r.localize,u)})).join("")}function $(e){const t=e.match(B);return t?t[1].replace(G,"'"):e}function J(e,t){const n=y(e),a=y(t),r=n.getTime()-a.getTime();return r<0?-1:r>0?1:r}const R=()=>{document.querySelector(".projects").classList.contains("hidden")&&V(),document.querySelector(".projectForm").classList.remove("hidden"),document.querySelector("#projectName").focus()},U=()=>{document.querySelector("#projectName").value="",document.querySelector(".projectForm").classList.add("hidden")},V=()=>{const e=document.querySelector(".projects"),t=document.querySelector("#toggleProjects");e.classList.contains("hidden")?(e.classList.remove("hidden"),t.style.transform="rotate(0)"):(e.classList.add("hidden"),t.style.transform="rotate(-0.25turn)")},K=()=>{document.querySelector(".modal").style.display="block"},Z=()=>{document.querySelector(".modal").style.display="none",document.querySelector("#taskName").value="",document.querySelector("#taskDate").value="",document.querySelector("#taskDesc").value="",document.querySelector(".formHeader").innerText="New Task",document.querySelector(".submitTaskForm").classList.remove("hidden"),document.querySelector(".editTaskForm").classList.add("hidden")},_=()=>{const a=document.querySelector("#projectName").value;""==a||n.checkNames(a)||(function(a){const r=new t(a);n.add(r),e()}(a),ee(),U())},ee=()=>{const t=document.querySelector(".projects"),a=document.querySelectorAll(".pContainer");a.length>0&&a.forEach((e=>{t.removeChild(e)})),n.get().forEach((a=>{if("home"!=a.name&&"today"!=a.name&&"week"!=a.name){const r=document.createElement("p"),o=document.createElement("p"),i=document.createElement("div");r.innerText=a.name,o.innerHTML='<i class="fa-solid fa-trash"></i>',r.classList.add("pName"),o.classList.add("pRemove"),i.classList.add("pContainer"),i.setAttribute("id",`${a.name}`),i.addEventListener("click",(()=>te(i))),o.addEventListener("click",(function(){!function(t){const a=n.getIndex(t);n.remove(a),e()}(a.name),t.removeChild(document.getElementById(`${a.name}`));const r=document.querySelector("#home");te(r)})),i.appendChild(r),i.appendChild(o),t.appendChild(i)}}))},te=e=>{const t=e.getAttribute("id"),a=document.querySelector(".newTask");a.classList.contains("hidden")&&a.classList.remove("hidden"),"today"!=t&&"week"!=t||a.classList.add("hidden");const r=n.getIndex(t);n.clearSelected(),n.select(r),ne();const o=document.querySelector(".selected");null!==o&&o.classList.remove("selected"),e.classList.add("selected")},ne=()=>{(()=>{const e=I(new Date,"dd/MM/yyyy"),t=n.getIndex("today");let a=n.get()[t].taskList;a.splice(0,a.length),n.get().forEach((t=>{"today"!=t.name&&"week"!=t.name&&t.taskList.forEach((n=>{if(n.dueDate==e){const e=n;e.origin=t.name,a.push(e)}}))}))})(),(()=>{const e=new Date,t=I(e,"dd/MM/yyyy"),a=I(e.setDate(e.getDate()+7),"dd/MM/yyyy"),r=n.getIndex("week"),o=n.get()[r].taskList;o.splice(0,o.length),n.get().forEach((e=>{"today"!=e.name&&"week"!=e.name&&e.taskList.forEach((n=>{if(n.dueDate>=t&&n.dueDate<=a){const t=n;t.origin=e.name,o.push(t)}}))}))})();const t=n.getSelected(),a=document.querySelector(".tasksContainer");a.innerHTML="",null==t||n.get()[t].taskList.length<1||n.get()[t].taskList.forEach((t=>{const r=document.createElement("div"),o=document.createElement("div"),i=document.createElement("input"),s=document.createElement("div"),c=document.createElement("div"),u=document.createElement("div"),d=document.createElement("div"),l=document.createElement("div"),m=document.createElement("div"),h=document.createElement("div");r.classList.add("task"),o.classList.add("taskInfo"),d.classList.add("taskInfo"),i.setAttribute("id","taskDone"),i.setAttribute("type","checkbox"),s.classList.add("taskText"),c.classList.add("taskTitle"),u.classList.add("taskDesc"),l.classList.add("taskOptions"),m.classList.add("taskDate"),h.classList.add("taskOptions"),i.checked=t.done,c.innerText=t.name,u.innerText=t.description,m.innerText=t.dueDate,l.innerHTML='<i class="fa-solid fa-trash"></i>',h.innerHTML='<i class="fa-regular fa-pen-to-square"></i>',l.addEventListener("click",(()=>function(t){n.removeTask(t),ne(),e()}(t))),h.addEventListener("click",(()=>function(e){const t=document.querySelector("#taskName"),a=document.querySelector("#taskDate"),r=document.querySelector("#taskDesc"),o=`${e.dueDate.slice(-4)}-${e.dueDate.slice(3,5)}-${e.dueDate.slice(0,2)}`;t.value=e.name,a.value=o,r.value=e.description,K(),n.editQueue.name=e.name,n.editQueue.task=e,document.querySelector(".formHeader").innerText="Edit Task",document.querySelector(".submitTaskForm").classList.add("hidden"),document.querySelector(".editTaskForm").classList.remove("hidden")}(t))),i.addEventListener("click",(()=>{t.done?(t.done=!1,s.classList.remove("done"),m.classList.remove("done")):(t.done=!0,s.classList.add("done"),m.classList.add("done")),e()})),t.done&&(s.classList.add("done"),m.classList.add("done")),o.appendChild(i),s.appendChild(c),s.appendChild(u),o.appendChild(s),d.appendChild(m),d.appendChild(l),d.appendChild(h),r.appendChild(o),r.appendChild(d),a.appendChild(r)}))};ee(),n.select(0),ne(),(()=>{document.querySelector("#newProject").addEventListener("click",R),document.querySelector(".cancel").addEventListener("click",U),document.querySelector(".submit").addEventListener("click",_),document.querySelector("#toggleProjects").addEventListener("click",V),document.querySelector(".submitTaskForm").addEventListener("click",(function(t){t.preventDefault(),(()=>{const t=document.querySelector("#taskName"),r=document.querySelector("#taskDate"),o=document.querySelector("#taskDesc").value;if(""==t.value)return void alert("The task name can't be blank!");if(n.checkTaskName(t.value))return void alert("There's already a task with that name!");if(""==r.value)return void alert("The due date can't be blank!");const i=I(new Date(r.value.replace(/-/g,"/")),"dd/MM/yyyy"),s=I(new Date,"dd/MM/yyyy");1!=J(new Date(i),new Date(s))?(function(t,r,o){const i=new a(t,o,r),s=n.getSelected();n.get()[s].taskList.push(i),e(),ne()}(t.value,i,o),Z()):alert("You cannot set the due date to a past day")})()})),document.querySelector(".editTaskForm").addEventListener("click",(function(e){e.preventDefault(),(()=>{const e=n.editQueue.name,t=n.editQueue.task,r=document.querySelector("#taskName"),o=document.querySelector("#taskDate"),i=document.querySelector("#taskDesc").value;if(""==r.value)return void alert("The task name can't be blank!");if(n.checkTaskName(r.value))return void alert("There's already a task with that name!");if(""==o.value)return void alert("The due date can't be blank!");const s=I(new Date(o.value.replace(/-/g,"/")),"dd/MM/yyyy"),c=I(new Date,"dd/MM/yyyy");if(1==J(new Date(s),new Date(c)))return void alert("You cannot set the due date to a past day");const u=new a(r.value,i,s);n.editTask(e,t,u),Z(),ne()})()})),document.querySelector(".closeTaskForm").addEventListener("click",Z),document.querySelector(".newTask").addEventListener("click",K);const t=document.querySelector("#home");t.addEventListener("click",(()=>{te(t),e()}));const r=document.querySelector("#week");r.addEventListener("click",(()=>{te(r),e()}));const o=document.querySelector("#today");o.addEventListener("click",(()=>{te(o),e()}))})()})();
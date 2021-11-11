document.body.insertAdjacentHTML('afterbegin',`
<style>
	:root{background-color:#fff;color:#000;font-family:sans-serif;}
	@media(prefers-color-scheme:dark){
		:root{background-color:#222;color:#fff;}
		a:link{color:#aef;}a:link:hover{color:#8af;}a:link:active{color:#48f;}
		a:visited{color:#caf;}a:visited:hover{color:#a8f;}a:visited:active{color:#84f;}
	}
	@media print{a{color:inherit;text-decoration:none;}}
	#log{white-space:pre-wrap;}
	.tac{text-align:center;}.tar{text-align:right;}.op{opacity:.5;}
	.flex{display:flex;}.fw{flex-wrap:wrap;}.jcsa{justify-content:space-between;}.flex:not(.top)>*,.m{margin:auto 4px;}
</style>
<pre id="log"></pre>
`);
const llog=(...x)=>log.textContent+=`${x.join(', ')}\n`,
urlq=Object.fromEntries(location.search.substr(1).split('&').map(x=>x.split('=',2).map(y=>y.split('+')))),
n2d=x=>{if(!x)return;x=`20${x}`;return[x.substr(0,4),x.substr(4,2),x.substr(6,2)];};
document.dispatchEvent(new Event('styexe'));
console.log(urlq);

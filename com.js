document.body.insertAdjacentHTML('afterbegin',`<pre id="log"></pre>`);
const llog=(...x)=>log.textContent+=`${x.join(', ')}\n`,
table=x=>'<table><tr>'+x.map(y=>y.map((z,i)=>`<t${'hd'[i]}>${z}</t${'hd'[i]}>`).join('')).join('</tr><tr>')+'</tr></table>',
urlq=Object.fromEntries(location.search.substr(1).split('&').filter(y=>y).map(x=>x.split('=',2).map(y=>y.split('+')))),
urlq_=x=>Object.entries({...urlq,...x}).map(y=>y[0]+'='+y[1].join('+')).join('&'),
n2d=x=>{if(!x)return;x=`20${x}`;return[x.slice(0,4),x.slice(4,6),x.slice(6,8)];};
console.log(urlq);

document.body.insertAdjacentHTML('afterbegin',`<canvas id="bgc"></canvas>`);
Promise.all(
	['img/ico/m0.png','img/ico/m1.png','img/ico/m2.png','img/ico/m3.png','img/ico/i0.png','img/ico/i1.png','img/ico/i2.png','img/ico/i3.png']
	.map(x=>new Promise(f=>x=Object.assign(new Image(),{src:x,onload:()=>f(x)})))
).then(img=>{
	console.log(img);
	const w=()=>document.documentElement.clientWidth,
		h=()=>document.documentElement.clientHeight
		ctx=bgc.getContext('2d'),
		draw=()=>{
			ctx.clearRect(0,0,bgc.width,bgc.height);
			const size=[Math.ceil(w()/256),Math.ceil(h()/256)],
				rand=new Uint8Array(size[0]*size[1]);
			crypto.getRandomValues(rand);console.log(rand);
			new Array(size[0]).fill().map((_,i)=>
				new Array(size[1]).fill().map((_,j)=>{
					ctx.save();
					ctx.beginPath();ctx.arc(64+i*256,64+j*256,32,0,2*Math.PI);ctx.clip();
					ctx.drawImage(img[Math.floor(img.length*rand[i*size[1]+j]/256)],32+i*256,32+j*256,64,64);
					ctx.restore();
				})
			);
		};
	(onresize=()=>{bgc.width=w()*devicePixelRatio;bgc.height=h()*devicePixelRatio;bgc.style.width=w()+'px';bgc.style.height=h()+'px';ctx.scale(devicePixelRatio,devicePixelRatio);draw();})();
});
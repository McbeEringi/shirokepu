'use strict'; 
document.body.insertAdjacentHTML('afterbegin',`<canvas id="c" style="opacity:0;"></canvas>`);
Promise.all([
	fetch('https://cdn.jsdelivr.net/gh/liabru/matter-js/build/matter.min.js'),
	fetch('https://cdn.jsdelivr.net/gh/liabru/matter-wrap/build/matter-wrap.min.js'),
	//fetch('https://mcbeeringi.github.io/src/matter/floatpr.js'),
	fetch('https://mcbeeringi.github.io/src/matter/spriter.js')
].map(x=>x.then(y=>y.text()))).then(x=>{
	Function(x.join('\n'))();
	Matter.use(MatterWrap);
	//Matter.use(FloatPR);
	Matter.use(Spriter);
	const engine=Matter.Engine.create({gravity:{scale:0}}),
		render=Matter.Render.create({
			canvas:c,
			engine,
			options:{
				width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,
				pixelRatio:'auto',//showMousePosition:true,
				wireframes:false,background:'#0000'
			}
		}),
		stack=Matter.Composites.stack(render.options.width/2-235,render.options.height/2-355,8,8,10,10,(x,y)=>{
			const s=Matter.Common.random(10,40);
			return Matter.Bodies.circle(x,y,s,{
				frictionAir:.001,restitution:.5,
				render:{sprite:{texture:`img/ico/${['m0','m1','m2','m3','i0','i1','i2','i3'][Math.floor(((s*10)%1)*8)]}.png`,xScale:s/128,yScale:s/128}},
				plugin:{wrap:{min:{x:render.bounds.min.x,y:render.bounds.min.y},max:{x:render.bounds.max.x,y:render.bounds.max.y}}}
			});
		}),
		//mouse=Matter.Mouse.create(render.canvas),
		//mc=Matter.MouseConstraint.create(engine,{mouse,constraint:{render:{visible:false}}}),
		runner=Matter.Runner.create(),
		vrand=(_,r=Math.random(),t=r*20*Math.PI)=>Matter.Body.setVelocity(stack.bodies[Math.floor(stack.bodies.length*r)],Matter.Vector.create(Math.cos(t)*10,Math.sin(t)*10));

	//render.mouse=mouse;
	Spriter.stdMod=(ctx,img)=>{ctx.beginPath();ctx.ellipse(img.width/2,img.height/2,img.width/2,img.height/2,0,0, 2*Math.PI);ctx.clip();ctx.drawImage(img,0,0);};
	Matter.Composite.add(engine.world,[
		stack,
		//mc
	]);
	Matter.Render.run(render);
	Matter.Runner.run(runner,engine);
	c.style.opacity='';
	vrand();setInterval(vrand,2000);
})
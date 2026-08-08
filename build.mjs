#!/usr/bin/env -S bun --install=force

import MarkdownItAsync from'markdown-it-async';


await Bun.$`rm -rf dst`
await Bun.$`cp -R src dst`

const
tmpl=await Bun.file('tmpl.html').text(),
m2icon={うた:'uta',しろる:'shiroru',えりんぎ:'eringi',紅茶:'tea'},
entries=await Promise.all(
	new Bun.Glob('**/*.md').scanSync({cwd:'dst/entries'})[Symbol.iterator]().map(async w=>(
		w={
			name:w,
			path:'dst/entries/'+w
		},
		Object.assign(
			w,
			(
				await Bun.file(w.path).text()
			).match(/^(?<shebang>#![^\n]*)?(?:\r?\n)*(?:---\r?\n(?<front_matter>.*?)\r?\n---)?(?:\r?\n)+(?<markdown>.*)$/s)?.groups??{}
		),
		// console.log(w.path),
		w.front_matter&&=Bun.YAML.parse(w.front_matter.replace(/\t/g,'  ')),
		w.entry=w.markdown.match(/^ {0,3}#[ \t]+(?<x>.+)$| {0,3}(?<x>.+)\r?\n {0,3}=+[ \t]*$/m)?.groups.x,
		w.title=`しろけぷ発言まとめ ${w.front_matter.id}`,

		w.html=new HTMLRewriter()
			.on('main',{element:async e=>e.append(
				`<pre>${JSON.stringify(w.front_matter,0,'\t')}</pre>${Bun.markdown.html(w.markdown)}`,
				{html:1}
			)})
			.on('title',{element:e=>e.append(w.title)})
			.on('meta[name="description"]',{element:e=>e.setAttribute('content',w.entry)})
			.on('meta[og]',{element:e=>e.replace(
				Object.entries({
					type:'website',
					title:w.title,
					description:w.entry,
					url:`https://shirokepu.6ca.me/entries/${w.front_matter.id}`,
					image:`https://shirokepu.6ca.me/img/icon/${m2icon[w.front_matter.member]}_face.png`
				}).map(([i,x])=>`<meta property="og:${i}" content="${x}">`).join(''),
				{html:1}
			)})
			.transform(tmpl),
		await Bun.write(w.path.replace(/\.md$/,'.html'),w.html),
		await Bun.file(w.path).delete(),
		w
	))
);

Bun.write(
	'dst/entries/index.html',
	new HTMLRewriter()
		.on('main',{element:e=>e.append(
			`<h1>もくじ(仮)</h1><ul>${
				entries.sort((a,b)=>b.front_matter.id-a.front_matter.id).map(x=>`<li><a href="${x.name.replace(/\.md$/,'.html')}">${x.front_matter.id}: ${x.entry}</a></li>`).join('')
			}</ul>`,
			{html:1}
		)})
		.on('title',{element:e=>e.append('しろけぷ発言まとめ 目次')})
		.on('meta[name="description"]',{element:e=>e.setAttribute('content','TODO: どうにかする')})
		.on('meta[og]',{element:e=>e.replace(
			Object.entries({
				type:'website',
				title:'しろけぷ発言まとめ 目次',
				description:'TODO: どうにかする',
				url:`https://shirokepu.6ca.me/entries/`,
				image:`https://shirokepu.6ca.me/img/icon/eringi_face.png`
			}).map(([i,x])=>`<meta property="og:${i}" content="${x}">`).join(''),
			{html:1}
		)})
		.transform(tmpl)
)

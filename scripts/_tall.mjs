import puppeteer from 'puppeteer-core'
const OUT='/private/tmp/claude-502/-Users-Ximi-Hoque-Workspace-xysq/c5ef637c-5e34-4d4e-8cf3-9f3164c7cf32/scratchpad'
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'shell'})
const p=await b.newPage(); await p.setViewport({width:1512,height:1100,deviceScaleFactor:2})
await p.evaluateOnNewDocument(()=>localStorage.setItem('theme','dark'))
await p.goto('http://localhost:5174/',{waitUntil:'networkidle0'}); await new Promise(r=>setTimeout(r,600))
await p.click('.hs-rail li:nth-child(6) .hs-step'); await new Promise(r=>setTimeout(r,900))
console.log(JSON.stringify(await p.$eval('.ph',e=>{const r=e.getBoundingClientRect();return{w:Math.round(r.width),h:Math.round(r.height),ratio:+(r.height/r.width).toFixed(2)}})))
await (await p.$('.hero-stage-wrap')).screenshot({path:`${OUT}/tall.png`})
await b.close()

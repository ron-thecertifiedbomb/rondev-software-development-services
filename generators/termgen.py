
#!/usr/bin/env python3

import os
from datetime import datetime

print("🚀 Starting Terminal UI Generator...")

import os

html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pro Terminal Command Center</title>

<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/dist/cdn.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<style>
:root {
    --bg-base:#0a0a0a;
    --bg-panel:#141414;
    --bg-input:#1e1e1e;
    --bg-hover:#2a2d2e;
    --border:#262626;
    --focus:#007acc;
    --text:#ccc;
    --muted:#858585;
    --danger:#f14c4c;
}

*{box-sizing:border-box;margin:0;padding:0}

body{
    background:var(--bg-base);
    color:var(--text);
    font-family:Inter, sans-serif;
}

header{
    padding:1rem;
    border-bottom:1px solid var(--border);
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    align-items:center;
}

.search{
    flex:1;
    background:var(--bg-input);
    border:1px solid var(--border);
    padding:10px;
    border-radius:6px;
    color:white;
}

.grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
    gap:1rem;
    padding:1rem;
}

.card{
    background:var(--bg-panel);
    border:1px solid var(--border);
    border-radius:8px;
}

.card h3{
    padding:10px;
    font-size:13px;
    border-bottom:1px solid var(--border);
    color:var(--muted);
}

.item{
    padding:10px;
    cursor:pointer;
    position:relative;
}

.item:hover{background:var(--bg-hover)}

.cmd{font-family:monospace;color:#4fc1ff;font-size:13px}
.desc{font-size:12px;color:var(--muted)}

.actions{
    position:absolute;
    right:10px;
    top:10px;
    display:flex;
    gap:6px;
    opacity:0;
}

.item:hover .actions{opacity:1}

.btn{
    font-size:10px;
    padding:4px 6px;
    border:1px solid var(--border);
    background:var(--bg-input);
    color:white;
    border-radius:4px;
    cursor:pointer;
}

.toast{
    position:fixed;
    bottom:20px;
    right:20px;
    background:var(--focus);
    padding:10px 20px;
    border-radius:6px;
}

@media(max-width:640px){
    header{flex-direction:column}
}
</style>
</head>

<body x-data="app()" @keydown.window="if($event.key === '/') $refs.search.focus()">

<header>
    <strong>>_ TERMINAL PRO</strong>
    <input x-ref="search" x-model="search" class="search" placeholder="Search commands... (/ to focus)">
    <button class="btn" @click="showFav = !showFav">⭐ Favorites</button>
</header>

<div class="grid">

<template x-for="cat in categories()" :key="cat">
    <div class="card">
        <h3 x-text="cat.toUpperCase()"></h3>

        <template x-for="(s,i) in filtered(cat)" :key="i">
            <div class="item" @click="execute(s)">
                <div class="cmd" x-text="s.cmd"></div>
                <div class="desc" x-text="s.desc"></div>

                <div class="actions">
                    <button class="btn" @click.stop="toggleFav(s)">⭐</button>
                    <button class="btn" style="color:red" @click.stop="remove(i)">Del</button>
                </div>
            </div>
        </template>

    </div>
</template>

</div>

<div class="toast" x-show="toast" x-text="toastMsg"></div>

<script>
function app(){
return {
search:'',
showFav:false,
toast:false,
toastMsg:'',

scripts: Alpine.$persist([

// FILE SYSTEM
{cat:'system',cmd:'ls -la',desc:'List files'},
{cat:'system',cmd:'pwd',desc:'Current directory'},
{cat:'system',cmd:'cd ..',desc:'Go up folder'},
{cat:'system',cmd:'touch file.txt',desc:'Create file'},
{cat:'system',cmd:'mkdir folder',desc:'Create folder'},
{cat:'system',cmd:'rm file.txt',desc:'Delete file'},
{cat:'system',cmd:'rm -rf folder',desc:'Delete folder ⚠️'},
{cat:'system',cmd:'mv old.txt new.txt',desc:'Rename file'},
{cat:'system',cmd:'cp a.txt b.txt',desc:'Copy file'},

// SEARCH
{cat:'system',cmd:'grep -r "text" .',desc:'Search text'},
{cat:'system',cmd:'find . -name "*.js"',desc:'Find JS files'},

// PROCESS
{cat:'process',cmd:'ps aux | grep node',desc:'Find process'},
{cat:'process',cmd:'kill -9 PID',desc:'Kill process'},

// NETWORK
{cat:'network',cmd:'ping google.com',desc:'Check internet'},
{cat:'network',cmd:'curl -I url',desc:'Check headers'},

// DEV
{cat:'dev',cmd:'npm run dev',desc:'Run dev server'},
{cat:'dev',cmd:'npx kill-port 3000',desc:'Kill port'},

]).as('terminal_pro_v4'),

categories(){
return [...new Set(this.scripts.map(s=>s.cat))]
},

filtered(cat){
return this.scripts.filter(s=>{
const q=this.search.toLowerCase()
return s.cat===cat &&
(
s.cmd.toLowerCase().includes(q) ||
s.desc.toLowerCase().includes(q)
) &&
(!this.showFav || s.fav)
})
},

execute(s){
const danger = s.cmd.includes('rm -rf') || s.cmd.includes('kill')

if(danger && !confirm('Dangerous command. Continue?')) return

navigator.clipboard.writeText(s.cmd)
this.toastMsg='Copied: '+s.cmd
this.toast=true
setTimeout(()=>this.toast=false,1500)
},

remove(i){
this.scripts.splice(i,1)
},

toggleFav(s){
s.fav=!s.fav
}

}
}
</script>

</body>
</html>
"""

filename = "terminal_pro.html"

try:
    print("📄 Generating HTML content...")
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"✅ File created successfully: {filename}")
    print(f"📍 Location: {os.getcwd()}/{filename}")
    print(f"⏱️ Completed at: {datetime.now().strftime('%H:%M:%S')}")

except Exception as e:
    print("❌ Error occurred:")
    print(e)
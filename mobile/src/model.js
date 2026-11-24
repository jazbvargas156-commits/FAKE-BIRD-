function timeline(posts){return posts.filter(p=>!p.parentId).sort((a,b)=>b.createdAt-a.createdAt||b.id.localeCompare(a.id));}
function replies(posts,id){return posts.filter(p=>p.parentId===id).sort((a,b)=>a.createdAt-b.createdAt||a.id.localeCompare(b.id));}
function profilePosts(posts,id,tab='posts'){return posts.filter(p=>p.authorId===id&&(tab==='replies'?!!p.parentId:tab==='media'?p.images.length>0:!p.parentId)).sort((a,b)=>b.createdAt-a.createdAt);}
function normalizeHandle(v){return String(v||'').trim().replace(/^@+/,'');}
function validateProfile(p,profiles){if(!p.name.trim())return 'Escribí un nombre.';if(!/^[a-zA-Z0-9_]{1,30}$/.test(normalizeHandle(p.handle)))return 'El usuario debe tener entre 1 y 30 letras, números o guiones bajos.';if(profiles.some(x=>x.id!==p.id&&x.handle.toLowerCase()===normalizeHandle(p.handle).toLowerCase()))return 'Ese usuario ya existe.';return '';}
function descendants(posts,id){let seen=new Set([id]),changed=true;while(changed){changed=false;for(const p of posts)if(p.parentId&&seen.has(p.parentId)&&!seen.has(p.id)){seen.add(p.id);changed=true;}}return [...seen];}
function dateLabel(p){return p.date||new Date(p.createdAt).toLocaleString('es-AR',{day:'numeric',month:'short',year:'2-digit',hour:'2-digit',minute:'2-digit'});}
module.exports={timeline,replies,profilePosts,normalizeHandle,validateProfile,descendants,dateLabel};

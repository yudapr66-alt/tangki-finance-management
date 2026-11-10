/** Cloudflare Pages Function: /api/teteh-sunda */
export async function onRequest({request,env}) {
 const headers={"Cache-Control":"no-store"};
 if(request.method!=="POST") return Response.json({success:false,error:"Gunakan metode POST."},{status:405,headers:{...headers,"Allow":"POST"}});
 let target; try{target=new URL(env.APPS_SCRIPT_URL||"");}catch(_){return Response.json({success:false,error:"APPS_SCRIPT_URL belum diatur."},{status:503,headers});}
 if(target.protocol!=="https:"||target.hostname!=="script.google.com"||!target.pathname.startsWith("/macros/s/")||!target.pathname.endsWith("/exec")) return Response.json({success:false,error:"APPS_SCRIPT_URL harus URL Web App berakhiran /exec."},{status:500,headers});
 let body;try{body=await request.json();}catch(_){return Response.json({success:false,error:"Body harus JSON."},{status:400,headers});}
 if(!body||typeof body!=="object"||Array.isArray(body)||!["getDashboard","saveDeposit","updateDeposit","deleteDeposit"].includes(body.action)) return Response.json({success:false,error:"Aksi API tidak valid."},{status:400,headers});
 try{const upstream=await fetch(target.toString(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body),redirect:"follow"});const raw=await upstream.text();let data;try{data=JSON.parse(raw);}catch(_){return Response.json({success:false,error:"Apps Script tidak mengembalikan JSON. Periksa deployment doPost."},{status:502,headers});}return Response.json(data,{status:upstream.ok?200:502,headers});}
 catch(e){return Response.json({success:false,error:"Gagal menghubungi Apps Script: "+(e?.message||"unknown error")},{status:502,headers});}
}
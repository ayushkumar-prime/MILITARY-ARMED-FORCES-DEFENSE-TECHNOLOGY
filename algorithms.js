export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function predict(t,s=20){return {x:t.x+t.vx*s,y:t.y+t.vy*s};}
export function assess(t){const d=Math.hypot(t.x-50,t.y-50),p=predict(t),f=Math.hypot(p.x-50,p.y-50);const score=Math.round(clamp((t.authorized?0:40)+(d<22?35:d<38?18:0)+(f<d?15:0)+(t.altitude<150?10:0),0,100));return {score,level:score>=70?'High':score>=40?'Watch':'Low',approaching:f<d};}
// Illustrative training rule only, not a validated clinical protocol.
export function triage(p){return p.spo2<90||p.heart>130?'Immediate':p.spo2<95||p.heart>110?'Priority':'Stable';}
export const edges=[['Aid post','Junction',4],['Junction','Clinic',5],['Aid post','Bridge',3],['Bridge','Clinic',3],['Junction','Landing zone',4],['Landing zone','Clinic',3]];
export function shortestRoute(blocked=[]){const nodes=[...new Set(edges.flatMap(e=>e.slice(0,2)))],dist=Object.fromEntries(nodes.map(n=>[n,Infinity])),prev={};dist['Aid post']=0;const pending=new Set(nodes);while(pending.size){const u=[...pending].sort((a,b)=>dist[a]-dist[b])[0];pending.delete(u);if(dist[u]===Infinity)break;for(const [a,b,w]of edges){if(blocked.includes(`${a}|${b}`))continue;const v=a===u?b:b===u?a:null;if(v&&pending.has(v)&&dist[u]+w<dist[v]){dist[v]=dist[u]+w;prev[v]=u;}}}if(!Number.isFinite(dist.Clinic))return {path:[],minutes:null};let path=['Clinic'];while(prev[path[0]])path.unshift(prev[path[0]]);return {path,minutes:dist.Clinic};}
export function changes(before,after,threshold=30){return before.flatMap((v,i)=>Math.abs(after[i]-v)>=threshold?[{cell:i+1,delta:after[i]-v}]:[]);}

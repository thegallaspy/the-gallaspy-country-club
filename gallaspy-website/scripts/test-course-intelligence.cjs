const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const courseId = '00000000-0000-0000-0000-000000000001';
const layoutId = '00000000-0000-0000-0000-000000000002';
let pilot = true;
const tables = {
  gallaspy_courses: [{id:courseId,name:'Sugar Creek',location_verified:false,latitude:33,longitude:-84}],
  gallaspy_course_layouts: [{id:layoutId,hole_count:18,verification_status:'in_review',verified_at:null}],
  gallaspy_course_tees: [{id:'tee',name:'Blue',total_yards:5400}],
  gallaspy_course_holes: Array.from({length:18},(_,i)=>({id:`h${i}`,hole_number:i+1,par:4,handicap_rank:i+1})),
  gallaspy_hole_tee_yardages: Array.from({length:18},(_,i)=>({hole_id:`h${i}`,tee_id:'tee',yards:300,verified_at:null})),
  gallaspy_course_tee_ratings: [{tee_id:'tee',rating_category:'M',course_rating:70,slope_rating:120}],
  gallaspy_course_map_features: [],
};
function query(table) {
  const rows=tables[table];
  assert.ok(rows,table);
  const chain={then(resolve){return Promise.resolve({data:rows,error:null}).then(resolve)},maybeSingle(){return Promise.resolve({data:rows[0],error:null})}};
  for(const m of ['select','eq','is','ilike','order','limit','in','not']) chain[m]=()=>chain;
  return chain;
}
const mocked={createClient:()=>({auth:{getUser:async token=>token==='valid'?{data:{user:{id:'user',email_confirmed_at:'yes'}}}:{data:{user:null},error:true}},from:query,rpc:async()=>({data:pilot,error:null})})};
const source=fs.readFileSync(path.join(__dirname,'../app/api/v1/courses/route.ts'),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const moduleExports={};
new Function('require','exports',compiled)(name=>{assert.equal(name,'@supabase/supabase-js');return mocked},moduleExports);
process.env.NEXT_PUBLIC_SUPABASE_URL='mock';process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY='mock';process.env.SUPABASE_SERVICE_ROLE_KEY='mock';
const route='https://example.test/api/v1/courses';
const req=(suffix,token='valid')=>new Request(route+suffix,{headers:{...(token?{Authorization:`Bearer ${token}`}:{}) ,Origin:'capacitor://localhost'}});
(async()=>{
  assert.equal((await moduleExports.GET(req('?q=Sugar',''))).status,401);
  assert.equal((await moduleExports.GET(req('?q=%25'))).status,400);
  assert.equal(moduleExports.OPTIONS(req('')).headers.get('access-control-allow-origin'),'capacitor://localhost');
  const search=await (await moduleExports.GET(req('?q=Sugar'))).json();
  assert.equal(search.courses[0].latitude,null);
  const detail=`?course_id=${courseId}&layout_id=${layoutId}`;
  const result=await (await moduleExports.GET(req(detail))).json();
  assert.equal(result.provisional,true);assert.equal(result.official_handicap_eligible,false);assert.equal(result.tees[0].complete,true);
  assert.equal(result.tees[0].holes.length,18);assert.equal(result.tees[0].holes[0].source,'in_review');
  pilot=false;
  assert.equal((await moduleExports.GET(req(detail))).status,409);
  console.log('Course intelligence contract tests passed (mock Supabase).');
})().catch(e=>{console.error(e);process.exitCode=1});

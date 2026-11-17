import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const noStore = {"Cache-Control":"private, no-store"};
async function proxy(request:NextRequest,context:{params:Promise<{endpoint:string[]}>}){
 const {endpoint}=await context.params;
 if (endpoint.length!==1 || !["posts","engagement"].includes(endpoint[0]))return NextResponse.json({success:false,error:"Unknown service."},{status:404,headers:noStore});
 const authorization=request.headers.get("authorization");
 if (!authorization?.startsWith("Bearer "))return NextResponse.json({success:false,error:"Sign in to My Gallaspy."},{status:401,headers:noStore});
 try{
   const origin="https://thegallaspy.com";
   const member=await fetch(`${origin}/api/mobile/membership`,{headers:{Authorization:authorization},cache:"no-store"});
   if(!member.ok)return NextResponse.json({success:false,error:"Unable to verify your club membership."},{status:member.status===401?401:503,headers:noStore});
   const data=await member.json();
   if(data?.membership?.is_official_member!==true)return NextResponse.json({success:false,error:"This community is available to active Gallaspy Golf Club members."},{status:403,headers:noStore});
   const endpointUrl=new URL(`${origin}/api/mobile/community/${endpoint[0]}`);
   endpointUrl.search=request.nextUrl.search;
   const body=request.method==="POST"?await request.text():undefined;
   if(body && body.length>25000)return NextResponse.json({success:false,error:"Post exceeds size limit."},{status:413,headers:noStore});
   const forwarded=await fetch(endpointUrl,{method:request.method,headers:{Authorization:authorization,...(body?{"Content-Type":"application/json"}:{})},body,cache:"no-store"});
   return new NextResponse(await forwarded.text(),{status:forwarded.status,headers:{...noStore,"Content-Type":"application/json"}});
 }catch{return NextResponse.json({success:false,error:"Community service temporarily unavailable."},{status:503,headers:noStore})}
}
export const GET=proxy;
export const POST=proxy;

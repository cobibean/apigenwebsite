import{R as e}from"./index-DZ_CqB28.js";import{A as q}from"./AppearStack-NKE9U34_.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./use-reduced-motion-CJ5gNEVb.js";import"./jsx-runtime-BjG_zV1W.js";const w=[{title:"Consistency",body:"Batch-to-batch quality and potency."},{title:"Compliance",body:"Licenses and GMP-ready processes."},{title:"Care",body:"Patient-first partnerships."}];function g({title:f="What sets us apart",features:b=w,columns:o=3,preview:h}){const v=o===2?"md:grid-cols-2":"md:grid-cols-3";return e.createElement("section",{"data-block":"FeatureGrid","data-variant":`cols-${o}`,className:"mx-auto w-full max-w-6xl px-4 py-12"},e.createElement("h2",{className:"mb-6 text-2xl font-semibold",style:{fontFamily:"var(--font-sans)"}},f),e.createElement(q,{preview:h,className:`grid grid-cols-1 gap-6 ${v}`},b.map((s,x)=>e.createElement("div",{key:x,className:"rounded-md border p-4 shadow-sm"},e.createElement("h3",{className:"text-lg font-medium"},s.title),s.body&&e.createElement("p",{className:"mt-1 text-[var(--secondary-foreground)]"},s.body)))))}g.__docgenInfo={description:"",methods:[],displayName:"FeatureGrid",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"What sets us apart"',computed:!1}},features:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ title: string; body?: string }",signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"body",value:{name:"string",required:!1}}]}}],raw:"Feature[]"},description:"",defaultValue:{value:`[
  { title: "Consistency", body: "Batch-to-batch quality and potency." },
  { title: "Compliance", body: "Licenses and GMP-ready processes." },
  { title: "Care", body: "Patient-first partnerships." },
]`,computed:!1}},columns:{required:!1,tsType:{name:"union",raw:"2 | 3",elements:[{name:"literal",value:"2"},{name:"literal",value:"3"}]},description:"",defaultValue:{value:"3",computed:!1}},preview:{required:!1,tsType:{name:"boolean"},description:""}}};const M={title:"Sections/FeatureGrid",component:g},a={args:{}},t={args:{columns:3}},r={args:{columns:2}};var n,i,l;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {}
}`,...(l=(i=a.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var c,d,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    columns: 3
  }
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,u,y;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    columns: 2
  }
}`,...(y=(u=r.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};const T=["Minimal","Typical","Max"];export{r as Max,a as Minimal,t as Typical,T as __namedExportsOrder,M as default};

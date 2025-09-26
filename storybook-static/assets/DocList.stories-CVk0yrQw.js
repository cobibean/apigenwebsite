import{R as e}from"./index-DZ_CqB28.js";import{A as D}from"./AppearStack-NKE9U34_.js";import{A as x}from"./AppLink-DAvihVk6.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./use-reduced-motion-CJ5gNEVb.js";import"./jsx-runtime-BjG_zV1W.js";const q=[{label:"COA template (PDF)",href:"/docs/coa.pdf"},{label:"Quality policy (PDF)",href:"/docs/quality.pdf"}];function f({title:y="Documents",items:b=q,preview:g}){return e.createElement("section",{"data-block":"DocList","data-variant":"list",className:"mx-auto w-full max-w-6xl px-4 py-12"},e.createElement("h2",{className:"mb-6 text-2xl font-semibold",style:{fontFamily:"var(--font-sans)"}},y),e.createElement(D,{preview:g,className:"space-y-4"},b.map((s,h)=>e.createElement(x,{key:h,href:s.href,className:"block rounded-md border p-4 hover:bg-[color:oklch(0.97_0_0)]",newTab:!0},s.label))))}f.__docgenInfo={description:"",methods:[],displayName:"DocList",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Documents"',computed:!1}},items:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ label: string; href: string }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"href",value:{name:"string",required:!0}}]}}],raw:"Doc[]"},description:"",defaultValue:{value:`[
  { label: "COA template (PDF)", href: "/docs/coa.pdf" },
  { label: "Quality policy (PDF)", href: "/docs/quality.pdf" },
]`,computed:!1}},preview:{required:!1,tsType:{name:"boolean"},description:""}}};const T={title:"Sections/DocList",component:f},a={args:{}},r={args:{}},t={args:{items:[{label:"COA template (PDF)",href:"/docs/coa.pdf"},{label:"Quality policy (PDF)",href:"/docs/quality.pdf"}]}};var o,l,c;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {}
}`,...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var n,i,p;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {}
}`,...(p=(i=r.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var m,d,u;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "COA template (PDF)",
      href: "/docs/coa.pdf"
    }, {
      label: "Quality policy (PDF)",
      href: "/docs/quality.pdf"
    }]
  }
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const _=["Minimal","Typical","Max"];export{t as Max,a as Minimal,r as Typical,_ as __namedExportsOrder,T as default};

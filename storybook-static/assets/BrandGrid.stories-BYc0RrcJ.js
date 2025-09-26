import{R as e}from"./index-DZ_CqB28.js";import{A as x}from"./AppearStack-zaQo9MrU.js";import{A as y}from"./AppImage-BQ8MBAeJ.js";import{A}from"./AppLink-BXHSu2sz.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./use-reduced-motion-CJ5gNEVb.js";import"./jsx-runtime-BjG_zV1W.js";const h=[{name:"Brand A",logo:"/vercel.svg"},{name:"Brand B",logo:"/next.svg"},{name:"Brand C",logo:"/window.svg"}];function u({title:f="Our brands",brands:v=h,preview:B}){return e.createElement("section",{"data-block":"BrandGrid","data-variant":"cards",className:"mx-auto w-full max-w-6xl px-4 py-12"},e.createElement("h2",{className:"mb-6 text-2xl font-semibold",style:{fontFamily:"var(--font-sans)"}},f),e.createElement(x,{preview:B,className:"grid grid-cols-1 gap-6 md:grid-cols-3"},v.map((a,w)=>e.createElement(A,{key:w,href:a.href||"/contact",className:"flex items-center gap-4 rounded-md border p-4 shadow-sm"},e.createElement(y,{src:a.logo,alt:a.name,width:80,height:24}),e.createElement("div",{className:"font-medium"},a.name)))))}u.__docgenInfo={description:"",methods:[],displayName:"BrandGrid",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Our brands"',computed:!1}},brands:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ name: string; logo: string; href?: string }",signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"logo",value:{name:"string",required:!0}},{key:"href",value:{name:"string",required:!1}}]}}],raw:"Brand[]"},description:"",defaultValue:{value:`[
  { name: "Brand A", logo: "/vercel.svg" },
  { name: "Brand B", logo: "/next.svg" },
  { name: "Brand C", logo: "/window.svg" },
]`,computed:!1}},preview:{required:!1,tsType:{name:"boolean"},description:""}}};const C={title:"Sections/BrandGrid",component:u},r={args:{}},n={args:{}},s={args:{brands:[{name:"Brand A",logo:"/vercel.svg"},{name:"Brand B",logo:"/next.svg"},{name:"Brand C",logo:"/window.svg"}]}};var o,t,m;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {}
}`,...(m=(t=r.parameters)==null?void 0:t.docs)==null?void 0:m.source}}};var d,l,i;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {}
}`,...(i=(l=n.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var c,g,p;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    brands: [{
      name: "Brand A",
      logo: "/vercel.svg"
    }, {
      name: "Brand B",
      logo: "/next.svg"
    }, {
      name: "Brand C",
      logo: "/window.svg"
    }]
  }
}`,...(p=(g=s.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};const G=["Minimal","Typical","Max"];export{s as Max,r as Minimal,n as Typical,G as __namedExportsOrder,C as default};

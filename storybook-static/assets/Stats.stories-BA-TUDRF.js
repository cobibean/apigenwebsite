import{R as e}from"./index-DZ_CqB28.js";import{A as x}from"./AppearStack-zaQo9MrU.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./use-reduced-motion-CJ5gNEVb.js";import"./jsx-runtime-BjG_zV1W.js";const S=[{label:"SKUs",value:"24"},{label:"Markets",value:"6"},{label:"COAs",value:"100%"}];function v({title:b="By the numbers",items:g=S,preview:f}){return e.createElement("section",{"data-block":"Stats","data-variant":"kpis",className:"mx-auto w-full max-w-6xl px-4 py-12"},e.createElement("h2",{className:"mb-6 text-2xl font-semibold",style:{fontFamily:"var(--font-sans)"}},b),e.createElement(x,{preview:f,className:"grid grid-cols-1 gap-6 md:grid-cols-3"},g.map((s,y)=>e.createElement("div",{key:y,className:"rounded-md border p-6 text-center"},e.createElement("div",{className:"text-3xl font-semibold"},s.value),e.createElement("div",{className:"mt-1 text-[var(--secondary-foreground)]"},s.label)))))}v.__docgenInfo={description:"",methods:[],displayName:"Stats",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"By the numbers"',computed:!1}},items:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ label: string; value: string }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],raw:"Stat[]"},description:"",defaultValue:{value:`[
  { label: "SKUs", value: "24" },
  { label: "Markets", value: "6" },
  { label: "COAs", value: "100%" },
]`,computed:!1}},preview:{required:!1,tsType:{name:"boolean"},description:""}}};const q={title:"Sections/Stats",component:v},a={args:{}},t={args:{}},r={args:{items:[{label:"SKUs",value:"24"},{label:"Markets",value:"6"},{label:"COAs",value:"100%"}]}};var l,n,o;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {}
}`,...(o=(n=a.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};var m,i,c;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {}
}`,...(c=(i=t.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var u,d,p;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "SKUs",
      value: "24"
    }, {
      label: "Markets",
      value: "6"
    }, {
      label: "COAs",
      value: "100%"
    }]
  }
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const w=["Minimal","Typical","Max"];export{r as Max,a as Minimal,t as Typical,w as __namedExportsOrder,q as default};

import{R as e}from"./index-DZ_CqB28.js";import{A as b}from"./AppLink-DAvihVk6.js";import"./_commonjsHelpers-Cpj98o6Y.js";const h=[{label:"Privacy",href:"/privacy"},{label:"Contact",href:"/contact"}];function f({copyright:g="© Apigen",links:y=h}){return e.createElement("footer",{"data-block":"Footer","data-variant":"default",className:"mx-auto w-full max-w-6xl px-4 py-12"},e.createElement("div",{className:"flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between"},e.createElement("div",{className:"text-sm text-[var(--secondary-foreground)]"},g),e.createElement("nav",{className:"flex gap-4"},y.map((s,v)=>e.createElement(b,{key:v,href:s.href,className:"text-sm hover:underline"},s.label)))))}f.__docgenInfo={description:"",methods:[],displayName:"Footer",props:{copyright:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"© Apigen"',computed:!1}},links:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ label: string; href: string }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"href",value:{name:"string",required:!0}}]}}],raw:"Link[]"},description:"",defaultValue:{value:`[
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
]`,computed:!1}}}};const E={title:"Sections/Footer",component:f},a={args:{}},r={args:{}},t={args:{links:[{label:"Privacy",href:"/privacy"},{label:"Contact",href:"/contact"}]}};var n,o,c;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {}
}`,...(c=(o=a.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var l,i,m;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {}
}`,...(m=(i=r.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var p,d,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    links: [{
      label: "Privacy",
      href: "/privacy"
    }, {
      label: "Contact",
      href: "/contact"
    }]
  }
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const N=["Minimal","Typical","Max"];export{t as Max,a as Minimal,r as Typical,N as __namedExportsOrder,E as default};

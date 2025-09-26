import{R as e}from"./index-DZ_CqB28.js";import{A as N}from"./AppearStack-zaQo9MrU.js";import{A as v}from"./AppLink-BXHSu2sz.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./use-reduced-motion-CJ5gNEVb.js";import"./jsx-runtime-BjG_zV1W.js";const x=[{title:"Launch update",date:"2025-09-01",href:"/news"},{title:"Quality milestone",date:"2025-08-15",href:"/news"}];function f({title:g="News",items:y=x,preview:h}){return e.createElement("section",{"data-block":"NewsList","data-variant":"list",className:"mx-auto w-full max-w-6xl px-4 py-12"},e.createElement("h2",{className:"mb-6 text-2xl font-semibold",style:{fontFamily:"var(--font-sans)"}},g),e.createElement(N,{preview:h,className:"space-y-4"},y.map((t,w)=>e.createElement(v,{key:w,href:t.href,className:"block rounded-md border p-4 hover:bg-[color:oklch(0.97_0_0)]"},e.createElement("div",{className:"font-medium"},t.title),t.date&&e.createElement("div",{className:"text-sm text-[var(--secondary-foreground)]"},t.date)))))}f.__docgenInfo={description:"",methods:[],displayName:"NewsList",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"News"',computed:!1}},items:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ title: string; date?: string; href: string }",signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"date",value:{name:"string",required:!1}},{key:"href",value:{name:"string",required:!0}}]}}],raw:"Post[]"},description:"",defaultValue:{value:`[
  { title: "Launch update", date: "2025-09-01", href: "/news" },
  { title: "Quality milestone", date: "2025-08-15", href: "/news" },
]`,computed:!1}},preview:{required:!1,tsType:{name:"boolean"},description:""}}};const A={title:"Sections/NewsList",component:f},a={args:{}},r={args:{}},s={args:{items:[{title:"Launch update",date:"2025-09-01",href:"/news"},{title:"Quality milestone",date:"2025-08-15",href:"/news"}]}};var n,i,o;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {}
}`,...(o=(i=a.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var l,m,c;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {}
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var d,u,p;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    items: [{
      title: "Launch update",
      date: "2025-09-01",
      href: "/news"
    }, {
      title: "Quality milestone",
      date: "2025-08-15",
      href: "/news"
    }]
  }
}`,...(p=(u=s.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const S=["Minimal","Typical","Max"];export{s as Max,a as Minimal,r as Typical,S as __namedExportsOrder,A as default};

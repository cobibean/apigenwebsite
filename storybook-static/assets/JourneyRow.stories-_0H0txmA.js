import{R as e}from"./index-DZ_CqB28.js";import{A as p}from"./Appear-BC7cbCTv.js";import{A as V}from"./AppearStack-NKE9U34_.js";import{A as f}from"./AppLink-DAvihVk6.js";import{A as z}from"./AppImage-o79bFoco.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./use-reduced-motion-CJ5gNEVb.js";import"./jsx-runtime-BjG_zV1W.js";const C="_card_1rzsa_1",S="_overlay_1rzsa_7",I="_media_1rzsa_37",M="_desc_1rzsa_44",i={card:C,overlay:S,media:I,desc:M},Q=[{title:"Cultivation",href:"/contact"},{title:"Processing",href:"/contact"},{title:"Quality",href:"/contact"},{title:"Export",href:"/contact"}];function T({eyebrow:k="Our Journey",title:N="From seed to shipment",copy:_="A consistent, compliant path to premium product.",items:q=Q,ctaLabel:J="Talk to sales",ctaHref:F="/contact",preview:u}){return e.createElement("section",{"data-block":"Journey","data-variant":"row-4",className:"mx-auto w-full max-w-6xl px-4 py-16"},e.createElement(p,{preview:u,className:"mb-8"},e.createElement("div",{className:"text-sm text-[var(--secondary-foreground)]"},k),e.createElement("h2",{className:"mt-2 text-3xl font-semibold tracking-tight",style:{fontFamily:"var(--font-sans)"}},N),e.createElement("p",{className:"mt-2 max-w-2xl text-[var(--secondary-foreground)]"},_)),e.createElement(V,{preview:u,className:"grid grid-cols-1 gap-4 md:grid-cols-4"},q.slice(0,4).map((r,d)=>e.createElement(f,{key:d,href:r.href||"/contact",className:`group relative block border ${i.card}`,"data-item-index":d+1,"aria-label":`${r.title} — Get in Touch`,onPointerEnter:o=>{const n=o.currentTarget,t=n.getBoundingClientRect(),a=o.clientX-t.left,s=o.clientY-t.top,O=a<t.width-a&&a<s&&a<t.height-s,R=t.width-a<a&&t.width-a<s&&t.width-a<t.height-s,L=s<a&&s<t.width-a&&s<t.height-s,P=O?"left":R?"right":L?"top":"bottom";n.setAttribute("data-dir",P),n.setAttribute("data-hovered","true")},onPointerLeave:o=>{o.currentTarget.setAttribute("data-hovered","false")},onFocus:o=>{const n=o.currentTarget;n.setAttribute("data-dir","bottom"),n.setAttribute("data-hovered","true")},onBlur:o=>{o.currentTarget.setAttribute("data-hovered","false")}},e.createElement("div",{className:i.media},r.imageUrl?e.createElement(z,{src:r.imageUrl,alt:r.imageAlt||r.title,sizes:"(min-width: 768px) 25vw, 100vw",fill:!0,className:"object-cover"}):e.createElement("div",{"aria-hidden":!0,className:"h-full w-full",style:{position:"absolute",inset:0,background:"linear-gradient(135deg, color-mix(in oklab, var(--accent) 40%, transparent), color-mix(in oklab, var(--primary) 70%, transparent))"}}),e.createElement("div",{className:`${i.overlay} fromBottom`}),e.createElement("div",{className:"absolute inset-x-0 bottom-0 p-4 text-white"},e.createElement("h3",{className:"text-lg font-medium"},r.title),r.description&&e.createElement("p",{className:`mt-1 text-sm opacity-90 ${i.desc}`},r.description)))))),e.createElement(p,{preview:u,className:"mt-8"},e.createElement(f,{href:F,className:"inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] shadow-sm transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"},J)))}T.__docgenInfo={description:"",methods:[],displayName:"JourneyRow",props:{eyebrow:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Our Journey"',computed:!1}},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"From seed to shipment"',computed:!1}},copy:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"A consistent, compliant path to premium product."',computed:!1}},items:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  title: string;
  description?: string;
  href?: string;
  imageUrl?: string;
  imageAlt?: string;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"description",value:{name:"string",required:!1}},{key:"href",value:{name:"string",required:!1}},{key:"imageUrl",value:{name:"string",required:!1}},{key:"imageAlt",value:{name:"string",required:!1}}]}}],raw:"JourneyItem[]"},description:"",defaultValue:{value:`[
  { title: "Cultivation", href: "/contact" },
  { title: "Processing", href: "/contact" },
  { title: "Quality", href: "/contact" },
  { title: "Export", href: "/contact" },
]`,computed:!1}},ctaLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Talk to sales"',computed:!1}},ctaHref:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"/contact"',computed:!1}},preview:{required:!1,tsType:{name:"boolean"},description:""}}};const D={title:"Sections/JourneyRow",component:T,parameters:{layout:"fullscreen"}},c={args:{}},l={args:{eyebrow:"Our Journey",title:"From seed to shipment",copy:"A consistent, compliant path to premium product."}},m={args:{eyebrow:"Our Journey",title:"From seed to shipment",copy:"A consistent, compliant path to premium product.",items:[{title:"Cultivation",href:"/contact"},{title:"Processing",href:"/contact"},{title:"Quality",href:"/contact"},{title:"Export",href:"/contact"}],ctaLabel:"Talk to sales",ctaHref:"/contact"}};var g,h,y;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {}
}`,...(y=(h=c.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var v,b,x;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    eyebrow: "Our Journey",
    title: "From seed to shipment",
    copy: "A consistent, compliant path to premium product."
  }
}`,...(x=(b=l.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var w,A,E;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    eyebrow: "Our Journey",
    title: "From seed to shipment",
    copy: "A consistent, compliant path to premium product.",
    items: [{
      title: "Cultivation",
      href: "/contact"
    }, {
      title: "Processing",
      href: "/contact"
    }, {
      title: "Quality",
      href: "/contact"
    }, {
      title: "Export",
      href: "/contact"
    }],
    ctaLabel: "Talk to sales",
    ctaHref: "/contact"
  }
}`,...(E=(A=m.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};const K=["Minimal","Typical","Max"];export{m as Max,c as Minimal,l as Typical,K as __namedExportsOrder,D as default};

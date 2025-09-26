import{R as e}from"./index-DZ_CqB28.js";import{A as i}from"./Appear-B8HiHtDJ.js";import{A as N}from"./AppearStack-zaQo9MrU.js";import{A as l}from"./AppLink-BXHSu2sz.js";import{A as T}from"./AppImage-BQ8MBAeJ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./use-reduced-motion-CJ5gNEVb.js";import"./jsx-runtime-BjG_zV1W.js";const q=[{title:"Cultivation",href:"/contact"},{title:"Processing",href:"/contact"},{title:"Quality",href:"/contact"},{title:"Export",href:"/contact"}];function v({eyebrow:b="Our Journey",title:x="From seed to shipment",copy:k="A consistent, compliant path to premium product.",items:w=q,ctaLabel:E="Talk to sales",ctaHref:A="/contact",preview:o}){return e.createElement("section",{"data-block":"Journey","data-variant":"row-4",className:"mx-auto w-full max-w-6xl px-4 py-16"},e.createElement(i,{as:"div",preview:o,className:"mb-8"},e.createElement("div",{className:"text-sm text-[var(--secondary-foreground)]"},b),e.createElement("h2",{className:"mt-2 text-3xl font-semibold tracking-tight",style:{fontFamily:"var(--font-sans)"}},x),e.createElement("p",{className:"mt-2 max-w-2xl text-[var(--secondary-foreground)]"},k)),e.createElement(N,{as:"div",preview:o,className:"grid grid-cols-1 gap-4 md:grid-cols-4"},w.slice(0,4).map((t,s)=>e.createElement(l,{key:s,href:t.href||"/contact",className:"group relative block overflow-hidden rounded-md border","data-item-index":s},e.createElement("div",{className:"relative w-full",style:{aspectRatio:"3 / 2"}},t.imageUrl?e.createElement(T,{src:t.imageUrl,alt:t.imageAlt||t.title,sizes:"(min-width: 768px) 25vw, 100vw",fill:!0,className:"object-cover"}):e.createElement("div",{"aria-hidden":!0,className:"h-full w-full",style:{position:"absolute",inset:0,background:"linear-gradient(135deg, color-mix(in oklab, var(--accent) 40%, transparent), color-mix(in oklab, var(--primary) 70%, transparent))"}}),e.createElement("div",{className:"pointer-events-none absolute inset-0",style:{background:"linear-gradient(to top, color-mix(in oklab, black 60%, transparent) 0%, transparent 60%)"}}),e.createElement("div",{className:"absolute inset-x-0 bottom-0 p-4 text-white"},e.createElement("h3",{className:"text-lg font-medium"},t.title),t.description&&e.createElement("p",{className:"mt-1 text-sm opacity-90"},t.description)))))),e.createElement(i,{as:"div",preview:o,className:"mt-8"},e.createElement(l,{href:A,className:"inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] shadow-sm transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"},E)))}v.__docgenInfo={description:"",methods:[],displayName:"JourneyRow",props:{eyebrow:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Our Journey"',computed:!1}},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"From seed to shipment"',computed:!1}},copy:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"A consistent, compliant path to premium product."',computed:!1}},items:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
]`,computed:!1}},ctaLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Talk to sales"',computed:!1}},ctaHref:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"/contact"',computed:!1}},preview:{required:!1,tsType:{name:"boolean"},description:""}}};const L={title:"Sections/JourneyRow",component:v,parameters:{layout:"fullscreen"}},a={args:{}},r={args:{eyebrow:"Our Journey",title:"From seed to shipment",copy:"A consistent, compliant path to premium product."}},n={args:{eyebrow:"Our Journey",title:"From seed to shipment",copy:"A consistent, compliant path to premium product.",items:[{title:"Cultivation",href:"/contact"},{title:"Processing",href:"/contact"},{title:"Quality",href:"/contact"},{title:"Export",href:"/contact"}],ctaLabel:"Talk to sales",ctaHref:"/contact"}};var c,m,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {}
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,d,f;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    eyebrow: "Our Journey",
    title: "From seed to shipment",
    copy: "A consistent, compliant path to premium product."
  }
}`,...(f=(d=r.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};var g,y,h;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(h=(y=n.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const M=["Minimal","Typical","Max"];export{n as Max,a as Minimal,r as Typical,M as __namedExportsOrder,L as default};

import{a as _e}from"./chunk-NFPOPPZN.js";import{Da as P,Ea as V,Fa as u,Ga as L,Ha as ve,Ia as ye,M as fe,N as _,P as z,Pa as be,Qa as xe,Sa as he,b as le,c as de,e as se,f as ce,g as pe,h as me,i as h,m as ue,o as ge}from"./chunk-4TTS27UV.js";import{Db as Z,Eb as m,Fb as N,Gb as A,Hb as ee,Jb as H,Ka as R,Kb as O,Ma as l,Ob as te,Pb as g,Qb as s,Rb as ie,Sb as f,Tb as F,Wb as j,Xb as ne,Yb as oe,Z as I,Za as y,_ as T,_a as B,_b as re,aa as S,bb as w,ca as p,cb as E,db as C,ha as G,ia as q,jb as M,kb as b,lb as x,nb as K,nc as ae,ob as J,pb as d,qb as o,rb as r,sb as c,ta as k,wb as W,xb as X,za as v,zb as Y}from"./chunk-UXH746Y7.js";var Ce=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`;var Fe=["icon"],je=["*"];function ze(e,n){if(e&1&&c(0,"span",4),e&2){let t=m(2);g(t.cx("icon")),d("ngClass",t.icon)("pBind",t.ptm("icon"))}}function Pe(e,n){if(e&1&&(W(0),C(1,ze,1,4,"span",3),X()),e&2){let t=m();l(),d("ngIf",t.icon)}}function Ve(e,n){}function Le(e,n){e&1&&C(0,Ve,0,0,"ng-template")}function Re(e,n){if(e&1&&(o(0,"span",2),C(1,Le,1,0,null,5),r()),e&2){let t=m();g(t.cx("icon")),d("pBind",t.ptm("icon")),l(),d("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)}}var He={root:({instance:e})=>["p-tag p-component",{"p-tag-info":e.severity==="info","p-tag-success":e.severity==="success","p-tag-warn":e.severity==="warn","p-tag-danger":e.severity==="danger","p-tag-secondary":e.severity==="secondary","p-tag-contrast":e.severity==="contrast","p-tag-rounded":e.rounded}],icon:"p-tag-icon",label:"p-tag-label"},De=(()=>{class e extends z{name="tag";style=Ce;classes=He;static \u0275fac=(()=>{let t;return function(i){return(t||(t=v(e)))(i||e)}})();static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})();var Ie=new S("TAG_INSTANCE"),Q=(()=>{class e extends V{componentName="Tag";$pcTag=p(Ie,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=p(u,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=p(De);onAfterContentInit(){this.templates?.forEach(t=>{t.getType()==="icon"&&(this._iconTemplate=t.template)})}get dataP(){return this.cn({rounded:this.rounded,[this.severity]:this.severity})}static \u0275fac=(()=>{let t;return function(i){return(t||(t=v(e)))(i||e)}})();static \u0275cmp=y({type:e,selectors:[["p-tag"]],contentQueries:function(a,i,U){if(a&1&&ee(U,Fe,4)(U,fe,4),a&2){let D;H(D=O())&&(i.iconTemplate=D.first),H(D=O())&&(i.templates=D)}},hostVars:3,hostBindings:function(a,i){a&2&&(M("data-p",i.dataP),g(i.cn(i.cx("root"),i.styleClass)))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",ae]},features:[F([De,{provide:Ie,useExisting:e},{provide:P,useExisting:e}]),w([u]),E],ngContentSelectors:je,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(a,i){a&1&&(N(),A(0),C(1,Pe,2,1,"ng-container",0)(2,Re,2,4,"span",1),o(3,"span",2),s(4),r()),a&2&&(l(),d("ngIf",!i.iconTemplate&&!i._iconTemplate),l(),d("ngIf",i.iconTemplate||i._iconTemplate),l(),g(i.cx("label")),d("pBind",i.ptm("label")),l(),ie(i.value))},dependencies:[h,le,de,se,_,u],encapsulation:2,changeDetection:0})}return e})(),Se=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=B({type:e});static \u0275inj=T({imports:[Q,_,_]})}return e})();var ke=`
    .p-divider-horizontal {
        display: flex;
        width: 100%;
        position: relative;
        align-items: center;
        margin: dt('divider.horizontal.margin');
        padding: dt('divider.horizontal.padding');
    }

    .p-divider-horizontal:before {
        position: absolute;
        display: block;
        inset-block-start: 50%;
        inset-inline-start: 0;
        width: 100%;
        content: '';
        border-block-start: 1px solid dt('divider.border.color');
    }

    .p-divider-horizontal .p-divider-content {
        padding: dt('divider.horizontal.content.padding');
    }

    .p-divider-vertical {
        min-height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        margin: dt('divider.vertical.margin');
        padding: dt('divider.vertical.padding');
    }

    .p-divider-vertical:before {
        position: absolute;
        display: block;
        inset-block-start: 0;
        inset-inline-start: 50%;
        height: 100%;
        content: '';
        border-inline-start: 1px solid dt('divider.border.color');
    }

    .p-divider.p-divider-vertical .p-divider-content {
        padding: dt('divider.vertical.content.padding');
    }

    .p-divider-content {
        z-index: 1;
        background: dt('divider.content.background');
        color: dt('divider.content.color');
    }

    .p-divider-solid.p-divider-horizontal:before {
        border-block-start-style: solid;
    }

    .p-divider-solid.p-divider-vertical:before {
        border-inline-start-style: solid;
    }

    .p-divider-dashed.p-divider-horizontal:before {
        border-block-start-style: dashed;
    }

    .p-divider-dashed.p-divider-vertical:before {
        border-inline-start-style: dashed;
    }

    .p-divider-dotted.p-divider-horizontal:before {
        border-block-start-style: dotted;
    }

    .p-divider-dotted.p-divider-vertical:before {
        border-inline-start-style: dotted;
    }

    .p-divider-left:dir(rtl),
    .p-divider-right:dir(rtl) {
        flex-direction: row-reverse;
    }
`;var Qe=["*"],$e={root:({instance:e})=>({justifyContent:e.layout==="horizontal"?e.align==="center"||e.align==null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align==null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null})},Ue={root:({instance:e})=>["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}],content:"p-divider-content"},Be=(()=>{class e extends z{name="divider";style=ke;classes=Ue;inlineStyles=$e;static \u0275fac=(()=>{let t;return function(i){return(t||(t=v(e)))(i||e)}})();static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})();var we=new S("DIVIDER_INSTANCE"),$=(()=>{class e extends V{componentName="Divider";$pcDivider=p(we,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=p(u,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=p(Be);get dataP(){return this.cn({[this.align]:this.align,[this.layout]:this.layout,[this.type]:this.type})}static \u0275fac=(()=>{let t;return function(i){return(t||(t=v(e)))(i||e)}})();static \u0275cmp=y({type:e,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:6,hostBindings:function(a,i){a&2&&(M("aria-orientation",i.layout)("data-p",i.dataP),te(i.sx("root")),g(i.cn(i.cx("root"),i.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[F([Be,{provide:we,useExisting:e},{provide:P,useExisting:e}]),w([u]),E],ngContentSelectors:Qe,decls:2,vars:3,consts:[[3,"pBind"]],template:function(a,i){a&1&&(N(),o(0,"div",0),A(1),r()),a&2&&(g(i.cx("content")),d("pBind",i.ptm("content")))},dependencies:[h,_,L,u],encapsulation:2,changeDetection:0})}return e})(),Ee=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=B({type:e});static \u0275inj=T({imports:[$,L,L]})}return e})();var qe=(e,n)=>n.key;function Ke(e,n){e&1&&(o(0,"div",1),c(1,"i",4),r())}function Je(e,n){if(e&1&&(c(0,"p-divider"),o(1,"div",19)(2,"label",10),s(3,"Note"),r(),o(4,"p",20),s(5),r()()),e&2){let t=m();l(5),f(' "',t.note,'" ')}}function We(e,n){if(e&1&&c(0,"img",15),e&2){let t=m();d("src",t.creditorAvatar,R)}}function Xe(e,n){e&1&&(o(0,"div",16),c(1,"i",21),r())}function Ye(e,n){if(e&1&&c(0,"img",15),e&2){let t=m().$implicit;d("src",t.value.avatar,R)}}function Ze(e,n){e&1&&(o(0,"div",16),c(1,"i",21),r())}function et(e,n){if(e&1&&(b(0,Ye,1,1,"img",15)(1,Ze,2,0,"div",16),o(2,"span",17),s(3),r()),e&2){let t=n.$implicit;x(t.value.avatar?0:1),l(3),f(" ",t.value.name||"Unknown Debtor"," ")}}function tt(e,n){if(e&1){let t=Y();o(0,"p-button",22),Z("click",function(){G(t);let i=m(2);return q(i.shareAgain())}),r(),c(1,"p-button",23)}if(e&2){let t=m();l(),d("disabled",t.status==="PAID")}}function it(e,n){if(e&1&&(o(0,"p-card",2)(1,"div",5)(2,"div",6),s(3),r(),o(4,"div")(5,"h1",7),s(6),r(),c(7,"p-tag",8),r()(),c(8,"p-divider"),o(9,"div",9)(10,"div")(11,"label",10),s(12,"Amount"),r(),o(13,"p",11),s(14),j(15,"currency"),r()(),o(16,"div")(17,"label",10),s(18,"Date"),r(),o(19,"p",12),s(20),j(21,"date"),r()()(),b(22,Je,6,1),c(23,"p-divider"),o(24,"div",13)(25,"h3",10),s(26," Creditor Info "),r(),o(27,"div",14),b(28,We,1,1,"img",15)(29,Xe,2,0,"div",16),o(30,"span",17),s(31),r()()(),o(32,"div",13)(33,"h3",10),s(34," Debtor Info "),r(),o(35,"div",14),K(36,et,4,2,null,null,qe),j(38,"keyvalue"),r()(),o(39,"div",18),b(40,tt,2,1),r()()),e&2){let t=n,a=m();l(3),f(" ",t.emoji," "),l(3),f(" ",t.name," "),l(),d("value",t.status)("severity",t.status==="PAID"?"success":"warn"),l(7),f(" ",re(15,10,t.amount,"THB","symbol","1.2-2")," "),l(6),f(" ",oe(21,15,t.date,"longDate")," "),l(2),x(t.note?22:-1),l(6),x(t.creditorAvatar?28:29),l(3),f(" ",t.creditorName||"Unknown Debtor"," "),l(5),J(ne(38,18,t.debtors)),l(4),x(a.isCreditor()?40:-1)}}function nt(e,n){e&1&&(o(0,"div",3),c(1,"i",24),o(2,"p",25),s(3,"Bill not found"),r(),c(4,"p-button",26),r()),e&2&&(l(4),d("text",!0))}var Me=class e{route=p(ue);ledgerService=p(_e);liffService=p(he);bill=k(null);isLoading=k(!0);isCreditor=k(!1);async ngOnInit(){let n=this.route.snapshot.paramMap.get("id");if(n)try{let t=await this.ledgerService.getBill(n);this.bill.set(t)}catch(t){console.error("Error fetching bill:",t)}this.isLoading.set(!1)}async ngAfterViewInit(){console.log("bill creditor id",this.bill()?.creditorId),console.log("liff user id",this.liffService.profile()?.userId),this.isCreditor.set(this.bill()?.creditorId===this.liffService.profile()?.userId);let n=this.route.snapshot.paramMap.get("id");console.log("bill detail id",n),n&&await this.ledgerService.addDebtorToBills(n)}async shareAgain(){let n=this.bill();n&&await this.liffService.shareToDebtor(n)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=y({type:e,selectors:[["app-bill-detail"]],decls:4,vars:1,consts:[[1,"p-4","max-w-2xl","mx-auto"],[1,"flex","justify-center","p-8"],["styleClass","overflow-hidden border-none shadow-xl rounded-2xl"],[1,"text-center","p-8","bg-white","dark:bg-slate-900","rounded-2xl","shadow-sm"],[1,"pi","pi-spin","pi-spinner","text-4xl","text-slate-400"],[1,"flex","items-center","gap-4","mb-6"],[1,"text-5xl","bg-slate-100","dark:bg-slate-800","p-4","rounded-2xl"],[1,"text-3xl","font-bold","text-slate-900","dark:text-white","mb-1"],[3,"value","severity"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-6","py-4"],[1,"text-sm","text-slate-500","uppercase","tracking-wider","font-semibold"],[1,"text-3xl","font-bold","text-orange-500","mt-1"],[1,"text-lg","text-slate-700","dark:text-slate-300","mt-1"],[1,"py-4","flex","flex-col","gap-4"],[1,"flex","items-center","gap-3"],["alt","avatar",1,"w-10","h-10","rounded-full",3,"src"],[1,"w-10","h-10","rounded-full","bg-slate-200","dark:bg-slate-700","flex","items-center","justify-center"],[1,"text-slate-900","dark:text-white","font-medium"],[1,"mt-8","flex","gap-3"],[1,"py-4"],[1,"text-slate-700","dark:text-slate-300","mt-2","p-4","bg-slate-50","dark:bg-slate-800/50","rounded-xl","italic"],[1,"pi","pi-user","text-slate-400"],["label","Share Again","icon","pi pi-share-alt","styleClass","w-full","severity","secondary",3,"click"],["label","Mark as Paid","icon","pi pi-check","styleClass","w-full","severity","success",3,"disabled"],[1,"pi","pi-exclamation-circle","text-4xl","text-slate-300","mb-4","block"],[1,"text-slate-500"],["label","Go Home","routerLink","/","styleClass","mt-4",3,"text"]],template:function(t,a){if(t&1&&(o(0,"div",0),b(1,Ke,2,0,"div",1)(2,it,41,20,"p-card",2)(3,nt,5,1,"div",3),r()),t&2){let i;l(),x(a.isLoading()?1:(i=a.bill())?2:3,i)}},dependencies:[h,ge,xe,be,ye,ve,Se,Q,Ee,$,me,ce,pe],encapsulation:2,changeDetection:0})};export{Me as BillDetailComponent};

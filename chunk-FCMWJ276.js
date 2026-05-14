import{a as he}from"./chunk-EJPQGU4S.js";import{a as Ce}from"./chunk-6K6IFGW5.js";import{$a as R,ab as H,b as le,bb as f,cb as U,d as de,db as ve,eb as ye,f as se,g as ce,h as pe,i as me,ia as fe,j as h,ja as D,la as L,n as ue,ob as xe,pb as be,q as ge,rb as _e}from"./chunk-TNKQDYZN.js";import{$b as ie,Db as ee,Eb as p,Fb as j,Gb as z,Hb as te,Jb as O,Ka as w,Kb as Q,Ma as l,Ob as ne,Pb as v,Qb as d,Rb as x,Sb as y,Wb as F,Z as T,Za as C,_ as B,_a as M,_b as V,aa as E,ac as oe,bb as N,ca as m,cb as P,cc as ae,db as k,ha as q,ia as K,jb as A,kb as u,lb as g,nb as J,ob as W,pb as c,qb as i,rb as o,sb as s,sc as re,ta as I,wb as X,xb as Y,za as _,zb as Z}from"./chunk-265UDBDZ.js";var De=`
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
`;var je=["icon"],ze=["*"];function Fe(e,a){if(e&1&&s(0,"span",4),e&2){let t=p(2);v(t.cx("icon")),c("ngClass",t.icon)("pBind",t.ptm("icon"))}}function Ve(e,a){if(e&1&&(X(0),k(1,Fe,1,4,"span",3),Y()),e&2){let t=p();l(),c("ngIf",t.icon)}}function Le(e,a){}function Re(e,a){e&1&&k(0,Le,0,0,"ng-template")}function He(e,a){if(e&1&&(i(0,"span",2),k(1,Re,1,0,null,5),o()),e&2){let t=p();v(t.cx("icon")),c("pBind",t.ptm("icon")),l(),c("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)}}var Ue={root:({instance:e})=>["p-tag p-component",{"p-tag-info":e.severity==="info","p-tag-success":e.severity==="success","p-tag-warn":e.severity==="warn","p-tag-danger":e.severity==="danger","p-tag-secondary":e.severity==="secondary","p-tag-contrast":e.severity==="contrast","p-tag-rounded":e.rounded}],icon:"p-tag-icon",label:"p-tag-label"},Ie=(()=>{class e extends L{name="tag";style=De;classes=Ue;static \u0275fac=(()=>{let t;return function(n){return(t||(t=_(e)))(n||e)}})();static \u0275prov=T({token:e,factory:e.\u0275fac})}return e})();var ke=new E("TAG_INSTANCE"),$=(()=>{class e extends H{componentName="Tag";$pcTag=m(ke,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=m(f,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=m(Ie);onAfterContentInit(){this.templates?.forEach(t=>{t.getType()==="icon"&&(this._iconTemplate=t.template)})}get dataP(){return this.cn({rounded:this.rounded,[this.severity]:this.severity})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=_(e)))(n||e)}})();static \u0275cmp=C({type:e,selectors:[["p-tag"]],contentQueries:function(r,n,b){if(r&1&&te(b,je,4)(b,fe,4),r&2){let S;O(S=Q())&&(n.iconTemplate=S.first),O(S=Q())&&(n.templates=S)}},hostVars:3,hostBindings:function(r,n){r&2&&(A("data-p",n.dataP),v(n.cn(n.cx("root"),n.styleClass)))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",re]},features:[F([Ie,{provide:ke,useExisting:e},{provide:R,useExisting:e}]),N([f]),P],ngContentSelectors:ze,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(r,n){r&1&&(j(),z(0),k(1,Ve,2,1,"ng-container",0)(2,He,2,4,"span",1),i(3,"span",2),d(4),o()),r&2&&(l(),c("ngIf",!n.iconTemplate&&!n._iconTemplate),l(),c("ngIf",n.iconTemplate||n._iconTemplate),l(),v(n.cx("label")),c("pBind",n.ptm("label")),l(),x(n.value))},dependencies:[h,le,de,se,D,f],encapsulation:2,changeDetection:0})}return e})(),Te=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=M({type:e});static \u0275inj=B({imports:[$,D,D]})}return e})();var Be=`
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
`;var Qe=["*"],$e={root:({instance:e})=>({justifyContent:e.layout==="horizontal"?e.align==="center"||e.align==null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align==null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null})},Ge={root:({instance:e})=>["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}],content:"p-divider-content"},Ee=(()=>{class e extends L{name="divider";style=Be;classes=Ge;inlineStyles=$e;static \u0275fac=(()=>{let t;return function(n){return(t||(t=_(e)))(n||e)}})();static \u0275prov=T({token:e,factory:e.\u0275fac})}return e})();var we=new E("DIVIDER_INSTANCE"),G=(()=>{class e extends H{componentName="Divider";$pcDivider=m(we,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=m(f,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=m(Ee);get dataP(){return this.cn({[this.align]:this.align,[this.layout]:this.layout,[this.type]:this.type})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=_(e)))(n||e)}})();static \u0275cmp=C({type:e,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:6,hostBindings:function(r,n){r&2&&(A("aria-orientation",n.layout)("data-p",n.dataP),ne(n.sx("root")),v(n.cn(n.cx("root"),n.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[F([Ee,{provide:we,useExisting:e},{provide:R,useExisting:e}]),N([f]),P],ngContentSelectors:Qe,decls:2,vars:3,consts:[[3,"pBind"]],template:function(r,n){r&1&&(j(),i(0,"div",0),z(1),o()),r&2&&(v(n.cx("content")),c("pBind",n.ptm("content")))},dependencies:[h,D,U,f],encapsulation:2,changeDetection:0})}return e})(),Me=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=M({type:e});static \u0275inj=B({imports:[G,U,U]})}return e})();var Ke=(e,a)=>a.key;function Je(e,a){e&1&&(i(0,"div",1),s(1,"i",4),o())}function We(e,a){if(e&1&&(s(0,"p-divider"),i(1,"div",19)(2,"label",10),d(3,"Note"),o(),i(4,"p",20),d(5),o()()),e&2){let t=p();l(5),y(' "',t.note,'" ')}}function Xe(e,a){if(e&1&&s(0,"img",15),e&2){let t=p();c("src",t.creditorAvatar,w)}}function Ye(e,a){e&1&&(i(0,"div",16),s(1,"i",21),o())}function Ze(e,a){if(e&1&&(i(0,"div",23)(1,"div",25),s(2,"img",26),i(3,"span",27),d(4,"PromptPay"),o()(),i(5,"span",28),d(6),o()()),e&2){let t=p();l(6),x(t.promptPay)}}function et(e,a){if(e&1&&(i(0,"span",34),d(1),o()),e&2){let t=p(2);l(),x(t.accountName)}}function tt(e,a){if(e&1&&(i(0,"div",24)(1,"span",29),d(2,"Bank Transfer"),o(),i(3,"div",30)(4,"div",25),s(5,"img",31),i(6,"span",32),d(7),o()(),i(8,"span",33),d(9),o()(),u(10,et,2,1,"span",34),o()),e&2){let t=p(),r=p(2);l(5),c("src",r.getBankLogo(t.bankName),w)("alt",t.bankName),l(2),x(t.bankName),l(2),x(t.accountNumber),l(),g(t.accountName?10:-1)}}function nt(e,a){if(e&1&&(s(0,"p-divider"),i(1,"div",13)(2,"h3",10),d(3," Payment Details "),o(),i(4,"div",22),u(5,Ze,7,1,"div",23),u(6,tt,11,5,"div",24),o()()),e&2){let t=a;l(5),g(t.promptPay?5:-1),l(),g(t.bankName?6:-1)}}function it(e,a){if(e&1&&s(0,"img",15),e&2){let t=p().$implicit;c("src",t.value.avatar,w)}}function ot(e,a){e&1&&(i(0,"div",16),s(1,"i",21),o())}function at(e,a){if(e&1&&(u(0,it,1,1,"img",15)(1,ot,2,0,"div",16),i(2,"span",17),d(3),o()),e&2){let t=a.$implicit;g(t.value.avatar?0:1),l(3),y(" ",t.value.name||"Unknown Debtor"," ")}}function rt(e,a){if(e&1){let t=Z();i(0,"p-button",35),ee("click",function(){q(t);let n=p(2);return K(n.shareAgain())}),o(),s(1,"p-button",36)}if(e&2){let t=p();l(),c("disabled",t.status==="PAID")}}function lt(e,a){if(e&1&&(i(0,"p-card",2)(1,"div",5)(2,"div",6),d(3),o(),i(4,"div")(5,"h1",7),d(6),o(),s(7,"p-tag",8),o()(),s(8,"p-divider"),i(9,"div",9)(10,"div")(11,"label",10),d(12,"Amount"),o(),i(13,"p",11),d(14),V(15,"currency"),o()(),i(16,"div")(17,"label",10),d(18,"Date"),o(),i(19,"p",12),d(20),V(21,"date"),o()()(),u(22,We,6,1),s(23,"p-divider"),i(24,"div",13)(25,"h3",10),d(26," Creditor Info "),o(),i(27,"div",14),u(28,Xe,1,1,"img",15)(29,Ye,2,0,"div",16),i(30,"span",17),d(31),o()()(),u(32,nt,7,2),i(33,"div",13)(34,"h3",10),d(35," Debtor Info "),o(),i(36,"div",14),J(37,at,4,2,null,null,Ke),V(39,"keyvalue"),o()(),i(40,"div",18),u(41,rt,2,1),o()()),e&2){let t,r,n=a,b=p();l(3),y(" ",n.emoji," "),l(3),y(" ",n.name," "),l(),c("value",n.status)("severity",n.status==="PAID"?"success":"warn"),l(7),y(" ",ae(15,11,n.amount,"THB","symbol","1.2-2")," "),l(6),y(" ",oe(21,16,n.date,"longDate")," "),l(2),g(n.note?22:-1),l(6),g(n.creditorAvatar?28:29),l(3),y(" ",n.creditorName||"Unknown Debtor"," "),l(),g((t=b.paymentInfo())?32:-1,t),l(5),W(ie(39,19,n.debtors)),l(4),g(((r=b.bill())==null?null:r.creditorId)===((r=b.userProfile())==null?null:r.userId)?41:-1)}}function dt(e,a){e&1&&(i(0,"div",3),s(1,"i",37),i(2,"p",38),d(3,"Bill not found"),o(),s(4,"p-button",39),o()),e&2&&(l(4),c("text",!0))}var Ne=class e{route=m(ue);ledgerService=m(Ce);liffService=m(_e);bill=I(null);paymentInfo=I(null);isLoading=I(!0);userProfile=I(null);async ngOnInit(){let a=this.route.snapshot.paramMap.get("id");if(a)try{let t=await this.ledgerService.getBill(a);if(this.bill.set(t),t?.creditorId){let r=await this.ledgerService.getPaymentInfo(t.creditorId);this.paymentInfo.set(r)}}catch(t){console.error("Error fetching bill:",t)}this.isLoading.set(!1)}async ngAfterViewInit(){this.userProfile.set(this.liffService.profile());let a=this.route.snapshot.paramMap.get("id");a&&await this.ledgerService.addDebtorToBills(a)}async shareAgain(){let a=this.bill();a&&await this.liffService.shareToDebtor(a)}getBankLogo(a){return he.find(t=>t.name===a)?.logo||""}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=C({type:e,selectors:[["app-bill-detail"]],decls:4,vars:1,consts:[[1,"p-4","max-w-2xl","mx-auto"],[1,"flex","justify-center","p-8"],["styleClass","overflow-hidden border-none shadow-xl rounded-2xl"],[1,"text-center","p-8","bg-white","dark:bg-slate-900","rounded-2xl","shadow-sm"],[1,"pi","pi-spin","pi-spinner","text-4xl","text-slate-400"],[1,"flex","items-center","gap-4","mb-6"],[1,"text-5xl","bg-slate-100","dark:bg-slate-800","p-4","rounded-2xl"],[1,"text-3xl","font-bold","text-slate-900","dark:text-white","mb-1"],[3,"value","severity"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-6","py-4"],[1,"text-sm","text-slate-500","uppercase","tracking-wider","font-semibold"],[1,"text-3xl","font-bold","text-orange-500","mt-1"],[1,"text-lg","text-slate-700","dark:text-slate-300","mt-1"],[1,"py-4","flex","flex-col","gap-4"],[1,"flex","items-center","gap-3"],["alt","avatar",1,"w-10","h-10","rounded-full",3,"src"],[1,"w-10","h-10","rounded-full","bg-slate-200","dark:bg-slate-700","flex","items-center","justify-center"],[1,"text-slate-900","dark:text-white","font-medium"],[1,"mt-8","flex","gap-3"],[1,"py-4"],[1,"text-slate-700","dark:text-slate-300","mt-2","p-4","bg-slate-50","dark:bg-slate-800/50","rounded-xl","italic"],[1,"pi","pi-user","text-slate-400"],[1,"bg-orange-50","dark:bg-orange-900/20","p-4","rounded-2xl","border","border-orange-100","dark:border-orange-800/30","flex","flex-col","gap-3"],[1,"flex","items-center","justify-between"],[1,"flex","flex-col","gap-1"],[1,"flex","items-center","gap-2"],["src","https://raw.githubusercontent.com/casperstack/thai-banks-logo/master/icons/PromptPay.png","alt","PromptPay",1,"h-4","object-contain"],[1,"text-sm","text-slate-500","dark:text-slate-400"],[1,"font-bold","text-slate-800","dark:text-slate-100"],[1,"text-xs","text-slate-500","dark:text-slate-400"],[1,"flex","items-center","justify-between","mt-1"],[1,"w-6","h-6","rounded-md","shadow-sm",3,"src","alt"],[1,"font-bold","text-slate-800","dark:text-slate-100","text-sm"],[1,"text-slate-700","dark:text-slate-200","font-bold"],[1,"text-xs","text-slate-500","dark:text-slate-400","mt-1","italic"],["label","Share Again","icon","pi pi-share-alt","styleClass","w-full","severity","secondary",3,"click"],["label","Mark as Paid","icon","pi pi-check","styleClass","w-full","severity","success",3,"disabled"],[1,"pi","pi-exclamation-circle","text-4xl","text-slate-300","mb-4","block"],[1,"text-slate-500"],["label","Go Home","routerLink","/","styleClass","mt-4",3,"text"]],template:function(t,r){if(t&1&&(i(0,"div",0),u(1,Je,2,0,"div",1)(2,lt,42,21,"p-card",2)(3,dt,5,1,"div",3),o()),t&2){let n;l(),g(r.isLoading()?1:(n=r.bill())?2:3,n)}},dependencies:[h,ge,be,xe,ye,ve,Te,$,Me,G,me,ce,pe],encapsulation:2,changeDetection:0})};export{Ne as BillDetailComponent};

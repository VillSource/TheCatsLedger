import{a as ue}from"./chunk-EJPQGU4S.js";import{a as ce,b as me}from"./chunk-JALIUZXJ.js";import{a as ae,b as de}from"./chunk-6OAV2BUW.js";import{a as pe}from"./chunk-OA6W2NRD.js";import{$a as te,ab as ie,bb as y,cb as S,db as ne,eb as oe,g as W,h as J,i as Q,j as D,ja as Z,la as ee,n as X,ob as le,pb as re,q as Y,rb as se}from"./chunk-PEBHIOBZ.js";import{$b as K,Db as E,Eb as p,Fb as H,Gb as R,Ka as _,Ma as r,Ob as $,Pb as P,Qb as a,Rb as b,Sb as v,Wb as O,Z as M,Za as C,_ as N,_a as j,_b as h,aa as A,ac as q,bb as z,bc as G,ca as f,cb as F,ha as k,ia as I,jb as L,kb as c,lb as m,nb as V,ob as U,pb as u,qb as n,rb as o,sb as s,ta as x,za as B,zb as w}from"./chunk-NWP5RRZL.js";var fe=`
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
`;var _e=["*"],Ce={root:({instance:e})=>({justifyContent:e.layout==="horizontal"?e.align==="center"||e.align==null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align==null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null})},he={root:({instance:e})=>["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}],content:"p-divider-content"},ve=(()=>{class e extends ee{name="divider";style=fe;classes=he;inlineStyles=Ce;static \u0275fac=(()=>{let t;return function(l){return(t||(t=B(e)))(l||e)}})();static \u0275prov=M({token:e,factory:e.\u0275fac})}return e})();var ge=new A("DIVIDER_INSTANCE"),T=(()=>{class e extends ie{componentName="Divider";$pcDivider=f(ge,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=f(y,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=f(ve);get dataP(){return this.cn({[this.align]:this.align,[this.layout]:this.layout,[this.type]:this.type})}static \u0275fac=(()=>{let t;return function(l){return(t||(t=B(e)))(l||e)}})();static \u0275cmp=C({type:e,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:6,hostBindings:function(d,l){d&2&&(L("aria-orientation",l.layout)("data-p",l.dataP),$(l.sx("root")),P(l.cn(l.cx("root"),l.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[O([ve,{provide:ge,useExisting:e},{provide:te,useExisting:e}]),z([y]),F],ngContentSelectors:_e,decls:2,vars:3,consts:[[3,"pBind"]],template:function(d,l){d&1&&(H(),n(0,"div",0),R(1),o()),d&2&&(P(l.cx("content")),u("pBind",l.ptm("content")))},dependencies:[D,Z,S,y],encapsulation:2,changeDetection:0})}return e})(),xe=(()=>{class e{static \u0275fac=function(d){return new(d||e)};static \u0275mod=j({type:e});static \u0275inj=N({imports:[T,S,S]})}return e})();var Se=(e,i)=>i.key;function ke(e,i){e&1&&(n(0,"div",1),s(1,"p-progressSpinner",3),n(2,"p",4),a(3,"Fetching details..."),o()())}function Ie(e,i){if(e&1&&(s(0,"p-divider"),n(1,"div",25)(2,"label",11),a(3,"Note"),o(),n(4,"p",26),a(5),o()()),e&2){let t=p();r(5),v(' "',t.note,'" ')}}function Be(e,i){if(e&1&&s(0,"img",16),e&2){let t=p();u("src",t.creditorAvatar,_)}}function we(e,i){e&1&&(n(0,"div",17),s(1,"i",27),o())}function Ee(e,i){if(e&1&&(n(0,"div",29)(1,"div",31),s(2,"img",32),n(3,"span",33),a(4,"PromptPay"),o()(),n(5,"span",34),a(6),o()()),e&2){let t=p();r(6),b(t.promptPay)}}function Pe(e,i){if(e&1&&(n(0,"span",40),a(1),o()),e&2){let t=p(2);r(),b(t.accountName)}}function Te(e,i){if(e&1&&(n(0,"div",30)(1,"span",35),a(2,"Bank Transfer"),o(),n(3,"div",36)(4,"div",31),s(5,"img",37),n(6,"span",38),a(7),o()(),n(8,"span",39),a(9),o()(),c(10,Pe,2,1,"span",40),o()),e&2){let t=p(),d=p(2);r(5),u("src",d.getBankLogo(t.bankName),_)("alt",t.bankName),r(2),b(t.bankName),r(2),b(t.accountNumber),r(),m(t.accountName?10:-1)}}function Me(e,i){if(e&1&&(s(0,"p-divider"),n(1,"div",14)(2,"h3",11),a(3," Payment Details "),o(),n(4,"div",28),c(5,Ee,7,1,"div",29),c(6,Te,11,5,"div",30),o()()),e&2){let t=i;r(5),m(t.promptPay?5:-1),r(),m(t.bankName?6:-1)}}function Ne(e,i){if(e&1&&s(0,"img",16),e&2){let t=p().$implicit;u("src",t.value.avatar,_)}}function Ae(e,i){e&1&&(n(0,"div",17),s(1,"i",27),o())}function je(e,i){if(e&1&&(c(0,Ne,1,1,"img",16)(1,Ae,2,0,"div",17),n(2,"span",18),a(3),o()),e&2){let t=i.$implicit;m(t.value.avatar?0:1),r(3),v(" ",t.value.name||"Unknown Debtor"," ")}}function ze(e,i){if(e&1){let t=w();n(0,"p-button",41),E("click",function(){k(t);let l=p(2);return I(l.shareAgain())}),o(),s(1,"p-button",42)}if(e&2){let t=p();r(),u("disabled",t.status==="PAID")}}function Fe(e,i){if(e&1){let t=w();n(0,"p-button",43),E("click",function(){k(t);let l=p(2);return I(l.notifyPaid())}),o()}if(e&2){let t=p();u("disabled",t.status==="PAID")}}function Le(e,i){if(e&1&&(n(0,"p-card",5)(1,"div",6)(2,"div",7),a(3),o(),n(4,"div")(5,"h1",8),a(6),o(),s(7,"p-tag",9),o()(),s(8,"p-divider"),n(9,"div",10)(10,"div")(11,"label",11),a(12,"Amount"),o(),n(13,"p",12),a(14),h(15,"currency"),o()(),n(16,"div")(17,"label",11),a(18,"Date"),o(),n(19,"p",13),a(20),h(21,"date"),o()()(),c(22,Ie,6,1),s(23,"p-divider"),n(24,"div",14)(25,"h3",11),a(26," Creditor Info "),o(),n(27,"div",15),c(28,Be,1,1,"img",16)(29,we,2,0,"div",17),n(30,"span",18),a(31),o()()(),c(32,Me,7,2),n(33,"div",14)(34,"h3",11),a(35," Debtor Info "),o(),n(36,"div",15),V(37,je,4,2,null,null,Se),h(39,"keyvalue"),o()(),n(40,"div",19),c(41,ze,2,1)(42,Fe,1,1,"p-button",20),o()(),n(43,"div",21)(44,"a",22),a(45," My Ledger "),o(),n(46,"span",23),a(47,"|"),o(),n(48,"a",24),a(49," Bills to Pay "),o()()),e&2){let t,d,l=i,g=p();r(3),v(" ",l.emoji," "),r(3),v(" ",l.name," "),r(),u("value",l.status)("severity",l.status==="PAID"?"success":"warn"),r(7),v(" ",G(15,11,l.amount,"THB","symbol","1.2-2")," "),r(6),v(" ",q(21,16,l.date,"longDate")," "),r(2),m(l.note?22:-1),r(6),m(l.creditorAvatar?28:29),r(3),v(" ",l.creditorName||"Unknown Debtor"," "),r(),m((t=g.paymentInfo())?32:-1,t),r(5),U(K(39,19,l.debtors)),r(4),m(((d=g.bill())==null?null:d.creditorId)===((d=g.userProfile())==null?null:d.userId)?41:g.isDebtor()&&g.isInChat()?42:-1)}}function Ve(e,i){e&1&&(n(0,"div",2),s(1,"i",44),n(2,"p",45),a(3,"Bill not found"),o(),s(4,"p-button",46),o()),e&2&&(r(4),u("text",!0))}var be=class e{route=f(X);ledgerService=f(pe);liffService=f(se);bill=x(null);paymentInfo=x(null);isLoading=x(!0);userProfile=x(null);async ngOnInit(){let i=this.route.snapshot.paramMap.get("id");if(i)try{let t=await this.ledgerService.getBill(i);if(this.bill.set(t),t?.creditorId){let d=await this.ledgerService.getPaymentInfo(t.creditorId);this.paymentInfo.set(d)}}catch(t){console.error("Error fetching bill:",t)}this.isLoading.set(!1)}async ngAfterViewInit(){this.userProfile.set(this.liffService.profile());let i=this.route.snapshot.paramMap.get("id");i&&await this.ledgerService.addDebtorToBills(i)}async shareAgain(){let i=this.bill();i&&await this.liffService.shareToDebtor(i)}getBankLogo(i){return ue.find(t=>t.name===i)?.logo||""}isDebtor(){let i=this.userProfile(),t=this.bill();return!i||!t||!t.debtors?!1:!!t.debtors[i.userId]}isInChat(){let i=this.liffService.getContext();return!!i&&["utou","room","group","square_chat"].includes(i.type)}async notifyPaid(){let i=this.bill();if(!i)return;let t=await this.liffService.sendPaymentNotification(i)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=C({type:e,selectors:[["app-bill-detail"]],decls:4,vars:1,consts:[[1,"p-4","pb-8","max-w-2xl","mx-auto"],[1,"flex","flex-col","items-center","justify-center","p-12"],[1,"text-center","p-8","bg-white","dark:bg-slate-900","rounded-2xl","shadow-sm"],["styleClass","w-12 h-12","strokeWidth","4"],[1,"text-slate-500","mt-4","font-medium","animate-pulse"],["styleClass","overflow-hidden border-none shadow-xl rounded-2xl"],[1,"flex","items-center","gap-4","mb-6"],[1,"text-5xl","bg-slate-100","dark:bg-slate-800","p-4","rounded-2xl"],[1,"text-3xl","font-bold","text-slate-900","dark:text-white","mb-1"],[3,"value","severity"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-6","py-4"],[1,"text-sm","text-slate-500","uppercase","tracking-wider","font-semibold"],[1,"text-3xl","font-bold","text-orange-500","mt-1"],[1,"text-lg","text-slate-700","dark:text-slate-300","mt-1"],[1,"py-4","flex","flex-col","gap-4"],[1,"flex","items-center","gap-3"],["alt","avatar",1,"w-10","h-10","rounded-full",3,"src"],[1,"w-10","h-10","rounded-full","bg-slate-200","dark:bg-slate-700","flex","items-center","justify-center"],[1,"text-slate-900","dark:text-white","font-medium"],[1,"mt-8","flex","gap-3"],["label","Notify Creditor","icon","pi pi-bell","styleClass","w-full rounded-xl! font-bold bg-green-500! border-green-500! hover:bg-green-600! hover:border-green-600!",3,"disabled"],[1,"mt-4","flex","justify-center","items-center","gap-3"],["routerLink","/",1,"text-[10px]","text-slate-400","hover:text-orange-500","transition-colors","uppercase","font-bold","tracking-widest"],[1,"text-slate-300","dark:text-slate-700"],["routerLink","/bills-to-pay",1,"text-[10px]","text-slate-400","hover:text-orange-500","transition-colors","uppercase","font-bold","tracking-widest"],[1,"py-4"],[1,"text-slate-700","dark:text-slate-300","mt-2","p-4","bg-slate-50","dark:bg-slate-800/50","rounded-xl","italic"],[1,"pi","pi-user","text-slate-400"],[1,"bg-orange-50","dark:bg-orange-900/20","p-4","rounded-2xl","border","border-orange-100","dark:border-orange-800/30","flex","flex-col","gap-3"],[1,"flex","items-center","justify-between"],[1,"flex","flex-col","gap-1"],[1,"flex","items-center","gap-2"],["src","https://raw.githubusercontent.com/casperstack/thai-banks-logo/master/icons/PromptPay.png","alt","PromptPay",1,"h-4","object-contain"],[1,"text-sm","text-slate-500","dark:text-slate-400"],[1,"font-bold","text-slate-800","dark:text-slate-100"],[1,"text-xs","text-slate-500","dark:text-slate-400"],[1,"flex","items-center","justify-between","mt-1"],[1,"w-6","h-6","rounded-md","shadow-sm",3,"src","alt"],[1,"font-bold","text-slate-800","dark:text-slate-100","text-sm"],[1,"text-slate-700","dark:text-slate-200","font-bold"],[1,"text-xs","text-slate-500","dark:text-slate-400","mt-1","italic"],["label","Share Again","icon","pi pi-share-alt","styleClass","w-full rounded-xl! font-semibold","severity","secondary",3,"click"],["label","Mark as Paid","icon","pi pi-check","styleClass","w-full rounded-xl! font-bold bg-orange-500! border-orange-500! hover:bg-orange-600! hover:border-orange-600!",3,"disabled"],["label","Notify Creditor","icon","pi pi-bell","styleClass","w-full rounded-xl! font-bold bg-green-500! border-green-500! hover:bg-green-600! hover:border-green-600!",3,"click","disabled"],[1,"pi","pi-exclamation-circle","text-4xl","text-slate-300","mb-4","block"],[1,"text-slate-500"],["label","Go Home","routerLink","/","styleClass","mt-4",3,"text"]],template:function(t,d){if(t&1&&(n(0,"div",0),c(1,ke,4,0,"div",1)(2,Le,50,21)(3,Ve,5,1,"div",2),o()),t&2){let l;r(),m(d.isLoading()?1:(l=d.bill())?2:3,l)}},dependencies:[D,Y,re,le,oe,ne,me,ce,xe,T,de,ae,Q,W,J],encapsulation:2,changeDetection:0})};export{be as BillDetailComponent};

import{a as me}from"./chunk-EJPQGU4S.js";import{a as se,b as pe}from"./chunk-KRYSQAEE.js";import{a as de}from"./chunk-AD6JUGUX.js";import{$a as te,ab as ie,bb as b,cb as D,db as ne,eb as oe,g as J,h as Q,i as W,j as h,ja as Z,la as ee,n as X,ob as ae,pb as le,q as Y,rb as re}from"./chunk-TNKQDYZN.js";import{$b as K,Db as U,Eb as p,Fb as H,Gb as R,Ka as y,Ma as l,Ob as $,Pb as I,Qb as r,Rb as g,Sb as v,Wb as O,Z as E,Za as _,_ as w,_a as N,_b as C,aa as P,ac as G,bb as A,ca as f,cb as j,cc as q,ha as M,ia as T,jb as z,kb as m,lb as c,nb as L,ob as F,pb as u,qb as i,rb as n,sb as s,ta as x,za as k,zb as V}from"./chunk-265UDBDZ.js";var ce=`
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
`;var be=["*"],ye={root:({instance:e})=>({justifyContent:e.layout==="horizontal"?e.align==="center"||e.align==null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align==null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null})},_e={root:({instance:e})=>["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}],content:"p-divider-content"},ue=(()=>{class e extends ee{name="divider";style=ce;classes=_e;inlineStyles=ye;static \u0275fac=(()=>{let t;return function(a){return(t||(t=k(e)))(a||e)}})();static \u0275prov=E({token:e,factory:e.\u0275fac})}return e})();var fe=new P("DIVIDER_INSTANCE"),B=(()=>{class e extends ie{componentName="Divider";$pcDivider=f(fe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=f(b,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=f(ue);get dataP(){return this.cn({[this.align]:this.align,[this.layout]:this.layout,[this.type]:this.type})}static \u0275fac=(()=>{let t;return function(a){return(t||(t=k(e)))(a||e)}})();static \u0275cmp=_({type:e,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:6,hostBindings:function(d,a){d&2&&(z("aria-orientation",a.layout)("data-p",a.dataP),$(a.sx("root")),I(a.cn(a.cx("root"),a.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[O([ue,{provide:fe,useExisting:e},{provide:te,useExisting:e}]),A([b]),j],ngContentSelectors:be,decls:2,vars:3,consts:[[3,"pBind"]],template:function(d,a){d&1&&(H(),i(0,"div",0),R(1),n()),d&2&&(I(a.cx("content")),u("pBind",a.ptm("content")))},dependencies:[h,Z,D,b],encapsulation:2,changeDetection:0})}return e})(),ve=(()=>{class e{static \u0275fac=function(d){return new(d||e)};static \u0275mod=N({type:e});static \u0275inj=w({imports:[B,D,D]})}return e})();var he=(e,o)=>o.key;function De(e,o){e&1&&(i(0,"div",1),s(1,"i",3),n())}function Se(e,o){if(e&1&&(s(0,"p-divider"),i(1,"div",23)(2,"label",10),r(3,"Note"),n(),i(4,"p",24),r(5),n()()),e&2){let t=p();l(5),v(' "',t.note,'" ')}}function ke(e,o){if(e&1&&s(0,"img",15),e&2){let t=p();u("src",t.creditorAvatar,y)}}function Ie(e,o){e&1&&(i(0,"div",16),s(1,"i",25),n())}function Be(e,o){if(e&1&&(i(0,"div",27)(1,"div",29),s(2,"img",30),i(3,"span",31),r(4,"PromptPay"),n()(),i(5,"span",32),r(6),n()()),e&2){let t=p();l(6),g(t.promptPay)}}function Ee(e,o){if(e&1&&(i(0,"span",38),r(1),n()),e&2){let t=p(2);l(),g(t.accountName)}}function we(e,o){if(e&1&&(i(0,"div",28)(1,"span",33),r(2,"Bank Transfer"),n(),i(3,"div",34)(4,"div",29),s(5,"img",35),i(6,"span",36),r(7),n()(),i(8,"span",37),r(9),n()(),m(10,Ee,2,1,"span",38),n()),e&2){let t=p(),d=p(2);l(5),u("src",d.getBankLogo(t.bankName),y)("alt",t.bankName),l(2),g(t.bankName),l(2),g(t.accountNumber),l(),c(t.accountName?10:-1)}}function Pe(e,o){if(e&1&&(s(0,"p-divider"),i(1,"div",13)(2,"h3",10),r(3," Payment Details "),n(),i(4,"div",26),m(5,Be,7,1,"div",27),m(6,we,11,5,"div",28),n()()),e&2){let t=o;l(5),c(t.promptPay?5:-1),l(),c(t.bankName?6:-1)}}function Me(e,o){if(e&1&&s(0,"img",15),e&2){let t=p().$implicit;u("src",t.value.avatar,y)}}function Te(e,o){e&1&&(i(0,"div",16),s(1,"i",25),n())}function Ne(e,o){if(e&1&&(m(0,Me,1,1,"img",15)(1,Te,2,0,"div",16),i(2,"span",17),r(3),n()),e&2){let t=o.$implicit;c(t.value.avatar?0:1),l(3),v(" ",t.value.name||"Unknown Debtor"," ")}}function Ae(e,o){if(e&1){let t=V();i(0,"p-button",39),U("click",function(){M(t);let a=p(2);return T(a.shareAgain())}),n(),s(1,"p-button",40)}if(e&2){let t=p();l(),u("disabled",t.status==="PAID")}}function je(e,o){if(e&1&&(i(0,"p-card",4)(1,"div",5)(2,"div",6),r(3),n(),i(4,"div")(5,"h1",7),r(6),n(),s(7,"p-tag",8),n()(),s(8,"p-divider"),i(9,"div",9)(10,"div")(11,"label",10),r(12,"Amount"),n(),i(13,"p",11),r(14),C(15,"currency"),n()(),i(16,"div")(17,"label",10),r(18,"Date"),n(),i(19,"p",12),r(20),C(21,"date"),n()()(),m(22,Se,6,1),s(23,"p-divider"),i(24,"div",13)(25,"h3",10),r(26," Creditor Info "),n(),i(27,"div",14),m(28,ke,1,1,"img",15)(29,Ie,2,0,"div",16),i(30,"span",17),r(31),n()()(),m(32,Pe,7,2),i(33,"div",13)(34,"h3",10),r(35," Debtor Info "),n(),i(36,"div",14),L(37,Ne,4,2,null,null,he),C(39,"keyvalue"),n()(),i(40,"div",18),m(41,Ae,2,1),n()(),i(42,"div",19)(43,"a",20),r(44," My Ledger "),n(),i(45,"span",21),r(46,"|"),n(),i(47,"a",22),r(48," Bills to Pay "),n()()),e&2){let t,d,a=o,S=p();l(3),v(" ",a.emoji," "),l(3),v(" ",a.name," "),l(),u("value",a.status)("severity",a.status==="PAID"?"success":"warn"),l(7),v(" ",q(15,11,a.amount,"THB","symbol","1.2-2")," "),l(6),v(" ",G(21,16,a.date,"longDate")," "),l(2),c(a.note?22:-1),l(6),c(a.creditorAvatar?28:29),l(3),v(" ",a.creditorName||"Unknown Debtor"," "),l(),c((t=S.paymentInfo())?32:-1,t),l(5),F(K(39,19,a.debtors)),l(4),c(((d=S.bill())==null?null:d.creditorId)===((d=S.userProfile())==null?null:d.userId)?41:-1)}}function ze(e,o){e&1&&(i(0,"div",2),s(1,"i",41),i(2,"p",42),r(3,"Bill not found"),n(),s(4,"p-button",43),n()),e&2&&(l(4),u("text",!0))}var xe=class e{route=f(X);ledgerService=f(de);liffService=f(re);bill=x(null);paymentInfo=x(null);isLoading=x(!0);userProfile=x(null);async ngOnInit(){let o=this.route.snapshot.paramMap.get("id");if(o)try{let t=await this.ledgerService.getBill(o);if(this.bill.set(t),t?.creditorId){let d=await this.ledgerService.getPaymentInfo(t.creditorId);this.paymentInfo.set(d)}}catch(t){console.error("Error fetching bill:",t)}this.isLoading.set(!1)}async ngAfterViewInit(){this.userProfile.set(this.liffService.profile());let o=this.route.snapshot.paramMap.get("id");o&&await this.ledgerService.addDebtorToBills(o)}async shareAgain(){let o=this.bill();o&&await this.liffService.shareToDebtor(o)}getBankLogo(o){return me.find(t=>t.name===o)?.logo||""}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=_({type:e,selectors:[["app-bill-detail"]],decls:4,vars:1,consts:[[1,"p-4","pb-8","max-w-2xl","mx-auto"],[1,"flex","justify-center","p-8"],[1,"text-center","p-8","bg-white","dark:bg-slate-900","rounded-2xl","shadow-sm"],[1,"pi","pi-spin","pi-spinner","text-4xl","text-slate-400"],["styleClass","overflow-hidden border-none shadow-xl rounded-2xl"],[1,"flex","items-center","gap-4","mb-6"],[1,"text-5xl","bg-slate-100","dark:bg-slate-800","p-4","rounded-2xl"],[1,"text-3xl","font-bold","text-slate-900","dark:text-white","mb-1"],[3,"value","severity"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-6","py-4"],[1,"text-sm","text-slate-500","uppercase","tracking-wider","font-semibold"],[1,"text-3xl","font-bold","text-orange-500","mt-1"],[1,"text-lg","text-slate-700","dark:text-slate-300","mt-1"],[1,"py-4","flex","flex-col","gap-4"],[1,"flex","items-center","gap-3"],["alt","avatar",1,"w-10","h-10","rounded-full",3,"src"],[1,"w-10","h-10","rounded-full","bg-slate-200","dark:bg-slate-700","flex","items-center","justify-center"],[1,"text-slate-900","dark:text-white","font-medium"],[1,"mt-8","flex","gap-3"],[1,"mt-4","flex","justify-center","items-center","gap-3"],["routerLink","/",1,"text-[10px]","text-slate-400","hover:text-orange-500","transition-colors","uppercase","font-bold","tracking-widest"],[1,"text-slate-300","dark:text-slate-700"],["routerLink","/bills-to-pay",1,"text-[10px]","text-slate-400","hover:text-orange-500","transition-colors","uppercase","font-bold","tracking-widest"],[1,"py-4"],[1,"text-slate-700","dark:text-slate-300","mt-2","p-4","bg-slate-50","dark:bg-slate-800/50","rounded-xl","italic"],[1,"pi","pi-user","text-slate-400"],[1,"bg-orange-50","dark:bg-orange-900/20","p-4","rounded-2xl","border","border-orange-100","dark:border-orange-800/30","flex","flex-col","gap-3"],[1,"flex","items-center","justify-between"],[1,"flex","flex-col","gap-1"],[1,"flex","items-center","gap-2"],["src","https://raw.githubusercontent.com/casperstack/thai-banks-logo/master/icons/PromptPay.png","alt","PromptPay",1,"h-4","object-contain"],[1,"text-sm","text-slate-500","dark:text-slate-400"],[1,"font-bold","text-slate-800","dark:text-slate-100"],[1,"text-xs","text-slate-500","dark:text-slate-400"],[1,"flex","items-center","justify-between","mt-1"],[1,"w-6","h-6","rounded-md","shadow-sm",3,"src","alt"],[1,"font-bold","text-slate-800","dark:text-slate-100","text-sm"],[1,"text-slate-700","dark:text-slate-200","font-bold"],[1,"text-xs","text-slate-500","dark:text-slate-400","mt-1","italic"],["label","Share Again","icon","pi pi-share-alt","styleClass","w-full","severity","secondary",3,"click"],["label","Mark as Paid","icon","pi pi-check","styleClass","w-full","severity","success",3,"disabled"],[1,"pi","pi-exclamation-circle","text-4xl","text-slate-300","mb-4","block"],[1,"text-slate-500"],["label","Go Home","routerLink","/","styleClass","mt-4",3,"text"]],template:function(t,d){if(t&1&&(i(0,"div",0),m(1,De,2,0,"div",1)(2,je,49,21)(3,ze,5,1,"div",2),n()),t&2){let a;l(),c(d.isLoading()?1:(a=d.bill())?2:3,a)}},dependencies:[h,Y,le,ae,oe,ne,pe,se,ve,B,W,J,Q],encapsulation:2,changeDetection:0})};export{xe as BillDetailComponent};

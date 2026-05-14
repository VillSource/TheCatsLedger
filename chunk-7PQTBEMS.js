import{a as fe}from"./chunk-EJPQGU4S.js";import{a as me,b as ue}from"./chunk-JSUXHPRM.js";import{a as re,b as de}from"./chunk-RNPASBB7.js";import{a as ce}from"./chunk-QAK4PZUP.js";import{$a as te,ab as ie,bb as _,cb as S,db as ne,eb as oe,g as G,h as J,i as Q,j as I,ja as Z,la as ee,n as X,ob as le,pb as ae,q as Y,rb as se,sb as pe}from"./chunk-Y3LXWOJ5.js";import{$b as h,Db as B,Eb as s,Fb as U,Gb as H,Ka as y,Ma as l,Ob as $,Pb as P,Qb as d,Rb as u,Sb as m,Xb as O,Z as M,Za as C,_ as N,_a as j,aa as A,ac as K,bb as z,bc as q,ca as g,cb as L,cc as W,ha as D,ia as k,jb as V,kb as x,lb as v,nb as F,ob as R,pb as f,qb as n,rb as o,sb as p,ta as b,za as E,zb as w}from"./chunk-3WF7YHWN.js";var xe=`
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
`;var Ce=["*"],he={root:({instance:e})=>({justifyContent:e.layout==="horizontal"?e.align==="center"||e.align==null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align==null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null})},Ie={root:({instance:e})=>["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}],content:"p-divider-content"},ve=(()=>{class e extends ee{name="divider";style=xe;classes=Ie;inlineStyles=he;static \u0275fac=(()=>{let t;return function(r){return(t||(t=E(e)))(r||e)}})();static \u0275prov=M({token:e,factory:e.\u0275fac})}return e})();var ge=new A("DIVIDER_INSTANCE"),T=(()=>{class e extends ie{componentName="Divider";$pcDivider=g(ge,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=g(_,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=g(ve);get dataP(){return this.cn({[this.align]:this.align,[this.layout]:this.layout,[this.type]:this.type})}static \u0275fac=(()=>{let t;return function(r){return(t||(t=E(e)))(r||e)}})();static \u0275cmp=C({type:e,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:6,hostBindings:function(a,r){a&2&&(V("aria-orientation",r.layout)("data-p",r.dataP),$(r.sx("root")),P(r.cn(r.cx("root"),r.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[O([ve,{provide:ge,useExisting:e},{provide:te,useExisting:e}]),z([_]),L],ngContentSelectors:Ce,decls:2,vars:3,consts:[[3,"pBind"]],template:function(a,r){a&1&&(U(),n(0,"div",0),H(1),o()),a&2&&(P(r.cx("content")),f("pBind",r.ptm("content")))},dependencies:[I,Z,S,_],encapsulation:2,changeDetection:0})}return e})(),be=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=j({type:e});static \u0275inj=N({imports:[T,S,S]})}return e})();var De=(e,i)=>i.key;function ke(e,i){if(e&1&&(n(0,"div",1),p(1,"p-progressSpinner",3),n(2,"p",4),d(3),o()()),e&2){let t=s();l(3),u(t.ls.t().fetching_details)}}function Ee(e,i){if(e&1&&(p(0,"p-divider"),n(1,"div",25)(2,"label",11),d(3),o(),n(4,"p",26),d(5),o()()),e&2){let t=s(),a=s();l(3),u(a.ls.t().note),l(2),m(' "',t.note,'" ')}}function we(e,i){if(e&1&&p(0,"img",16),e&2){let t=s();f("src",t.creditorAvatar,y)}}function Be(e,i){e&1&&(n(0,"div",17),p(1,"i",27),o())}function Pe(e,i){if(e&1&&(n(0,"div",29)(1,"div",31),p(2,"img",32),n(3,"span",33),d(4),o()(),n(5,"span",34),d(6),o()()),e&2){let t=s(),a=s(2);l(4),u(a.ls.t().promptpay),l(2),u(t.promptPay)}}function Te(e,i){if(e&1&&(n(0,"span",40),d(1),o()),e&2){let t=s(2);l(),u(t.accountName)}}function Me(e,i){if(e&1&&(n(0,"div",30)(1,"span",35),d(2),o(),n(3,"div",36)(4,"div",31),p(5,"img",37),n(6,"span",38),d(7),o()(),n(8,"span",39),d(9),o()(),x(10,Te,2,1,"span",40),o()),e&2){let t=s(),a=s(2);l(2),u(a.ls.t().bank_transfer),l(3),f("src",a.getBankLogo(t.bankName),y)("alt",t.bankName),l(2),u(t.bankName),l(2),u(t.accountNumber),l(),v(t.accountName?10:-1)}}function Ne(e,i){if(e&1&&(p(0,"p-divider"),n(1,"div",14)(2,"h3",11),d(3),o(),n(4,"div",28),x(5,Pe,7,2,"div",29),x(6,Me,11,6,"div",30),o()()),e&2){let t=i,a=s(2);l(3),m(" ",a.ls.t().payment_details," "),l(2),v(t.promptPay?5:-1),l(),v(t.bankName?6:-1)}}function Ae(e,i){if(e&1&&p(0,"img",16),e&2){let t=s().$implicit;f("src",t.value.avatar,y)}}function je(e,i){e&1&&(n(0,"div",17),p(1,"i",27),o())}function ze(e,i){if(e&1&&(x(0,Ae,1,1,"img",16)(1,je,2,0,"div",17),n(2,"span",18),d(3),o()),e&2){let t=i.$implicit,a=s(2);v(t.value.avatar?0:1),l(3),m(" ",t.value.name||a.ls.t().someone," ")}}function Le(e,i){if(e&1){let t=w();n(0,"p-button",41),B("click",function(){D(t);let r=s(2);return k(r.shareAgain())}),o(),p(1,"p-button",42)}if(e&2){let t=s(),a=s();f("label",a.ls.t().share_again),l(),f("label",a.ls.t().mark_as_paid)("disabled",t.status==="PAID")}}function Ve(e,i){if(e&1){let t=w();n(0,"p-button",43),B("click",function(){D(t);let r=s(2);return k(r.notifyPaid())}),o()}if(e&2){let t=s(),a=s();f("label",a.ls.t().notify_creditor)("disabled",t.status==="PAID")}}function Fe(e,i){if(e&1&&(n(0,"p-card",5)(1,"div",6)(2,"div",7),d(3),o(),n(4,"div")(5,"h1",8),d(6),o(),p(7,"p-tag",9),o()(),p(8,"p-divider"),n(9,"div",10)(10,"div")(11,"label",11),d(12),o(),n(13,"p",12),d(14),h(15,"currency"),o()(),n(16,"div")(17,"label",11),d(18),o(),n(19,"p",13),d(20),h(21,"date"),o()()(),x(22,Ee,6,2),p(23,"p-divider"),n(24,"div",14)(25,"h3",11),d(26),o(),n(27,"div",15),x(28,we,1,1,"img",16)(29,Be,2,0,"div",17),n(30,"span",18),d(31),o()()(),x(32,Ne,7,3),n(33,"div",14)(34,"h3",11),d(35),o(),n(36,"div",15),F(37,ze,4,2,null,null,De),h(39,"keyvalue"),o()(),n(40,"div",19),x(41,Le,2,3)(42,Ve,1,2,"p-button",20),o()(),n(43,"div",21)(44,"a",22),d(45),o(),n(46,"span",23),d(47,"|"),o(),n(48,"a",24),d(49),o()()),e&2){let t,a,r=i,c=s();l(3),m(" ",r.emoji," "),l(3),m(" ",r.name," "),l(),f("value",r.status==="PAID"?c.ls.t().paid:c.ls.t().pending)("severity",r.status==="PAID"?"success":"warn"),l(5),u(c.ls.t().amount),l(2),m(" ",W(15,17,r.amount,"THB","symbol","1.2-2")," "),l(4),u(c.ls.t().date),l(2),m(" ",q(21,22,r.date,"longDate")," "),l(2),v(r.note?22:-1),l(4),m(" ",c.ls.t().creditor_info," "),l(2),v(r.creditorAvatar?28:29),l(3),m(" ",r.creditorName||c.ls.t().someone," "),l(),v((t=c.paymentInfo())?32:-1,t),l(3),m(" ",c.ls.t().debtor_info," "),l(2),R(K(39,25,r.debtors)),l(4),v(((a=c.bill())==null?null:a.creditorId)===((a=c.userProfile())==null?null:a.userId)?41:c.isDebtor()&&c.isInChat()?42:-1),l(4),m(" ",c.ls.t().ledger_title," "),l(4),m(" ",c.ls.t().bills_to_pay," ")}}function Re(e,i){if(e&1&&(n(0,"div",2),p(1,"i",44),n(2,"p",45),d(3),o(),p(4,"p-button",46),o()),e&2){let t=s();l(3),u(t.ls.t().bill_not_found),l(),f("label",t.ls.t().go_home)("text",!0)}}var _e=class e{ls=g(se);route=g(X);ledgerService=g(ce);liffService=g(pe);bill=b(null);paymentInfo=b(null);isLoading=b(!0);userProfile=b(null);async ngOnInit(){let i=this.route.snapshot.paramMap.get("id");if(i)try{let t=await this.ledgerService.getBill(i);if(this.bill.set(t),t?.creditorId){let a=await this.ledgerService.getPaymentInfo(t.creditorId);this.paymentInfo.set(a)}}catch(t){console.error("Error fetching bill:",t)}this.isLoading.set(!1)}async ngAfterViewInit(){this.userProfile.set(this.liffService.profile());let i=this.route.snapshot.paramMap.get("id");i&&await this.ledgerService.addDebtorToBills(i)}async shareAgain(){let i=this.bill();i&&await this.liffService.shareToDebtor(i)}getBankLogo(i){return fe.find(t=>t.name===i)?.logo||""}isDebtor(){let i=this.userProfile(),t=this.bill();return!i||!t||!t.debtors?!1:!!t.debtors[i.userId]}isInChat(){let i=this.liffService.getContext();return!!i&&["utou","room","group","square_chat"].includes(i.type)}async notifyPaid(){let i=this.bill();if(!i)return;let t=await this.liffService.sendPaymentNotification(i)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=C({type:e,selectors:[["app-bill-detail"]],decls:4,vars:1,consts:[[1,"p-4","pb-8","max-w-2xl","mx-auto"],[1,"flex","flex-col","items-center","justify-center","p-12"],[1,"text-center","p-8","bg-white","dark:bg-slate-900","rounded-2xl","shadow-sm"],["styleClass","w-12 h-12","strokeWidth","4"],[1,"text-slate-500","mt-4","font-medium","animate-pulse"],["styleClass","overflow-hidden border-none shadow-xl rounded-2xl"],[1,"flex","items-center","gap-4","mb-6"],[1,"text-5xl","bg-slate-100","dark:bg-slate-800","p-4","rounded-2xl"],[1,"text-3xl","font-bold","text-slate-900","dark:text-white","mb-1"],[3,"value","severity"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-6","py-4"],[1,"text-sm","text-slate-500","uppercase","tracking-wider","font-semibold"],[1,"text-3xl","font-bold","text-orange-500","mt-1"],[1,"text-lg","text-slate-700","dark:text-slate-300","mt-1"],[1,"py-4","flex","flex-col","gap-4"],[1,"flex","items-center","gap-3"],["alt","avatar",1,"w-10","h-10","rounded-full",3,"src"],[1,"w-10","h-10","rounded-full","bg-slate-200","dark:bg-slate-700","flex","items-center","justify-center"],[1,"text-slate-900","dark:text-white","font-medium"],[1,"mt-8","flex","gap-3"],["icon","pi pi-bell","styleClass","w-full rounded-xl! font-bold bg-green-500! border-green-500! hover:bg-green-600! hover:border-green-600!",3,"label","disabled"],[1,"mt-4","flex","justify-center","items-center","gap-3"],["routerLink","/",1,"text-[10px]","text-slate-400","hover:text-orange-500","transition-colors","uppercase","font-bold","tracking-widest"],[1,"text-slate-300","dark:text-slate-700"],["routerLink","/bills-to-pay",1,"text-[10px]","text-slate-400","hover:text-orange-500","transition-colors","uppercase","font-bold","tracking-widest"],[1,"py-4"],[1,"text-slate-700","dark:text-slate-300","mt-2","p-4","bg-slate-50","dark:bg-slate-800/50","rounded-xl","italic"],[1,"pi","pi-user","text-slate-400"],[1,"bg-orange-50","dark:bg-orange-900/20","p-4","rounded-2xl","border","border-orange-100","dark:border-orange-800/30","flex","flex-col","gap-3"],[1,"flex","items-center","justify-between"],[1,"flex","flex-col","gap-1"],[1,"flex","items-center","gap-2"],["src","https://raw.githubusercontent.com/casperstack/thai-banks-logo/master/icons/PromptPay.png","alt","PromptPay",1,"h-4","object-contain"],[1,"text-sm","text-slate-500","dark:text-slate-400"],[1,"font-bold","text-slate-800","dark:text-slate-100"],[1,"text-xs","text-slate-500","dark:text-slate-400"],[1,"flex","items-center","justify-between","mt-1"],[1,"w-6","h-6","rounded-md","shadow-sm",3,"src","alt"],[1,"font-bold","text-slate-800","dark:text-slate-100","text-sm"],[1,"text-slate-700","dark:text-slate-200","font-bold"],[1,"text-xs","text-slate-500","dark:text-slate-400","mt-1","italic"],["icon","pi pi-share-alt","styleClass","w-full rounded-xl! font-semibold","severity","secondary",3,"click","label"],["icon","pi pi-check","styleClass","w-full rounded-xl! font-bold bg-orange-500! border-orange-500! hover:bg-orange-600! hover:border-orange-600!",3,"label","disabled"],["icon","pi pi-bell","styleClass","w-full rounded-xl! font-bold bg-green-500! border-green-500! hover:bg-green-600! hover:border-green-600!",3,"click","label","disabled"],[1,"pi","pi-exclamation-circle","text-4xl","text-slate-300","mb-4","block"],[1,"text-slate-500"],["routerLink","/","styleClass","mt-4",3,"label","text"]],template:function(t,a){if(t&1&&(n(0,"div",0),x(1,ke,4,1,"div",1)(2,Fe,50,27)(3,Re,5,3,"div",2),o()),t&2){let r;l(),v(a.isLoading()?1:(r=a.bill())?2:3,r)}},dependencies:[I,Y,ae,le,oe,ne,ue,me,be,T,de,re,Q,G,J],encapsulation:2,changeDetection:0})};export{_e as BillDetailComponent};

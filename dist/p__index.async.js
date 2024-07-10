"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[866],{7777:function(Q,h,n){n.r(h),n.d(h,{default:function(){return M}});var B=n(68400),p=n.n(B),S=n(15009),g=n.n(S),j=n(99289),A=n.n(j),R=n(5574),T=n.n(R),x=n(921),w=n(67294),L=n(93179),P=n(23522),a=n(85893),C,b,N=(0,x.kc)(function(o){var t=o.css,e=o.cx,r=e(t(C||(C=p()([`
    position: absolute;
    top: 4px;
    right: 4px;
    color: #fff;
    background-color: #999;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
    display: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `]))));return{codeBody:t(b||(b=p()([`
      position: relative;
      &:hover .`,` {
        display: block;
      }
    `])),r),copy:r}}),U=function(o){var t=o.content,e=N(null),r=e.styles,v=(0,w.useState)(!1),m=T()(v,2),i=m[0],f=m[1],c=function(){var s=A()(g()().mark(function u(){return g()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:if(!i){l.next=2;break}return l.abrupt("return");case 2:return l.prev=2,l.next=5,navigator.clipboard.writeText(t);case 5:f(!0),setTimeout(function(){return f(!1)},1e3),l.next=11;break;case 9:l.prev=9,l.t0=l.catch(2);case 11:case"end":return l.stop()}},u,null,[[2,9]])}));return function(){return s.apply(this,arguments)}}();return(0,a.jsxs)("div",{className:r.codeBody,children:[(0,a.jsx)(L.Z,{language:"ts",showLineNumbers:!0,style:P.Z,children:t}),(0,a.jsx)("div",{className:r.copy,onClick:c,children:i?"\u5DF2\u590D\u5236":"\u590D\u5236"})]})},D=n(97857),y=n.n(D),O=n(12823),I=n.n(O),J=function(t){var e=t.columns,r=t.dataSource,v=t.headerStyle,m=t.style,i=t.fileName,f=i===void 0?"\u8868\u683C":i,c=new(I()).Workbook,s=c.addWorksheet("sheet1");s.columns=e.map(function(u){return{header:u.title,key:u.dataIndex}}),s.addRows(r),W(s,v,m),c.xlsx.writeBuffer().then(function(u){var d=new Blob([u],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),l=document.createElement("a");l.href=URL.createObjectURL(d),l.download=f+".xlsx",l.click(),URL.revokeObjectURL(l.href)})},W=function(t,e,r){var v={top:{style:"thin"},left:{style:"thin"},bottom:{style:"thin"},right:{style:"thin"}},m={vertical:"middle",horizontal:"center"};t.eachRow(function(i,f){if(f===1){var c,s,u=(e==null||(c=e.fgColor)===null||c===void 0?void 0:c[0])==="#"?e==null||(s=e.fgColor)===null||s===void 0?void 0:s.substring(1):e==null?void 0:e.fgColor;i.eachCell(function(d){d.alignment=y()(y()({},m),e==null?void 0:e.alignment),d.fill={type:"pattern",pattern:"solid",fgColor:{argb:u}},d.border=y()(y()({},v),e==null?void 0:e.border)})}else i.eachCell(function(d){d.style=y()({alignment:m,border:v},r)})})},Z=n(14271),z=n(14726),H=n(80265),k,G=`import ExcelJS, { Alignment, Borders } from "exceljs";

type HeaderStyleType = {
    fgColor: string;
    alignment: Partial<Alignment>;
    border: Partial<Borders>;
};
type ExcelExportPropsType = {
    // \u5217
    columns: any[];
    // \u6570\u636E
    dataSource: any[];
    // \u8868\u5934\u6837\u5F0F
    headerStyle?: Partial<HeaderStyleType>;
    // \u5355\u5143\u683C\u6837\u5F0F
    style?: Partial<ExcelJS.Style>;
    // \u6587\u4EF6\u540D\u79F0
    fileName?: string;
};
/**
 *
 * \u6587\u4EF6\u5BFC\u51FA\u51FD\u6570\u5C01\u88C5
 * @param param
 */
export const excelExport = ({ columns, dataSource, headerStyle, style, fileName = "\u8868\u683C" }: ExcelExportPropsType) => {
    // \u521B\u5EFA\u5DE5\u4F5C\u7C3F
    const workbook = new ExcelJS.Workbook();
    // \u6DFB\u52A0\u5DE5\u4F5C\u8868
    const worksheet = workbook.addWorksheet("sheet1");
    worksheet.columns = columns.map((e) => ({
        header: e.title,
        key: e.dataIndex,
    }));
    worksheet.addRows(dataSource);
    // \u5355\u5143\u683C\u6837\u5F0F
    setCellStyle(worksheet, headerStyle, style);
    // \u5BFC\u51FA\u8868\u683C
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName + '.xlsx';
        link.click();
        URL.revokeObjectURL(link.href); // \u4E0B\u8F7D\u5B8C\u6210\u91CA\u653E\u6389blob\u5BF9\u8C61
    });
};

/**
 * \u5355\u5143\u683C \u6837\u5F0F\u8BBE\u7F6E
 */
const setCellStyle = (worksheet: ExcelJS.Worksheet, headerStyle?: Partial<HeaderStyleType>, style?: Partial<ExcelJS.Style>) => {
    const comBorder: Partial<Borders> = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
    };
    const comAlignment: Partial<Alignment> = {
        vertical: "middle",
        horizontal: "center",
    };
    worksheet.eachRow((row, index) => {
        if (index === 1) {
            const fgColor = headerStyle?.fgColor?.[0] === "#" ? headerStyle?.fgColor?.substring(1) : headerStyle?.fgColor;
            row.eachCell((cell) => {
                cell.alignment = {
                    ...comAlignment,
                    ...headerStyle?.alignment,
                };
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: fgColor },
                };
                cell.border = {
                    ...comBorder,
                    ...headerStyle?.border,
                };
            });
        } else {
            row.eachCell((cell) => {
                cell.style = {
                    alignment: comAlignment,
                    border: comBorder,
                    ...style,
                };
            });
        }
    });
};`,F=[{key:"1",name:"\u80E1\u5F66\u658C",age:32,address:"\u897F\u6E56\u533A\u6E56\u5E95\u516C\u56ED1\u53F7"},{key:"2",name:"\u80E1\u5F66\u7956",age:42,address:"\u897F\u6E56\u533A\u6E56\u5E95\u516C\u56ED1\u53F7"}],E=[{title:"\u59D3\u540D",dataIndex:"name",key:"name"},{title:"\u5E74\u9F84",dataIndex:"age",key:"age"},{title:"\u4F4F\u5740",dataIndex:"address",key:"address"}],K=(0,x.kc)(function(o){var t=o.css;return{main:t(k||(k=p()([`
      padding: 0 20px 20px;
    `])))}}),M=function(){var o=K(),t=o.styles,e=function(){J({columns:E,dataSource:F,headerStyle:{fgColor:"#f5f5f5"}})};return(0,a.jsxs)("div",{className:t.main,children:[(0,a.jsx)(Z.Z.Title,{level:3,style:{textAlign:"center"},children:"exceljs-demo"}),(0,a.jsx)(z.ZP,{onClick:e,style:{marginBottom:10},children:"\u5BFC\u51FA"}),(0,a.jsx)(H.Z,{rowKey:"key",size:"small",bordered:!0,columns:E,dataSource:F}),(0,a.jsx)("h3",{children:"\u5BFC\u51FA\u51FD\u6570\u5C01\u88C5"}),(0,a.jsx)(U,{content:G})]})}}}]);

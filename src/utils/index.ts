
import ExcelJS, { Alignment, Borders } from "exceljs";

type HeaderStyleType = {
    fgColor: string;
    alignment: Partial<Alignment>;
    border: Partial<Borders>;
};
type ExcelExportPropsType = {
    // 列
    columns: any[];
    // 数据
    dataSource: any[];
    // 表头样式
    headerStyle?: Partial<HeaderStyleType>;
    // 单元格样式
    style?: Partial<ExcelJS.Style>;
    // 文件名称
    fileName?: string;
};
/**
 *
 * 文件导出函数封装
 * @param param
 */
export const excelExport = ({ columns, dataSource, headerStyle, style, fileName = "表格" }: ExcelExportPropsType) => {
    // 创建工作簿
    const workbook = new ExcelJS.Workbook();
    // 添加工作表
    const worksheet = workbook.addWorksheet("sheet1");
    worksheet.columns = columns.map((e) => ({
        header: e.title,
        key: e.dataIndex,
    }));
    worksheet.addRows(dataSource);
    // 单元格样式
    setCellStyle(worksheet, headerStyle, style);
    // 导出表格
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName + '.xlsx';
        link.click();
        URL.revokeObjectURL(link.href); // 下载完成释放掉blob对象
    });
};

/**
 * 单元格 样式设置
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
};
import { Code } from "@/components";
import { excelExport } from "@/utils";
import { Button, Table, Typography } from "antd";
import { createStyles } from "antd-style";

const content = `import ExcelJS, { Alignment, Borders } from "exceljs";

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
};`;
const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];

const useStyles = createStyles(({ css }) => {
  return {
    main: css`
      padding: 0 20px 20px;
    `,
  };
});

export default () => {
  const { styles } = useStyles();
  const handlerExport = () => {
    excelExport({ columns, dataSource, headerStyle: { fgColor: "#f5f5f5" } });
  };
  return (
    <div className={styles.main}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        exceljs-demo
      </Typography.Title>

      <Button onClick={handlerExport} style={{ marginBottom: 10 }}>
        导出
      </Button>

      <Table rowKey="key" size="small" bordered columns={columns} dataSource={dataSource} />

      <h3>导出函数封装</h3>
      <Code content={content} />
    </div>
  );
};

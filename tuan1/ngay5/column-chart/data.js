// Dữ liệu cho biểu đồ
export const chartData = [
  { label: "A", value: 2 },
  { label: "B", value: 0.1 },
  { label: "C", value: 3 },
  { label: "E", value: 4 },
  { label: "F", value: 4 },
];

// Cấu hình màu sắc
export const colors = {
  bar: "#3366CC",
  text: "#666",
  axis: "#ccc",
  title: "#333",
  grid: "#e0e0e0",
  background: "#ffffff",
};

// Cấu hình văn bản
export const texts = {
  mainTitle: "BIỂU ĐỒ LỊCH SỬ LEVEL OF POSITION",
  xAxisLabel: "TÊN DỰ ÁN",
  yAxisLabels: {
    level: "LEVEL",
    of: "OF",
    position: "POSITION",
  },
};

// Cấu hình biểu đồ
export const chartConfig = {
  padding: 42,
  maxValue: 4,
  numGridLines: 4,
  plotOptions: {
    column: {
      groupPadding: 0.08, // giảm khoảng cách giữa nhóm
      pointPadding: 0.08, // giảm khoảng cách giữa cột
      depth: 30,
    },
  },
  fonts: {
    normal: "14px Arial",
    title: "18px Arial",
    italic: "italic 14px Arial",
  },
};

export const chartData = [
  {
    name: "ĐÃ ĐẠT",
    y: 80,
    color: "#00a9e0",
  },
  {
    name: "CHƯA ĐẠT",
    y: 20,
    color: "#e41e26",
    sliced: true,
    selected: true,
    shadow: true,
    color: Highcharts.color("#e41e26").brighten(0.15).get(),
    borderWidth: 4,
    borderColor: "#800000",
    states: {
      hover: {
        borderWidth: 4,
        borderColor: "#800000",
      },
    },
    dataLabels: {
      rotation: -15, // Thêm độ nghiêng cho label
      verticalAlign: "top", // Thay đổi từ "top" thành "middle"
      y: -120, // Hạ thấp từ -120 xuống -20
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        textShadow: "1px 1px 2px rgba(0,0,0,0.5)", // Bóng chữ
      },
    },
  },
];

export const chartConfig = {
  chart: {
    renderTo: "container",
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 72,
      beta: 0,
      depth: 60,
    },
  },
  title: {
    text: "BIỂU ĐỒ TỔNG QUAN KHUNG NĂNG LỰC",
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      depth: 60,
      startAngle: 100, // -90 độ để bắt đầu từ hướng 3 giờ
      slicedOffset: 40, // Khoảng cách tách cho các miếng bánh
      borderWidth: 4,
      frame: {
        bottom: { size: 1, color: "rgba(0,0,0,0.1)" },
        back: { size: 1, color: "rgba(0,0,0,0.05)" },
        side: { size: 1, color: "rgba(0,0,0,0.08)" },
      },
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        verticalAlign: "top",
        y: -80, // Đẩy label lên trên
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
  },
};

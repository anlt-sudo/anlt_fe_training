import { chartData, chartConfig } from "./data.js";

// Khởi tạo biểu đồ
const chart = new Highcharts.Chart({
  ...chartConfig,
  series: [
    {
      type: "pie",
      name: "Tỷ lệ",
      data: chartData,
    },
  ],
});

// Hàm xử lý sự kiện cho các thanh trượt
function showValues() {
  document.getElementById("alpha-value").innerHTML =
    chart.options.chart.options3d.alpha;
  document.getElementById("beta-value").innerHTML =
    chart.options.chart.options3d.beta;
  document.getElementById("depth-value").innerHTML =
    chart.options.chart.options3d.depth;
}

["alpha", "beta", "depth"].forEach((key) => {
  const slider = document.getElementById(key);
  slider.addEventListener("input", (e) => {
    chart.options.chart.options3d[key] = parseFloat(e.target.value);
    chart.redraw(false);
    showValues();
  });
});

showValues();

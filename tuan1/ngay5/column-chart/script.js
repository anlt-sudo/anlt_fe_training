import { chartData, colors, texts, chartConfig } from "./data.js";

export class ColumnChart {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.chartWidth = this.canvas.width;
    this.chartHeight = this.canvas.height;
    this.chartAreaWidth = this.chartWidth - chartConfig.padding * 2;
    this.chartAreaHeight = this.chartHeight - chartConfig.padding * 2;
  }

  drawAxes() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = colors.axis;
    this.ctx.moveTo(chartConfig.padding, chartConfig.padding);
    this.ctx.lineTo(
      chartConfig.padding,
      this.chartHeight - chartConfig.padding
    );
    this.ctx.lineTo(
      this.chartWidth - chartConfig.padding,
      this.chartHeight - chartConfig.padding
    );
    this.ctx.stroke();
  }

  drawGridAndYLabels() {
    const yStep = this.chartAreaHeight / chartConfig.numGridLines;
    for (let i = 0; i <= chartConfig.numGridLines; i++) {
      const y = this.chartHeight - chartConfig.padding - i * yStep;
      const value = i * (chartConfig.maxValue / chartConfig.numGridLines);

      this.ctx.beginPath();
      this.ctx.strokeStyle = colors.grid;
      this.ctx.moveTo(chartConfig.padding, y);
      this.ctx.lineTo(this.chartWidth - chartConfig.padding, y);
      this.ctx.stroke();

      this.ctx.fillStyle = colors.text;
      this.ctx.font = chartConfig.fonts.normal;
      this.ctx.textAlign = "right";
      this.ctx.fillText(value, chartConfig.padding - 10, y + 5);
    }
  }

  drawBars() {
    const numBars = chartData.length;
    const barWidth = this.chartAreaWidth / (numBars * 2);
    const barSpacing = barWidth;

    chartData.forEach((dataPoint, index) => {
      const barHeight =
        (dataPoint.value / chartConfig.maxValue) * this.chartAreaHeight;
      const x =
        chartConfig.padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = this.chartHeight - chartConfig.padding - barHeight;

      this.ctx.fillStyle = colors.bar;
      this.ctx.fillRect(x, y, barWidth, barHeight);

      this.ctx.fillStyle = colors.text;
      this.ctx.font = chartConfig.fonts.normal;
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        dataPoint.label,
        x + barWidth / 2,
        this.chartHeight - chartConfig.padding + 20
      );
    });
  }

  drawLabelsAndTitle() {
    // Tiêu đề
    this.ctx.fillStyle = colors.title;
    this.ctx.font = chartConfig.fonts.title;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      texts.mainTitle,
      this.chartWidth / 2,
      chartConfig.padding / 2
    );

    // Nhãn trục X
    this.ctx.fillStyle = colors.text;
    this.ctx.font = chartConfig.fonts.italic;
    this.ctx.fillText(
      texts.xAxisLabel,
      this.chartWidth / 2,
      this.chartHeight - chartConfig.padding / 3 + 14
    );

    // Nhãn trục Y
    this.ctx.save();
    this.ctx.translate(chartConfig.padding / 3, this.chartHeight / 2);
    this.ctx.rotate(-Math.PI / 2);
    const yLabelSpacing = this.chartAreaHeight * 0.3;
    this.ctx.fillText(texts.yAxisLabels.level, -yLabelSpacing, 0);
    this.ctx.fillText(texts.yAxisLabels.of, 0 - 7, 0);
    this.ctx.fillText(texts.yAxisLabels.position, yLabelSpacing, 0);
    this.ctx.restore();
  }

  alignLegend() {
    const legend = document.getElementById("chart-legend");
    const box = document.getElementById("legend-color-box");
    const levelText = document.getElementById("legend-level");
    const ofText = document.getElementById("legend-of");
    const positionText = document.getElementById("legend-position");

    const yStep = this.chartAreaHeight / chartConfig.numGridLines;
    const y_for_value_4 = chartConfig.padding;
    const y_for_value_3 = chartConfig.padding + yStep;
    const textHeight = 11;

    legend.style.left = `${this.chartWidth - chartConfig.padding - 10 + 40}px`;
    box.style.width = `${this.chartAreaWidth / 4 - 50}px`;
    box.style.height = `${(y_for_value_3 - y_for_value_4) / 2}px`;

    const boxHeight = (y_for_value_3 - y_for_value_4) / 2;

    legend.style.top = `${y_for_value_4 + boxHeight}px`;
    levelText.style.top = `${yStep - boxHeight - textHeight}px`;
    ofText.style.top = `${
      yStep + yStep / 2 - textHeight / 2 - textHeight - 6
    }px`;
    positionText.style.top = `${2 * yStep - textHeight / 2 - textHeight}px`;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.chartWidth, this.chartHeight);
    this.drawAxes();
    this.drawGridAndYLabels();
    this.drawBars();
    this.drawLabelsAndTitle();
    this.alignLegend();
  }
}

const chart = new ColumnChart("myChart");
chart.draw();

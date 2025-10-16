import {
  canvas,
  ctx,
  centerX,
  centerY,
  radius,
  verticalTilt,
  explodedSliceTilt,
  explosionOffset,
  depth,
  explodedRadius,
  explodedDepth,
  mainDepth,
  data,
  darkenColor,
} from "./data.js";

function drawSliceBody(options) {
  const {
    cx,
    cy,
    start,
    end,
    color,
    tilt,
    radius: sliceRadius = radius,
    depth: sliceDepth = mainDepth,
  } = options;
  const sideColor = darkenColor(color, 20);
  const scaledDepth = depth / tilt;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  ctx.fillStyle = sideColor;
  for (let i = 1; i <= scaledDepth; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.arc(0, i, sliceRadius, start, end);
    ctx.lineTo(0, i);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Vẽ phần mặt phẳng bên trong bị lộ ra khi tách lát bánh
 */
function drawInnerWall(options) {
  const { cx, cy, angle, color, tilt } = options;
  const sideColor = darkenColor(color, 20);
  const scaledDepth = depth / tilt;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  ctx.fillStyle = sideColor;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(angle) * radius, 0);
  ctx.lineTo(Math.cos(angle) * radius, scaledDepth);
  ctx.lineTo(0, scaledDepth);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ mặt trên của một lát bánh
 */
function drawSliceTop(options) {
  const {
    cx,
    cy,
    start,
    end,
    color,
    tilt,
    radius: sliceRadius = radius,
  } = options;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, sliceRadius, start, end);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const total = data.reduce((sum, { value }) => sum + value, 0);
  let startAngle = 0;

  const mainSlice = data.find((s) => !s.exploded);
  const explodedSlice = data.find((s) => s.exploded);

  // Tính toán góc cho các lát
  const mainSliceAngle = (mainSlice.value / total) * 2 * Math.PI;
  const explodedSliceAngle = (explodedSlice.value / total) * 2 * Math.PI;

  const mainSliceEndAngle = startAngle + mainSliceAngle;
  const explodedSliceStartAngle = mainSliceEndAngle;
  const explodedSliceEndAngle = explodedSliceStartAngle + explodedSliceAngle;

  const midAngleExploded = explodedSliceStartAngle + explodedSliceAngle / 2;
  const explodedCX = centerX + Math.cos(midAngleExploded) * explosionOffset;
  const explodedCY =
    centerY + Math.sin(midAngleExploded) * explosionOffset + 10;

  // --- BẮT ĐẦU VẼ THEO LỚP TỪ SAU RA TRƯỚC ---

  // 1. Vẽ thân 3D của phần bị tách ra (màu đỏ) - chuyển lên đầu
  drawSliceBody({
    cx: explodedCX,
    cy: explodedCY,
    start: explodedSliceStartAngle,
    end: explodedSliceEndAngle,
    color: explodedSlice.color,
    tilt: explodedSliceTilt,
    radius: explodedRadius,
    depth: explodedDepth,
  });

  // 2. Vẽ thân 3D của phần chính (màu xanh)
  drawSliceBody({
    cx: centerX,
    cy: centerY,
    start: startAngle,
    end: mainSliceEndAngle,
    color: mainSlice.color,
    tilt: verticalTilt,
  });

  // 3. Vẽ bức tường bên trong của phần chính BỊ LỘ RA
  drawInnerWall({
    cx: centerX,
    cy: centerY,
    angle: mainSliceEndAngle,
    color: mainSlice.color,
    tilt: verticalTilt,
  });

  // 4. Vẽ mặt trên của phần bị tách ra (màu đỏ)
  drawSliceTop({
    cx: explodedCX,
    cy: explodedCY,
    start: explodedSliceStartAngle,
    end: explodedSliceEndAngle,
    color: explodedSlice.color,
    tilt: explodedSliceTilt,
    radius: explodedRadius,
  });

  // 5. Vẽ mặt trên của phần chính (màu xanh)
  drawSliceTop({
    cx: centerX,
    cy: centerY,
    start: startAngle,
    end: mainSliceEndAngle,
    color: mainSlice.color,
    tilt: verticalTilt,
  });

  // 6. Vẽ nhãn
  drawLabels();
}

function drawLabels() {
  let total = data.reduce((sum, { value }) => sum + value, 0);
  let startAngle = 0;

  data.forEach((slice) => {
    const sliceAngle = (slice.value / total) * 2 * Math.PI;
    const midAngle = startAngle + sliceAngle / 2;

    let offsetX = 0;
    let offsetY = 0;
    let currentTilt = verticalTilt;

    if (slice.exploded) {
      offsetX = Math.cos(midAngle) * explosionOffset;
      offsetY = Math.sin(midAngle) * explosionOffset;
      currentTilt = explodedSliceTilt;
    }

    const labelX = centerX + offsetX + Math.cos(midAngle) * (radius + 50);
    const labelY =
      centerY + offsetY + Math.sin(midAngle) * (radius + 10) * currentTilt;

    const lineStartX = centerX + offsetX + Math.cos(midAngle) * radius;
    const lineStartY =
      centerY + offsetY + Math.sin(midAngle) * radius * currentTilt;

    ctx.strokeStyle = darkenColor(slice.color, 30);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(lineStartX, lineStartY);
    ctx.lineTo(labelX, labelY);
    ctx.stroke();

    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.textAlign =
      midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2 ? "right" : "left";
    ctx.fillText(
      slice.label,
      labelX + (ctx.textAlign === "right" ? -5 : 5),
      labelY
    );

    startAngle += sliceAngle;
  });
}

drawChart();

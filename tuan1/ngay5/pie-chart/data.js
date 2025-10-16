export const canvas = document.getElementById("myPieChart");
export const ctx = canvas.getContext("2d");

// Tâm và bán kính của biểu đồ
export const centerX = canvas.width / 2;
export const centerY = canvas.height / 2;
export const radius = 120;

// --- CÁC THAM SỐ CÓ THỂ ĐIỀU CHỈNH ---
export const verticalTilt = 0.3;
export const explodedSliceTilt = 0.3;
export const explosionOffset = 20;
export const depth = 30;
export const explodedRadius = radius * 0.8;
export const explodedDepth = 15;
export const mainDepth = 30;

export const data = [
  { value: 80, color: "#0099CC", label: "80% ĐÃ ĐẠT", exploded: false },
  { value: 20, color: "#E62E2D", label: "20% CHƯA ĐẠT", exploded: true },
];

// Hàm phụ trợ để làm tối màu
export function darkenColor(color, percent) {
  let num = parseInt(color.slice(1), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

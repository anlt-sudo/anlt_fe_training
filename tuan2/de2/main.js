document.addEventListener("DOMContentLoaded", function () {
  // Tìm tất cả các checkbox điều khiển menu
  const allToggles = document.querySelectorAll(".submenu-toggle");

  allToggles.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      // Tìm menu cha gần nhất (chỉ áp dụng cho các menu con lồng nhau)
      const parentSubmenu = this.closest("ul.submenu");

      // Nếu checkbox này nằm bên trong một submenu khác
      if (parentSubmenu) {
        // Dùng một khoảng trễ nhỏ để đợi animation của menu con bắt đầu
        // Điều này đảm bảo giá trị scrollHeight được cập nhật chính xác
        setTimeout(() => {
          // Nếu menu cha đang mở, tính toán lại và đặt max-height của nó
          // bằng đúng chiều cao nội dung thực tế (scrollHeight)
          if (parentSubmenu.style.maxHeight !== "0px") {
            parentSubmenu.style.maxHeight = parentSubmenu.scrollHeight + "px";
          }
        }, 50); // 50ms là đủ
      }

      // Xử lý trường hợp đóng menu cấp 1
      // Nếu ta vừa tắt checkbox của menu cấp 1, ta đặt lại max-height về 0
      const mainSubmenu = this.nextElementSibling.nextElementSibling;
      if (
        mainSubmenu &&
        !this.checked &&
        mainSubmenu.classList.contains("submenu")
      ) {
        mainSubmenu.style.maxHeight = "0px";
      }
    });
  });

  // Thêm một sự kiện click cho các label để đảm bảo menu cha mở ra đúng cách ban đầu
  const labels = document.querySelectorAll(".submenu-arrow");
  labels.forEach((label) => {
    label.addEventListener("click", function () {
      const checkbox = document.getElementById(this.getAttribute("for"));
      const menu = checkbox.nextElementSibling.nextElementSibling;

      // Nếu sắp mở menu, tính chiều cao và gán
      if (!checkbox.checked && menu) {
        // Gán tạm một giá trị lớn để tính scrollHeight
        menu.style.maxHeight = "1000px";
        const realHeight = menu.scrollHeight;
        // Sau đó gán lại giá trị đúng
        menu.style.maxHeight = realHeight + "px";
      }
    });
  });
});

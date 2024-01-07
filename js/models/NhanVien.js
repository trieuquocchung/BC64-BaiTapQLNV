// Tạo một lớp đối tượng nhân viên
function NhanVien() {
  this.tknv = "";
  this.name = "";
  this.email = "";
  this.password = "";
  this.datepicker = "";
  this.luongCB = 0;
  this.gioLam = 0;
  this.chucvu = "";

  //phương thức tính tổng lương
  this.tongLuong = function () {
    var tongLuong = 0;
    if (this.chucvu === "Sếp") {
      tongLuong = this.luongCB * 3;
    } else if (this.chucvu === "Trưởng phòng") {
      tongLuong = this.luongCB * 2;
    } else {
      tongLuong = this.luongCB * 1;
    }
    return tongLuong;
  };

  // Phương thức tính xếp loại
  this.xepLoai = function () {
    var xepLoai = "";
    if (this.gioLam >= 192) {
      xepLoai = "Nhân viên xuất sắc";
    } else if (this.gioLam >= 176) {
      xepLoai = "Nhân viên giỏi";
    } else if (this.gioLam >= 160) {
      xepLoai = "Nhân viên khá";
    } else {
      xepLoai = "Nhân viên trung bình";
    }
    return xepLoai;
  };
}

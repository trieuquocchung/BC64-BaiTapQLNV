// Những đặc điểm (thuộc tính) của 1 nhân viên khi được thêm vào hệ thống bao gồm những gì ?
/* Những thông tin của một nhân viên
    - Tài khoản
    - Họ và tên
    - Email
    - Mật khẩu
    - Ngày làm
    - Lương cơ bản
    - Chức vụ
    - Giờ làm
*/

/* Từ giao diện có thể thấy được những chức năng:
    - Thêm nhân viên
    - Reset dữ liệu trên input
    - Validation dữ liệu
    - Xây dựng phương thức tính tổng lương cho nhân viên
    - Xây dựng phương xếp loại cho nhân viên
    - Xóa nhân viên
    - Cập nhật nhân viên
    - Tìm nhân viên theo loại (xuất sắc, giỏi, khá) và hiển thị
*/

var arrNhanVien = [];
function getValueUser() {
  var arrInput = document.querySelectorAll("form input, form select");
  console.log(arrInput);
  var nhanVien = new NhanVien();
  var arrError = document.querySelectorAll("form span.sp-thongbao");
  var isValid = true;
  //chạy vòng lặp để lấy dữ liệu từng phần tử
  //xử lí khi đi qua từng phần tử
  for (var i = 0; i < arrInput.length; i++) {
    if (arrInput[i].id == "email") {
      isValid &=
        checkEmptyValue(arrInput[i].value, arrError[i].id) &&
        checkEmailValue(arrInput[i].value, arrError[i].id);
    } else if (arrInput[i].id == "tknv") {
      isValid &=
        checkEmptyValue(arrInput[i].value, arrError[i].id) &&
        validationNumber(arrInput[i].value, arrError[i].id) &&
        checkMinMaxValue(arrInput[i].value, arrError[i].id, 4, 6);
    } else if (arrInput[i].id == "password") {
      isValid &=
        checkEmptyValue(arrInput[i].value, arrError[i].id) &&
        validationPassword(arrInput[i].value, arrError[i].id, 6, 10);
    } else if (arrInput[i].id == "name") {
      checkEmptyValue(arrInput[i].value, arrError[i].id) &&
        checkNameValue(arrInput[i].value, arrError[i].id);
    } else if (arrInput[i].id == "datepicker") {
      checkEmptyValue(arrInput[i].value, arrError[i].id) &&
        validationDate(arrInput[i].value, arrError[i].id, "mm/dd/yyyy");
    } else if (arrInput[i].id == "luongCB") {
      checkEmptyValue(arrInput[i].value, arrError[i].id) &&
        validationNumber(arrInput[i].value, arrError[i].id) &&
        validationOffer(
          arrInput[i].value,
          arrError[i].id,
          "1.000.000VND",
          "20.000.000VND"
        );
    } else if (arrInput[i].id == "gioLam") {
      checkEmptyValue(arrInput[i].value, arrError[i].id) &&
        validationNumber(arrInput[i].value, arrError[i].id) &&
        validationWorkingTime(
          arrInput[i].value,
          arrError[i].id,
          "80 giờ",
          "200 giờ"
        );
    } else {
      isValid &= checkEmptyValue(arrInput[i].value, arrError[i].id);
    }
    //biến id nhận dữ liệu là những id của các thẻ được dom tới arrInput
    var id = arrInput[i].id;
    // thực hiện gọi tới các thuộc tính trong đối tượng sinh viên thông qua id và truyền dữ liệu vào
    nhanVien[id] = arrInput[i].value;
  }
  if (isValid) {
    return nhanVien;
  }
}

document.getElementById("btnThemNV").onclick = function () {
  // lấy dữ liệu nhân viên trên từng input: hàm getValueUser
  var nhanVien = getValueUser();
  if (nhanVien) {
    // push phần tử nhanVien vào mảng
    arrNhanVien.push(nhanVien);
    console.log(arrNhanVien);

    // gọi dom tới thẻ form và sử dụng phương thức reset
    document.getElementById("formQLNV").reset();

    //lưu trữ dữ liệu mảng xuống localstorage
    luuDuLieuLocalStorage("arrNhanVien", arrNhanVien);
    hienThiDuLieu();
  }
};

function hienThiDuLieu(arr) {
  if (arr == undefined) {
    arr = arrNhanVien;
  }

  //chạy vòng lặp qua từng phần tử trong mảng arrNhanVien
  //tạo ra những chuỗi html xử lí vòng lặp và cộng dồn vào một biến chung
  //gọi tới thẻ cha cần chứa nội dung và truyền đoạn chuỗi html vào cho thẻ cha đó
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var nhanVien = arr[i];
    console.log(nhanVien);
    //Thực hiện việc clone object
    var newNhanVien = new NhanVien();
    nhanVien = Object.assign(newNhanVien, nhanVien);

    content += `
      <tr>
        <td>${nhanVien.tknv}</td>
        <td>${nhanVien.name}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.datepicker}</td>
        <td>${nhanVien.chucvu}</td>
        <td>${nhanVien.tongLuong()}</td>
        <td>${nhanVien.xepLoai()}</td>
        <td>
          <button onclick="getInfoUser('${
            nhanVien.tknv
          }')" class='btn btn-info' data-toggle="modal" data-target="#myModal">Sửa</button>
          <button onclick="xoaDuLieuUser('${
            nhanVien.tknv
          }')" class='btn btn-danger mt-2'>Xóa</button>
        </td>
      </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

function luuDuLieuLocalStorage(key, value) {
  var stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}

function layDuLieuLocalStorage(key) {
  var dataLocal = localStorage.getItem("arrNhanVien");
  // kiểm tra xem dữ liệu có lấy về hay không
  if (dataLocal) {
    //xử lí hành động khi lấy được dữ liệu
    var convertData = JSON.parse(dataLocal);
    arrNhanVien = convertData;
    hienThiDuLieu();
  } else {
    //xử lí hành động khi không lấy được dữ liệu
  }
}
layDuLieuLocalStorage();

function xoaDuLieuUser(tknv) {
  console.log(tknv);
  var index = -1;

  for (var i = 0; i < arrNhanVien.length; i++) {
    if (arrNhanVien[i].tknv == tknv) {
      //chắc chắn là nhân viên cần xóa
      console.log(i);
      index = i;
    }
  }
  // splice(vị trí bắt đầu xóa, số lượng cần xóa 1)
  if (index != -1) {
    arrNhanVien.splice(index, 1);
  }
  luuDuLieuLocalStorage("arrNhanVien", arrNhanVien);
  hienThiDuLieu();
}

//------------ Chức năng cập nhật nhân viên --------------
// Khi người dùng click vào nút sửa sẽ đưa dữ liệu lên input cho người dùng
// Không cho người dùng sửa tài khoản nhân viên
// Sau khi người dùng đã chỉnh sửa xong, sẽ thực hiện việc lấy thông tin người dùng sau chỉnh sửa và thay đổi dữ liệu cũ

function getInfoUser(taiKhoanNV) {
  console.log(taiKhoanNV);
  //tìm kiếm nhân viên trong mảng có tknv trùng với tham số
  var nhanVienIndex = {};

  for (var i = 0; i < arrNhanVien.length; i++) {
    var nhanVien = arrNhanVien[i];
    if (nhanVien.tknv == taiKhoanNV) {
      nhanVienIndex = nhanVien;
    }
  }

  //đưa dữ liệu lên input
  var arrInput = document.querySelectorAll("form input, form select");
  console.log(arrInput);
  for (var i = 0; i < arrInput.length; i++) {
    var htmlDom = arrInput[i];
    var id = htmlDom.id;
    htmlDom.value = nhanVienIndex[id];
  }

  //không cho phép người dùng chỉnh sửa tài khoản nhân viên
  document.getElementById("tknv").readOnly = true;
}

function updateValueUser() {
  console.log("haha");
  // lấy dữ liệu trên input về trước
  var nhanVien = getValueUser();
  console.log(nhanVien);
  // tìm vị trí của dữ liệu cũ đang nằm trong mảng
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (nhanVien.tknv == arrNhanVien[i].tknv) {
      arrNhanVien[i] = nhanVien;
    }
  }
  luuDuLieuLocalStorage("arrNhanVien", arrNhanVien);
  hienThiDuLieu();
  //sau khi người dùng bấm nút cập nhật ta sẽ reset về input trống và cho người dùng nhập tài khoản nhân viên
  document.getElementById("formQLNV").reset();
  document.getElementById("tknv").readOnly = false;
}
document.getElementById("btnCapNhat").onclick = updateValueUser;
//----------- TÌM KIẾM ------------//
function searchUser() {
  let valueSearchInput = document.getElementById("searchName").value;
  let searchUser = arrNhanVien.filter((value) => {
    return value.name.toUpperCase().includes(valueSearchInput.toUpperCase());
  });
  hienThiDuLieu(searchUser);
}

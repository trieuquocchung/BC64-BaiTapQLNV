// Dữ liệu cần kiểm tra
/*
    - Tài khoản tối đa 4-6 kí số, không để trống ----(xong)
    - Tên nhân viên phải là chữ, không để trống ----(xong)
    - Đúng định dạng email, không để trống ----(xong)
    - Mật khẩu phải có 6-10 kí tự (chứa ít nhất 1 ký tự, số, 1 kí tự in hoa, 1 kí tự đặc biệt), không để trống ----(xong)
    - Ngày làm không được để trống, định dạng mm/dd/yyyy ----(xong)
    - Lương cơ bản 1.000.000 - 20.000.000, không để trống ----(xong)
    - Chức vụ phải chọn chức vụ hợp lệ (giám đốc, trưởng phòng, nhân viên)
    - Số giờ làm trong tháng 80 - 200 giờ, không để trống
*/

function checkEmptyValue(value, errorId) {
  if (value) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(errorId).innerHTML = "*vui lòng không bỏ trống";
    return false;
  }
}

function checkEmailValue(value, errorId) {
  var regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //sử dụng phương thức test để và truyền dữ liệu muốn kiểm tra vào
  var checkEmail = regexEmail.test(value);
  //trả về 2 kết quả true và false
  if (checkEmail) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(errorId).innerHTML =
      "*vui lòng nhập đúng định dạng Email";
    return false;
  }
}

function checkMinMaxValue(value, errorId, min, max) {
  var doDaiKyTu = value.trim().length;
  if (doDaiKyTu >= min && doDaiKyTu <= max) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(
      errorId
    ).innerHTML = `*vui lòng nhập trong khoảng ${min} đến ${max} ký tự`;
    return false;
  }
}

function validationPassword(value, errorId, min, max) {
  var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
  var checkPassword = regexPassword.test(value);
  if (checkPassword) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(
      errorId
    ).innerHTML = `*vui lòng nhập từ ${min} - ${max} kí tự và chứa ít nhất 1 kí tự in hoa, 1 kí tự số, 1 kí tự đặc biệt`;
    return false;
  }
}

function checkNameValue(value, errorId) {
  var regexName = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
  var checkName = regexName.test(value);
  if (checkName) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(
      errorId
    ).innerHTML = `*vui lòng nhập họ và tên không dấu, chỉ nhập chữ và có khoảng trắng`;
    return false;
  }
}

function validationDate(value, errorId, format) {
  var regexDate =
    /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
  var checkDate = regexDate.test(value);
  if (checkDate) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(
      errorId
    ).innerHTML = `*vui lòng nhập theo định dạng ${format} và không nhập chữ`;
    return false;
  }
}

function validationNumber(value, errorId) {
  var regexOffer = /^\d+$/;
  var checkOffer = regexOffer.test(value);
  if (checkOffer) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(errorId).innerHTML = "*vui lòng không nhập chữ";
    return false;
  }
}

function validationOffer(value, errorId, min, max) {
  var luongCoBan = value;
  if (luongCoBan >= 1000000 && luongCoBan <= 20000000) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(
      errorId
    ).innerHTML = `*vui lòng nhập số tiền trong khoảng từ ${min} tới ${max}`;
    return false;
  }
}

function validationWorkingTime(value, errorId, min, max) {
  var workingTime = value;
  if (workingTime >= 80 && workingTime <= 200) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(
      errorId
    ).innerHTML = ` *vui lòng chỉ nhập trong khoảng thời gian từ ${min} tới ${max}`;
    return false;
  }
}

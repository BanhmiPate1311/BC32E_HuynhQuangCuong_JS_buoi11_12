// ---------------- GET: Lấy dữ liệu từ server về ----------------

function layDanhSachSanPham() {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetAll", //Đường dẫn backend cung cấp
    method: "GET", //method backend cung cấp
  });

  //Xử lý thành công
  promise.then(function (result) {
    // console.log(result.data);
    //Sau khi lấy dữ liệu từ backend về dùng dữ liệu đó tạo ra tr trên table
    renderSanPham(result.data);
  });

  //Xử lý thất bại
  promise.catch(function (err) {});
}

//Goi hàm lấy dữ liệu từ server khi trang web vừa load xong
window.onload = function () {
  layDanhSachSanPham();
};

// ---------------- POST: Thêm dữ liệu (Tạo dữ liệu) ----------------
document.querySelector("#creat").onclick = function () {
  var sanPham = new Product();
  //Lấy thông tin người dùng từ giao diện nhập liệu
  sanPham.id = document.querySelector("#id").value;
  sanPham.name = document.querySelector("#name").value;
  sanPham.price = document.querySelector("#price").value;
  sanPham.img = document.querySelector("#image").value;
  sanPham.type = document.querySelector("#productType").value;
  sanPham.description = document.querySelector("#description").value;

  //console.log(sinhVien);
  //Gọi api đưa dữ liệu về backend
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/CreateProduct",
    method: "POST",
    data: sanPham, //Dữ liệu gửi đi
  });

  promise.then(function (result) {
    console.log(result.data);
    //Gọi lại api lấy danh sách sinh viên sau khi thêm thành công
    layDanhSachSanPham();
  });

  promise.catch(function (error) {
    console.log(error);
  });
};

// ---------------- DEL: Xóa dữ liệu ----------------
function xoaSanPham(maSanPhamClick) {
  alert(maSanPhamClick);

  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/DeleteProduct/" + maSanPhamClick,
    method: "DELETE",
  });

  //Thành công
  promise.then(function (result) {
    console.log(result.data);
    //Gọi lại api lấy danh sách sinh viên sau khi thêm thành công
    layDanhSachSanPham();
  });
  //Thất bại
  promise.catch(function (error) {
    console.log(error);
  });
}

//Xử lý khi bấm chỉnh sửa
function chinhSua(maSanPhamClick) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetById/" + maSanPhamClick,
    method: "GET",
  });
  //Thành công
  promise.then(function (result) {
    var sanPham = result.data;
    //Đem sinh viên load lên các thẻ
    document.querySelector("#id").value = sanPham.id;
    document.querySelector("#name").value = sanPham.name;
    document.querySelector("#price").value = sanPham.price;
    document.querySelector("#image").value = sanPham.img;
    document.querySelector("#productType").value = sanPham.type;
    document.querySelector("#description").value = sanPham.description;
  });
  //Thất bại
  promise.catch(function (error) {
    console.log(error);
  });
}

// ---------------- PUT: Cập nhật dữ liệu ----------------

document.querySelector("#update").onclick = function () {
  var sanPhamUpDate = new Product();
  sanPhamUpDate.id = document.querySelector("#id").value;
  sanPhamUpDate.name = document.querySelector("#name").value;
  sanPhamUpDate.price = document.querySelector("#price").value;
  sanPhamUpDate.img = document.querySelector("#image").value;
  sanPhamUpDate.type = document.querySelector("#productType").value;
  sanPhamUpDate.description = document.querySelector("#description").value;

  //Call api
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/UpdateProduct/" + sanPhamUpDate.id,
    method: "PUT",
    data: sanPhamUpDate,
  });

  promise.then(function (result) {
    //Thành công
    // console.log(result.data);
    layDanhSachSanPham(); //Load lại table
  });
  //Thất bại
  promise.catch(function (err) {
    console.log(err);
    document.querySelector("#tableDanhSach").innerHTML =
      "không có sản phẩm này";
  });
};

// ---------------- SEARCH: Tìm dữ liệu ----------------
document.querySelector("#search").onclick = function () {
  var sanPhamSearch = document.querySelector("#searchName").value;

  //Call api
  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/Product/SearchByName?name=" + sanPhamSearch,
    method: "GET",
  });

  promise.then(function (result) {
    //Thành công
    // console.log(result.data);
    renderSanPham(result.data); //Load lại table
  });
  //Thất bại
  promise.catch(function (err) {
    document.querySelector("#tableDanhSach").innerHTML = `
      <tr>
          <td colspan="7">Khum tồn tại sản phẩm này</td>          
      </tr>
      `;
  });
};

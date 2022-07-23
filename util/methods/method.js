function renderSanPham(arrSanPham) {
  //param : input :arrSinhVien
  var html = ""; //output: string html
  for (var i = 0; i < arrSanPham.length; i++) {
    var sp = arrSanPham[i]; //Mỗi lần duyệt lấy ra 1 object sinhVien từ mảng {maSinhVien:'1',tenSinhVien:'...',...}
    html += `
              <tr>
                  <td>${sp.id}</td>
                  <td><img src="${sp.img}" class="img-fluid" alt="hình nà"></td>
                  <td>${sp.name}</td>
                  <td>${sp.price}</td>
                  <td>${sp.description}</td>
                  <td>${sp.type}</td>
                  <td>
                      <button class="btn btn-primary mr-2" onclick="xoaSanPham('${sp.id}')"><i class="fa-solid fa-trash-can"></i></button>
                      <button class="btn btn-danger" onclick="chinhSua('${sp.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                  </td>
              </tr>
          `;
  }
  document.querySelector("#tableDanhSach").innerHTML = html;
}

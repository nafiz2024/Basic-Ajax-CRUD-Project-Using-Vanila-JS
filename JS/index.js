/**
 * The JavaScript code consists of functions to create, read, update, and delete product data through
 * API calls, with loading indicators and error handling.
 */
/* Create Page JS */
async function CreateData() {
  let ProductName = document.getElementById("ProductName").value;
  let ProductCode = document.getElementById("ProductCode").value;
  let ProductImg = document.getElementById("ProductImg").value;
  let UnitPrice = document.getElementById("UnitPrice").value;
  let ProductQty = document.getElementById("ProductQty").value;
  let ProductTotal = document.getElementById("ProductTotal").value;

  let URL = "http://164.68.107.70:6060/api/v1/CreateProduct";

  document.getElementById("loader").classList.remove("d-none");

  let res = await axios.post(URL, {
    Img: ProductImg,
    ProductCode: ProductCode,
    ProductName: ProductName,
    Qty: ProductQty,
    TotalPrice: ProductTotal,
    UnitPrice: UnitPrice,
  });

  document.getElementById("loader").classList.add("d-none");

  if (res.status === 200) {
    alert("Data Creation Successfully");
    window.location = "index.html";
  } else {
    alert("Something Went Wrong");
  }
}

/* Home Page JS */
async function getList() {
  document.getElementById("loader").classList.remove("d-none");

  let URL = "http://164.68.107.70:6060/api/v1/ReadProduct";
  let res = await axios.get(URL);

  document.getElementById("loader").classList.add("d-none");
  if (res.status === 200) {
    let list = res.data["data"];

    list.forEach((item) => {
      document.getElementById("itemList").innerHTML += `<tr>
        <td>${item["ProductName"]}</td>
        <td>${item["ProductCode"]}</td>
        <td>${item["UnitPrice"]}</td>
        <td>${item["Qty"]}</td>
        <td>${item["TotalPrice"]}</td>
        <td><button onclick="deleteItem('${item["_id"]}')">Delete</button></td>
        <td><button onclick="updateItem('${item["_id"]}')">Update</button></td>
        </tr>`;
    });
  } else {
    alert("Something Went Wrong");
  }
}

async function deleteItem(id) {
  let URL = `http://164.68.107.70:6060/api/v1/DeleteProduct/${id}`;
  let res = await axios.get(URL);

  if (res.status === 200) {
    document.getElementById("itemList").innerHTML = "";
    await getList();
  } else {
    alert("Something Went Wrong");
  }
}

async function updateItem(id) {
  window.location = `update.html?id=${id}`;
}

getList();

/* Update Page JS */

fillExistingData();

async function fillExistingData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  let URL = `http://164.68.107.70:6060/api/v1/ReadProductByID/${id}`;
  document.getElementById("loader").classList.remove("d-none");
  let res = await axios.get(URL);
  document.getElementById("loader").classList.add("d-none");

  if (res.status === 200) {
    let items = res.data["data"][0];
    document.getElementById("ProductID").value = items["_id"];
    document.getElementById("ProductName").value = items["ProductName"];
    document.getElementById("ProductCode").value = items["ProductCode"];
    document.getElementById("ProductImg").value = items["Img"];
    document.getElementById("UnitPrice").value = items["UnitPrice"];
    document.getElementById("ProductQty").value = items["Qty"];
    document.getElementById("ProductTotal").value = items["TotalPrice"];
  }
}

async function UpdateData() {
  let ProductID = document.getElementById("ProductID").value;
  let ProductName = document.getElementById("ProductName").value;
  let ProductCode = document.getElementById("ProductCode").value;
  let ProductImg = document.getElementById("ProductImg").value;
  let UnitPrice = document.getElementById("UnitPrice").value;
  let ProductQty = document.getElementById("ProductQty").value;
  let ProductTotal = document.getElementById("ProductTotal").value;

  let URL = `http://164.68.107.70:6060/api/v1/UpdateProduct/${ProductID}`;

  document.getElementById("loader").classList.remove("d-none");
  let res = await axios.post(URL, {
    Img: ProductImg,
    ProductCode: ProductCode,
    ProductName: ProductName,
    Qty: ProductQty,
    TotalPrice: ProductTotal,
    UnitPrice: UnitPrice,
  });
  document.getElementById("loader").classList.add("d-none");

  if (res.status === 200) {
    alert("Data Update Successfully");
    window.location = "index.html";
  } else {
    alert("Something Went Wrong");
  }
}

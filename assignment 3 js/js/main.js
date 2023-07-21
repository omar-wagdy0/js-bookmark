
var nameInput = document.getElementById("nameInput");
var urlInput = document.getElementById("urlInput");
var addBtn = document.getElementById("addBtn");
var editBtn = document.getElementById("editBtn");
var tBody = document.getElementById("tBody");
var alertName = document.getElementById("alertName");
var alertUrl = document.getElementById("alertUrl");
var alertExited = document.getElementById("alertExited");
var listOfUrl;


if (localStorage.getItem("listOfUrl") == null) {
    listOfUrl = [];
} else {
    listOfUrl = JSON.parse(localStorage.getItem("listOfUrl"));
    displayData(listOfUrl);
}



function addUlr() {
    if (nameValidation() === true & urlValidation() === true) {
        var site = {
            name: nameInput.value,
            url: urlInput.value,
        }
        listOfUrl.push(site);
        displayData(listOfUrl);
        clearForm();
        localStorage.setItem("listOfUrl", JSON.stringify(listOfUrl));
    }
}

function displayData(site) {
    var cartona = ``;
    for (var i = 0; i < site.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${listOfUrl[i].newname ? site[i].newname : site[i].name}</td>
        <td class="d-none">${listOfUrl[i].url}</td>
        <td><button onclick="window.open(listOfUrl[${i}].url)" class="btn btn-light btn-sm "><a href="#" target="_blank" class="text-black text-decoration-none"><i class="fa-solid fa-eye"></i></a></button></td>
        <td><button onclick="getUpdateSite(${i})" class="btn btn-warning btn-sm"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button onclick="deleteData(${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash-can"></i></button></td>
    </tr>`
    }
    document.getElementById("tBody").innerHTML = cartona;
}



function clearForm() {
    nameInput.value = "";
    urlInput.value = "";
}


function deleteData(index) {
    listOfUrl.splice(index, 1);
    localStorage.setItem("listOfUrl", JSON.stringify(listOfUrl));
    displayData(listOfUrl);
}


function searchByName(term) {
    var foundedItems = [];
    for (var i = 0; i < listOfUrl.length; i++) {
        if (listOfUrl[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            listOfUrl[i].newname = listOfUrl[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`)

            foundedItems.push(listOfUrl[i]);
        }
    }
    displayData(foundedItems);
}

function getUpdateSite(index) {

    indexGlobal = index;
    nameInput.value = listOfUrl[index].name;
    urlInput.value = listOfUrl[index].url;
    addBtn.classList.add('d-none');
    editBtn.classList.remove('d-none');
}


function setUpdateSite(index) {
    listOfUrl[indexGlobal].name = nameInput.value;
    listOfUrl[indexGlobal].url = urlInput.value;
    localStorage.setItem("listOfUrl", JSON.stringify(listOfUrl));
    displayData(listOfUrl);

    clearForm();
    addBtn.classList.remove('d-none');
    editBtn.classList.add('d-none');
}


function nameValidation() {
    if (nameInput.value === '') {
        alertName.classList.remove('d-none')
        return false;
    } else {
        alertName.classList.add('d-none')
        return true;
    }
}


function urlValidation() {
    if (urlInput.value === "") {
        alertUrl.classList.remove("d-none");
        return false;
    } else {
        var isExited = false;
        for (var i = 0; i < listOfUrl.length; i++) {
            if (listOfUrl[i].url === urlInput.value) {
                isExited = true;
                break;
            }
        }

        if (isExited === true) {
            // true
            alertExited.classList.remove("d-none");
            return false;
        } else {
            alertExited.classList.add("d-none");
        }
        alertUrl.classList.add("d-none");
        return true;
    }


}

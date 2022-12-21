
var noOfBooksSelected = window.localStorage.getItem("selectedISBNs") == null ? 0 : window.localStorage.getItem("selectedISBNs").split("^").length;
var dict = {};

var booksSelected = window.localStorage.getItem("selectedISBNs") == null ? [] : window.localStorage.getItem("selectedISBNs").split("^");
for (var i = 0; i < booksSelected.length; i++) { 
    dict[booksSelected[i]] = 1;
}
console.log(dict);

var namesSelected = window.localStorage.getItem("selectedNames") == null ? [] : window.localStorage.getItem("selectedNames").split("^");
var authsSelected = window.localStorage.getItem("selectedAuths") == null ? [] : window.localStorage.getItem("selectedAuths").split("^");
var yearsSelected = window.localStorage.getItem("selectedYears") == null ? [] : window.localStorage.getItem("selectedYears").split("^");
var genresSelected = window.localStorage.getItem("selectedGenres") == null ? [] : window.localStorage.getItem("selectedGenres").split("^");
var pricesSelected = window.localStorage.getItem("selectedPrices") == null ? [] : window.localStorage.getItem("selectedPrices").split("^");


function dropDownTextToggle(txt) { 
    document.getElementById("dropdownText").textContent = txt;
    document.getElementById("disabledSearchFactor").value = txt;
}

if (noOfBooksSelected >= 1) {
    document.getElementById("lend_btn").style.display = "block";
    document.getElementById("selectedBooksHeading").style.display = "block";
    document.getElementById("selectedTable").style.display = "table";

} else { 
    document.getElementById("lend_btn").style.display = "none";
    document.getElementById("selectedBooksHeading").style.display = "none";
    document.getElementById("selectedTable").style.display = "none";
}


let row = document.getElementById("resultTable").childNodes[3].childNodes;
for (let i = 0; i < row.length; i++) { 
    if (row[i].id != undefined && row[i].id.substring(0, row[i].id.length - 1) in dict) {
        console.log(row[i].id + " " + row[i].id.substring(0, row[i].id.length - 1));
        console.log(document.getElementById(row[i].id.substring(0, row[i].id.length - 1)));
        document.getElementById(row[i].id.substring(0, row[i].id.length - 1)).classList.add("active");
    }
}



function addBook(id) { 
    if (document.getElementById(id).classList.contains("active")) {
        document.getElementById(id).classList.remove("active");
        noOfBooksSelected = booksSelected.length - 1;
        for (let i = 0; i < booksSelected.length; i++) { 
            if (booksSelected[i] == id) { 
                booksSelected.splice(i, 1);
                namesSelected.splice(i, 1);
                authsSelected.splice(i, 1);
                yearsSelected.splice(i, 1);
                genresSelected.splice(i, 1);
                pricesSelected.splice(i, 1);
                let tableRef = document.getElementById("selectedTable");
                tableRef.deleteRow(i+1);
                i--;
            }
        }
    } else { 
        document.getElementById(id).classList.add("active");
        booksSelected.push(id);
        noOfBooksSelected = booksSelected.length + 1;

        let tableRef = document.getElementById("selectedTableBody");
        let newRow = tableRef.insertRow();
        let newName = newRow.insertCell(0);
        let newAuth = newRow.insertCell(1);
        let newYear = newRow.insertCell(2);
        let newGenre = newRow.insertCell(3);
        let newNPrice = newRow.insertCell(4);
        let newewIsbn = newRow.insertCell(5);
        let row = document.getElementById(id + "A");
        let name = document.createTextNode(row.getElementsByTagName("td")[1].innerText);
        let auth = document.createTextNode(row.getElementsByTagName("td")[2].innerText);
        let year = document.createTextNode(row.getElementsByTagName("td")[3].innerText);
        let genre = document.createTextNode(row.getElementsByTagName("td")[4].innerText);
        let price = document.createTextNode(row.getElementsByTagName("td")[5].innerText);
        let isbn = document.createTextNode(row.getElementsByTagName("td")[6].innerText);
        namesSelected.push(row.getElementsByTagName("td")[1].innerText);
        authsSelected.push(row.getElementsByTagName("td")[2].innerText);
        yearsSelected.push(row.getElementsByTagName("td")[3].innerText);
        genresSelected.push(row.getElementsByTagName("td")[4].innerText);
        pricesSelected.push(row.getElementsByTagName("td")[5].innerText);
        newName.appendChild(name);
        newAuth.appendChild(auth);
        newYear.appendChild(year);
        newGenre.appendChild(genre);
        newNPrice.appendChild(price);
        newewIsbn.appendChild(isbn);
    }
    if (noOfBooksSelected >= 1) {
        document.getElementById("lend_btn").style.display = "block";
        document.getElementById("selectedBooksHeading").style.display = "block";
        document.getElementById("selectedTable").style.display = "table";

    } else { 
        document.getElementById("lend_btn").style.display = "none";
        document.getElementById("selectedBooksHeading").style.display = "none";
        document.getElementById("selectedTable").style.display = "none";
    }
    document.getElementById("booksSelectedInp").value = booksSelected.join("^");

    window.localStorage.setItem("selectedISBNs", document.getElementById("booksSelectedInp").value);
    window.localStorage.setItem("selectedNames", namesSelected.join("^"));
    window.localStorage.setItem("selectedAuths", authsSelected.join("^"));
    window.localStorage.setItem("selectedYears", yearsSelected.join("^"));
    window.localStorage.setItem("selectedGenres", genresSelected.join("^"));
    window.localStorage.setItem("selectedPrices", pricesSelected.join("^"));
}


document.getElementById("bookLend").onsubmit = function (form) { 
    form.preventDefault();
    if (confirm("Are you sure to lend the selected books?")) { 
        this.submit();
    }
}


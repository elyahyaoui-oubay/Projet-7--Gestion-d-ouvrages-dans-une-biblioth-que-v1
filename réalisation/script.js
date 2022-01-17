var workManager = new WorkManager();
var selectedRow = null;
var rowId = null;
insertNewRow()

document.getElementById("afficheButtons").addEventListener("click", function() {
    var formulaireCarte = document.getElementById('formulaireCarte')
    formulaireCarte.classList.toggle("d-none")
})

document.getElementById("soumettreFormul").addEventListener("submit", function (event) {
    event.preventDefault();
    var work = readwork();
    if (selectedRow == null) {
        
        workManager.addWork(work);
        alert(work.workDetail())
    } else
    if (confirm("Êtes-vous sûr de modifier cette œuvre?")){
        work.id = rowId;
        workManager.editWork(work)

    }
        
    insertNewRow();

    resetForm();
})

function resetForm() {
    document.getElementById("titreEntrée").value = "";
    document.getElementById("auteurEntrée").value = "";
    document.getElementById("prix").value = "";
    document.getElementById("dateEntrée").value = "";
    document.getElementById("langue").value = "";
    document.querySelector('input[name="typeTravail"]:checked').checked = false
    selectedRow = null;
}



function readwork() {
    var work = new Work();
    
    work.title = document.getElementById("titreEntrée").value;
    work["author"] = document.getElementById("auteurEntrée").value;
    work["price"] = parseFloat(document.getElementById("prix").value);
    work["date"] = document.getElementById("dateEntrée").value;
    work["language"] = document.getElementById("langue").value;
    work["type"] = document.querySelector('input[name="typeTravail"]:checked').value
    return work;
}

function insertNewRow() {
    var workList = workManager.getAllItems()
    var tableBody = document.getElementById("tableauTravaux").getElementsByTagName('tbody')[0];
    
    while(tableBody.rows.length > 0) {
        tableBody.deleteRow(0);
      }


    for(var i = 0; i < workList.length; i++){
        var newRow = tableBody.insertRow(tableBody.length);
        newRow.insertCell(0).innerHTML = workList[i].id;

        cell2 = newRow.insertCell(1)
        cell2.innerHTML = workList[i].title;

        cell3 = newRow.insertCell(2);
        cell3.innerHTML = workList[i].author;
        cell3.className = "d-none d-lg-table-cell"

        cell4 = newRow.insertCell(3);
        cell4.innerHTML = workList[i].price;
        cell4.className = "d-none d-lg-table-cell"

        cell5 = newRow.insertCell(4);
        cell5.innerHTML = workList[i].date;
        cell5.className = "d-none d-lg-table-cell"

        cell6 = newRow.insertCell(5);
        cell6.innerHTML = workList[i].language

        cell7 = newRow.insertCell(6)
        cell7.innerHTML = workList[i].type
        cell7.className = "d-none d-lg-table-cell"


        cell8 = newRow.insertCell(7)

        var editButton = document.createElement("button")
        var deleteButton = document.createElement("button")

        var editContent = document.createTextNode("Modifier")
        editButton.appendChild(editContent)
        editButton.className = "btn-custom btn-primary-custom me-1"
        editButton.setAttribute('onclick', 'onEdit(this)')

        var deleteContent = document.createTextNode('Supprimer')
        deleteButton.appendChild(deleteContent)
        deleteButton.className = "btn-custom btn-secondary-custom"
        deleteButton.setAttribute("onclick", 'onDelete(this)')

        cell8.appendChild(editButton)
        cell8.appendChild(deleteButton)
    }
    
}

function onEdit(buttonReference) {
    document.getElementById('formulaireCarte').classList.remove("d-none")
    selectedRow = buttonReference.parentElement.parentElement;
    rowId = selectedRow.cells[0].innerHTML
    var work = new Work();
    work = workManager.getItem(rowId)
    document.getElementById("titreEntrée").value = work.title;
    document.getElementById("auteurEntrée").value = work.author;
    document.getElementById("prix").value = work.price;
    document.getElementById("dateEntrée").value = work.date;
    document.getElementById("langue").value = work.language;

    var checkValue = document.getElementsByName("typeTravail");
    for (var i = 0; i < checkValue.length; i++) {
        if (checkValue[i].value == work.type) {
            checkValue[i].checked = true
        }
    }

}

function onDelete(buttonReference) {
    if (confirm("Êtes-vous sûr de supprimer cette œuvre?")) {
        var row = buttonReference.parentElement.parentElement;
        var rowId = row.cells[0].innerHTML

        document.getElementById("tableauTravaux").deleteRow(row.rowIndex)
        
        workManager.deleteWork(rowId)
        resetForm()
    }
}

function onPrint() {
    var tab = document.getElementById('tableauTravaux');
    var win = window.open();
    win.document.write(tab.outerHTML);
    win.document.close();
    win.print();
}
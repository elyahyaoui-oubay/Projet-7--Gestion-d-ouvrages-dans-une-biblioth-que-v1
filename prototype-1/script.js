document.getElementById("formSubmit").addEventListener("submit", function (event) {
    event.preventDefault();
    var work = readwork();
    insertNewRow(ouvrage);
})


function lireouvrage() {

    var ouvrage = {};
    ouvrage["titre"] = document.getElementById("titreEntrée").value;
    ouvrage["auteur"] = document.getElementById("auteurEntrée").value;
    ouvrage["prix"] = parseFloat(document.getElementById("prixEntrée").value);
    ouvrage["date"] = document.getElementById("dateEntrée").value;
    ouvrage["langue"] = document.getElementById("langueEntrée").value;
    var cheackValues = document.getElementsByName("ouvrageType");
    for (var i = 0; i < cheackValues.length; i++) {
        if (cheackValues[i].checked) {
            ouvrage["type"] = cheackValues[i].value;
            break;
        }
    }
    return ouvrage;
}



function insertNewRow(ouvrage) {
    var tableBody = document.getElementById("ouvragesTable").getElementsByTagName('tbody')[0];
    var newRow = tableBody.insertRow(tableBody.length);
    newRow.insertCell(0).innerHTML = ouvrage.title;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = ouvrage.author;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = ouvrage.price;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = ouvrage.date;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = ouvrage.language
    cell6 = newRow.insertCell(5)
    cell6.innerHTML = ouvrage.type
    cell7 = newRow.insertCell(6)


}
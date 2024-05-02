const inputBtnEl = document.getElementById("input-btn-el");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtnEl = document.getElementById("delete-btn-el");
const saveBtnEl = document.getElementById("save-btn-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("MyLeads"));

let myLeads = [];

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let listItem = "";
    for (let count = 0; count < leads.length; count++){
        listItem += `<li><a href='${leads[count]}' target='_blank'>${leads[count]}</a></li>`;
    }
    ulEl.innerHTML = listItem;
}

inputBtnEl.addEventListener("click", function() {
    if (inputEl.value.trim().length !== 0) {
        myLeads.push(inputEl.value);
        inputEl.value = "";
        localStorage.setItem("MyLeads", JSON.stringify(myLeads));
    }
    render(myLeads);

    console.log(localStorage.getItem("MyLeads"));
});

deleteBtnEl.addEventListener("click", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

saveBtnEl.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs);
        myLeads.push(tabs[0].url);
        localStorage.setItem("MyLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});
let selects = document.querySelectorAll("select");

let btn = document.querySelector("button");
let rate = document.querySelector(".rate");
let amount = document.querySelector("input");
let icon = document.querySelector("i");

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");

for (const select of selects) {
    for (const currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } 
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
    }
    select / addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    console.log(amount.value);
    let URL = `https://open.er-api.com/v6/latest/${fromCurr.value}`;

    let response = await fetch(URL);
    let data = await response.json();
    console.log(data.rates[toCurr.value]);
    rate.innerText = `${amount.value}${fromCurr.value} = ${amount.value * data.rates[toCurr.value]}${toCurr.value}`;
    rate.style.opacity = "1";
})

icon.addEventListener("click", (element) => {
    let temp;
    temp = toCurr.value;
    toCurr.value = fromCurr.value;
    fromCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);
})
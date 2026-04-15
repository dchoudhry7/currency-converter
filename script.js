const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const swap=document.querySelector("i");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="from" && currCode=="USD"){
            newOption.selected=true;
        }else if(select.name=="to" && currCode=="INR"){
            newOption.selected=true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    if(amountValue=="" || amountValue<0){
        amountValue=0;
        amount.value="0";
    }
    const URL=`${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount=amountValue*rate;
    msg.innerText=`${amountValue}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
})

swap.addEventListener("click",(evt)=>{
    evt.preventDefault();
    let temporary=fromCurr.value;
    fromCurr.value=toCurr.value;
    toCurr.value=temporary;
    updateFlag(fromCurr);
    updateFlag(toCurr);
    btn.click();
})
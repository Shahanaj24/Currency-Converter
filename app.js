const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


  const dropdownS = document.querySelectorAll(".drop-down select");
  const btn = document.querySelector(".msg button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".To select");
  const result = document.querySelector(".result")
  for(let select of dropdownS)
{
  for (currCode in countryList)
  {
     let newOption = document.createElement("option");
     newOption.innerText = currCode;
     newOption.value = currCode;
     if(select.name === "from" && currCode ==="USD")
     {
        newOption.selected ="selected";
     }
    else if(select.name === "to" && currCode ==="INR")
     {
        newOption.selected ="selected";
     }
     select.append(newOption);
  }
  select.addEventListener("change" ,(evt) =>{
    UpdateFlag(evt.target);
  })
}

const UpdateFlag = (element) =>{
    // console.log(element);
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;

}
const UpdateEvent = async () =>
{
 let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval == "" || amtval < 1)
    {
        amtVal = 1;
        amount.value ="1";

    }
    //  console.log(fromCurr.value.toLowerCase() , toCurr.value.toLowerCase());
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    console.log(response);
     let data = await response.json();
    
    //   console.log(amtval);
    //   console.log(rate);
     
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalV = (amtval * rate).toFixed(2);

  result.innerText = `${amtval} ${fromCurr.value} = ${finalV} ${toCurr.value}`;
}
btn.addEventListener("click" ,(evt) =>{
    evt.preventDefault();
     UpdateEvent();

   
});
window.addEventListener("load" , ()=>
{
  UpdateEvent();

});



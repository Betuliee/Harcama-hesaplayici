// console.log('Baglanti kontrol')

// inputlar
// ekle butonu
// listeleyen eleman


const harcamaInput = document.querySelector('#harcama');
// console.log(harcamaInput)

const fiyatInput = document.querySelector('#fiyat');
// console.log(fiyatInput)

const formBtn = document.querySelector('.ekle-btn');
// console.log(formBtn)

const list = document.querySelector('.list');

const totalInfo = document.querySelector('#total-info');
// console.log(totalInfo)

const nameInput = document.getElementById("name-input")
// console.log(nameInput);

const statusCheck = document.getElementById("status-input");
//console.log(statusCheck)

const selectFilter = document.getElementById("filter-select");
//console.log(selectFilter)

const userName = localStorage.getItem('name');

nameInput.value = userName;

nameInput.addEventListener('change', (e) => {
    // console.log(e.target.value)
    localStorage.setItem('name', e.target.value);
})

formBtn.addEventListener('click', addExpense);
list.addEventListener('click', handleClick);
selectFilter.addEventListener('change', handleFilter);

let toplam = 0;

function updateToplam(fiyatBilgisi) {

    toplam += Number(fiyatBilgisi);
    totalInfo.innerText = toplam;
}

function addExpense(e) {

    e.preventDefault();
    // console.log('addExpense')
    // console.log(harcamaInput.value)

    if (!harcamaInput.value || !fiyatInput.value) {
        alert('Tum bos alanlari doldurun');
        // return 
    } else {
        const harcamaDiv = document.createElement('div');
        harcamaDiv.classList.add('expense');

        if (statusCheck.checked) {
            console.log(statusCheck.checked);
            //kartın claslarına payed classını ekle
            harcamaDiv.classList.add("payed");
        }

        harcamaDiv.innerHTML =
            `<h2>${harcamaInput.value}</h2>
        <h2 id='value'>${fiyatInput.value}</h2>
        <div class="buttons">
            <img id='payment' src="./img/pay.png" alt="">
            <img id='remove' src="./img/remove.png" alt="">
        </div>`;

        list.appendChild(harcamaDiv);
        // console.log(harcamaDiv);
        updateToplam(fiyatInput.value);
    }
    harcamaInput.value = '';
    fiyatInput.value = '';
}

function handleClick(e) {

    let clickled = e.target;

    if (clickled.id === "remove") {
        //console.log(clickled.parentElement.parentElement);

        const kapsayiciEleman = clickled.parentElement.parentElement;
        console.log(kapsayiciEleman)

        const deletedPrice = kapsayiciEleman.querySelector("#value").innerText;
        console.log(deletedPrice)
        updateToplam(-Number(deletedPrice));
        kapsayiciEleman.remove();
    }
}

function handleFilter(e) {
    // console.log('filtre fonksiyorn');

    const items = list.childNodes;
    const filterValue = e.target.value;
    // console.log(filterValue);

    items.forEach((item) => {
        // console.log(item)

        switch (filterValue) {
            case "all":
                item.style.display = "flex";
                break;

            case "payed":
                if (!item.classList.contains("payed")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
                break;

            case "not-payed":
                if (item.classList.contains("payed")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
                break;

        }
    })


}


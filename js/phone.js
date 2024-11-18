const loadPhone = async (search='13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent='';
    const showAll = document.getElementById('show-all')

    if(phones.length >12 && !isShowAll){
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        phoneCard.innerHTML = `
        <figure>
                        <img src="${phone.image}"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoading(false);
}

const handleShowDetail = async (id) => {
    //console.log(id);
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data)
    const phone = data.data;
    showPhoneDetail(phone);
}

const showPhoneDetail = (phone) => {
    console.log(phone);
    show_detail.showModal();
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src = "${phone.image}" />
    <p><span>Brand: </span>${phone?.brand}</p>
    <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span>ID: </span>${phone?.slug}</p>
    <p><span>Release date: </span>${phone?.releaseDate}</p>
    <p><span>GPS: </span>${phone?.others?.GPS}</p>


    `
}

const handleSearch = (isShowAll) =>{
    toggleLoading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText,isShowAll);

}

const toggleLoading = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();

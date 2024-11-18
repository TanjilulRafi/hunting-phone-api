const loadPhone = async (search) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    const phones = data.data
    console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent='';
    const showAll = document.getElementById('show-all')

    if(phones.length >12){
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }
    phones = phones.slice(0,12);

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
                        
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoading(false);
}

const handleSearch = () =>{
    toggleLoading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);

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


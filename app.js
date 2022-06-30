// switch
const switchBtnEl = document.querySelector(".switch-btn");
const preloaderEl = document.querySelector(".preloader");

switchBtnEl.addEventListener("click", function () {
  if (!switchBtnEl.classList.contains("slide")) {
    switchBtnEl.classList.add("slide");
    document.body.style.background = "rgb(28, 29, 104)";

    const card = document.getElementsByClassName("card");
    card.style.background = "rgb(105, 105, 105)";
    card.style.color = "#fff";
  } else {
    switchBtnEl.classList.remove("slide");
    document.body.style.background = "#fff";
    const card = document.getElementsByClassName("card");
    card.style.background = "#fff";
    card.style.color = "#212529";
  }
});

// api
// phone Details
const phoneDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => loadDetails(data.data));
};

const loadDetails = (details) => {
  const divCardInfo = document.getElementById("divCardInfo");
  divCardInfo.textContent = "";

  const div = document.createElement("div");

  div.innerHTML = `
  <div class="row g-0">
          <div class="col-md-4">
            <img src="${details.image}" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title text-primary font-weight-bolder">${details.name}</h3>
              <h5 class="text-info">${details.brand}</h5>
              <p class="card-text">Chipset:
                ${details.mainFeatures.chipSet}, DisplaySize: ${details.mainFeatures.displaySize}, 
                Memory: ${details.mainFeatures.storage},
                <br>
                Sensors: ${details.mainFeatures.sensors}

              </p>
              <p class="card-text">
                <small class="text-muted">${details.releaseDate}</small>
              </p>
            </div>
          </div>
        </div>
  `;

  divCardInfo.appendChild(div);
};

// SearchPhone
document.getElementById("search-btn").addEventListener("click", () => {
  const searchPhone = document.getElementById("search-box").value;

  loadPhone(searchPhone);

  document.getElementById("search-box").value = "";
});

const loadPhone = (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data));
};

const displayPhone = (phonesearch) => {
  const divCard = document.getElementById("div-card");

  divCard.textContent = "";

  phonesearch?.forEach((loop) => {
    const div = document.createElement("div");

    div.classList.add("card");
    div.classList.add("col-xs-12");
    div.classList.add("col-md-6");
    div.classList.add("col-lg-4");

    div.innerHTML = `
    <img src="${loop.image}" class="card-img-top w-50 img-fluid rounded mx-auto d-block" alt="..." />
    <div class="card-body">
      <h4 class="card-title text-center">${loop.brand}</h4>  
      <h5 class="card-title text-center">${loop.phone_name}</h5>
      <h4 class="card-text text-center">
      ${loop.slug}
      </h4>
      <button onclick='phoneDetail("${loop.slug}")' class="btn btn-primary d-block mx-auto mt-3">Go somewhere</button>
    </div>
    `;

    divCard.appendChild(div);
  });
};

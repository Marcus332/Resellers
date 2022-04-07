const localUser = localStorage.getItem('user');

if (!localUser) {
  window.alert('du skal være logget ind for at være her');
  location.href = '/login';
}

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('dom loaded');
  console.log(localUser);
  fetch('/listUserProducts/' + JSON.parse(localUser).email, { method: 'GET' })
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        return response.json();
      }
      throw new Error('Request fejlede');
    })
    .then(function (data) {
      const productshtml = document.getElementById('products');
      let producthtml = '';
      console.log(data);
      for (let product in data) {
        producthtml += `<div id="product" class="p-${product}">`;
        producthtml += `<h3>${data[product].product}</h3>`;
        producthtml += `<p>${data[product].price}</p>`;
        producthtml += `<img src="${data[product].image}" />`;
        producthtml += `<br><br>`;
        producthtml += `<button value="${data[product].Idproduct}" onclick="deleteProduct(this.value)" class="btn btn-danger"> Slet 
        </button> `;
        producthtml += `<button value="${data[product].Idproduct}" onclick="updateProduct(this.value)" class="btn btn-secondary"> Opdater 
        </button>`;
        producthtml += `</div>`;
      }
      productshtml.innerHTML = producthtml;
    })
    
    .catch(function (error) {
      console.log(error);
    });
    
  document.getElementById('logoutForm').addEventListener('submit', (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(localUser),
    })
      .then((response) => response.text())
      .then((response) => {
        if (response) {
          localStorage.removeItem('user');
          location.href = '/login';
          console.log(response);
        }
      })
      .catch(() => {
        window.alert('brugeren eksisterer ikke - login');
      });
  });
});

function updateProduct (Idproduct) {
  location.href = `/updateproduct/${Idproduct}`;
};

function deleteProduct(Idproduct) {
  let product = {
    Idproduct: Idproduct
  }
  console.log(Idproduct + "user")

  fetch("http://localhost:3000/deleteProduct", {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(product)
  })
  .then((response) => response.text())
.then((response) => {
  if (response) {
    location.href = "/user";
    window.alert("produktet er slettet");

  }
})
.catch(() => {
  window.alert("der skete vist en fejl")
});
};


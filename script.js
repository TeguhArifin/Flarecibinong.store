document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "ROMAN CANDLE 8 SHOT",
      price: 35000,
      description: "Harga /pcs",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXLirlnOecVO_VOS0iKZCVwraucE5rPISYcC0prw3dQtvpG8EWVRX-RL5P45Jw47l0xrePsHZp-dSTH9IctSLll92NAPbUJpgyAe-HLVmw_uQh_b1r6eMh7AoqJpWzijbaw5dbyEpNGLUZRfxilNs5gTTiLFV7uWoPITBJNtCL5afgkK4zQ8GncneMf9do/s1536/1001088449.png",
    },
    {
      id: 2,
      name: "SMOKE BOMB N2",
      price: 80000,
      description: "Harga /pack isi 5",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQ59SSPjPdyRkP8DeZvLPE5FtERsMSQWAzooiXN3f8F0mZ1tcJ4lwQQnbG65y4MSm-IGzvCjD5ODxGRJJTbSF9ToDlD_Wualm100lvVC2kDXKWn3TkDNee1V1-PkaeWVoF0YX3bouxQaFr_xq3HZ9g9dPyBKLT8uWzTbjiOopl2FNzEQE-qbctVvQniTQS/s320/",
    },
    {
      id: 3,
      name: "ROMAN CANDLE 5S",
      price: 25000,
      description: "Harga /pcs",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5l1Jn2y5Ttwa6JABF8-cH1Z1M4hTrg7yRS7zJxyoUEUw6Z_UEaDGFKw8Mm0g0V2W8vAoKi5v4_N8Xxgi7bpkdpSv86VMf_YgXP0NnJJW-kfDQlJENL-vQBr0_M9uaZXCqP_6MbrCxB0GbluiTWk9R-FZh1b4fRHR4fS13cq0CRwHYzh3iVzOGKQCJiIAz/s320/1001084615.png",
    },
    {
      id: 4,
      name: "RED FLARE DNS 60 detik",
      price: 65000,
      description: "Harga /pcs",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSlTqzh-1y7r2tHQP8iSUWcyQP99-31XDW4VKMNKIBapSToDp9Qkl27KKWyuQSeLVzaBM5rat1OUf3VZd2oeJZLNEzWNyM5hh5dpo8IwbS9asSrsU9qH5AEiTJVWVFc5uiXoz05jB-oMpZUxYgaO-6jCTKZhM2x8U6PMiJ9j8reyaYf9ZxP7M4MEA4uoEF/s320/1001084629.png",
    },
  ];

  const productGrid = document.getElementById("product-grid");
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");
  const modal = document.getElementById("cart-modal");
  const closeModal = document.querySelector(".close-button");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const whatsappCheckout = document.getElementById("whatsapp-checkout");

  let cart = [];
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderProducts = () => {
    productGrid.innerHTML = "";
    products.forEach((product) => {
      const productCard = `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="desc">${product.description}</p>
                    <p class="price">${formatCurrency(product.price)}</p>
                    <button class="btn add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                    </button>
                </div>
            `;
      productGrid.innerHTML += productCard;
    });
  };

  const updateCart = () => {
    cartCount.textContent = cart.length;
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Keranjangmu masih kosong.</p>";
      cartTotal.textContent = formatCurrency(0);
    } else {
      cartItemsContainer.innerHTML = "";
      let total = 0;
      cart.forEach((item) => {
        const cartItem = `
                    <div class="cart-item">
                        <span>${item.name}</span>
                        <strong>${formatCurrency(item.price)}</strong>
                    </div>
                `;
        cartItemsContainer.innerHTML += cartItem;
        total += item.price;
      });
      cartTotal.textContent = formatCurrency(total);
    }
    updateWhatsAppLink();
  };

  const updateWhatsAppLink = () => {
    if (cart.length === 0) {
      whatsappCheckout.style.display = "none";
      return;
    }
    whatsappCheckout.style.display = "inline-block";

    const groupedCart = {};
    cart.forEach((item) => {
      if (groupedCart[item.id]) {
        groupedCart[item.id].quantity++;
      } else {
        groupedCart[item.id] = {
          ...item,
          quantity: 1,
        };
      }
    });

    const phoneNumber = "6289662424177";
    let message = "Halo, saya mau pesan:\n";
    let total = 0;

    for (const id in groupedCart) {
      const item = groupedCart[id];
      message += `- ${item.quantity}x ${item.name} (${formatCurrency(
        item.price
      )})\n`;
      total += item.price * item.quantity;
    }

    message += `\n*Total Pesanan: ${formatCurrency(total)}*`;

    const encodedMessage = encodeURIComponent(message);
    whatsappCheckout.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const addToCart = (productId) => {
    const productToAdd = products.find((p) => p.id === productId);
    if (productToAdd) {
      cart.push(productToAdd);
      updateCart();
      cartIcon.classList.add("shake");
      setTimeout(() => cartIcon.classList.remove("shake"), 500);
    }
  };

  const showNotification = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 3000);
  };

  const resetCart = () => {
    cart = [];
    updateCart();
  };

  productGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    }
  });

  cartIcon.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });

  whatsappCheckout.addEventListener("click", () => {
    if (cart.length > 0) {
      showNotification(
        "✅ Pesanan dialihkan ke WhatsApp! Keranjang telah direset."
      );

      setTimeout(() => {
        resetCart();
        modal.style.display = "none";
      }, 1000);
    }
  });
  renderProducts();
  updateCart();
});

const style = document.createElement("style");
style.innerHTML = `
.cart-icon.shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", function () {
  // Variables del carrito
  let cart = [];
  const cartContainer = document.getElementById("cartContainer");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");
  const cartFloat = document.getElementById("cartFloat");
  const closeCart = document.getElementById("closeCart");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Función para mostrar notificación de producto agregado
  function showAddedNotification() {
    const notification = document.createElement("div");
    notification.className = "added-notification show";
    notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Producto agregado</span>
        `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Función para ajustar el hero section
  function adjustHero() {
    const navbar = document.querySelector(".navbar");
    const hero = document.querySelector(".hero");
    const navbarHeight = navbar.offsetHeight;

    hero.style.height = `calc(100vh - ${navbarHeight}px)`;

    setTimeout(() => {
      hero.classList.add("hero-loaded");
    }, 100);
  }

  // Ajustar inicialmente
  adjustHero();

  // Ajustar al cambiar tamaño de ventana
  window.addEventListener("resize", adjustHero);

  // Menu toggle para móviles
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Cerrar menú al hacer clic en un enlace
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navLinks.classList.remove("active");
    });
  });

  // Scroll suave para enlaces
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const navbarHeight = document.querySelector(".navbar").offsetHeight;

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: "smooth",
        });
      }
    });
  });

  // Filtrado del menú
  let menuItems;
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Datos del menú
  const menuData = [
    // Platos principales
    {
      id: 1,
      name: "Pollo Broaster",
      description:
        "Crocante pollo broaster acompañado de papas fritas y ensalada fresca",
      price: 11.0,
      category: "platos-principales",
      image: "images/pollo-broaster.jpg",
      available: true,
    },
    {
      id: 2,
      name: "Mostrito",
      description:
        "Delicioso mostrito con carne, papas y salsa especial de la casa",
      price: 13.0,
      category: "platos-principales",
      image: "images/mostrito.jpg",
      available: true,
    },
    {
      id: 3,
      name: "Lomito de Carne",
      description: "Jugoso lomito de res a la parrilla con guarnición al gusto",
      price: 14.0,
      category: "platos-principales",
      image: "images/lomito-carne.jpg",
      available: true,
    },
    {
      id: 4,
      name: "Lomito de Pollo",
      description: "Tierno lomito de pollo grillado con acompañamiento",
      price: 13.0,
      category: "platos-principales",
      image: "images/lomito-pollo.jpg",
      available: true,
    },
    {
      id: 5,
      name: "Chaufa",
      description:
        "Arroz chaufa tradicional preparado con ingredientes frescos",
      price: 14.0,
      category: "platos-principales",
      image: "images/chaufa.jpg",
      available: true,
    },
    {
      id: 6,
      name: "Pollo a la Plancha",
      description: "Pechuga de pollo a la plancha con vegetales salteados",
      price: 13.0,
      category: "platos-principales",
      image: "images/pollo-plancha.jpg",
      available: true,
    },
    {
      id: 7,
      name: "Tallarín Criollo",
      description: "Tallarines al estilo peruano con salsa criolla y carne",
      price: 14.0,
      category: "platos-principales",
      image: "images/tallarin-criollo.jpg",
      available: true,
    },
    {
      id: 8,
      name: "Caldo de Gallina",
      description: "Reconfortante caldo preparado con gallina de corral",
      price: 10.0,
      category: "platos-principales",
      image: "images/caldo-gallina.jpg",
      available: true,
    },

    // Hamburguesas
    {
      id: 9,
      name: "Hamburguesa Simple",
      description: "Clásica hamburguesa con carne, lechuga, tomate y salsa",
      price: 5.0,
      category: "hamburguesas",
      image: "images/hamburguesa-simple.jpg",
      available: true,
    },
    {
      id: 10,
      name: "Hamburguesa Royal",
      description: "Doble carne con queso, tocino y salsa especial",
      price: 6.0,
      category: "hamburguesas",
      image: "images/hamburguesa-royal.jpg",
      available: true,
    },
    {
      id: 11,
      name: "Hamburguesa Completa",
      description: "Incluye carne, jamón, queso, huevo y todos los aderezos",
      price: 8.0,
      category: "hamburguesas",
      image: "images/hamburguesa-completa.jpg",
      available: true,
    },
    {
      id: 12,
      name: "Hamburguesa Filete de Pollo",
      description: "Filete de pollo empanizado con vegetales frescos",
      price: 8.0,
      category: "hamburguesas",
      image: "images/hamburguesa-pollo.jpg",
      available: true,
    },
    {
      id: 13,
      name: "Salchicono",
      description: "Especial salchipapa con salchichas premium y toppings",
      price: 8.0,
      category: "hamburguesas",
      image: "images/salchicono.jpg",
      available: true,
    },

    // Postres
    {
      id: 14,
      name: "Ensalada de Frutas",
      description: "Mezcla de frutas frescas de temporada",
      price: 8.0,
      category: "postres",
      image: "images/ensalada-frutas.jpg",
      available: true,
    },
    {
      id: 15,
      name: "Copa de Helado",
      description: "Deliciosa copa con tres sabores de helado a elección",
      price: 5.0,
      category: "postres",
      image: "images/copa-helado.jpg",
      available: true,
    },
    {
      id: 16,
      name: "Waffles",
      description: "Crujientes waffles con toppings de tu preferencia",
      price: 9.0,
      category: "postres",
      image: "images/waffles.jpg",
      available: false,
    },

    // Bebidas
    {
      id: 17,
      name: "Jugo Surtido",
      description: "Refrescante mezcla de frutas de temporada",
      price: 3.0,
      category: "bebidas",
      image: "images/jugo-surtido.jpg",
      available: true,
    },
    {
      id: 18,
      name: "Jugo de Papaya",
      description: "Natural jugo de papaya rico en fibra",
      price: 5.0,
      category: "bebidas",
      image: "images/jugo-papaya.jpg",
      available: true,
    },
    {
      id: 19,
      name: "Jugo de Piña",
      description: "Jugo natural de piña refrescante",
      price: 5.0,
      category: "bebidas",
      image: "images/jugo-pina.jpg",
      available: true,
    },
    {
      id: 20,
      name: "Café",
      description: "Café pasado o espresso al gusto",
      price: 3.0,
      category: "bebidas",
      image: "images/cafe.jpg",
      available: true,
    },
    {
      id: 21,
      name: "Infusión",
      description: "Variedad de infusiones herbales",
      price: 2.0,
      category: "bebidas",
      image: "images/infusion.jpg",
      available: true,
    },
  ];

  // Generar ítems del menú
  function generateMenuItems() {
    const menuContainer = document.querySelector(".menu-items");
    menuContainer.innerHTML = "";

    menuData.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.className = "menu-item";
      menuItem.setAttribute("data-category", item.category);

      // Mostrar solo platos principales inicialmente
      menuItem.style.display =
        item.category === "platos-principales" ? "block" : "none";

      const availabilityClass = item.available ? "available" : "not-available";
      const availabilityText = item.available ? "Disponible" : "Agotado";

      menuItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <span class="availability ${availabilityClass}">${availabilityText}</span>
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <span class="price">S/${item.price.toFixed(2)}</span>
                    <div class="item-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus" data-id="${
                              item.id
                            }">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" data-id="${
                              item.id
                            }">
                            <button class="quantity-btn plus" data-id="${
                              item.id
                            }">+</button>
                        </div>
                        <button class="add-to-cart-btn" data-id="${item.id}" ${
        !item.available ? "disabled" : ""
      }>
                            ${item.available ? "Agregar" : "Agotado"}
                        </button>
                    </div>
                </div>
            `;

      menuContainer.appendChild(menuItem);
    });

    menuItems = document.querySelectorAll(".menu-item");

    // Configurar botones de cantidad
    setupQuantityButtons();

    // Configurar botones de agregar al carrito
    setupAddToCartButtons();
  }

  // Configurar botones de cantidad
  function setupQuantityButtons() {
    // Botones de incremento
    document.querySelectorAll(".quantity-btn.plus").forEach((button) => {
      button.addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        const input = document.querySelector(
          `.quantity-input[data-id="${id}"]`
        );
        input.value = parseInt(input.value) + 1;
      });
    });

    // Botones de decremento
    document.querySelectorAll(".quantity-btn.minus").forEach((button) => {
      button.addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        const input = document.querySelector(
          `.quantity-input[data-id="${id}"]`
        );
        if (parseInt(input.value) > 1) {
          input.value = parseInt(input.value) - 1;
        }
      });
    });

    // Validar inputs manuales
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", function () {
        if (parseInt(this.value) < 1 || isNaN(parseInt(this.value))) {
          this.value = 1;
        }
      });
    });
  }

  // Configurar botones de agregar al carrito
  function setupAddToCartButtons() {
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", function () {
        if (this.disabled) return;

        const id = parseInt(this.getAttribute("data-id"));
        const item = menuData.find((item) => item.id === id);
        const quantity = parseInt(
          document.querySelector(`.quantity-input[data-id="${id}"]`).value
        );

        addToCart(item, quantity);

        // Cambiar estilo del botón
        this.classList.add("added");
        this.textContent = "✓ Agregado";

        // Mostrar notificación
        showAddedNotification();

        // Restaurar el botón después de 2 segundos
        setTimeout(() => {
          this.classList.remove("added");
          this.textContent = "Agregar";
        }, 2000);
      });
    });
  }

  // Funciones del carrito
  function addToCart(item, quantity) {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
      });
    }

    updateCart();
  }

  function updateCartItemQuantity(index, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(index);
      return;
    }

    cart[index].quantity = newQuantity;
    updateCart();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();

    if (cart.length === 0) {
      hideCart();
    }
  }

  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      totalItems += item.quantity;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">S/${item.price.toFixed(
                      2
                    )} c/u</div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="cart-quantity-btn minus" data-index="${index}">-</button>
                        <input type="number" class="cart-quantity-input" value="${
                          item.quantity
                        }" min="1" data-index="${index}">
                        <button class="cart-quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="cart-item-remove" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

      cartItems.appendChild(cartItem);
    });

    // Configurar eventos para los elementos del carrito
    document.querySelectorAll(".cart-quantity-btn.minus").forEach((button) => {
      button.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        const input = document.querySelector(
          `.cart-quantity-input[data-index="${index}"]`
        );
        updateCartItemQuantity(index, parseInt(input.value) - 1);
      });
    });

    document.querySelectorAll(".cart-quantity-btn.plus").forEach((button) => {
      button.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        const input = document.querySelector(
          `.cart-quantity-input[data-index="${index}"]`
        );
        updateCartItemQuantity(index, parseInt(input.value) + 1);
      });
    });

    document.querySelectorAll(".cart-quantity-input").forEach((input) => {
      input.addEventListener("change", function () {
        const index = parseInt(this.getAttribute("data-index"));
        updateCartItemQuantity(index, parseInt(this.value));
      });
    });

    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        removeFromCart(index);
      });
    });

    cartTotal.textContent = `S/${total.toFixed(2)}`;
    cartCount.textContent = totalItems;

    // Mostrar u ocultar el carrito flotante según si hay items
    if (cart.length > 0) {
      cartFloat.style.display = "flex";
    } else {
      cartFloat.style.display = "none";
    }

    // Asegurar que el carrito se muestre correctamente en móviles
    adjustCartForMobile();
  }

  // Función para ajustar el carrito en vista móvil
  function adjustCartForMobile() {
    if (window.innerWidth <= 576) {
      // Eliminar "px" y usar solo el número
      const cartFooter = document.querySelector(".cart-footer");
      if (cartFooter && cartItems) {
        // Asegurarse de que el footer sea visible
        cartItems.style.maxHeight = `calc(70vh - ${
          cartFooter.offsetHeight + 60
        }px)`;

        // Hacer scroll al final para ver el botón
        setTimeout(() => {
          if (cartContainer) {
            cartContainer.scrollTop = cartContainer.scrollHeight;
          }
        }, 100);
      }
    } else {
      // Restablecer estilos en pantallas más grandes
      if (cartItems) {
        cartItems.style.maxHeight = "";
      }
    }
  }

  // Mostrar el carrito asegurando que el botón sea visible
  function showCart() {
    if (cartContainer && cartOverlay) {
      cartContainer.classList.add("active");
      cartOverlay.classList.add("active");
      document.body.style.overflow = "hidden";

      // Ajustar para móviles
      if (window.innerWidth <= 576) {
        // Eliminar "px" y usar solo el número
        setTimeout(() => {
          if (cartContainer) {
            cartContainer.scrollTop = cartContainer.scrollHeight;
          }
        }, 300);
      }
    }
  }

  // Ocultar el carrito
  function hideCart() {
    if (cartContainer && cartOverlay) {
      cartContainer.classList.remove("active");
      cartOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Eventos del carrito
  cartFloat.addEventListener("click", showCart);
  closeCart.addEventListener("click", hideCart);
  cartOverlay.addEventListener("click", hideCart);

  // Generar WhatsApp message
  checkoutBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (cart.length === 0) return;

    let message = "¡Hola! Quiero realizar el siguiente pedido:\n\n";

    cart.forEach((item) => {
      message += `- ${item.name} (x${item.quantity}): S/${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    message += `\n*Total: S/${total.toFixed(2)}*`;
    message += "\n\nPor favor, confirmen mi pedido. ¡Gracias!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/51959984751?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  });

  // Generar ítems iniciales
  generateMenuItems();

  // Filtrar menú
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover clase active de todos los botones
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Agregar clase active al botón clickeado
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Mostrar/ocultar ítems según categoría
      menuItems.forEach((item) => {
        item.style.display =
          item.getAttribute("data-category") === filterValue ? "block" : "none";
      });
    });
  });

  // Efecto de sombra en navbar al hacer scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    }
  });

  // Ajustar el carrito cuando cambia el tamaño de la ventana
  window.addEventListener("resize", function () {
    adjustCartForMobile();
  });

  // Ajustar inicialmente
  adjustCartForMobile();
});

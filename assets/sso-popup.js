const EVENT_ACTIONS = {
  CLOSE_WINDOW: "CLOSE_WINDOW",
  REDIRECT_SUCCESS: "REDIRECT_SUCCESS",
  ELITE_REGISTER_SUCCESS: "ELITE_REGISTER_SUCCESS",
  ELITE_UPGRADE: "ELITE_UPGRADE",
};

const loginBtn = document.querySelectorAll(".SSO_popup_login"); // simple login
const registerBtn = document.querySelectorAll(".SSO_popup_register"); // cc register
const eliteJoinBtn = document.querySelectorAll(".SSO_popup_elite_join"); // elite register
const eliteUpgradeBtn = document.querySelectorAll(".SSO_popup_elite_upgrade"); // cc to elite memeber

loginBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    openSSOPopup("login");
  });
});

registerBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    openSSOPopup("signup");
  });
});

eliteJoinBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    openSSOPopup("elite/join");
  });
});

eliteUpgradeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    openSSOPopup("elite/upgrade");
  });
});

const SSU_URL = "https://sso.cabanaclubusa.com";
function getCLient() {
  return "py3qTnKoiVxzNsDPNbc4EQ%3D%3D%3ASFonKV4MhTviRkjQoPnZd0Ns8s%2BlbU0n2hy2imhpCGaWLs51MNYaNTX3z01jUkO5";
}

async function addEliteProductToCart() {
  const id = "40997247189072";

  const get_cart = await getCart();
  const matched_item = get_cart.items.find((item) => item.variant_id == id);

  if (matched_item) {
    const updates = { [id]: 1 };

    try {
      const response = await fetch(
        window.Shopify.routes.root + "cart/update.js",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updates }),
        }
      );

      if (!response.ok) throw new Error("Failed to remove item from cart");

      const data = await response.json();
      console.log("Item removed from cart:", data);
      alert("Elite Membership Product is already in the cart");
      window.location.href = "/cart";
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  } else {
    const formData = {
      items: [
        {
          id: +id, // Ensure `id` is a number
          quantity: 1,
          properties: { _type: "hide" },
        },
      ],
    };

    try {
      const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add item to cart");

      const data = await response.json();
      window.location.href = "/cart";
    } catch (error) {
      console.error("Error adding item to cart:", error);
      e.target.textContent = "Error, try again";
    }
  }
}

function openSSOPopup(path) {
  const client = getCLient();
  // Calculate dimensions based on screen size
  const width = Math.min(window.innerWidth * 0.9, 600); // Max width 600px for desktop
  const height = Math.min(window.innerHeight * 0.9, 700); // Max height 700px for desktop

  // Center the popup on the screen
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const currentUrl = window.location.href;
  const safeBase64Url = btoa(currentUrl);

  const popup = window.open(
    `${SSU_URL}/popup/${path}?client=${client}&return_to=${safeBase64Url}&parentOrigin=${encodeURIComponent(
      window.location.origin
    )}`, // Replace with your SSO URL
    "SSO_Login",
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
  );

  window.addEventListener("message", async function (event) {
    const eventData = event.data;
    const { action, data } = eventData;

    if (eventData) {
      switch (action) {
        case EVENT_ACTIONS.CLOSE_WINDOW:
          popup.close();
          break;

        case EVENT_ACTIONS.REDIRECT_SUCCESS:
          popup.close();
          window.location.replace(data.redirect_link);
          break;

        case EVENT_ACTIONS.ELITE_REGISTER_SUCCESS:
          await addEliteProductToCart();
          popup.close();
          window.location.replace(data.redirect_link);
          break;

        case EVENT_ACTIONS.ELITE_UPGRADE:
          await addEliteProductToCart();
          popup.close();
          break;

        default:
          console.log("Invalid Action type", action);
          break;
      }
    }
  });
}

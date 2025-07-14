const getCart = async () => {
    const resp = await fetch(window.Shopify.routes.root + "cart.js", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = resp.json();
    return data;
};

document.addEventListener('DOMContentLoaded', function () {
    // Get elements
const scrollContainer = document.querySelector('.scroll-carousel');
const prevButton = document.querySelector('.scroll-prev');
const nextButton = document.querySelector('.scroll-next');
const scrollAmount = 200; // Pixels to scroll per click

// Validate the existence of elements
if (scrollContainer && prevButton && nextButton) {
    // Add event listeners for buttons
    prevButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Function to update button state based on scroll position
    function updateButtonState() {
        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        // Check if scrolling is possible
        if (maxScrollLeft <= 0) {
            prevButton.disabled = true;
            nextButton.disabled = true;
        } else {
            prevButton.disabled = scrollContainer.scrollLeft <= 0;
            nextButton.disabled = scrollContainer.scrollLeft >= maxScrollLeft;
        }
    }

    // Add scroll event listener and check initial state
    scrollContainer.addEventListener('scroll', updateButtonState);
    updateButtonState(); // Initial validation
} else {
    // console.error('Scroll container or buttons are missing in the DOM.');
}
// Initial check on page load
});


document.addEventListener("DOMContentLoaded", () => {
    const details_button = document.querySelectorAll(".cc-sites-access-button");

    details_button.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            const content = JSON.parse(item.dataset.content);

            // Generate the HTML for the popup
            const template = `
          <div class="cc-site-popup-block">
            <button class="cc-site-popup-close-button">
              <img src="https://cdn.shopify.com/s/files/1/0925/7290/files/close-button.png" class="img-responsive" />
            </button>
            <div class="cc-site-popup-content">
              <div class="cc-site-popup-logo">
                <img src="${content.logo}" class="img-responsive" />
              </div>
              <div class="cc-site-popup-list">
                <h3>${content.club.heading}</h3>
                <ul>
                  ${content.club.list
                    .map(
                        (item) => `
                      <li>
                        <img src="https://cdn.shopify.com/s/files/1/0925/7290/files/red-tick.png?v=1732415833" class="img-responsive" />
                        <span>${item}</span>
                      </li>`
                    )
                    .join("")}
                </ul>
              </div>
              <div class="cc-site-popup-list">
                <h3>${content.elite.heading}</h3>
                <ul>
                  ${content.elite.list
                    .map(
                        (item) => `
                      <li>
                        <img src="https://cdn.shopify.com/s/files/1/0925/7290/files/blue-tick.png?v=1732415833" class="img-responsive" />
                        <span>${item}</span>
                      </li>`
                    )
                    .join("")}
                </ul>
              </div>
            </div>
             <button class="cc-site-popup-close-button-text">Close</button>
          </div>
        `;

            // Append the popup to the body
            document.body.insertAdjacentHTML("afterbegin", template);

            // Attach event listener to close the popup
            const popup = document.querySelector(".cc-site-popup-block");
            const closeButtons = popup.querySelectorAll(".cc-site-popup-close-button, .cc-site-popup-close-button-text");

            closeButtons.forEach((btn) => {
                btn.addEventListener("click", () => {
                    popup.remove();
                });
            });
        });
    });
});


// Function to close the popup
// function closePopup() {
//     console.log("Close Popup");
//     const popup = document.querySelector(".cc-site-popup-block");
//     if (popup) {
//         popup.remove();
//     }
// }

document.addEventListener("DOMContentLoaded", () => {
    const alreadyElite = document.querySelectorAll(".cc-already-elite-member");
    alreadyElite.forEach((item) => {
        item.addEventListener("click", async (e) => {
            e.preventDefault();
            alert("Already An Elite Member!");
        });
    });
});

// document.addEventListener("DOMContentLoaded", () => {
//     const getAllEliteProducts = document.querySelectorAll(
//         ".cc-elite-product-api"
//     );

//     getAllEliteProducts.forEach((item) => {
//         item.addEventListener("click", async (e) => {
//             e.preventDefault();
//             e.target.textContent = "Loading...";

//             // if (typeof Shopify.customer === "undefined") {
//             //     alert("Please login or Signup to add  Elite product to your cart.");
//             //     return;
//             // }

//             const id = e.target.dataset.id;

//             const get_cart = await getCart();
//             const matched_item = get_cart.items.find((item) => item.variant_id == id);

//             if (matched_item) {
//                 const updates = { [id]: 1 };

//                 try {
//                     const response = await fetch(
//                         window.Shopify.routes.root + "cart/update.js",
//                         {
//                             method: "POST",
//                             headers: {
//                                 "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify({ updates }),
//                         }
//                     );

//                     if (!response.ok) throw new Error("Failed to remove item from cart");

//                     const data = await response.json();
//                     console.log("Item removed from cart:", data);
//                     alert("Elite Membership Product is already in the cart");
//                     window.location.href = "/cart";
//                 } catch (error) {
//                     console.error("Error removing item from cart:", error);
//                 }
//             } else {
//                 const formData = {
//                     items: [
//                         {
//                             id: +id, // Ensure `id` is a number
//                             quantity: 1,
//                             properties: { _type: "hide" },
//                         },
//                     ],
//                 };

//                 try {
//                     const response = await fetch(
//                         `${window.Shopify.routes.root}cart/add.js`,
//                         {
//                             method: "POST",
//                             headers: {
//                                 "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify(formData),
//                         }
//                     );

//                     if (!response.ok) throw new Error("Failed to add item to cart");

//                     const data = await response.json();
//                     window.location.href = "/cart";
//                 } catch (error) {
//                     console.error("Error adding item to cart:", error);
//                     e.target.textContent = "Error, try again";
//                 }
//             }
//         });
//     });
// });


// const variantElements = document.querySelectorAll('.variant-val');

// // selected v
// function updateProductSelector(vid) {
//     const selectElement = document.getElementById('product-selectors');

//     if (!selectElement) {
//         console.error('Select element with ID "product-selectors" not found.');
//         return;
//     }

//     // Find the option with the matching ID or value
//     const optionToSelect = Array.from(selectElement.options).find(option => option.value === vid );
    
//     if (optionToSelect) {
//         selectElement.value = optionToSelect.value; // Update the select's value
//         selectElement.dispatchEvent(new Event('change'));
//         console.log(`Updated select to option with ID/value: ${optionToSelect}`);
//     } else {
//         console.warn(`No option found with ID or value: ${vid}`);
//     }
// }
// // Function to update Member and Elite prices or hide respective `<td>` if no match
// function updatePricesFromVariant(matchingElement) {
//     const memberCell = document.querySelector('.member-cell');
//     const eliteCell = document.querySelector('.elite-cell');
//     const memberParent = document.querySelector('.cc-pricing-table-member-cell');
//     const savingElement = document.querySelector('.saving-ai');

//     if (!matchingElement) {
//         console.log('No matching variant found. Hiding Member and Elite cells.');
//         // if (memberCell) memberCell.style.display = 'none';
//         // if (eliteCell) eliteCell.style.display = 'none';
//         return;
//     }

//     if (memberCell) memberCell.style.display = '';
//     if (eliteCell) eliteCell.style.display = '';

//     const elitePrice = parseFloat(matchingElement.getAttribute('data-e'));
//     const vid = matchingElement.getAttribute('data-vid');
//     const memberPrice = parseFloat(matchingElement.getAttribute('data-m'));
//     const marketPrice = parseFloat(matchingElement.getAttribute('data-p'));
   
//     if (memberParent && memberParent.classList.contains('active')) {
//         if (!isNaN(elitePrice) && !isNaN(elitePrice)) {
//             savingElement.innerHTML = (marketPrice - elitePrice).toFixed(2); // Update saving-ai with the difference
//         } else {
//             console.error('Invalid market price or member price data');
//         }
//     }
//     //  else {
//     //    savingElement.innerHTML = (marketPrice - memberPrice).toFixed(2); // Update saving-ai with the difference
//     // }
   
//     if (memberCell && memberPrice !== null) {
//        console.log(memberCell,"memberCell")
//         const memberPriceSpan = memberCell.querySelector('.price_x');
//         if (memberPriceSpan) memberPriceSpan.textContent = `$${parseFloat(memberPrice).toFixed(2)}`;
//     }

//     if (eliteCell && elitePrice !== null) {
//         console.log(eliteCell,"eliteCell")
//         const elitePriceSpan = eliteCell.querySelector('.price_x');
//         if (elitePriceSpan) elitePriceSpan.textContent = `$${parseFloat(elitePrice).toFixed(2)}`;
//     }
      
//     updateProductSelector(vid);
//     console.log(`Updated prices: Member - $${memberPrice}, Elite - $${elitePrice}`, "vid", vid);
// }

// // Function to find the matching variant and update prices
// function checkAndUpdatePrices() {
//     const checkedValues = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(ele => ele.value);

//     const matchingElement = Array.from(variantElements).find((element) => {
//         const dataV = element.getAttribute('data-v'); 
//         if (!dataV) return false;

//         const options = dataV.split(',').map(item => item.trim());
//         console.log("checkedValues",checkedValues,options)
//         return options.every(option => checkedValues.includes(option));
//     });

//     updatePricesFromVariant(matchingElement);
// }




// // Attach event listeners for change events
// document.querySelectorAll('input[type="radio"]').forEach((radioElement) => {
//     radioElement.addEventListener('change', () => {
//         checkAndUpdatePrices();
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    const productSlider = document.querySelectorAll(".cc-products-slider");

    if (productSlider.length > 0) {
        productSlider.forEach((slider) => {
            new Splide(slider, {
                perPage: 3,
                gap: "26px",
                rewind: true,
                arrows: false,
                pagination: false,
                breakpoints: {
                    1200: {
                        perPage: 2,
                    },
                    800: {
                        type: "loop",
                        padding: "15%",
                        perPage: 1,
                    },
                },
            }).mount();
        });
    }

    const sitesSlider = document.querySelectorAll(".cc-sites-slider");

    if (sitesSlider.length > 0) {
        sitesSlider.forEach((slider) => {
            new Splide(slider, {
                perPage: 4,
                gap: "24px",
                rewind: true,
                arrows: false,
                pagination: false,
                breakpoints: {
                    1200: {
                        perPage: 2,
                    },
                    800: {
                        type: "loop",
                        padding: "15%",
                        perPage: 1,
                    },
                },
            }).mount();
        });
    }
});

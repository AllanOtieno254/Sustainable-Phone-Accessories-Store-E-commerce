# Sustainable Phone Accessories Store 🌱📱

Welcome to the **Sustainable Phone Accessories Store** — a small e-commerce platform focused on eco-conscious, stylish, and functional phone accessories. This repository contains the frontend code (HTML, CSS, JavaScript) for a fully responsive and modern web store.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Website Pages](#website-pages)
- [Features & Functionality](#features--functionality)
- [UI/UX Design](#uiux-design)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Running Locally](#installation--running-locally)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

This project is a **small niche e-commerce website** that sells sustainable phone accessories. The goal is to practice **frontend development skills** including HTML, CSS, and JavaScript, while creating a **professional, modern, and user-friendly web experience**.

The website is **fully responsive** and designed for small catalogs (10–50 SKUs), with product pages, category pages, and a mock shopping cart system.

---

## Website Pages

The website consists of the following pages:

1. **Home Page**  
   - Hero section with featured product image/video and tagline.  
   - Highlighted product categories with clickable cards.  
   - Featured products section.  
   - Call-to-action buttons: “Shop Now”, “View Collection”.

2. **Category Pages**  
   - List of products by category (e.g., phone cases, chargers, screen protectors).  
   - Product cards with images, title, price, and “Add to Cart” button.  
   - Product filters (price range, popularity, eco-friendly rating).  

3. **Product Detail Page**  
   - Large product image with zoom effect.  
   - Product title, description, and price.  
   - Add-to-cart button (JS-powered cart using localStorage).  
   - Customer reviews section (mock data).  
   - Related products carousel.

4. **Cart Page**  
   - List of products added to the cart.  
   - Quantity adjustment buttons.  
   - Remove product buttons.  
   - Cart total and checkout button.  
   - LocalStorage powered (mock checkout).

5. **Checkout Page (Mock)**  
   - Form for shipping and billing details.  
   - Order summary with product details.  
   - Submit order button (mock, no real payment).  

6. **Order Confirmation Page**  
   - Thank-you message with order summary.  
   - Estimated delivery information.  
   - CTA button to return to home page.  

7. **About Page**  
   - Information about the company’s eco-friendly mission.  
   - Team section with images and bios (mock).  

8. **Contact Page**  
   - Contact form with Name, Email, Subject, Message.  
   - Company email, phone number, and address.  
   - Embedded Google Maps iframe (optional).  

9. **FAQ Page**  
   - Accordion-style collapsible questions.  
   - Topics: shipping, returns, eco-friendly materials, product warranty.

---

## Features & Functionality

- **Responsive Design** – Works on mobile, tablet, and desktop devices.  
- **Product Grid Layout** – Clean card-based grid for easy browsing.  
- **Sticky Add-to-Cart Button** – For quick checkout on product pages.  
- **LocalStorage Cart** – Store cart data locally in the browser.  
- **Filters & Sorting** – By price, category, and popularity.  
- **Mock Checkout Flow** – Practice frontend logic for orders.  
- **Accessibility Considerations** – Proper headings, alt attributes, readable fonts.  
- **Smooth Scrolling** – Navigation links scroll to sections smoothly.  
- **Hover Animations** – Subtle hover effects on product cards and buttons.  

---

## UI/UX Design

- **Color Palette:**  
  - Neutral tones (#f5f5f5, #ffffff, #eeeeee)  
  - Accent color (#00b894 – mint green) for buttons and highlights  
- **Typography:**  
  - Headings: `Roboto`, `sans-serif`  
  - Body: `Open Sans`, `sans-serif`  
- **Layout:**  
  - Sticky navbar with brand logo  
  - Hero section with image/video and tagline  
  - Card-based layout for products and categories  
  - Footer with social links, contact info, and newsletter signup  

---

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6)  
- **Responsive Framework:** CSS Flexbox & Grid  
- **Local Storage:** JavaScript for cart functionality  
- **Icons:** Font Awesome or similar (for social, cart, and UI icons)  
- **Animations:** CSS transitions for hover effects  

---

## Project Structure

```text
sustainable-phone-store/
│
├── index.html                 # Home page
├── about.html                 # About page
├── contact.html               # Contact page
├── faq.html                   # FAQ page
├── category.html              # Category listing page
├── product.html               # Product detail page
├── cart.html                  # Cart page
├── checkout.html              # Checkout page (mock)
├── order-confirmation.html    # Order confirmation page
│
├── css/
│   ├── style.css              # Main stylesheet
│   ├── responsive.css         # Media queries for mobile/tablet
│
├── js/
│   ├── main.js                # Navigation and general JS
│   ├── cart.js                # LocalStorage cart functionality
│
├── img/
│   ├── hero.jpg               # Hero image placeholder
│   ├── products/              # Product images
│   └── team/                  # Team images
│
└── README.md                  # Project documentation



# **eCommerce Frontend with RBAC Integration**

This project is the frontend of an eCommerce web application designed with **React** and **Redux Toolkit**, featuring secure payment integration using **Razorpay**. The app provides a responsive and user-friendly interface for seamless online shopping. Additionally, it incorporates a Role-Based Access Control (RBAC) system, enabling admins to manage users, roles, and permissions through an intuitive admin panel.

---

## **Key Features**

### **User Features**
- **Product Browsing**: Users can view, search, and filter products by name, category, or price range.
- **Shopping Cart**: Real-time cart functionality to add, update, or remove products, with live totals.
- **Order Placement**: Secure checkout and payment integration with **Razorpay**.
- **User Authentication**: Login, registration, and profile management with secure backend integration.

### **Admin Features (RBAC Implementation)**
- **Role-Based Access Control (RBAC)**: 
  - End users can shop, manage their carts, and access their profiles.
  - Admins can access a dedicated **Admin Panel** to manage the platform.
- **Admin Panel Functionalities**:
  - **User Management**: View, add, edit, or delete users. Assign roles and manage their active/inactive status.
  - **Product Management**: Create, update, and delete product listings with ease.
  - **Role & Permission Management**: Define roles (e.g., admin, user) and assign permissions (e.g., Read, Write, Delete) dynamically.

---

## **Technologies Used**

- **React.js**: For building a dynamic and interactive user interface.
- **Redux Toolkit**: Simplified state management for predictable and efficient global state handling.
- **Razorpay**: Integration for secure and seamless online payments.
- **HTML5 & CSS3**: For structuring and styling the application.
- **JavaScript (ES6)**: Core functionality and dynamic behavior implementation.

---

## **Setup Instructions**

### Prerequisites
- Node.js installed on your system.
- Backend API running for user authentication and payment processing.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-link.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ecommerce-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Ensure the backend is running for full functionality (e.g., user authentication and payments).

---

## **Project Workflow**

1. **Homepage**: Displays a list of available products with options to search and filter.
2. **User Profile**: Accessible after login, where users can view their details, order history, and cart.
3. **Admin Panel Access**:
   - Admin users see an **Admin Panel** card on their profile page.
   - Clicking the card navigates them to the **Admin Dashboard** with options for managing users, products, roles, and permissions.
4. **Dynamic Role Management**:
   - Admins can define new roles, assign permissions, and manage existing roles.
   - Permissions include actions like adding, editing, deleting users/products.

---

## **RBAC Features**

### **User Interface Design**
- **User List**: A table view displaying all users, with options to edit, delete, or change roles.
- **Role Management**: Dedicated UI for defining new roles and their associated permissions.
- **Permission Editor**: An interactive grid to easily assign or revoke permissions for roles.

### **Security Measures**
- **Role-Based Restrictions**: Users can only access functionalities allowed by their assigned roles.
- **Error Handling**: Validation and proper feedback for invalid inputs or unauthorized actions.


---

## **Future Enhancements**
- **Enhanced Analytics**: Add dashboards for viewing platform statistics (e.g., user activity, sales reports).
- **Advanced Filtering**: Allow filtering users/products based on custom criteria.
- **Localization**: Support for multiple languages to cater to a broader audience.

---

## **Demo**

- Live Application: https://fashionflickshop.netlify.app
- GitHub Repository: https://github.com/vishalpatilmaske/Fashion_Frontend

## **Test Credentials for Admin Panel**
 - Email: admin@gmail.com
 - Password: admin01





<h1 align="center" id="title">express-product-management-backend</h1>

<p align="center">
  <strong>Webservice API for managing products with multi-user support</strong>
</p>

<p align="center">
  A modern REST API designed to manage product data and enable role-based access control for different users.
</p>

---

## 🌟Project Overview 

The **Productly - Webservice API** is a comprehensive solution designed to manage product data and ensure secure, role-based access control for different types of users. Key features include:

- **Product Management 📦:** Manage product data efficiently.
- **Role-Based Access Control 🔐:** Secure user roles to manage who can access and modify data.
- **JWT Authentication 💼:** Secure access control with JSON Web Token (JWT).
- **Testing with Postman 🧪:** Validate API functionality and ensure smooth integration.

---

## ⚙️ Technologies Used 

- **Backend:** TypeScript with Express.js
- **Database:** MongoDB
- **Security:** JWT for secure authentication and role-based access control
- **Testing:** Postman for API endpoint validation
- **Architecture:** Clean Architecture with structured separation of concerns

---

## 🏗️ Architecture 

The API follows **Clean Architecture**, ensuring that the code is scalable, maintainable, and easy to extend. The structure includes:

- **Repositories 📦:** For data persistence and database operations
- **Services 🔄:** Organized with interfaces to separate business logic
- **DTOs (Data Transfer Objects) 📝:** Used for structured request and response handling

The architecture is designed for clear separation of concerns, high maintainability, and easy scalability.

---

<h2>🗂️ ERD (Entity-Relationship Diagram)</h2>

<div style="display: flex; justify-content: center;">
<img width="100%" alt="erd_db_product_managmenet" src="https://github.com/user-attachments/assets/b952c2b3-2eaa-44cc-8ea5-3667129e7baf">
</div>

---

<h2>🌐 Api Endpoint</h2>

Here're some of the project's API Endpoint :

<h3>Authentication</h3>

| Endpoint                     | Method | Authentication Required | Description                                    | Request Body                                                                                  |
|------------------------------|--------|-------------------------|------------------------------------------------|------------------------------------------------------------------------------------------------|
| `/auth/login`                 | POST   | None                    | Login User as Admin or Viewer                 | `{ "email": "viewer@example.com", "password": "securePassword123" }`                              |
| `/auth/register-admin`        | POST   | Admin                   | Register a new Admin                          | `{ "name": "AdminNew", "email": "adminNew@example.com", "password": "securePassword123", "gender": "Male" }` |
| `/auth/register-viewer`       | POST   | Admin                   | Register a new Viewer                         | `{ "name": "Viewer", "email": "viewer@example.com", "password": "securePassword123", "gender": "Female" }` |
| `/auth/logout`                | POST   | Admin                   | Logout                                        | `No body`                                                                                       |

<h3>Product Management</h3>

| Endpoint                     | Method | Authentication Required | Description                                       | Request Body                                                                                  | Query Parameters           |
|------------------------------|--------|-------------------------|---------------------------------------------------|------------------------------------------------------------------------------------------------|----------------------------|
| `/products`                   | POST   | Admin                   | Add a new product                                | `{ "name": "Laptop Thinkpad L001", "description": "With upgrade ram to 12gb", "price": 3000000 }`  | None                       |
| `/products`                   | GET    | Viewer or Admin          | Show all products                               | `None`                                                                                           | 'name=Laptop&price=40&page=2&size=1&sort=name&direction=asc'  |
| `/products/{id}`             | PUT    | Admin                   | Edit product details                            | `{ "name": "Laptop Thinkpad L0012", "description": "With upgrade ram to 12gb + 4gb", "price": 4000000 }` | None                       |
| `/products/{id}`              | DELETE | Admin                   | Delete a product                                | `None`                                                                                           | None                       |

<h3>Data Constraints</h3>

- **Name**: Must be unique for each user and product.
- **Email**: Must be unique for each user.

<h3>Query Parameters Explanation</h3>

- **name**: (Optional) Filter product by name. Example: `name=Laptop` will return patients whose name is "Laptop".
- **price**: (Optional) Filter by product price. Example: price=40 will return products with a price of 40. The default behavior will include all price values.
- **sort**: (Optional) Define the field by which the results should be sorted. Valid values are `name`, `price`, or `createdAt`. If the value is invalid, the default sort will be `createdAt`.
- **direction**: (Optional) Define the sorting order. Possible values are `asc` (ascending) or `desc` (descending). Default value: `desc`. Example: `direction=desc` will return results sorted in descending order.
- **page**: (Optional) Define the page number for pagination. Default value: `1`. Example: `page=1` will return the first page of results.
- **size**: (Optional) Define the number of results per page. Default value: `10`. Example: `size=2` will return 2 results per page.

---
  
<h2>🛠️ Installation Steps :</h2>

<p>1. Clone Repository</p>

```
git clone https://github.com/mdzakied/express-product-management-backend.git
```

<br />
<p>2. Prepare database with setup MongoDB </p>

<br />
<p>3. Complete and Adjust configuration in file .env</p>

```
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/db_product_management

# JWt Configuration
JWT_SECRET=express-product-management-backend
JWT_EXPIRATION=1h

# Allow Cors
CLIENT_URL=http://localhost:3000
```

<br />
<p>4. Run Command</p>

```
npm install
```

<br />
<p>6. Run Project for Development</p>

```
npm run dev 
```

<br />

> [!NOTE]
> Information in terminal :
> * MongoDB connected to db_product_management
> * Admin account initialized successfully (email: admin@example.com, pass: securePassword123)
> * Server is running on port 4000

---

<h2>📃 Docs API</h2>
  
Postman :
* Run Project
* Open Postman and Import for collections docs/Product Management.postman_collection.json
* Open Postman and Import for environments docs/Product Management.postman_environment.json

---

<h2>💻 Built with</h2>

Technologies used in the project :

*   MongoDB
*   Node.js
*   Express
*   Typescript
*   jsonwebtoken
*   moongose
*   Postman

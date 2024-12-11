<h1 align="center" id="title">express-product-management-backend</h1>

<p align="center" id="description">Building a REST API for Product Management System with Multi-User Access.</p>

<br>
<h2 align="center">ERD (Entity-Relationship Diagram)</h2>
<div style="display: flex; justify-content: center;">
<img width="100%" alt="erd_db_product_managmenet" src="https://github.com/user-attachments/assets/b952c2b3-2eaa-44cc-8ea5-3667129e7baf">
</div>

<br>
<h2>🚀 Requirements</h2>

Here're some of the project's requirments :

Aplikasi di unggah di akun git kamu dan pastikan memiliki akses public.

Kebutuhan:
  1. Bisa melakukan pembuatan akun ✔️
  2. Bisa melakukan login ✔️
  3. Menyimpan data user di database ✔️
  4. Bisa mengakses profile dengan header token JWT, response berbentuk JSON ✔️
  5. Bisa membuat CRUD product dengan REST API + header token JWT dan session pada front-end nya 📍 (In Frontend)

Aturan:
  1. Silakan menggunakan bahasa pemrograman yang kamu bisa ( Rekomendasi ~~Python~~ / Node JS) ✔️
  2. Gunakanlah framework atau library yang mempermudah proses pembuatan di lebih di rekomendasikan ~~framework python~~ ( ~~Flask~~ / ~~Sanic~~ atau Expres Js) ✔️
  3. Untuk User Interface kami merekomendasikan menggunakan framework dari Node JS ( React JS/ Next JS dan nilai plus jika menambahkan redux) 📍 (In Frontend)
  4. Gunakan database sesuai yang kamu rasa cocok, pilihannya ~~PostgreSQL~~ atau MongoDB ✔️
  5. Menggunakan JWT (JSON Web Token) untuk autentikasi ✔️
  6. Kamu harus mengirimkan aplikasimu di repositori git public ✔️
  7. Aplikasimu harus bisa dijalankan di local ✔️
  8. Deploy aplikasi di heroku atau vps (nilai tambah) 
  9. Dokumentasi API (nilai tambah) ✔️

<br>
<h2>🌐 Api Endpoint</h2>

Here're some of the project's API Endpoint :
Here’s the updated table with the new query parameters for the `GET all products` endpoint:

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
# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/db_product_management

# JWt Configuration
JWT_SECRET=express-product-management-backend
JWT_EXPIRATION=1h

# Allow cors
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

<h2>📃 Docs API</h2>
  
Postman :
* Run Project
* Open Postman and Import for collections docs/Product Management.postman_collection.json
* Open Postman and Import for environments docs/Product Management.postman_environment.json


<h2>💻 Built with</h2>

Technologies used in the project :

*   MongoDB
*   Node.js
*   Express
*   Typescript
*   jsonwebtoken
*   moongose
*   Postman

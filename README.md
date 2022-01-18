# Shopify Backend Developer Intern Challenge - Summer 2022
An inventory tracking web application for a logistics company.

## 📋 API Documentation

- [Postman Public View](https://documenter.getpostman.com/view/8239792/UVXnFZGC)

## 🛠 Tools & Technology
- Nodejs
- Express JS
- File based Database System
- Docker

## 🖇 Getting Started
- Make sure you have Git installed on your machine or visit [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to see the latest version and download it depending the OS you're on
- Make sure you have Nodejs **v16.13.0 (LTS)** installed or visit [here](https://nodejs.org/en/download/) to download 
  
**Clone this repo after successful git installation**
```
git clone https://github.com/neymarjimoh/shopi-test`
```
**Checkout to the Project's directory**
```
cd shopi-test
```
**Install all dependencies**
```
npm install
```
**Update environment variables**
```
cp .env.example .env
```
**Start the application**
```
npm run dev
```

**Run all tests**
```
npm run test
```
- On postman/postwoman/insomnia/etc or any restful clients, run the server endpoints, `http://localhost:8080`
- Alternatively, you can test the API endpoints on terminal using `curl http://localhost:8080`
## 🚀 Using Docker
- Make sure you have docker installed or download [here](https://docs.docker.com/engine/install/)
**Clone this repo**
```
git clone https://github.com/neymarjimoh/tete-challenge.git
```
**Checkout to project's directory**
```
cd shopi-test
```
**Update environment variables**
```
cp .env.example .env
```
**Build and run docker image**
```
docker build -t shopify-backend .
```

- You can view on `http://localhost:8080`


## Inventory Schema

The schema for Inventory collection is shown below. They are bound to change as development continues.
An inventory is owned by a business person (owner) that has a location.
An owner can have multiple inventories, it assumes the person creating the inventory is logged in.
TotalSold is used for quick aggregation of all sales of that inventory.


**Inventory collection**
```
{
    "id": [String, required, unique],
    "name": [String, required],
    "price": [String, required],
    "description": [String, optional],
    "stock": [Number, optional],
    "ownerId": [String, required],
    "location": [String, required],
    "totalSold": [Number, optional],
    "createdAt": [Date, optional],
    "updatedAt": [Date, optional
}
```

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/jF_140fi)
# ReactJS Final Project - Responsive Website

## Goal

Create a data-driven responsive website using NextJS App Router.

## Instructions

1. Choose from one of the following niches that you want your website to be about:

   - Blog website (Posts)
   - E-Commerce website (Products - No need to implement checkout or payment)
   - Gallery website (Images showcase)
   - Social media website (Posts)

2. Create your own personal design for the site. Do not use existing designs or templates
3. The website should be built using NextJS App Router
4. Use Prisma to create the models and database. Keep the database local
5. The website should be responsive

## Features

- The website should have both sign-up and log-in functionalities
- The website should have CRUD functionality (Create, Retrieve, Update, Delete)
- The website should have at least **two** models for the schema. For example, for E-commerce website, you should have a model for *Product* and *User*
- User is able to upload images to the site. Instead of storing the image as a `Blob` type, please use **Cloudinary API** or any other image hosting website to store the actual image files and just add the image URLs as a `String` into your database.
- Implement modals using Parallel + Intercepting Routes. For example, for E-commerce website, clicking on a product in the product list page will open a modal but visiting the actual URL will open the *Product Details* page
- Your website should have at least 5 routes. For example:

  - Home page
  - Products List
  - View Product
  - My Account page
  - Contact page

## Tools

- Figma (Web Design)
- Cloudinary API [https://cloudinary.com/]

## Presentation

Presentation will be on December 11. Presentation should be at least 5 minutes - no need for slides.

## Instructions to setup NextJS and Prisma

1. Run `npm create-next-app@latest` to setup NextJS. Select **Y** for all options EXCEPT for the last one
2. Run `npm install prisma` to install Prisma
3. Run `npx prisma init --datasource-provider sqlite` to setup the database and schema
4. Add your models inside *prisma/schema.prisma* file
5. Run `npx prisma migrate dev --name init` to generate the db file
6. Create a *db.ts* file inside the `src` directory
7. Copy and paste the Solution Code (lines 1-15) to *db.ts* from the Prisma documentation [https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution]
8. Run `npm run dev` to run your NextJS application

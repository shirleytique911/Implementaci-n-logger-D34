const express = require("express");
const router = express.Router();
const {faker} = require("@faker-js/faker");
const { productModel } = require("../dao/mongo/models/products.model.js"); // usar en caso de persistencia en la DB

router.post("/mockingproducts", async (req, res) => {

    try {
        const productsToGenerate = 100;
        const generatedProducts = [];

        for (let i = 0; i < productsToGenerate; i++) {
            const fakeProduct = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                code: faker.datatype.number({ min: 100, max: 999 }),
                price: faker.commerce.price({ min: 5000, max: 20000, dec: 0 }),
                stock: faker.datatype.number({ min: 1, max: 100 }),
                category: faker.commerce.department(),
                thumbnails: faker.image.imageUrl(),
                quantity: faker.datatype.number({ min: 1, max: 10 })
            };

            generatedProducts.push(fakeProduct);
        }


        res.json(generatedProducts);
    } catch (error) {
        console.error("Error al generar y guardar los productos simulados:", error);
        res.status(500).json({ error: "Error al generar y guardar los productos simulados" });
    }
    
});

router.get("/loggerTest", function (req, res) {
    /* console.log(req.logger); */
    req.logger.error("Mensaje de error");
    req.logger.warn("Mensaje de warn");
    req.logger.info("Mensaje de info");
    req.logger.http("Mensaje de http");
    req.logger.verbose("Mensaje de verbose");
    req.logger.debug("Mensaje de debug");
    req.logger.silly("Mensaje de silly");
    res.send("Logs realizados");
});

module.exports = router;

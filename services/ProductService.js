const ProductsData = require("../data/products.json");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getAll = () => {
    try {
        const jsonProductsData = fs.readFileSync("./data/products.json");
        const res = JSON.parse(jsonProductsData);
        return res;
    } catch (err) {
        console.log(err);
        return { code: 500, message: "Error while getting all products data." };
    }
}

const addNew = (req) => {
    const newProduct = {
        "name": req.body.name,
        "description": req.body.description,
        "token": uuidv4(),
        "price": req.body.price,
        "stock": req.body.stock,
        "created_at": new Date().toLocaleString(),
        "updated_at": new Date().toLocaleString()
    };

    const jsonProductsData = fs.readFileSync("./data/products.json");
    var tempNewProductsList = JSON.parse(jsonProductsData);

    tempNewProductsList ?
        tempNewProductsList.push(newProduct) :
        tempNewProductsList = [newProduct];

    try {
        fs.writeFile('./data/products.json', JSON.stringify(tempNewProductsList), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        });

        return { code: 200, message: "Product successfully added" }
    }
    catch (error) {
        console.log(error);
        return { code: 500, message: "Error while adding new product" }
    }
}

const edit = (req) => {
    const jsonProductsData = fs.readFileSync("./data/products.json");
    const result = JSON.parse(jsonProductsData).map(product => {
        if (product.token === req.params.token) {
            return {
                ...product,
                "name": req.body.name ?? product.name,
                "description": req.body.description ?? product.description,
                "price": req.body.price ?? product.price,
                "stock": req.body.stock ?? product.stock,
                "updated_at": new Date().toLocaleString()
            };
        }
        return product;
    });

    try {
        fs.writeFile('./data/products.json', JSON.stringify(result), err => {
            if (err) {
                console.log('Error while editing file', err)
            } else {
                console.log('Successfully edited')
            }
        });

        return { code: 200, message: "Product successfully edited" }
    }
    catch (error) {
        console.log(error);
        return { code: 500, message: "Error while editing product" }
    }
}

const deleteProduct = (req) => {
    const jsonProductsData = fs.readFileSync("./data/products.json");
    const result = JSON.parse(jsonProductsData).filter(
        function (product) { return product.token != req.params.token }
    );

    try {
        fs.writeFile('./data/products.json', JSON.stringify(result), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        });

        return { code: 200, message: "Product successfully removed" }
    }
    catch (error) {
        console.log(error);
        return { code: 500, message: "Error while removing product" }
    }
}


module.exports = { getAll, addNew, deleteProduct, edit };

const ProductsData = require("../data/products.json");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getAll = () => {
    try {
        return getAllProductsFromFile();
    } catch (err) {
        console.log(err);
        return { code: 500, message: "Error while getting all products data." };
    }
}


const getAllProductsFromFile = () => {
    const jsonProductsData = fs.readFileSync("./data/products.json");
    return JSON.parse(jsonProductsData);
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

    var tempNewProductsList = getAllProductsFromFile();

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
    const result = getAllProductsFromFile().map(product => {
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
    const result = getAllProductsFromFile().filter(
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

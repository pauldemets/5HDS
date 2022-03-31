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

    var tempNewProductsList = ProductsData;

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

const edit = () => {
    return null;
}

const deleteProduct = (req) => {
    const result = ProductsData.filter(
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


module.exports = { getAll, addNew, deleteProduct };

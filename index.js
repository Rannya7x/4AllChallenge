const data = require('./data.json')
const Products = data.products
const Categories = data.categories
const Establishments = data.establishments
var resultJson = {}
console.log(handleJson(data))

function handleJson(json){
    Establishments.forEach(establishments => {
        var categoriesNamesObjects = {}
        const establishmentProductIdList = establishments.productsId
        const filteredProducts = getProducts(establishmentProductIdList)
        const categoriesIdList = filteredProducts.map(product => product.categoriesId)
        const filteredCategories = getCategories(categoriesIdList)
        
        filteredCategories.forEach(category=>{
            var productsNamesObjects = filteredProducts.filter(product=> product.categoriesId.some(id => id === category.id))
            productsNamesObjects.forEach(product=> {
                var Product = {}
                var price = product.price/100
                Product[product.name] = {price}
                categoriesNamesObjects[category.name] = Product
            })
        })

        resultJson[establishments.name] = categoriesNamesObjects    
    });
    return JSON.stringify(resultJson)
}

function getProducts(arrayIds){
    const products = Products
        .filter(product => arrayIds.some(id => id === product.id))
    return products
}

function getCategories(arrayIds){
    //tranformar em funcao
    var newCategoriesList = []
    arrayIds.forEach((key,index)=> {
        if(key.length>1){
            key.forEach(item=> newCategoriesList.push(item))
        }else{
            newCategoriesList.push(key[0])
        }
    })
    newCategoriesList = Array.from(new Set(newCategoriesList))
    //end função
    const categories = Categories
         .filter(category => newCategoriesList.some(id => id === category.id))
    return categories
}


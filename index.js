const data = require('./data.json')
const Products = data.products
const Categories = data.categories
const Establishments = data.establishments
var resultJson = {}
function handleJson(){    
    Establishments.forEach((establishments) => {
        var categoriesNamesObject = {}
        const filteredProducts = getProducts(establishments.productsId)
        const categoriesIdList = filteredProducts.map(product => product.categoriesId)
        const filteredCategories = getCategories(categoriesIdList)
        filteredCategories.forEach(category=>{           
            var productsNamesObjects = filteredProducts.filter(product=> {
                return product.categoriesId.some(id => id === category.id)
            })
            var Product = {}
            productsNamesObjects.forEach(product=> {
                var price = product.price/100
                Product[product.name] = {price}
                categoriesNamesObject[category.name] = Product     
            })
        })
        resultJson[establishments.name] = categoriesNamesObject   
    });
    return JSON.stringify(resultJson)
}
function getProducts(arrayIds){
    const products = Products
        .filter(product => arrayIds.some(id => id === product.id))
    return products
}
function getCategories(arrayIds){
    const categories = Categories
         .filter(category => clearArray(arrayIds).some(id => id === category.id))
    return categories
}
function mean(array){
    var mean = (array.reduce((a,b)=> a+b)/array.length).toFixed(2)
    return mean
}
function clearArray(array){
    var newArray = []
    array.forEach(key=> {
        if(key.length>1){
            key.forEach(item=> newArray.push(item))
        }else{
            newArray.push(key[0])
        }
    })
    newArray = Array.from(new Set(newArray))
    return newArray
}
console.log(handleJson(data))
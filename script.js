//Function to add elements to the <div> tag in html
function addProduct (title, price, description, image, rate, count)
{
    document.querySelector('#listProducts').innerHTML+=
    `<div id="eachProduct">
        <h2 id="title">${title}</h2>
        <img id="image" src=${image}>
        <h3 id="price">Price: $${price}</h3>
        <h4>Description: </h4>
        <h4 id="description">${description}</h4>
        <p id="rate">Rate: ${rate} - ${count} Reviews<p>
    </div>`
}

//Function to sort by price ascending
function sortAscending(productSort)
{
    $('div').empty()
    productSort.sort((a,b)=>a.price < b.price? -1: 1)
    for(let i=0; i<productSort.length; i++)
    {
        addProduct(productSort[i].title, productSort[i].price, productSort[i].description, productSort[i].image, productSort[i].rating.rate, productSort[i].rating.count)
    }
}

//Function to sort by price descending
function sortDescending(productSort)
{
    $('div').empty()
    productSort.sort((a,b)=>a.price < b.price? 1: -1)
    for(let i=0; i<productSort.length; i++)
    {
        addProduct(productSort[i].title, productSort[i].price, productSort[i].description, productSort[i].image, productSort[i].rating.rate, productSort[i].rating.count)
    }
}

//Function to filter by category
function filterByCategory(productData, category)
{
    var categoryData = []
    for(i=0; i<productData.length; i++)
    {
        if(productData[i].category == category)
        {
            categoryData[categoryData.length] = productData[i]
        }
    }
    $('div').empty()
    for(let i=0; i<categoryData.length; i++)
    {
        addProduct(categoryData[i].title, categoryData[i].price, categoryData[i].description, categoryData[i].image, categoryData[i].rating.rate, categoryData[i].rating.count)
    }
    return categoryData
}

//Using fetch .then to show data from a given API on the page
fetch('https://fakestoreapi.com/products')
.then(response=>{
    if(!response.ok) //Throw error message in case of error to access the API
    {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
}) 
.then(response=>{
    let productData = response  //Create a variable to store data from the API
    
    for(let i=0; i<productData.length; i++)
    {
        addProduct(productData[i].title, productData[i].price, productData[i].description, productData[i].image, productData[i].rating.rate, productData[i].rating.count)
    }

    //Creating a variable to store the original data
    var originalData = []
    for(let i=0; i<productData.length; i++)
    {
        originalData[productData[i].id-1] = productData[i]
    }

    //Drop down menu to sort the elements by price
    $("#sortByPrice").change(()=>{
        var sortOption = $("#sortByPrice").val()
        if(sortOption == 'ascending')
        {
            sortAscending(productData)
        }
        else if(sortOption == "descending")
        {
            sortDescending(productData)
        }
    })

    //Drop down menu to filter the elements by category
    $("#filterByCategory").change(()=>{
        var filterOption = $("#filterByCategory").val()

        $("#sortByPrice").val('none').change()
        
        if(filterOption == 'men')
        {
            productData = filterByCategory(originalData, "men's clothing")
        }
        else if(filterOption == 'jewelry')
        {
            productData = filterByCategory(originalData, "jewelery")
        }
        else if(filterOption == 'eletronics')
        {
            productData = filterByCategory(originalData, "electronics")
        }
        else if(filterOption == 'women')
        {
            productData = filterByCategory(originalData, "women's clothing")
        }
        else //Show all elements in the original order
        {
            $('div').empty()
            for(let i=0; i<originalData.length; i++)
            {
                addProduct(originalData[i].title, originalData[i].price, originalData[i].description, originalData[i].image, originalData[i].rating.rate, originalData[i].rating.count)
            }

            for(let i=0; i<originalData.length; i++)
            {
                productData[i] = originalData[i]
            }
        }
    })
})
.catch(error=>{
    console.log(error)
    document.querySelector('#listProducts').innerHTML+=
    `<div id="eachProduct">
        <h3>Error accessing data</h3>
    </div>`
})




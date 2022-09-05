const { Console } = require("console");
const fs = require("fs")
const readline = require('readline')

const { groupBy, sum, pluck, mode } = require('./helpers')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


// order_log00.csv
rl.question('Orders CSV File Name:', function (fileName) {
    console.log(`Generating stats for ${fileName} ...`)
    const orders = parseOrders(fileName)
    const stats = calculateStats(orders)

    writeCSV(`0_${fileName}`, stats.averageData)
    writeCSV(`1_${fileName}`, stats.popularData)    
    
    rl.close();
})

rl.on('close', function () {
    console.log('Stats Generated')
    process.exit(0);
});



const parseOrders = fileName => {
    let data = fs.readFileSync(fileName, "utf8")
    data = data.split("\n")
    // console.log(data)
    let orders = []
    for (let row of data) { 
        let orderData = row.split(",")
        let order = {
            id: orderData[0],
            destination: orderData[1],
            category: orderData[2],
            itemsCount: parseInt(orderData[3]),
            brand: orderData[4],
        }
        orders.push(order)
    }
    return orders
}

const calculateStats = orders => {
    const ordersCount = orders.length
    const ordersCategorized = groupBy(orders, 'category')
    let averageData = ''
    let popularData = ''
    for(let i in ordersCategorized )
    {
        let total = sum(ordersCategorized[i].map(pluck('itemsCount')))
        let average = total/ ordersCount
        let popular = mode(ordersCategorized[i].map(pluck('brand')))
    
        averageData += `${i}, ${average}\r\n`
        popularData += `${i}, ${popular}\r\n`
    }

    return {
        averageData,
        popularData
    }
}

const writeCSV = (fileName, data) => {
    fs.writeFileSync(`${fileName}`, data)
}



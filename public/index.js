

//create main function, define each chart, and connect them with query selecors to html
function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    

    //fetch request from twelve data but we are using data stored in mockdata.js since codes keep expiring
   
    // let response = await fetch ('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=30min&outputsize=12&apikey=b2b0e11651294ee9a789558a1625b754')
    // let results = await response.json();
    // console.log(results)

    //define stocks as variables and connect to mockData.js
    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];

    //displays stocks timeline in reverse order which was putting earliest dates on right
    stocks.forEach( stock => stock.values.reverse())
    
    //assign stocks to a color fucntion, which we call into our charts below
    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    

// create charts, pass variables into it, many which have pass functions which will call below.
//we are creating  data from mockData, parsing through it to return data pertinent to this chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map((stock) => stock.meta.symbol),
            datasets: [{
                label: "Highest", 
                data: stocks.map(stock => findHighestValue(stock.values)),
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
            }]
        }
    });

    new Chart(averagePriceChartCanvas.getContext('2d'),{
        type: 'pie',
            data: {
                labels: stocks.map((stock) => stock.meta.symbol),
                datasets: [
                    {
                    label: "Average", 
                    data: stocks.map(stock => findAverage(stock.values)),
                    backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                    borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
                    }
                ]
            }
    });


    //use for.each method to parse through our code, and return the highest in the array that each stock got to
    function findHighestValue(values){
        let highestNumber = values[0].high;
        values.forEach((value) => {
            if (value.high > highestNumber){
                highestNumber = value.high
            }
        })
        return highestNumber
    }


    //ignore all this below. too far behind to worry about figuring out bonus -
    //this wa

    
    // function findAverage(values){
    //     function add(number1, number2){
    //         let total = number1 + number2
    //         return total
    //     }
    //     let sum = add(values.high, values.low)
    //     let averageNumber = sum/2
    //     return averageNumber / values.length

    //     // values.forEach((value) => {
    //     //     averageNumber += average
    //     // })
    //     // 

    // }
    
}

main()

function problem1() {
    console.log('Hello World');
}

function problem2(value, html) {
    let result = html.replace(/RICH_GUY/g, value);
    console.log(result);
}

function fToC(f) {
    return (f - 32) * 5/9;
}

function problem3(value) {
    if (isNaN(value)) {
        throw `Invalid temperature "${value}"`;
    }
    
    let fahrenheit = Number(value);
    let celsius = fToC(fahrenheit);
    
    console.log(celsius.toFixed(1));
}

const POST_RATES = [0.98, 1.19, 1.40, 1.61, 1.82];

function problem4(value) {
    if (isNaN(value)) {
        console.log("Invalid weight");
        return;
    }
    
    let weight = parseInt(value);
    if (weight < 1 || weight > 5) {
        console.log("Invalid weight");
        return;
    }
    
    let price = POST_RATES[weight - 1];
    console.log(`$${price.toFixed(2)}`);
}

function problem5(apr, term, amount) {
    apr = Number(apr) / 100;
    term = Number(term);
    amount = Number(amount);
    
    let total = amount;
    let ratio = 1 + apr;
    
    for (let t = 0; t < term; t++) {
        total *= ratio;
    }
    
    console.log(`$${total.toFixed(2)}`);
}
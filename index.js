const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    await page.goto('https://www.premierleague.com/news/3566891');

    const result = await page.evaluate(() => Array.from(document.querySelectorAll('tr'), (e) => e.innerText));

    const final = [];

    result.forEach((data) => { 
        let obj = inputObject(data);
        
        obj = filterByPrice(obj) ? obj : null;
        obj = filterByPosition(obj) ? obj : null;
        obj = filterByClub(obj) ? obj : null;

        final.push(obj); 
        
    });

    
    
    
    console.table(final.filter(o => o));
    await browser.close();
}

function inputObject(text) {
    if (text === 'Player\tClub\tPosition\tPrice') {
        return null;
    }

    const splitData = text.split('\t');
    const data = {
        player: splitData[0],
        club: splitData[1],
        position: splitData[2],
        price: parseFloat(splitData[3].replace('£', '').replace('m', ''))
    }

    return data;
}

function filterByPrice(obj) {
    const filter = process.argv.find(o => o.startsWith('--price'))
    if (filter) {
        const price = parseFloat(filter.split('=')[1])
        if (filter.startsWith('--price-exact')) {
            return obj && obj.price === price    
        }
        return obj && obj.price <= price
    }

    return true;
}

function filterByPosition(obj) {
    const filter = process.argv.find(o => o.startsWith('--position'))
    if (filter) {
        const pos = filter.split('=')[1]
        return obj && obj.position === pos;
    }

    return true;
}

function filterByClub(obj) {
    const filter = process.argv.find(o => o.startsWith('--club'))
    if (filter) {
        const club = filter.split('=')[1]
        return obj && obj.club === club;
    }

    return true;
}


run();
# FPL Price Reveal Scrapper

Simple FPL 23/24 Price Reveal Web Scrapper

## Installation
```
npm i
```

## Compilation
Default compilation
```
node index
```

Compile with price filter
```
node index --price=6
```
you also using price filter with exact match
```
node index --price-exact=6
```

Compile with position filter
```
node index --position=MID
```

You can also combine all of those filters like this
```
node index --price=5 --position=FWD 
```
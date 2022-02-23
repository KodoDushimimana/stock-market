import express from 'express'
import Airtable from 'airtable'
import fetch from 'node-fetch'
import dayjs from 'dayjs'
import 'dotenv/config'

const app = express()
app.use(express.static('public'))
const PORT = process.env.PORT

const stockMarket = process.env.STOCK_API
const airtable_api = process.env.AIRTABLE_KEY
const base = new Airtable({apiKey: `${airtable_api}`}).base('appkAFcXYmg8XNqMD');
const day = '2022-02-18'
const yesterday = dayjs().add(-6, 'day').format("YYYY-MM-DD", "America/New_York")
console.log(yesterday)

const xom_data = `https://api.polygon.io/v1/open-close/XOM/${yesterday}?adjusted=true&apiKey=${stockMarket}`
const rio_data = `https://api.polygon.io/v1/open-close/RIO/${yesterday}?adjusted=true&apiKey=${stockMarket}`
const shlx_data =  `https://api.polygon.io/v1/open-close/SHLX/${yesterday}?adjusted=true&apiKey=${stockMarket}`
const pypl_data = `https://api.polygon.io/v1/open-close/PYPL/${yesterday}?adjusted=true&apiKey=${stockMarket}`
const rivn_data =  `https://api.polygon.io/v1/open-close/RIVN/${yesterday}?adjusted=true&apiKey=${stockMarket}`

app.get('/xomapi', async(req, res) =>{
    const fetchXom  = await fetch(xom_data)
    const xomData = await fetchXom.json()
    res.send(xomData)
    const symbolx = xomData.symbol
    const closingDay = xomData.from
    const closePrice = xomData.close
    console.log(xomData)

    base('Table 1').update([
        {
          "id": "recbrh7FtuGgG3tzV",
          "fields": {
            "Stock Ticker Symbol": symbolx,
            "Last Price (API)": closePrice,        
            "Date Acquired": closingDay,
        
          }
        },
        
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log(record.get('Exchange'));
        });
      });
      


})//end of get method

app.get('/rioapi', async(req, res) =>{
    const fetchrio  = await fetch(rio_data)
    const rioData = await fetchrio.json()
    res.send(rioData)
    console.log(rioData)
    const symbolx = rioData.symbol
    const closingDay = rioData.from
    const closePrice = rioData.close

    base('Table 1').update([
        {
          "id": "recdychKZxJtk1vc2",
          "fields": {
            "Stock Ticker Symbol": symbolx,
            "Last Price (API)": closePrice,        
            "Date Acquired": closingDay,
        
          }
        },
        
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log(record.get('Exchange'));
        });
      });
      

})
app.get('/shlxapi', async(req, res) =>{
    const fetchshlx  = await fetch(shlx_data)
    const shlxData = await fetchshlx.json()
    res.send(shlxData)
    console.log(shlxData)
    const symbolx = shlxData.symbol
    const closingDay = shlxData.from
    const closePrice = shlxData.close
    base('Table 1').update([
        {
          "id": "recBT5D2B0pfVfVBz",
          "fields": {
            "Stock Ticker Symbol": symbolx,
            "Last Price (API)": closePrice,        
            "Date Acquired": closingDay,
        
          }
        },
        
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log(record.get('Exchange'));
        });
      });


})
app.get('/pyplxapi', async(req, res) =>{
    const fetchpypl  = await fetch(pypl_data)
    const pyplData = await fetchpypl.json()
    res.send(pyplData)
    console.log(pyplData)
    const symbolx = pyplData.symbol
    const closingDay = pyplData.from
    const closePrice = pyplData.close
    console.log(closingDay)
    base('Table 1').update([
        {
          "id": "recC9hLJj6Qj8PADw",
          "fields": {
            "Stock Ticker Symbol": symbolx,
            "Last Price (API)": closePrice,        
            "Date Acquired": closingDay,
        
          }
        },
        
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log(record.get('Exchange'));
        });
      });


})

app.get('/rivnxapi', async(req, res) =>{
    const fetchrivn  = await fetch(rivn_data)
    const rivnData = await fetchrivn.json()
    res.send(rivnData)
    console.log(rivnData)
    const symbolx = rivnData.symbol
    const closingDay = rivnData.from
    const closePrice = rivnData.close
    console.log(closingDay)
    base('Table 1').update([
        {
          "id": "recJpxr77WedTNGB5",
          "fields": {
            "Stock Ticker Symbol": symbolx,
            "Last Price (API)": closePrice,        
            "Date Acquired": closingDay,
        
          }
        },
        
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log(record.get('Exchange'));
        });
      });

})



app.listen(PORT, ()=>{
    console.log(`I am listenning on Port ${PORT}`)
})
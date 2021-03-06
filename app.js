const express= require('express') 
const Airtable = require('airtable') 
const fetch = require('node-fetch') 
const dayjs = require('dayjs') 
const schedule = require('node-schedule')
var cron = require('node-cron')


require('dotenv').config()





const app = express()
app.use(express.static('public'))
const PORT = process.env.PORT || 3000

const stockMarket = process.env.STOCK_API
const airtable_api = process.env.AIRTABLE_KEY
const base = new Airtable({apiKey: `${airtable_api}`}).base('appkAFcXYmg8XNqMD');
const day = '2022-02-18'
const yesterday = dayjs().add(-1, 'day').format("YYYY-MM-DD", "America/New_York")


const xom_data = `https://api.polygon.io/v1/open-close/XOM/${yesterday}?adjusted=true&apiKey=${stockMarket}`
const rio_data = `https://api.polygon.io/v1/open-close/RIO/${yesterday}?adjusted=true&apiKey=${stockMarket}`
const shlx_data =  `https://api.polygon.io/v1/open-close/SHLX/${yesterday}?adjusted=true&apiKey=${stockMarket}`
const pypl_data = `https://api.polygon.io/v1/open-close/PYPL/${yesterday}?adjusted=true&apiKey=${stockMarket}`
const rivn_data =  `https://api.polygon.io/v1/open-close/RIVN/${yesterday}?adjusted=true&apiKey=${stockMarket}`

app.get('/xomapi', (req, res) =>{   

    const updateXom = async() =>{
      const fetchXom  = await fetch(xom_data)
      const xomData = await fetchXom.json()
      res.send(xomData)
      const symbolx = xomData.symbol
      const closingDay = xomData.from
      const closePrice = xomData.close
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
    }

   
    cron.schedule('*/30 * * * *', () =>{
      return  updateXom()      
    })
    

      
   
      


})//end of get method

app.get('/rioapi', async(req, res) =>{
    

    const rioUpdate = async() =>{
      const fetchrio  = await fetch(rio_data)
      const rioData = await fetchrio.json()
      res.send(rioData)
      
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
    }

    cron.schedule('*/30 * * * *', () =>{
     return rioUpdate()      
    })
   
      

})// closing of rio

app.get('/shlxapi', (req, res) =>{
    

    const shlxUpdate =async() =>{

        const fetchshlx  = await fetch(shlx_data)
      const shlxData = await fetchshlx.json()
      res.send(shlxData)
      
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
    }
  
    cron.schedule('*/30 * * * *', () =>{
     return shlxUpdate()      
    })

}) // closing of shlx




app.get('/pyplxapi', (req, res) =>{
    
    
    const pyplUpdate = async() =>{
      const fetchpypl  = await fetch(pypl_data)
      const pyplData = await fetchpypl.json()
      res.send(pyplData)
      
      const symbolx = pyplData.symbol
      const closingDay = pyplData.from
      const closePrice = pyplData.close

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
    }
    
    cron.schedule('*/30 * * * *', () =>{
      return pyplUpdate()      
    })

})// closing of pypl

app.get('/rivnxapi', (req, res) =>{
    const updateRivn =async() =>{

      const fetchrivn  = await fetch(rivn_data)
      const rivnData = await fetchrivn.json()
           
        res.json(rivnData)
   
      const symbolx = rivnData.symbol
      const closingDay = rivnData.from
      const closePrice = rivnData.close
    
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
    }
     
        cron.schedule('*/30 * * * *', (err) =>{                 
           return updateRivn()         
            
          })
})



app.listen(PORT, ()=>{
    console.log(`I am listenning on Port ${PORT}`)
})
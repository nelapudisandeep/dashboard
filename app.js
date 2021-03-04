const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { type } = require('os');


const PORT = 3000|| process.env.PORT;

const app = express()
app.listen(PORT,()=>console.log('listening on port : ',PORT));

// middlewares
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// routers
app.get('/',(req,res)=>{res.send('welcome to my world!')});

// load today's important notification is already present
app.get('/loadNotificationOfTheDay',(req,res)=>{

    // loading data!
    let loadedData = fs.readFileSync('./daily.csv',{encoding: 'utf-8'}).split('\n');
    // selecting on the present dates notifications!
    let dataForTheDay = [];
    loadedData.forEach(ele=>{
        let elements = ele.split(',');
        let current = new Date().toDateString().split(' ');
        let available =  [elements[2],elements[3],elements[4],elements[5]];
        let state = compare(current,available);
        if(state){
            dataForTheDay.push(ele);
        }
    })  
    let messageForTheDay = dataForTheDay[0].split(',')[1];
    res.json({
        message : 'good',
        data : {
            message : messageForTheDay,
        }
    });
});

// adding today's important notification!
app.post('/checkAndAddToServer',(req,res)=>{

    let id = req.body.id;
    let message = req.body.message;
    let dateString = req.body.dateString;

    if(!id){
        // ADDING THE DATA TO THE DATA.JS FILE!
        let newId = generateRandomString();
        let dataContent = [newId,message,dateString];

        fs.writeFileSync('./daily.csv',dataContent);
        res.json({
            status: 'good',
            data : {
                newId,
                message,
                dateString
            }
        });
    }else{
        fs.readFileSync('daily.csv',{encoding:'utf-8'});
        // verify whether it is today or not!
        let newIdGen = generateRandomString();
        let newData = [newIdGen,message,dateString];
        fs.writeFileSync('./daily.csv',newData);

        res.json({
            status : 'good but not good!',
            data : {
                newId : newIdGen,
                message:message,
                dateString : dateString,
            }
        })
    }
});


// adding item to the list
app.post('/addItemToList',(req,res)=>{
    let dateString = req.body.dateString;
    let modifiedItemsList = removeNulls(req.body.tasksList);

    let dataTemp = [];
    modifiedItemsList.forEach(item=>{
        let status = false;
        let id = generateRandomString();
        let task = item

        let object = {
            status,
            id,
            dateString,
            task
        };

        dataTemp.push(JSON.stringify(object));
    });
    
    // console.log(dataTemp);
    // fs.appendFileSync()
    fs.appendFileSync('./list.csv',dataTemp);
    res.json({
        status:'good',
        data : {
            dataTemp
        }
    })
})

// get all the list items and send it to client
app.get('/allListItems',(req,res)=>{
    let readListData = fs.readFileSync('./list.csv',encoding='utf-8');
    readListData  = removeNulls(readListData.split('}'));
    
    res.json({
        data : readListData
    });
})

// deleting all the items in the list.csv
app.get('/deleteAll',(req,res)=>{
    fs.writeFileSync('./list.csv','');
    res.json({
        message: 'Good',
    });
})
// generate random string!
function generateRandomString(){
    let len = 10;
    let randomStr = '';
    let choices = ['@','#','$','&','*','_','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
    for(let i = 0;i<len;i++){
        randomStr += choices[Math.floor(Math.random()*len)]
    }
    return randomStr;
}

// compare two lists and give the boolean value!
function compare(list1,list2){
    let count = 0;
    for(let i = 0;i<list1.length-1;i++){
        if(list1[i] === list2[i]){
            count +=  1;
        }
    }
    if(list1[list1.length-1] === list2[list2.length-1].split('\r')[0]){
        count += 1;
    }
    if(count === list1.length){
        return true;
    }else{
        return false;
    }
}

function removeNulls(list){

    let newlist = [];
    list.forEach(item=>{
        if(item.length !== 0){
            newlist.push(item);
        }
    });

    return newlist;
}

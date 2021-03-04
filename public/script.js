/*

    TASKS
    -----

    CHANGE COLOR THEME ---> DONE
    GET THE LATEST DATE AND UPDATE THE SIDEBAR DATE SECTION ---> DONE
    UPDATE THE LIST ITEM FOR THE DAY FROM THE SERVER  -->DONE
    SEED THE CALENDER IN THE EMPTY BOXES -->DONE
    GET A QUOTE AND ITS AUTHOR --> DONE
    HANDLE MONTH AND YEAR FOR THE CALENDAR -->DONE

*/

// HANDLING COLOR THEME
let boxs = document.querySelectorAll('.box');
boxs.forEach(box => {
    box.addEventListener('click', e => {
        e.preventDefault();
        let className = box.classList[1];

        if (className === "red") {
            document.body.style.setProperty('--color-lightest', 'rgba(248, 223, 223, 0.5)');
            document.body.style.setProperty('--color-lightest-shade', 'rgb(226, 191, 191)');
            document.body.style.setProperty('--color-lightest-shade-2', 'rgb(85, 84, 84)');
            document.body.style.setProperty('--color--light-shadow', 'rgba(155, 155, 155, 0.562)');
            document.body.style.setProperty('--color-green-shade', 'rgba(250, 162, 162, 0.781)');
            document.body.style.setProperty('--color-green-shade-dark', 'rgb(82, 3, 3)');
            document.body.style.setProperty('--color-green-shade-light', 'rgb(248, 206, 206)');
        } else if (className === "green") {
            document.body.style.setProperty('--color-lightest', 'rgba(223, 248, 223,0.5)');
            document.body.style.setProperty('--color-lightest-shade', 'rgb(191, 226, 191)');
            document.body.style.setProperty('--color-lightest-shade-2', 'rgb(84, 85, 84)');
            document.body.style.setProperty('--color--light-shadow', 'rgba(155, 155, 155, 0.562)');
            document.body.style.setProperty('--color-green-shade', 'rgba(162, 250, 162, 0.781)');
            document.body.style.setProperty('--color-green-shade-dark', 'rgb(3, 82, 3)');
            document.body.style.setProperty('--color-green-shade-light', 'rgb(206, 248, 206)');

        } else if (className === "purple") {
            document.body.style.setProperty('--color-lightest', 'rgba(228, 223, 248, 0.5)');
            document.body.style.setProperty('--color-lightest-shade', 'rgb(196, 191, 226)');
            document.body.style.setProperty('--color-lightest-shade-2', 'rgb(84, 84, 85)');
            document.body.style.setProperty('--color--light-shadow', 'rgba(155, 155, 155, 0.562)');
            document.body.style.setProperty('--color-green-shade', 'rgba(185, 162, 250, 0.781)');
            document.body.style.setProperty('--color-green-shade-dark', 'rgb(27, 3, 82)');
            document.body.style.setProperty('--color-green-shade-light', 'rgb(219, 206, 248)');

        } else if (className === "dark") {
            document.body.style.setProperty('--color-lightest', 'rgb(1, 19, 8)');
            document.body.style.setProperty('--color-lightest-shade', 'rgb(94, 94, 94)');
            document.body.style.setProperty('--color-lightest-shade-2', 'rgb(84, 84, 85)');
            document.body.style.setProperty('--color--light-shadow', 'rgba(155, 155, 155, 0.562)');
            document.body.style.setProperty('--color-green-shade', 'rgba(102, 100, 107, 0.781)');
            document.body.style.setProperty('--color-green-shade-dark', 'rgb(255, 255, 255');
            document.body.style.setProperty('--color-green-shade-light', 'rgb(163, 82, 255)');

        }
    })
});

// HANDLING DATE SECTION IN THE SIDEBAR HEADER SECTION
addDate();

function addDate() {
    let date = document.querySelector('.date');
    let day = document.querySelector('.day');

    let d = new Date()
    let ds = d.toDateString().split(' ')

    // Array(4) [ "Wed", "Mar", "03", "2021" ]

    if (ds[2] == "03" || ds[2] == "23") {
        ds[2] = ds[2] + "rd";
    } else if (ds[2] == "01" || ds[2] == "21") {
        ds[2] = ds[2] + "st";
    } else if (ds[2] == "02" || ds[2] == "22") {
        ds[2] = ds[2] + "nd";
    } else {
        ds[2] = ds[2] + "th";
    }

    let date_text = ds[2] + " " + ds[1] + " , " + ds[3]
    let day_text = ds[0];

    date.textContent = date_text;
    day.textContent = day_text;
}

// SEEDING THE CALENDAR
const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}
getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let weekDates = document.querySelectorAll('.week-date');
let currentViewMonth = document.querySelector('.current-view-month');
let currentViewYear = document.querySelector('.current-view-year');

function generateDates(month,year){
    weekDates.forEach(ele=>ele.innerHTML = "");
    currentViewMonth.textContent = month_names[month] + " , ";
    currentViewYear.textContent = year;
    let currentDate = new Date();
    if(!month) month = currentDate.getMonth()
    if(!year) year = currentDate.getFullYear()

    // getting the first day of the month
    let first_day = new Date(year,month,1);
    // console.log(first_day);
    let no_of_days = days_of_month[month];
    first_day = first_day.toDateString().split(" ")[0]
    let offsets = {
        'Sun' : '0',
        'Mon' : '1',
        'Tue' : '2',
        'Wed' : '3',
        'Thu' : '4',
        'Fri' : '5',
        'Sat' : '6'
    }
    let offset_of_the_month = offsets[first_day];
    for(let i = 0 + Number(offset_of_the_month);i<no_of_days + Number(offset_of_the_month);i++){        
            weekDates[i].textContent = i-Number(offset_of_the_month) + 1;
    }
}

// upon refresh on onload
generateDates(new Date().getMonth(),new Date().getFullYear());
// HANDLING LOOK BUTTON
let lookBtn = document.querySelector('.change');
let monthOpt = document.querySelector('#month');
let yearOpt = document.querySelector('#year');

lookBtn.addEventListener('click',e=>{
    e.preventDefault();
    month_names.forEach((ele,i)=>{
        if(ele === monthOpt.value){
            month = i
        }
    })
    // console.log(month,yearOpt.value);
    generateDates(month,yearOpt.value);
});

let default_quote = `If your actions inspire others to dream more, learn more, do more and become more, you are a leader.`;
let default_author = `John Quincy Adams`;

let quote = document.querySelector('.quote');
let author = document.querySelector('.author');

// DEALING WITH THE RANDOM QUOTE API
let url = `https://api.quotable.io/random`;

fetch(url)
    .then(data=>data.json())
    .then(data=>{
        console.log(data);
        quote.textContent = data.content;
        author.textContent = data.author;
    })
    .catch(err=>{
        quote.textContent = default_quote;
        author.textContent = default_author;
});


// works pending
// make up a JSON file with all the dates and plans 
// keep the server on and serve the details.
// sidebar section pending!;

// HANDLING IMPORTANT TASK OF THE DAY!
let notif = document.querySelector('.notif');
let notifModal = document.querySelector('.notif-modal-wrapper');
let closeNotifModal = document.querySelector('.close');

notif.addEventListener('click', e => {
    e.preventDefault();
    notifModal.classList.toggle('display-hide');
});

closeNotifModal.addEventListener('click', e => {
    e.preventDefault();
    notifModal.classList.toggle('display-hide');
});

// loading the notification for the day on refresh
loadNotificationofTheDay();

// handling the adding/updating of the new notification for the day!
let addNotifBtn = document.querySelector('#addImportantNotificationMessage');
let message = document.querySelector('#importantMessage');
let notificationId = document.querySelector('#notificationId');

addNotifBtn.addEventListener('click',e=>{
    e.preventDefault();
    notificationIdValue = notificationId.textContent;
    messageValue = message.value;
    checkandAddToServer({messageValue,notificationIdValue});
    message.value = '';
})

function checkandAddToServer({messageValue,notificationIdValue}){
    let options = {
        method : 'POST',
        cors : '*',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            message: messageValue,
            id : notificationIdValue,
            dateString : new Date().toDateString().split(' ')
        }),
    };

    fetch('/checkAndAddToServer',options)
    .then(resp=>resp.json())
    .then(data=>{
        notificationId.textContent = data.data.newId;
        notif.textContent = data.data.message;
    })
    .catch(err=>console.error(err));
}

function loadNotificationofTheDay(){
    fetch('/loadNotificationOfTheDay')
        .then(resp=>resp.json())
        .then(data=>{
            // console.log(data);
            notif.textContent = data.data.message;
        })
        .catch(err=>console.error(err));
}


// HANDLING THE SPECIFIC DATE LIST OF TODOS TO BE DONE ON THAT PARTICULAR DAY!
// TASKS : 
// ----------
// UPON LOADING OR REFRESH LOAD THE LIST OF ITEMS OF THE PRESENT DATE
// all the items will be displayed irrespective of the dates

// HANDLING MODEL FOR THE ADDITION OF THE DATA
let dateBoxs = document.querySelectorAll('.week-date');
let closeListModal = document.querySelector('.list-modal-wrapper');
let closeListModalBtn = document.querySelector('#closeListModal');
let closeListContent = document.querySelector('#listItemContent');
let addPreviewBtn = document.querySelector('#addItemToPreview');
let previewArea = document.querySelector('#listContent');
let submitBtn = document.querySelector('#addListItem');
let deleteBtn = document.querySelector('.delete');

// get current month,year,date of the click

closeListModalBtn.addEventListener('click',e=>{
    e.preventDefault();
    console.log('clicked!');
    closeListModal.classList.toggle('display-hide');
});

let dateString;
dateBoxs.forEach(box=>box.addEventListener('click',e=>{
    e.preventDefault();
    let date = box.textContent;
    let monthval = document.querySelector('.current-view-month').textContent.split(' , ')[0];
    let yearval = document.querySelector('.current-view-year').textContent;
    
    dateString = `${date} ${monthval} ${yearval}`;
    previewArea.textContent = dateString + ',';
    // deal with modal 
    let listItemValue;
    addPreviewBtn.addEventListener('click',e=>{
        e.preventDefault();
        listItemValue = closeListContent.value;
        
        let li = document.createElement('li');
        li.textContent = listItemValue;
        li.setAttribute('class','list-item-temp');
        previewArea.appendChild(li);
        closeListContent.value = '';
    });

    closeListModal.classList.toggle('display-hide');
}));

// chance of having modal problem!!!
submitBtn.addEventListener('click',e=>{
    e.preventDefault();
    // get all the elements content and make a json object of data for that day!
    let childrenElementsCount = previewArea.childElementCount;
    let tasks = [];
    for(let i = 0;i<childrenElementsCount;i++){
        tasks.push(previewArea.children[i].textContent);
    }
    let dataObject = {
        dateString,
        "tasksList" : tasks
    };
    // send this data to the server to save it in the file!
    sendDataListToServer(dataObject);
    closeListModal.classList.toggle('display-hide');
}); 

function sendDataListToServer(data){

    let options = {
        method : 'POST',
        cors : '*',
        headers : {
            'Content-Type':'application/json',
        },
        body : JSON.stringify(data)
    };

    fetch('/addItemToList',options)
        .then(resp=>resp.json())
        .then(datum=>{
            datatemp = datum.data.dataTemp;
            
            datatemp.forEach(item=>{
                item = JSON.parse(item);
                // console.log(item);
                addListItemToDOM(item);
            })
        })
        .catch(err=>console.error(err));
}

function addListItemToDOM(data){
    /*
        <li class="todays-item">   
            <p class="item-content done">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, enim?</p>
            <span class="date-item">03 Mar 2021</span>
            <span class="item-id">fsggjpipi</span>
        </li>       
    */
    let li = document.createElement('li');
    let p = document.createElement('p');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    li.setAttribute('class','todays-item');
    p.setAttribute('class','item-content');
    span1.setAttribute('class','data-item');
    span2.setAttribute('class','item-id');

    p.textContent = data.task;
    span1.textContent = data.dateString;
    span2.textContent = data.id;


    li.append(p,span1,span2);
    document.querySelector('.sidebar-list').appendChild(li);
}

function getAllListItems(){
    document.querySelector('.sidebar-list').innerHTML = '';
    fetch('/allListItems')
        .then(res=>res.json())
        .then(data=>{
            let items = data.data;
            if(items.length === 0){
                document.querySelector('.sidebar-list').textContent = "Sorry no records found!!";
            }else{
                data.data.forEach(item=>{
                    item = JSON.parse(modifyJSON(item));
                    addListItemToDOM(item);
                });
            }
        })
        .catch(err=>console.error(err));
}
// list of task for all months and years
getAllListItems();

function modifyJSON(jsonStr){
    jsonStr += '}';
    let finalStr = '';
    let jsonStrLts = jsonStr.split('');
    if(jsonStrLts[0] === ','){
        let temp = '';
        for(let i = 1;i<jsonStrLts.length;i++){
            temp += jsonStrLts[i];
        }
        finalStr = temp;
    }else{
        finalStr = jsonStr;
    }

    return finalStr;
}

// filtering the list
let fltMonth = document.querySelector('#monthFilter');
let fltYear = document.querySelector('#yearFilter');
let filterBtn = document.querySelector('.filter');
let clearFilterBtn = document.querySelector('#clearFilter');

filterBtn.addEventListener('click',e=>{
    e.preventDefault();
    fltMonthVal = fltMonth.value;
    fltYearVal = fltYear.value;
    fetch('/allListItems')
        .then(res=>res.json())
        .then(data=>{
            let items = [];
            data.data.forEach(item=>{
                item = JSON.parse(modifyJSON(item));
                let temp = item.dateString.split(" ");
                if(temp[1] === fltMonthVal && temp[2] === fltYearVal){
                    items.push(item);
                }
            });

            // removing all the previous childhren of the list
            document.querySelector('.sidebar-list').innerHTML = '';
           if(items.length === 0){
            document.querySelector('.sidebar-list').innerHTML = 'No records found!!!';
           }else{
            items.forEach(ele=>addListItemToDOM(ele));
           }

            // setting the buttons!
            filterBtn.classList.toggle('display-hide');
            clearFilterBtn.classList.toggle('display-hide');
        })
        .catch(err=>console.error(err));
});

clearFilterBtn.addEventListener('click',e=>{
    e.preventDefault();
    fetch('/allListItems')
        .then(res=>res.json())
        .then(data=>{
            document.querySelector('.sidebar-list').innerHTML = '';
            data.data.forEach(item=>{
                item = JSON.parse(modifyJSON(item));
                addListItemToDOM(item);
            });
            
            clearFilterBtn.classList.toggle('display-hide');
            filterBtn.classList.toggle('display-hide');
        })
        .catch(err=>console.error(err));
});

// deleting all records
let promptModal = document.querySelector('.promptModal');

let yesBtn = document.querySelector('.yes');
let noBtn = document.querySelector('.no');
deleteBtn.addEventListener('click',e=>{
    promptModal.classList.toggle('display-hide');
});
yesBtn.addEventListener('click',e=>{
    fetch('/deleteAll')
        .then(res=>res.json())
        .then(data=>{
            if(data.message === 'Good'){
                getAllListItems();
            }
        })
        .catch(err=>console.error(err));
    promptModal.classList.toggle('display-hide');
    deleteBtn.classList.toggle("display-hide");
});
noBtn.addEventListener('click',e=>{
    e.preventDefault();
    promptModal.classList.toggle('display-hide');
});
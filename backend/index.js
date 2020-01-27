const app = require('express')();
const bp = require('body-parser');
const fs = require('fs');
var cors = require('cors')
    //let rawdata = fs.readFileSync('data.json');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.listen(3000, (err) => {
    if (err) console.log("error");
    else console.log("Server inititated on 3000");
})

app.get('/', (req, res) => {
    let fileContent;
    fileContent = fs.readFileSync('data.json', 'utf8');
    console.log(fileContent);
    if (fileContent == "[]" || fileContent == "") {
        return res.status(404).json({
            err: true,
            msg: "json is empty"
        })
    }
    let data = JSON.parse(fileContent);
    return res.status(200).json(data);
})

app.get('/:id', (req, res) => {
    let ab = req.params.id;
    let fileContent;
    fileContent = fs.readFileSync('data.json', 'utf8');
    let myInfo = [];
    // console.log(fileContent);
    if (fileContent == "[]" || fileContent == "") {
        return res.status(404).json({
            err: true,
            msg: "json is empty"
        })
    }
    myInfo = JSON.parse(fileContent);
    // console.log(myInfo);
    // fileContent = fileContent.filter((item) => item.id == parseInt(ab))
    // let data = JSON.parse(fileContent);

    let tempValue;
    tempValue = myInfo.find(i => {
        if (i.id == ab)
            return i;
    })
    return res.status(200).json({
        err: false,
        data: tempValue
    });
})

app.post('/', function(req, res) {

    let fileContent = fs.readFileSync('data.json', 'utf8');
    let mylist = JSON.parse(fileContent);
    let newdata = {
        id: Date.now(),
        name: req.body.name
    };

    mylist.push(newdata);
    fileContent = JSON.stringify(mylist)
    fs.writeFileSync('data.json', fileContent);
    console.log('updated');

    return res.status(200).json({
        err: false,
        data: newdata.id
    })
})

app.put('/:id', (req, res) => {
    let value = req.params.id;
    let fileContent;
    fileContent = fs.readFileSync('data.json', 'utf8');
    let myInfo = [];
    if (fileContent == "[]" || fileContent == "") {
        return res.status(404).json({
            err: true,
            msg: "json is empty"
        })
    }
    myInfo = JSON.parse(fileContent);
    const index = myInfo.findIndex(item => item.id == value);
    if (index !== -1) {
        myInfo[index].name = req.body.name;
        let data = JSON.stringify(myInfo)
        fs.writeFileSync('data.json', data)
        console.log('edited')
    }
    return res.status(200).json({
        err: false,

    })
})

app.delete('/:id', function(req, res) {
    let value = req.params.id;
    let fileContent;
    fileContent = fs.readFileSync('data.json', 'utf8');
    let myInfo = [];
    if (fileContent == "[]" || fileContent == "") {
        return res.status(404).json({
            err: true,
            msg: "json is empty"
        })
    }
    myInfo = JSON.parse(fileContent);
    jsondata = myInfo.filter((item) => item.id !== parseInt(value))
    let data = JSON.stringify(jsondata)
    fs.writeFileSync('data.json', data)
    console.log('deleted')

    return res.status(200).json({
        err: false,

    })
})
let express = require('express'), fs = require('fs'), app = express(), path = require('path');
app.use('/css', express.static(path.join(__dirname, './assets/css')));
app.use(express.urlencoded({extended:true}));
app.get('/', (req,res)=>{res.status(200).sendFile(path.join(__dirname, './web/urlap.html'))})
app.post('/api/send', (req,res)=>{
    let name=req.body.name, age = req.body.age, breed = req.body.breed, desc=req.body.desc;
    fs.appendFile('adat.txt', `${name}|${age}|${breed}|${desc}\n`, (err)=>{if (err) res.status(503).send("Da ist ein ERROR!"); else res.status(200).send('Da ist kein ERROR!')});
})
app.get('/api/pets', (req, res)=>{
    fs.readFile('adat.txt', (err, data)=>{
        if (err) res.status(500).send(err);
        else{
            let content = data.toString().trim();
            let contents = content.split('\n')
            console.table(contents);
            let str = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Sorsz</th>
                        <th>Becenév</th>
                        <th>Kor</th>
                        <th>Fajta</th>
                        <th>Leírás</th>
                    <tr>
                </thead>
                <tbody>`;
            let i = 0;
            contents.forEach(e=>{
                let dat = e.split('|')
                str+=`
                <tr>
                    <td>${i}</td>
                    <td>${dat[0]}</td>
                    <td>${dat[1]}</td>
                    <td>${dat[2]}</td>
                    <td>${dat[3]}</td>
                </tr>`;
                i++;
            })
            str+=`</tbody></table>`
            res.status(200).send(str)
        }
    })
})
app.listen(3000, console.log('Listening on http://localhost:3000'));
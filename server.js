//variables toujours au début du script
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
//permet d'afficher les fichiers css
app.use(express.static("public"));

//contient les elements à ajouter 
var task = ["nourir le chat", "tondre la pelouse"];
//contient les elements supprimés
var complete = ["manger une glace"];

app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    //ajouter un element
    task.push(newTask);
    //après l'ajout au tableau, revenir à la racine
    console.log(task)
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    console.log(req.body)
    console.log(task)
    if (typeof completeTask === "string"){
        complete.push(completeTask);
        task.splice(task.findIndex(completeTask), 1);

    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
        complete.push(completeTask[i]);
        //vérifier si la tâche terminée existe déjà, si oui, on la supprime de la liste. 
        task.splice(task.findIndex(completeTask[i]), 1);  
    }
    }
    res.redirect("/");
});

//afficher le fichier ejs
app.get("/", function(req, res) {
    res.render("home", { task: task, complete: complete });
});

// launch server
app.listen(3000, function () {
    console.log('Server is running on port 3000')
});


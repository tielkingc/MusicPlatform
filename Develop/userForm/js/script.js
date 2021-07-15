$(document).ready(function() {
    $('select').formSelect();
})

var formResults = function(){


    var first_name = document.getElementById("first_name").value;

    var last_name = document.getElementById("last_name").value;

    var password = document.getElementById("password").value;

    var email = document.getElementById("email").value;

    // var genre1 = document.getElementById("genre1").options.selected
    // var first_name_value = first_name.value;
    var genres = [];
    for (var genre1 of document.getElementById("genre1").options){
        if (genre1.selected) {
            genres.push(genre1.value);
        }
    };

    for (var genre2 of document.getElementById("genre2").options){
        if (genre2.selected) {
            genres.push(genre2.value);
        }
    };

    for (var genre3 of document.getElementById("genre3").options){
        if (genre3.selected) {
            genres.push(genre3.value);
        }
    };

    console.log(first_name);
    console.log(last_name);
    console.log(email);
    console.log(password);
    console.log(genres);
}

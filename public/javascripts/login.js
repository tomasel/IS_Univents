var loggedUser = {};

function login()
{
    //get the form object
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    console.log("here");

    fetch('../api/v1/authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, password: password } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        loggedUser.email = data.email;
        loggedUser.id = data.id;
        loggedUser.self = data.self;
        document.getElementById("loggedUser").textContent = loggedUser.email;
        home();
        return;
    })
    .catch( error => console.error(error) );
};

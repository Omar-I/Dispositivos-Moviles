var firebaseConfig = {
    apiKey: "AIzaSyC3VeCgW6oZVa7ubuBDFEFiAd_vqyZ3i_k",
    authDomain: "app-moviles-1e21e.firebaseapp.com",
    databaseURL: "https://app-moviles-1e21e.firebaseio.com",
    projectId: "app-moviles-1e21e",
    storageBucket: "app-moviles-1e21e.appspot.com",
    messagingSenderId: "554587171558",
    appId: "1:554587171558:web:98f887418216f246816927",
    measurementId: "G-9K8203GWY9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var correo = document.getElementById("Input3").value;
    var departamento = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var empleado = {
            id, //matricula:id
            nombre,
            correo,
            departamento,
        }

        //console.log(empleado);

        firebase.database().ref('empleados/' + id).update(empleado).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('empleados').push().key;
    //data[`empleados/${key}`]= empleado;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('empleados');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(empleado){
    
    if(empleado!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = empleado.id;
        cell2.innerHTML = empleado.nombre; 
        cell3.innerHTML = empleado.correo;
        cell4.innerHTML = empleado.departamento; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${empleado.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+empleado.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('empleados/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('empleados/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(empleado){
    if(empleado!=null)
    {
        document.getElementById("Input1").value=empleado.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=empleado.nombre;
        document.getElementById("Input3").value=empleado.correo;
        document.getElementById("Input4").value=empleado.departamento;
    }
}


//Para consulta de departamento
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("empleados");
    ref.orderByChild("departamento").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(empleado){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = empleado.id;
    cell2.innerHTML = empleado.nombre; 
    cell3.innerHTML = empleado.correo;
    cell4.innerHTML = empleado.departamento; 
   
}
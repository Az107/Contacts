var es_ie = navigator.userAgent.indexOf("MSIE") > -1 ;
if(es_ie){
                alert("NO PROGRAMO PARA INTERNET EXPLORER");
}
        const MAX = 5;
        master = new Array();
        lista_busqueda = new Array();



        if (localStorage.length  == 0){
                alert("Bienvenido por primera vez");
        }else{
            try{
                master = JSON.parse(localStorage.getItem("master"));
            }
            catch{
                alert("ERROR\n No se a podido recuperar sus archivos\n Le rogamos disculpe las molestias");
                localStorage.removeChild("master");
            }
        }
         
        
    

        //sistema de ventanas
        function drag(elmnt) {
            document.getElementById("usernum").innerHTML = "&nbsp;" + master.length + " contactos &nbsp;";
            var pos2 = 0, pos2 = 0, pos3 = 3, pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                document.getElementById(elmnt.id + "header").onmousedown = dragMauseDown;

            
            } else {
                elmnt.onmousedown = dragMauseDown;
            }

            function dragMauseDown(e) {
                var ventanas = document.getElementsByClassName("window");
                for (i = 0; i < ventanas.length;i++) {
                    ventanas[i].style.zIndex = "10";
                }
                elmnt.style.zIndex = "11";
                e = e || window.event;
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
            function elementDrag(e) {
                e = e || window.event;
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
            function closeDragElement() {

                document.onmouseup = null;
                document.onmousemove = null;
                
            }
        }



        //constructora del objeto contacto
        function contact(cid, nombre, apellido, numero, mail) {
            this.cid = cid;
            this.nombre = nombre;
            this.apellido = apellido;
            this.numero = numero;
            this.mail = mail;
        }


        //email autocomplete

        function autocompletar(){
            console.log("iniciando autocomplete");
            mail_box =  document.getElementById("N-mail");
            sugest_box = document.getElementById("sugest");
            lista = document.getElementById("sugest");
            lista.innerHTML = ""
            sugest_box.style.display = "inline";
            el_li = document.createElement("ul")
            el_li.innerHTML = mail_box.value + "@gmail.com"
            lista.appendChild(el_li);
             el_li = document.createElement("ul")
            el_li.innerHTML = mail_box.value + "@hotmail.com"
            lista.appendChild(el_li);
            el_li = document.createElement("ul")
            el_li.innerHTML = mail_box.value + "@outlook.com"
            lista.appendChild(el_li);



        }
        function autocompletar_ocultar(){
            sugest_box.style.display = "none";
        }

        //creador de ventanas
        //muestra los div (las ventanas) e inicializa el movimiento de las mismas
        function nuevoc() {
            if (master.length == MAX) {
                alert("no se admiten mas entradas");

                return;
            } else {

                document.getElementById("formulario-N").style.visibility = "visible";
                drag(document.getElementById("formulario-N"));
            }

        }
        function buscarc() {
            document.getElementById("formulario-B").style.visibility = "visible";

            drag(document.getElementById("formulario-B"));

        }

        function eliminar_datos(cid) {
            var seguro = confirm("Esta seguro que desea eliminar el contacto " + master[cid].nombre + "?");
            console.log(seguro);
            if (seguro == true) {
            console.log("Eliminado " + cid);
            master.splice(cid, 1);
            todosc(1);
            localStorage.setItem("master",JSON.stringify(master));
            }


            document.getElementById("usernum").innerHTML = "&nbsp;" + master.length + " contactos &nbsp;";

        }
        //este ademas actualiza la tabla para mostrar los datos
        function todosc(opc) {
            function ver_datos(lista) {
                //para evitar que se repitan en la tabla se seleccionan todos las filas y se borran
                var tabla = document.getElementById("out")
                var filas = tabla.querySelectorAll("tr");
                filas.forEach(function (elemento, indice, arreglo) {
                    if (indice != 0) {
                        tabla.removeChild(elemento);
                    }
                });



                lista.forEach(contacto => {
                    if (contacto == null) { return; }
                    var fila = document.createElement("tr");
                    document.getElementById("out").appendChild(fila);
                    _name = document.createElement("td");
                    _surname = document.createElement("td");
                    _numero = document.createElement("td");
                    _mail = document.createElement("td");
                    btn = document.createElement("button");


                    _name.innerHTML = contacto.nombre;
                    _surname.innerHTML = contacto.apellido;
                    _numero.innerHTML = contacto.numero;
                    _mail.innerHTML = contacto.mail;
                    btn.innerHTML = "X";
                    cmd = "eliminar_datos(" + master.indexOf(contacto) + ");"
                    btn.setAttribute("onclick", cmd);


                    fila.appendChild(_name);
                    fila.appendChild(_surname);
                    fila.appendChild(_numero);
                    fila.appendChild(_mail);
                    fila.appendChild(btn);


                });
            }
            if (opc == 0) {

                document.getElementById("formulario-R").style.visibility = "visible";
                drag(document.getElementById("formulario-R"));

                ver_datos(master);
            }
            if (opc == 2) {
                console.log("mostrado busqueda");
                document.getElementById("formulario-R").style.visibility = "visible";
                drag(document.getElementById("formulario-R"));
                ver_datos(lista_busqueda);
                lista_busqueda = new Array();
            }
            else {
                ver_datos(master);
            }

        }

        //Creaccion de nueva entrada
        function nuevoct() {
            name = document.getElementById("N-nombre").value;
            surname = document.getElementById("N-apellido").value;
            num = document.getElementById("N-numero").value;
            mail = document.getElementById("N-mail").value;

            //expresiones regulares para validar los datos

            var name_re = new RegExp('[a-z]{1,10}');
            var num_re = new RegExp("[0-9]{9}");
            var mail_re = new RegExp('[a-z|^a-z|0-9]+\@{1}[a-z|^a-z|0-9]+\.[a-z]{2,6}');

            if (!name_re.test(name)) {
                alert("El campo del nombre no puede contentener espacios, caracteres especiales ni mas de 10 letras");
                document.getElementById("N-nombre").value = "";
                return;
            }
            if (!num_re.test(num)) {
                alert("El numero introducido no es valido");
                document.getElementById("N-numero").value = "";
                return;
            }
            if (!mail_re.test(mail)){
                alert("El email introducido no es valido");
                  document.getElementById("N-numero").value = "";
                return;

            }

            //introduce los datos a el objeto que esta en el array

            var nuevo_contacto = new contact(master.length, name, surname, num, mail);

            if (master.length >= MAX + 1) {
                alert("no se admiten mas entradas");

                return;
            }
            console.log(nuevo_contacto);
            master.push(nuevo_contacto);

            todosc(1);

            document.getElementById("usernum").innerHTML = "&nbsp;" + master.length + " contactos &nbsp;";
            localStorage.setItem("master",JSON.stringify(master));
            //ocultar y restablece la ventana


            document.getElementById("N-nombre").value = "";
            document.getElementById("N-apellido").value = "";
            document.getElementById("N-numero").value = ""
            document.getElementById("N-mail").value = "";
            document.getElementById("formulario-N").style.visibility = "hidden";
        }

        //Logica de busqueda
        function buscarct() {
            console.log("buscando");

            master.forEach(contacto => {

                for (elemento in contacto) {
                    console.log(contacto[elemento]);
                    dato = contacto[elemento]

                    let busqueda = String(document.getElementById("busqueda").value);
                    let elemento_buscando = String(contacto[elemento]);

                    if (elemento_buscando.toLowerCase().search(busqueda.toLowerCase()) != -1) {

                        console.log(contacto);
                        lista_busqueda.push(contacto);
                        break;

                    }
                }
            });
            console.log(lista_busqueda);
            todosc(2);
        }

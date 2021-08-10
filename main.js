const loggedOut = document.querySelectorAll('.logged-out')
const loggedInt = document.querySelectorAll('.logged-in')

const val_log = user => {
    if(user){
        loggedInt.forEach(link => link.style.display = 'block');
        loggedOut.forEach(link => link.style.display = 'none');
    }else{
        loggedInt.forEach(link => link.style.display = 'none');
        loggedOut.forEach(link => link.style.display = 'block');
    }
}

const singupForm = document.querySelector('#singup-form');

singupForm.addEventListener('submit',(e)=> {
    // e.preventDefault();

    const email = document.querySelector('#singup-email').value;
    const password = document.querySelector('#singup-password').value;

    auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredential => {

            singupForm.reset();

            $('#singupmodal').modal('hide');
            console.log("Sing Up");
        })
});

//login

const login = document.querySelector('#login-form');

login.addEventListener('submit', e =>{
    e.preventDefault();
    const email_log = document.querySelector('#login-email').value;
    const password_log = document.querySelector('#login-password').value;
    console.log(email_log,password_log);
    
    auth
        .signInWithEmailAndPassword(email_log,password_log)
        .then(userCredential => {

            login.reset();

            $('#singinmodal').modal('hide');
            console.log("Sing In");
        })
})

const logout = document.querySelector('#logout')

logout.addEventListener('click',e =>{
    e.preventDefault();

    auth.signOut().then(()=>{
        console.log("sesion cerrada");
    })
})


//Google

const google_log = document.querySelector('#google-log')

google_log.addEventListener('click', e =>{
    console.log("Click google");
    
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then(result =>{
            console.log("Google inicio Sesion");
            singupForm.reset();

            $('#singupmodal').modal('hide');
        })
        .catch(err =>{
            console.log(err)
        })
})


//face log


const face_log = document.querySelector('#Face-log')

face_log.addEventListener('click', e =>{
    e.preventDefault();
    console.log("Click Facebook");
    
    const provider = new firebase.auth.FacebookAuthProvider();

    auth.signInWithPopup(provider)
        .then(result =>{
            console.log(result);
            console.log("Facebook inicio Sesion");
            singupForm.reset();

            $('#singupmodal').modal('hide');
        })
        .catch(err =>{
            console.log(err)
        })
})
//publicaciones

const publicaciones = document.querySelector('.post')
const setup = data => {
    if(data.length ){
        let html ='';
        data.forEach(doc =>{
            const post = doc.data()
            console.log(post)
            const li= `
            <li class="list-group-item list-group-item-action">
                <h5>${post.titulo}</h5>
                <p>${post.descripcion}</p>
            </li>
            `;
            html += li;
        });
        publicaciones.innerHTML= html;
    }else{
        publicaciones.innerHTML= '<p class="tex-center">Por favor logueate para ver las publicaciones </p>';

    }
}

auth.onAuthStateChanged(user =>{
    if(user){
        fs.collection('post')
        .get()
        .then((snapshot)=>{
            setup(snapshot.docs)
            val_log(user);
        })
    }else{
        setup([])
        val_log(user);
    }
})


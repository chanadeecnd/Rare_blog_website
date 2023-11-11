
function getDate() {
    const name_month = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const d = new Date();
    const month = (d.getMonth() + 1 > 12) ? 1 : d.getMonth() + 1;
    const date = `${name_month[month]} ${d.getDate()},${d.getFullYear()}`;
    return date;
}

const header = document.querySelector('nav');
const bttHeader = document.querySelector('.get-start')
function scroll() {
    if (document.documentElement.scrollTop > 500) {
        header.classList.add("active")
        bttHeader.classList.add("btn-start")
    } else {
        header.classList.remove("active")
        bttHeader.classList.remove("btn-start")
    }
}

function progress() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    console.log(winScroll)
    document.getElementById("myBar").style.width = scrolled + "%";
}

// const email = document.querySelector('.email-signin')
// console.log(email.childNodes[1])
// email.addEventListener('mouseover',(e)=>{
//     email.childNodes[1].style.color = "white"
// })

window.onscroll = () => {
    scroll()
    progress()
}

let eyeicon = document.querySelector('#eyeicon')
let password = document.querySelector('#password')
let con_eyeicon = document.querySelector('#con-eyeicon')
let con_password = document.querySelector('#con-password')

eyeicon.addEventListener('click',()=>{
    if(password.type == 'password'){
        password.type = 'text';
        eyeicon.innerHTML = '<i class="fa-solid fa-eye-slash" style="color: #df2020;"></i>'
    }else{
        password.type = 'password';
        eyeicon.innerHTML = '<i class="fa-solid fa-eye" style="color: #1a212e;"></i>'

    }
})
con_eyeicon.addEventListener('click',()=>{
    if(con_password.type == 'password'){
        con_password.type = 'text';
        con_eyeicon.innerHTML = '<i class="fa-solid fa-eye-slash" style="color: #df2020;"></i>';
    }else{
        con_password.type = 'password';
        con_eyeicon.innerHTML = '<i class="fa-solid fa-eye" style="color: #1a212e;"></i>'
    }
})
// console.log(header)
// console.log(bttHeader)



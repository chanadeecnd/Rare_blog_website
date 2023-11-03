
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

window.onscroll = () => {
    scroll()
    progress()
}
// console.log(header)
console.log(bttHeader)



// document.addEventListener('DOMContentLoaded', function () {
//     autoResize(document.getElementById('text'));

//     //เมื่อมีการป้อนข้อมูลใน text area
//     document.getElementById('text').addEventListener('input', function () {
//         autoResize(this);
//     });
// });

document.getElementById('content').addEventListener('input', function () {
    autoResize(this);
});

function autoResize(textarea) {
    // textarea.style.height = 'auto';
    // textarea.style.height = textarea.scrollHeight + 'px';
    // if(textarea.style.height >= 500){
    //     window.scrollTo(0,500);
    // }

}


const submit = document.getElementById('submit');
const form = document.getElementById('form-blog');
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    form.submit();
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
})

function displayImage(){
    console.log('function displayImage active.')
    const input = document.getElementById('fileInput');
    const img = document.getElementById('uploadedImage');

    const file = input.files[0];
    console.log(file)
    if (!file) {
        alert('Please select an image.');
    return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
        img.style.display = 'block';
    };

    reader.readAsDataURL(file);
}





// document.addEventListener('DOMContentLoaded', function () {
//     autoResize(document.getElementById('text'));

//     //เมื่อมีการป้อนข้อมูลใน text area
//     document.getElementById('text').addEventListener('input', function () {
//         autoResize(this);
//     });
// });

// document.getElementById('content').addEventListener('input', function () {
//     autoResize(this);
// });

// function autoResize(textarea) {
    // textarea.style.height = 'auto';
    // textarea.style.height = textarea.scrollHeight + 'px';
    // if(textarea.style.height >= 500){
    //     window.scrollTo(0,500);
    // }

// }




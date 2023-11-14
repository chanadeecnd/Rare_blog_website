const submit = document.getElementById('submit');
const form = document.getElementById('form-blog');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    form.submit();
})
form.addEventListener('submit', (e) => {
    e.preventDefault();
})

function displayImage() {
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
}

function displayImageProfile() {
    console.log('function displayImage active.')
    const input = document.getElementById('profile-image');
    const img = document.getElementById('avatar');
    img.removeAttribute('src');
    const file = input.files[0];
    console.log(file)
    if (!file) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}
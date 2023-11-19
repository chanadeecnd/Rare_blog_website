const addLibrary = document.getElementById('add-library');

addLibrary.addEventListener('click',async()=>{
    const response = await axios.get('http://localhost:3000/api-user');
    console.log(response.data)
    console.log('Hello world');
})
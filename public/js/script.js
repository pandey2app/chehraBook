const searchUserInputElm = document.querySelector('#input-search-user');
const searchPostInputElm = document.querySelector('#input-search-post');
const postInputElm = document.querySelector('#input-post');
const imgInputElm = document.querySelector('#input-image');

const searchUserButtonElm = document.querySelector('#btn-search-user');
const searchPostButtonElm = document.querySelector('#btn-search-post');
const addImageButtonElm = document.querySelector('#btn-add-image');
const addPostButtonElm = document.querySelector('#btn-add-post');
const addPostElm = document.querySelector('#add-post-button');

const searchUserHeadingElm = document.querySelector('#search-user-heading');

searchUserInputElm.addEventListener('input', (e) => {
    console.log(e.target.value);

    if (e.target.value) {
        searchUserHeadingElm.style.display = 'none';
    } else {
        searchUserHeadingElm.style.display = 'block';
    }
});

searchPostInputElm.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        e.target.parentElement.nextElementSibling.style.display = 'none';
        e.target.parentElement.style.width = "100%";
    }else{
        e.target.parentElement.nextElementSibling.style.display = 'block';
        e.target.parentElement.style.width = "50%";
    }
});

searchPostInputElm.addEventListener('blur', (e) => {
    e.target.parentElement.nextElementSibling.style.display = 'block';
    e.target.parentElement.style.width = "50%";
});

postInputElm.addEventListener('input', (e) => {

    if (e.target.value.length > 0) {
        console.dir(e.target.parentElement);
        
        e.target.parentElement.previousElementSibling.style.display = 'none';
        e.target.parentElement.style.width = "100%";
        imgInputElm.style.display = 'block';
        addImageButtonElm.style.display = 'none';
        addPostButtonElm.style.display = 'none';
        addPostElm.style.display = 'block';
    }else{
        e.target.parentElement.previousElementSibling.style.display = 'block';
        e.target.parentElement.style.width = "50%";
        imgInputElm.style.display = 'none';
        addImageButtonElm.style.display = 'block';
        addPostButtonElm.style.display = 'block';
        addPostElm.style.display = 'none';
    }
});
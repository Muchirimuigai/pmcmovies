let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];
// let search_bx2 = document.getElementsByClassName('search_bx2')[0];

let search_icon = document.getElementById('search_icon');
let search_input = document.getElementById('search_input');
const match_list =document.getElementById('match_list');
const search = document.getElementById('search');


left_btn.addEventListener('click', ()=>{
    cards.scrollLeft -= 140;
})
right_btn.addEventListener('click', ()=>{
    cards.scrollLeft += 140;
}) 

let json_url = "movie.json";

fetch(json_url).then(Response => Response.json())
.then((data) => {
   data.forEach((ele, i) => {
    let {name, imdb, date, sposter, bposter, genre, type, url, trailer, low, medium, high} = ele;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = url;
    card.innerHTML = ` 
    <img src="${sposter}" alt="${name}" class="poster">
    <div class="rest_card">
        <img src="${bposter}" alt="">
        <div class="cont">
            <h4>${name}</h4>
            <div class="sub">
                <p>${genre}, ${date}</p>
                <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
            </div>
        </div>
         </div>
    </div>
    `
    cards.appendChild(card)
   });
   
   document.getElementById('title').innerText = data[0].name;
   document.getElementById('gen').innerText = data[0].genre;
   document.getElementById('date').innerText = data[0].date;

   document.getElementById('rate').innerHTML = `
   <span>IMDB</span><i class="bi bi-star-fill"></i> ${data[0].imdb}</p></h3>
   `
//   search data load
data.forEach(element =>{
    let {name, imdb, date, sposter, genre, type, url, trailer, low, medium, high} = element;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = url;
    card.innerHTML = ` 
    <img src="${sposter}" alt="">
    <div class="con">
        <h3>${name}</h3>
        <p>${genre} , ${date}, <span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</p>
    </div>
    `
    search.appendChild(card);

});
 
search_icon.addEventListener('click', () =>{
    search.classList.toggle('search_input')
});

// // search movie and filter
const searchmovies = async searchText => {
    const res = await fetch('../movie.json');
    const movies = await res.json();

    // get matches to current input
    let matches = movies.filter(movie => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return movie.name.match(regex);
    });

    if(searchText.length === 0){
        matches = [];
    }
    outputHtml(matches);
};

// show result 
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
        <img src=${match.sposter} alt="">
        <div class="content2">
            <h6>${match.name}</h6>
            <p>${match.date}</p>
        </div>
        `).join('');
        match_list.innerHTML = html;
    }
}

search.addEventListener('input', () => searchmovies(search.value))

});
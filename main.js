const pic1 = document.getElementById('pic1');
const pic2 = document.getElementById('pic2');
const pic3 = document.getElementById('pic3');
const pic4 = document.getElementById('pic4');

const button1 = document.getElementById('catButton1');
const button2 = document.getElementById('catButton2');
const button3 = document.getElementById('catButton3');
const button4 = document.getElementById('catButton4');

const spanError = document.getElementById('errorSpan');

const newCatsButton = document.getElementById('newCatsButton');

const apiKeyDog = 'live_CuqkdVux8q9XyMkx51Ux4dBsBTFRrHS9qg3xdAKT67WzmkLj4G96SEeZyQLbgWHR';
const apiKeyCat = 'live_TcPYZxBYEU9lxKL8zbHwL5JwYGKbnWoJmHqPoVYNy4OT4dKkfu9fEwJE1eNfzcij';

const randomURL = "https://api.thecatapi.com/v1/images/search?limit=4";
const favURL= "https://api.thecatapi.com/v1/favourites";
const delURL= (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
//const delURL= "https://api.thecatapi.com/v1/favourites/_WWmAUUgU?api_key=${apiKeyCat}";

async function loadRandomCats(){
    const resp = await fetch(randomURL, {
        method: 'GET',
        headers: {'x-api-key': apiKeyCat, },
    });
    const data = await resp.json();
    console.group("random cats");
    console.log(data);
    console.groupEnd();

    if(resp.status!==200){
        spanError.innerHTML = `Hubo un error ${resp.status}`;
    }
    else{
        pic1.src = data[0].url;
        pic2.src = data[1].url;
        pic3.src = data[2].url;
        pic4.src = data[3].url;
                                            //Adding dynamic HTML to each button
        button1.onclick = () => saveFavCats( data[0].id );
        button2.onclick = () => saveFavCats( data[1].id );
        button3.onclick = () => saveFavCats( data[2].id );
        button4.onclick = () => saveFavCats( data[3].id );
    }
}

async function loadFavCats(){
    const resp = await fetch(favURL,
        {
            method: 'GET',
            headers: {'X-API-KEY': apiKeyCat,},
        });
    const data = await resp.json();
    if(resp.status!==200){
        spanError.innerHTML = `Hubo un error con los favoritos: error ${resp.status}`
    }
    else{
        console.group("Favs loaded:");
        console.log(data);
        console.groupEnd();

        const section = document.getElementById('favCats');     //identifies the already created section
        section.innerHTML = "<h2>Favourite puppies</h2>";

        data.forEach( kitty => {        //iterates the data response

        const article = document.createElement('article');      //creates article, then img, then button,, then button text
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('Remove kitty from favourites');    //I have to create fav img object

        btn.appendChild(btnText);       //appends each inner object to its container all the way up to the section
        btn.onclick = () => deleteFavCats( kitty.id );
        img.src = kitty.image.url;
        img.width = 150;
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);

        });
        //fav1.src = data[0].image.url; //retrieved object (saved fav) has no URL in its attributes
        //fav2.src = data[1].image.url;
    }
}

async function saveFavCats(id){
    const resp = await fetch(favURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/JSON',
            'X-API-KEY': apiKeyCat,   },
        body:  JSON.stringify( {image_id: id} ),  //to ensure backend understand regardless the language. Sends Json nstead of JS object
    });

    const data = await resp.json();
    if(resp.status!==200){
        spanError.innerHTML = `Hubo un error al guardar favorito ${resp.status} ${data}`
    }else{
        console.group("saved favourite");
        console.log(resp);
        console.groupEnd();
    }
    loadFavCats();
}

async function deleteFavCats( myId ){
    const resp = await fetch(delURL( myId ), {
        method: 'DELETE',
        headers: {'x-api-key': apiKeyCat,}
    });

    const data = await resp.json();
    if(resp.status!==200){
        spanError.innerHTML = `Hubo un error al eliminar favorito ${resp.status}`
    }else{
        console.group("deleted favourite");
        console.log(resp);
        console.groupEnd();
    }
    loadFavCats();
}

    /*fetch(URL)
    .then( (res)=> res.json() )
    .then( data=>{
        pic.src = data[0].url;
    } );*/

loadRandomCats();
loadFavCats();
//deleteFavCats(232380231);
console.log('cat.+ random pics');

//pic.src = 
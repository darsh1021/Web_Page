
const router = {
    404 : 'All_Pages/error.html',
    '/home' : 'All_Pages/homePg.html',
    '/about' : 'All_Pages/aboutPg.html',
    '/content' : 'All_Pages/contentPg.html'
};

const addHistory = (url) =>{
    if(router[url]){
    history.pushState({path:url},'',url);
    const page = router[url]
    DisplayPage(page);      
  }
  else{
    history.pushState({path:'/404'},'','/404');
    DisplayPage('404');      
  }
}

document.querySelectorAll('nav a').forEach(link =>{
    link.addEventListener('click',(event) =>{
        event.preventDefault();
        const url = event.target.getAttribute('href');
        addHistory(url);
    })
})

const DisplayPage = (page) => {
    // console.log(page)
        fetch(page)
        .then(response =>{
            if(!response.ok)
                throw new Error('Failed to fetch the page: ' + response.statusText);
            else
            return response.text();
        })
        .then(html =>{
            document.querySelector('.mainData').innerHTML = html; 
        })
        .catch(error =>{
            document.querySelector('.mainData').innerHTML =`<h1>Problem in Data fatching </h1>`
        })
}

window.addEventListener('popstate', (event) =>{
    const path = event.state && event.state.path ? event.state.path : '/home';
    DisplayPage(path);
})
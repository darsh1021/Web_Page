class indexView {
    constructor() {
        window.addEventListener("hashchange",(event) =>this.loadLocation(event));
        this.mainData = document.querySelector(".mainData");
    }
    loadLocation(event){
      const url = window.location.hash.substring(1);
      console.log(url);
      this.loadContent(url);
    }
    loadContent(url){
        fetch(`${url}.html`)
        .then(response =>{
            if(!response.ok)
                throw new Error("Something happened !",response.statusText);
            else
            return response.text();
        })
        .then(content => this.updatePage(content));
    }
    updatePage(content){
        this.mainData.innerHTML = content;
    }
}

new indexView;
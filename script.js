// console.log("script 2 is running");

let currentCategory = 'All';


// By Default on refresh
const defaultContents =()=>{
    const defaultUrl = `https://openapi.programming-hero.com/api/videos/category/1000`;
    fetch(defaultUrl)
    .then(res => res.json())
    .then(data => showContents(data.data));

};


const defaultClickedButton=document.getElementById('btn-all');

defaultClickedButton.classList.toggle('on-refresh');


defaultContents();



// Button wise content loading
const loadData=(type,clickedButton)=>{
    // console.log(type);

    currentCategory = type;
    changeColor(clickedButton);

    const url = `https://openapi.programming-hero.com/api/videos/categories`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data,type))

} 


const displayData=(data,contentType)=>{
    // console.log(data.data);
    const dataArray = data.data;
    // console.log(contentType);

    

    dataArray.map(function(x){
        // Content Type : All
        if(x.category === contentType){
            const categoryId = (x.category_id);
            
            const urlAll = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;

            fetch(urlAll)
            .then(res => res.json())
            .then(data => displayCategoryWise(data.data,categoryId));
        }

        
        // Content Type : Music
        else if(x.category === contentType){
            const categoryId = (x.category_id);
        

            const urlMusic = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;

            fetch(urlMusic)
            .then(res => res.json())
            .then(data => displayCategoryWise(data.data,categoryId));
        }

        // Content Type : Comedy
        else if(x.category === contentType){
            const categoryId = (x.category_id);
            

            const urlComedy = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;

            fetch(urlComedy)
            .then(res => res.json())
            .then(data => displayCategoryWise(data.data,categoryId));
        }

        // Content Type : Drawing
        else if(x.category === contentType){
            const categoryId = (x.category_id);
            

            const urlDrawing = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;

            fetch(urlDrawing)
            .then(res => res.json())
            .then(data => displayCategoryWise(data.data,categoryId));
        }

        
    })


};


const displayCategoryWise = (data,id) =>{
    const allData = data;
    // console.log(id);
  
    


    // console.log(id);
    const urlFormat = `https://openapi.programming-hero.com/api/videos/category/${id}`;

    fetch(urlFormat)
    .then(res => res.json())
    .then(data => showContents(allData))

}


const showContents = (data)=>{
    // console.log(data);

    const parentCont = document.getElementById('parent-container');
    
    parentCont.innerHTML = '';
    

    const allData = data;
    // console.log(allData);
    const lengthOfArray = allData.length;
    

    if (lengthOfArray === 0){
        // console.log('length of array : ',lengthOfArray);
        parentCont.classList.add('special');
        const drawingDiv = document.createElement('div');
        drawingDiv.innerHTML=
        `<div class="d-flex justify-content-center my-4">
        <img class="my-3" src="./Images/./icon.png" alt="">        
        </div>
    
        <p class="fs-1 text-center my-5">Oops!! Sorry, <br>There is no content here</p>`

        
        parentCont.appendChild(drawingDiv);
    }
    
    allData.forEach(element => {
        // console.log(element);
        // console.log(typeof element.others.views, element.others.views);
        const verified = element.authors[0].verified;
        // console.log(typeof verified,verified);
        // const verifiedIcon = <i class="bi bi-patch-check-fill"></i>;
        
        const image = element.thumbnail;
        const title = element.title; 
        const authName = element.authors[0].profile_name;
        const views = element.others.views;
        const authImage = element.authors[0].profile_picture;
       
        parentCont.classList.remove('special');
         

        // grid system
        const imgDiv = document.createElement('div');
        imgDiv.innerHTML = 
        `<img class="img-fluid rounded-3" src="${image}" alt="">
        `

        

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('my-2');
        detailsDiv.classList.add('details-class');
        detailsDiv.classList.add('justify-content-start');

        const authImageDiv = document.createElement('div');
        authImageDiv.innerHTML=`<img class="auth-image rounded-circle my-2" src="${authImage}" alt="">`


        const h4Title = document.createElement('h4');
        h4Title.innerText = `${title}`;
        h4Title.classList.add('title');

        const h5AuthName = document.createElement('div');
        if (verified === true){
            h5AuthName.innerHTML = `<h5 style="font-size: 14px">${authName} <i class="bi bi-patch-check-fill"></i></h5>`       
            
            
        }
        
        else{
            h5AuthName.innerHTML = `<h5 style="font-size: 14px">${authName}</h5>`;
            
        }
        


        const h5Views=document.createElement('h5');
        h5Views.innerText = `${views} views`;
        h5Views.classList.add('views'); 

    
        const titleAuthorViews = document.createElement('div');

        titleAuthorViews.appendChild(h4Title);
        titleAuthorViews.appendChild(h5AuthName);
        titleAuthorViews.appendChild(h5Views);

        detailsDiv.appendChild(authImageDiv);
        detailsDiv.appendChild(titleAuthorViews);

        const contentCard = document.createElement('div');
        contentCard.classList.add('col-md-3');

        contentCard.appendChild(imgDiv);
        contentCard.appendChild(detailsDiv);
        


        parentCont.appendChild(contentCard);
        

        
    });

    

     
    
};



function changeColor(clickedButton){
    // console.log(clickedButton);
    const buttons = document.querySelectorAll('.allButton');
    
    const defaultAllBtn = document.getElementById('btn-all');
    defaultAllBtn.classList.remove('on-refresh');

    buttons.forEach (btnElement => 
        btnElement.classList.remove('active'));
    
    clickedButton.classList.add('active');
}




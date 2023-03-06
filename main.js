const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}

const displayCategories = (data) => {
    const newsCategoriesContainer = document.getElementById('news-categories');

    data.forEach(category => {
        // console.log(category.category_id);
        const categoryList = document.createElement('li');
        categoryList.classList.add('nav-item')
        categoryList.innerHTML = `
            <a onclick="loadNews('${category.category_id}')" href="#" class="nav-link text-white" id="category-name" onclick="loadNameOfCategory()">${category.category_name}</a>
        `;
        newsCategoriesContainer.appendChild(categoryList);



    });

}



const loadNews = (categoryid) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryid}`)
        .then(res => res.json())
        .then(data => displayNews(data.data));
}



const displayNews = (news) => {
    // show the number of the category
    const newsCategoryNumber = document.getElementById('news-categories-number');
    if (news.length == 0) {
        newsCategoryNumber.innerHTML = `
     <h4 class="text-warning">No post found on this category</h4>

    `;
    }
    else {
        newsCategoryNumber.innerHTML = `
        <h4 class="text-primary">${news.length} post found on this category</h4>
   
       `;
    }

    // Showing the category post from category menu items
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ``;
    news.forEach(post => {
        // console.log(post._id, 'Post full data')
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        rowDiv.innerHTML = `
        <div class="col-md-3">
        <img src="${post.thumbnail_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <h3 class="card-title pb-1">${post.title}</h3>
          <p class="card-text">${post.details.slice(0, 340)} ...</p>
       
          <div class="extra-info d-flex justify-content-between pt-5">
                <div class="author d-flex">
                <div class="author-img">
                <img src="${post.author.img}" alt="">
                </div>
                <div class="author-info px-1">
                    <h5 class="m-0">${post.author.name ? post.author.name : 'No Name Found'}</h5>
                    <span class="m-0">${post.author.published_date ? post.author.published_date : 'No Data Found'}</span>
                </div>
                </div>

                <div class="views">
                <i class="fa-sharp fa-solid fa-eye"></i> ${post.total_view}
                </div>

                <div class="rating">
                <i class="fa-solid fa-star text-warning"></i>${post.rating.number}
                </div>
                <div class="detail-icon">
                <button class="border-0 bg-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i onclick="postDetails('${post._id}')" class="fa-solid fa-arrow-right text-primary"></i>
                </button>
                
                </div>
          </div>


        </div>
      </div>
     
        `;
        newsContainer.appendChild(rowDiv)

    });

}

// post details modals

const postDetails = (newsId) => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(data => displayDetails(data.data[0], 'this is the data'))
}

const displayDetails = (details) => {
    console.log(details);
    const detailsModal = document.getElementById('modal-details');
    detailsModal.innerHTML = ``;
    const modalContentDiv = document.createElement('div');

    modalContentDiv.classList.add('modal-content');

    modalContentDiv.innerHTML = `
    <div class="modal-header">
            <h5 class="modal-title">${details.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
            <p>${details.details.slice(0, 200)}</p>
            <div class="extra-info d-flex justify-content-between pt-5">
                <div class="author d-flex">
                <div class="author-img">
                <img src="${details.author.img}" alt="">
                </div>
                <div class="author-info px-1">
                    <h5 class="m-0">${details.author.name ? details.author.name : 'No Name Found'}</h5>
                    <span class="m-0">${details.author.published_date ? details.author.published_date : 'No Data Found'}</span>
                </div>
                </div>

                <div class="views">
                <i class="fa-sharp fa-solid fa-eye"></i> ${details.total_view}
                </div>

                <div class="rating">
                <i class="fa-solid fa-star text-warning"></i>${details.rating.number}
                </div>
             
          </div>

    </div>
    `;

    detailsModal.appendChild(modalContentDiv);

}



loadCategories()



const loadCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category)
    }
    catch (error) {
        console.log(error)
    }
}

const displayCategories = (data) => {
    const newsCategoriesContainer = document.getElementById('news-categories');

    data.forEach(category => {
        // console.log(category.category_id);
        const categoryList = document.createElement('li');
        categoryList.classList.add('nav-item')
        categoryList.innerHTML = `
        <li class="nav-item">
            <a onclick="loadNews('${category.category_id}')" href="#" class="nav-link text-white" id="category-name" onclick="loadNameOfCategory()">${category.category_name}</a>
            </li>
        `;
        newsCategoriesContainer.appendChild(categoryList);



    });

}

// Load blog post

const loadNews = async (categoryid) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryid}`;
    try {
        loadSpinner(true);
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data)

    }
    catch (error) {
        console.log(error)
    }

}



// Display blog post

const displayNews = (news) => {

    // show the number of the category
    const newsCategoryNumber = document.getElementById('news-categories-number');
    newsCategoryNumber.classList.remove('d-none');
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

    // todays pic and trending and sort section
    const trendingContainer = document.getElementById('todays-pic-and-trending');

    if (news.length == 0) {
        trendingContainer.classList.add('d-none');

    } else {
        news.forEach(trending => {
            console.log(trending.others_info.is_trending, 'the todays pic and trending')
            trendingContainer.classList.remove('d-none');
            console.log(trending.category_id, 'hello news')
            trendingContainer.innerHTML = `
        <div>
            <h4 class="text-secondary d-inline">Sort by View</h4>
            <button class="btn btn-outline-secondary d-inline" disabled>Default
            <i class="fa-light fa-arrow-up-from-arc"></i></button>
        </div>
        <div>
            <button  onclick="todaysPic('${trending.category_id}')" class="btn btn-outline-primary d-inline" type="button">Today's Pic</button>
            <button  onclick="isTrending('${trending.category_id}')" class="btn btn-primary d-inline" type="button">Trending</button>
        </div>
        `
        })
    };






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
    loadSpinner(false);

}

// is todays pic post
const todaysPic = (todayPic) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${todayPic}`)
        .then(res => res.json())
        .then(data => displayTodaysPic(data.data))
}
const displayTodaysPic = (data) => {

    data.forEach(post => {
        console.log(post.others_info, 'datareeeeeeeeeee')
        const newsContainer = document.getElementById('news');

        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        if (post.others_info.is_todays_pick === true) {
            // console.log(post.others_info.is_todays_pick, 'Post full data')
            newsContainer.innerHTML = ``;
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
        }


    });
}

// Trending Post
const isTrending = (trendingId) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${trendingId}`)
        .then(res => res.json())
        .then(data => displayIsTrending(data.data))
}
const displayIsTrending = (data) => {
    data.forEach(post => {
        console.log(post.others_info, 'this is the trending post checking , pleases do this vv')
        const isTrendingTrue = post.others_info.is_trending;
        if (isTrendingTrue == true) {
            const newsContainer = document.getElementById('news');
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            newsContainer.innerHTML = ``;
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

        }
        // console.log(post.others_info.is_todays_pick, 'Post full data')


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


// Loading spinner or toggler

const loadSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}





loadCategories()



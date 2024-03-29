
let commentSection = document.getElementById("comment_section");
// all comments Api
const onLoadApi = async () => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts`;
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts;
    loading(true)
    setTimeout(() => {
        displayComment(posts);
        commentSection.classList.remove("hidden")
    }, 1000)
}

// latest post Api
async function postApi() {
    const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;
    const res = await fetch(url);
    const data = await res.json();
    displayLatestPost(data)
}

// Search Api
const searchApi = async (search) => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts;
    setTimeout(() => {
        displayComment(posts);
        commentSection.classList.remove("hidden")
    }, 1000)
}

// plus a number function
function plusNumber(elementId) {
    const element = document.getElementById(elementId);
    const elementValueText = element.innerText;
    const value = parseInt(elementValueText);
    const setValue = value + 1;
    element.innerText = setValue;
}

// Search function
const searchButton = () => {
    commentSection.classList.add("hidden")
    loading(true)
    const searchValue = document.getElementById("search_value")
    const text = searchValue.value;
    searchApi(text);
}

// loading spinner function
function loading(isTrue) {
    const loadingSpinner = document.getElementById("loading_spinner");

    if (isTrue) {
        loadingSpinner.classList.remove("hidden");
    }
    else {
        loadingSpinner.classList.add("hidden");
    }

}

// display comment function
const displayComment = (posts) => {

    const commentContainer = document.getElementById("comment_container");
    commentContainer.textContent = "";

    posts.forEach(post => {

        const isActive = post.isActive;
        const div = document.createElement("div");
        div.classList = "card card-side bg-comment_background shadow-xl mb-6"
        div.innerHTML = `
            <div class="pl-10 py-8">
                <figure id="is_active" class="h-20 w-20 rounded-3xl bg-white">
                    <div id="is_active" 
                        class="h-4 w-4 rounded-full border-2 border-white borber 
                        ${isActive ? "bg-green-600" : "bg-red-600"} absolute left-28 top-8">
                    </div>
                    <img src="${post.image}" alt="Profile" />
                </figure>
            </div>
            <div class="card-body">
                <div>
                    <div class="flex">
                        <div>
                            <p class="mr-6"># ${post.category}</p>
                        </div>
                        <p>Author : ${post.author?.name}</p>
                    </div>
                    <h2 class="card-title">${post.title}</h2>
                    <p class="mt-5">${post.description}</p>
                </div>
                <!-- border -->
                <hr class="border my-5 border-[#dcdcdc] w-full">
                <!-- bottom divition -->
                <div class="flex justify-between">
                    <div class="flex gap-10">
                        <div class="flex items-center gap-3">
                            <i class="fa-regular fa-comment-dots fa-xl"></i>
                            <p>${post.comment_count}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="fa-regular fa-eye fa-xl"></i>
                            <p>${post.view_count}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="fa-regular fa-clock fa-xl"></i>
                            <p>${post.posted_time}</p>
                        </div>
                    </div>
                    <div>
                        <button onclick="showTitle('${post.title}','${post.view_count}')" class="btn btn-circle bg-comment_button">
                            <i class="fa-regular fa-envelope-open fa-lg" style="color: #ffffff;"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        commentContainer.appendChild(div)
        loading(false)
    })

}

// title function
function showTitle(title, view) {

    plusNumber("comment_count")

    const titleContainer = document.getElementById("title_container");
    const div = document.createElement("div");
    div.classList = "card w-96 bg-base-100 shadow-xl mb-5";
    div.innerHTML = `
        <div class="flex items-center">
            <div class="p-5">
                <h2 class="card-title">${title}</h2>
            </div>
            <div class="flex gap-2 pr-5">
                <div>
                    <i class="fa-regular fa-eye"></i>
                </div>
                <p>${view}</p>
            </div>
        </div>
    `;
    titleContainer.appendChild(div);
}

// Display latest post 
const displayLatestPost = (latestPost) => {

    const latestPostContainer = document.getElementById("latest_post_container");

    for (const post of latestPost) {

        const div = document.createElement("div");
        div.classList = "card bg-base-100 shadow-xl"
        div.innerHTML = `
            <figure class="px-10 pt-10">
            <img src="${post.cover_image}" alt="Profile"
                class="rounded-xl" />
            </figure>
            <div class="card-body">
                <div class="flex gap-3">
                    <div><i class="fa-regular fa-calendar fa-lg"></i></div>
                    <p>${post.author?.posted_date || "No publish date"}</p>
                </div>
                <h2 class="card-title font-bold mt-3">${post.title}</h2>
                <p class="my-2">${post.description}</p>
                <div class="flex gap-4 mt-3">
                    <div class="btn btn-circle">
                        <img class="rounded-full" src="${post.profile_image}" alt="Profile">
                    </div>
                    <div>
                        <p class="text-black font-bold">${post.author?.name}</p>
                        <p>${post.author?.designation ? post.author?.designation : "Unknown"}</p>
                    </div>
                </div>
            </div>
        `;

        latestPostContainer.appendChild(div)
    }

}


onLoadApi()
postApi()
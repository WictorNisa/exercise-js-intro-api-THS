import { loader, main } from "./index.js";

const baseURL = "https://jsonplaceholder.typicode.com";

function createUserCard(user) {
  const card = /*html*/ `
        <article class="card" id="${user.id}">
            <h3 class="name">${user.name}</h3>
            <p class="username">username: ${user.username}</p>
            <p class="phone">Phone: ${user.phone}</p>
            <p class="email">Email: ${user.email}</p>
        </article>
    `;

  return card;
}

function createUserPage(user) {
  const userPage = /*html*/ `
    <section class="user-page">
    <div class="user-card">
      <h3 class="name">${user.name}</h3>
      <p class="username">username: ${user.username}</p>
      <p class="phone">Phone: ${user.phone}</p>
      <p class="email">Email: ${user.email}</p>
      <div class="address">
        <p>${user.address.city}</p>
        <p>${user.address.street}</p>
      </div>
      
      <div class="actions">
        <button id="back-btn">Back to user list</button>
        <button id="posts-btn">Show posts</button>
      </div>
      </div>
      <ul class="post-container">

      </ul>
    </section>
  `;

  return userPage;
}

function createUserPosts(post) {
  const userPosts = /*html*/ `
    <li> 
      <h2>${post.title}</h2>
      <p>${post.body}</p>
    </li>
`;

  return userPosts;
}

export async function getAllUsers() {
  const cachedUsers = localStorage.getItem("users");
  if (cachedUsers) {
    return JSON.parse(cachedUsers);
  }
  const res = await fetch(baseURL + "/users");
  const users = await res.json();
  localStorage.setItem("users", JSON.stringify(users));
  return users;
}

async function getUserById(userId) {
  const cachedUser = localStorage.getItem(`user_${userId}`);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }
  const res = await fetch(baseURL + `/users/${userId}`);
  const user = await res.json();
  localStorage.setItem(`user_${userId}`, JSON.stringify(user));
  return user;
}

async function getUserPosts(userId) {
  const cachedPosts = localStorage.getItem(`posts_${userId}`);
  if (cachedPosts) {
    return JSON.parse(cachedPosts);
  }
  const res = await fetch(`${baseURL}/posts?userId=${userId}`);
  const posts = await res.json();
  localStorage.setItem(`posts_${userId}`, JSON.stringify(posts));
  return posts;
}

function handleOnCardClick(card) {
  insertLoaderToDOM();
  insertUserDetailsToDOM(card);
}

function handleShowPostsContainerClick() {
  const postContainer = main.querySelector(".post-container");
  const showPostsButton = main.querySelector("#posts-btn");
  postContainer.classList.toggle("show");
  if (postContainer.classList.contains("show")) {
    showPostsButton.textContent = "Hide posts";
  } else {
    showPostsButton.textContent = "Show posts";
  }
}

function handleBackButtonClick() {
  getAllUsers().then((user) => {
    insertUsersToDOM(user);
  });
}

export function handleOnClick(event) {
  const { target } = event;
  const closetsCard = target.closest(".card");
  if (closetsCard) handleOnCardClick(closetsCard);
}

function insertLoaderToDOM() {
  main.innerHTML = loader.outerHTML;
}

function insertUserDetailsToDOM(card) {
  getUserById(card.id).then((user) => {
    const userPageAsHtmlString = createUserPage(user);
    main.innerHTML = userPageAsHtmlString;
    const backButton = main.querySelector("#back-btn");
    const showPostsButton = main.querySelector("#posts-btn");
    backButton.addEventListener("click", handleBackButtonClick);
    showPostsButton.addEventListener("click", handleShowPostsContainerClick);
    insertPostsToDOM(card);
  });
}

function insertPostsToDOM(card) {
  const posterList = main.querySelector(".post-container");
  let allPostsAsHtmlString = "";
  getUserPosts(card.id).then((posts) => {
    posts.forEach((post) => {
      allPostsAsHtmlString += createUserPosts(post);
    });
    posterList.innerHTML = allPostsAsHtmlString;
  });
}

export function insertUsersToDOM(users) {
  const usersAsHtmlString = users.map((user) => createUserCard(user)).join("");
  main.innerHTML = usersAsHtmlString;
}

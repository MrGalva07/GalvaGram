import { v4 as randomUUID } from "uuid";
import { faker } from "@faker-js/faker";

class Post {
  private _id: string = randomUUID();
  private _userName: string;
  private _avatarUrl: string;
  private _imageUrl: string;
  private _isLiked: boolean = false;
  private _description: string;
  private _createdAt: Date = new Date();
  private _numberOfLikes: number = 0;

  constructor(
    userName: string,
    avatarUrl: string,
    imageUrl: string,
    description: string
  ) {
    this._userName = userName.toLowerCase();
    this._avatarUrl = avatarUrl;
    this._imageUrl = imageUrl;
    this._description = description;
  }

  get likes(){
    return this._numberOfLikes
  }


  like() {
    const postContainer = document.getElementById(this._id);
    const btnLike = postContainer?.querySelector("#btn-like");
    const icon = btnLike?.children[0];
  
    if (!icon) return;
  
    // Remove o coração preenchido e adiciona o coração vazio
    if (this._isLiked) {
      icon.classList.remove("fa-heart");
      icon.classList.remove("liked");
      icon.classList.add("fa-heart-o");
  
      // Decrementa o número de likes
      this._numberOfLikes -= 1;
    } else {
      // Remove o coração vazio e adiciona o coração preenchido
      icon.classList.remove("fa-heart-o");
      icon.classList.add("fa-heart");
      icon.classList.add("liked");
  
      // Incrementa o número de likes
      this._numberOfLikes += 1;
    }
  
    this._isLiked = !this._isLiked;
  
    // Atualiza o número de likes no HTML
    const likesElement = postContainer?.querySelector(".div-likes span");
    if (likesElement) {
      likesElement.textContent = `${this._numberOfLikes} likes`;
    }
  }

  toHTML() {
    const main = document.querySelector('.main');
    const content = main?.querySelector('.content');
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";
    postContainer.id = this._id;

    const postHeader = `
      <div class="post-header">
        <div>
          <img title="Avatar image"
            src=${this._avatarUrl}>
        </div>
        <span>${this._userName}</span>
      </div>
    `;

    const postImage = `
     <div class="post-image">
        <img title="Post image"
          src=${this._imageUrl}>
      </div>
    `;

    const postLikes = `<div class = "div-likes"><span> ${this.likes} likes</span> </div>`

    const postIcons = `
      <div class="post-icons">
        <div>
          <div id="btn-like" class="btn-like">
            <i class="fa fa-heart-o"></i>
          </div>

          <div>
            <i class="fa fa-comment-o"></i>
          </div>

          <div>
            <i class="fa fa-paper-plane-o"></i>
          </div>
        </div>

        <i class="fa fa-bookmark-o"></i>
      </div>
    `;

    postContainer.innerHTML = postHeader;
    postContainer.innerHTML += postImage;
    postContainer.innerHTML += postLikes
    postContainer.innerHTML += postIcons;

    const btnLike = postContainer.querySelector("#btn-like");
    btnLike?.addEventListener("click", () => this.like());

    content.appendChild(postContainer);
  }
}

for (let index = 0; index < 15; index++) {
  const userName = faker.person.firstName();
  const avatarUrl = faker.image.avatarGitHub();
  const imageUrl = faker.image.urlLoremFlickr();
  const description = faker.lorem.paragraph();

  const post = new Post(userName, avatarUrl, imageUrl, description);

  post.toHTML();
}

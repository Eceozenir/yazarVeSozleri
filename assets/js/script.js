const authorList = document.querySelector(".authorList");
const BASE_URL = "https://dummyjson.com/quotes";

async function getItem() {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();
    return data;
}

async function printItem() {
    const data = await getItem();
    for (const quotes of data.quotes) {
        authorList.innerHTML += 
        `
        <div class="items">
            <ul class="names">
                <li>${quotes.author}</li>
            </ul>
        </div>
        `;
    }

    const items = document.querySelectorAll(".items");

    for (const card of items) {
        card.addEventListener('click', openComment);
    }
}

async function openComment(e) {
    e.preventDefault();
    let clickedCommentId = e.target.closest('.items').querySelector('.names li').textContent;

    const yorum = await getItem();
    const commentDialog = document.querySelector('.comment-dialog');
    commentDialog.innerHTML =
        `
        <button class="close-dialog">X</button>
        <div class="comment-container">
            <p>${yorum.quotes.find(quote => quote.author === clickedCommentId).quote}</p>
        </div>
        `;

    commentDialog.showModal();

    const closeModal = document.querySelector(".close-dialog");
    closeModal.addEventListener('click', () => closeDialog(commentDialog));
}

function closeDialog(commentDialog) {
    commentDialog.close();
}

printItem();
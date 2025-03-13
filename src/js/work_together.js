import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import axios from 'axios';

const modalFooter = basicLightbox.create(`
    <div class="modal">
    <button class="modal-close">
     <svg class="modal-close-icon">
    <use href="./img/Icons/symbol-defs.svg#icon-close"></use>
     </svg>
     </button>
    <h2 class="modal-header">Thank you for your interest in cooperation!</h2>
    <p class="modal-text">The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.</p>
    </div>
	
`, {
    closable: true
})



const refs = {
    emailInp: document.querySelector("#email"),
    commentInp: document.querySelector("#comment"),
    footerForm: document.querySelector(".footer-form"),
    emailStatus: document.querySelector(".email-status"),
    emailLabel: document.querySelector(".email-label"),
    commentLabel: document.querySelector(".comment-label"),
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}
refs.emailInp.addEventListener("change", (e) => {
    if (validateEmail(e.target.value)) {
        refs.emailStatus.classList.add("success");
        refs.emailStatus.classList.remove("invalid");
        refs.emailLabel.style.borderBottom = "1px solid #3cbc81";
    }
    else {
        refs.emailStatus.classList.add("invalid");
        refs.emailLabel.style.borderBottom = "1px solid #e74a3b";
    }
});
refs.emailInp.addEventListener("input", (e) => { truncateText(e.target, refs.emailLabel) })
refs.commentInp.addEventListener("input", (e) => { truncateText(e.target, refs.commentLabel) })

refs.footerForm.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const email = event.target.elements.email.value.trim();
    const comment = event.target.elements.comment.value.trim();
    const data = {
        email: email,
        comment: comment,
    }
    if (!email || !comment) {
        iziToast.error({
            title: 'Error',
            message: `All form fields must be filled in`,
            position: 'topCenter',
            closeOnClick: true,
        });
    }
    else {

        axios.post('https://portfolio-js.b.goit.study/api/requests', data);
        modalFooter.show();
        document.querySelector(".modal-close").addEventListener("click", (e) => {
            modalFooter.close();
            refs.footerForm.reset();
        })

    };

}

function truncateText(input, label) {
    // Визначаємо ширину input
    const inputWidth = input.clientWidth; // Отримуємо ширину input в пікселях
    const avgCharWidth = 7; // Середня ширина одного символу (можна підлаштувати)
    // Розраховуємо максимальну кількість символів, які вміщуються в input
    const maxLength = Math.floor(inputWidth / avgCharWidth);
    let text = input.value;
    if (text.length > maxLength) {
        label.querySelector(".dots").textContent = "...";
    }
    else {
        label.querySelector(".dots").textContent = " ";
    }
}


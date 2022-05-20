export class Popup {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.build();
    }
    build() {
        let mainDiv = document.createElement('div');
        mainDiv.className = 'overlay';
        mainDiv.id = 'popup1';
        let popup = document.createElement('div');
        popup.className = 'popup';
        mainDiv.appendChild(popup);
        let title = document.createElement('h2');
        title.innerText = this.title;
        popup.appendChild(title);
        let closeLink = document.createElement('a');
        closeLink.className = 'close';
        closeLink.href = '#';
        closeLink.innerHTML = '&times;';
        closeLink.addEventListener('click', (e) => { this.onClose && this.onClose(e); });
        popup.appendChild(closeLink);
        let content = document.createElement('div');
        content.className = 'content';
        content.innerHTML = this.content;
        popup.appendChild(content);
        document.body.appendChild(mainDiv);
    }
    showPopup() {
        let openLink = document.createElement('a');
        openLink.setAttribute('class', 'button');
        openLink.href = '#popup1';
        openLink.hidden = true;
        document.body.appendChild(openLink);
        openLink.click();
    }
}

class Dictionary {
    constructor(selector) {
        this.selector = selector;
        this.DOM = null;
        this.enWordDOM = null;
        this.ltWordDOM = null;
        this.buttonSaveDOM = null;
        this.newInput = JSON.parse(localStorage.getItem('newInput')) || [];
        this.init();
    }
    init() {
        if (!this.isValidSelector()) {
            return false;
        }

        this.DOM = document.querySelector('.dictionary');
        if (!this.DOM) {
            console.error('ERROR: nerasta vieta, pagal duota selector');
            return false;
        }
        this.render();
        this.renderList();
        this.addEvents();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            console.error('ERROR: nevalidus selector');
            return false;
        }
        return true;
    }

    generateInitialForm() {
        return `<div class="top">
            <h1>Dictionary</h1>
            <form>
                <div class="anglu">
                    <label for="en">English</label>
                    <input type="text" id="en">
                </div>
                <div class="lietuviu">
                    <label for="lt">Lietuviu</label>
                    <input type="text" id="lt">
                </div>
                <div class="mygtukai">
                    <button id="save" type="submit">Save</button>
                    <button id="reset" type="reset">Reset</button>
                </div>
            </form>
            </div>`
    }

    generateUpdatedForm() {
        return `<div class="top hide">
            <h1 class="hide">Dictionary</h1>
             <form class="hide">
            <label for="en-update">English</label>
            <input type="text" id="en">
            <label for="lt-update">Lietuviu</label>
            <input type="text" id="lt">
            <button id="save" type="submit">Update</button>
            <button id="save" type="button">Delete</button>
        </form>
        </div>`
    }

    generateTitles() {
        return `<div class="titles">
                <div class="english-title">
                    <h2>EN</h2>
                </div>
                <div class="lithuanian-tile">
                    <h2>LT</h2>
                </div>
                <div class="actions">
                    <h2>Actions</h2>
                </div>
            </div>`
    }

    generateList() {
        return `<div class="list"></div>`
    }

    renderList() {
        for (const word of this.newInput) {
            this.renderListItem(word.textEN, word.textLT);
        }
    }

    renderListItem(textEN, textLT) {
        if (typeof text !== 'string' ||
            text === '') {
            return '';
        }
        const HTML = `<div class="ivestys_actions">
                <div class="english">${textEN}</div>
                <div class="lithuanian">${textLT}</div>
                <div class="actions">
                    <div class="btn edit">Edit</div>
                    <div class="btn delete">Delete</div>
                </div>
            </div>`;

        this.listDOM.insertAdjacentHTML('afterbegin', HTML);
    }

    render() {
        let HTML = '';

        HTML += this.generateInitialForm();
        HTML += this.generateUpdatedForm();
        HTML += this.generateTitles()
        HTML += this.generateList();
        this.DOM.innerHTML = HTML;

        this.listDOM = this.DOM.querySelector('.list');
        this.enWordDOM = document.getElementById('en');
        this.ltWordDOM = document.getElementById('lt');
        this.buttonSaveDOM = document.getElementById('save');
        this.titlesDOM = document.querySelector('.titles')
    }

    addEvents() {
        this.buttonSaveDOM.addEventListener('click', (e) => {
            e.preventDefault();
            const textEnglish = this.enWordDOM.value;
            const textLithuanian = this.ltWordDOM.value;

            if (textEnglish === '' || textLithuanian === '') {
                return false;
            }

            this.renderListItem(textEnglish, textLithuanian);

            this.newInput.push({
                englishText: textEnglish,
                lithuanianText: textLithuanian
            })

            localStorage.setItem('newInput', JSON.stringify(this.newInput));
        })
    }

}
export { Dictionary }
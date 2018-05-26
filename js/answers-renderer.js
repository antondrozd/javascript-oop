export function createAnswersRenderer(type, answers) {
    if (type === 'single' || type === 'multiple') {
        return new OptionalAnswersRenderer(answers);
    } else if (type === 'open') {
        return new OpenAnswerRenderer();
    }
}

class OptionalAnswersRenderer {
    constructor(answers) {
        this.answers = answers;
    }

    getHTML() {
        let html = '';

        this.answers.forEach((answer, index) => {
            html += `<li id="${index}" class="list-group-item list-group-item-action">${answer}</li>`;
        });

        return html;
    }
}

class OpenAnswerRenderer {
    getHTML() {
        let html = `<li class="list-group-item"><input id="open-answer" type="text" class="form-control"></li>`;

        return html;
    }
}

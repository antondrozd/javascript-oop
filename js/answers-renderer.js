export function createAnswersRenderer(type, answers) {
    // switch (type) {
    //     case 'single':
    //         return new SingleAnswerRenderer(answers);
    //     case 'multiple':
    //         return new MultipleAnswerRenderer(answers);
    //     case 'open':
    //         return new OpenAnswerRenderer(answers);
    // }

    if (type === 'single' || type === 'multiple') {
        return new OptionalAnswersRenderer(answers);
    } else if (type === 'open') {
        return new OpenAnswerRenderer(answers);
    }
}

// class SingleAnswerRenderer {
//     constructor(answers) {
//         this.answers = answers;
//     }

//     getHTML() {
//         let html = '';

//         this.answers.forEach((answer, index) => {
//             html += `<li id="${index}" class="list-group-item list-group-item-action">${answer}</li>`;
//         });

//         return html;
//     }
// }

// class MultipleAnswerRenderer {
//     constructor(answers) {
//         this.answers = answers;
//     }

//     getHTML() {}
// }

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
    constructor(answers) {
        this.answers = answers;
    }

    getHTML() {}
}

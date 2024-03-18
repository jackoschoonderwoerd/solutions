export interface Word {
    word: string;
}
export interface Paragraph {
    words: Word[];
}

export interface Chapter {
    paragraphs: Paragraph[];
}
export interface Book {
    chapters: Chapter[];
}

// ============

// export interface Item {
//     itemName: string
// }

// export interface Topic {
//     topicName: string;
//     paragraphArray: Paragraph[]
// }

// export interface Subject {
//     id?: string;
//     subjectName: string;
//     chapters: Chapter[];
// }

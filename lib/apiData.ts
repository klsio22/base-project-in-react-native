import axios from 'axios';
import { parse } from 'node-html-parser';

export const fetchDisciplines = async () => {
  try {
    const response = await axios.get(
      'https://pt.wikipedia.org/wiki/Lista_de_disciplinas_acad%C3%AAmicas_do_Brasil'
    );

    const root = parse(response.data);
    const disciplines: string[] = [];

    const spans = root.querySelectorAll('span.mw-headline');
    spans.forEach((span) => {
      const discipline = span.querySelector('a')?.textContent;
      if (discipline) {
        disciplines.push(discipline);
      }
    });

    return disciplines;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

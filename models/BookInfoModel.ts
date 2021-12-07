export class BookInfoModel {
  numFound: number;
  doc: BookDetail[]
}

class BookDetail {
  title: string;
  author_name: string;
  edition_count: number;
}

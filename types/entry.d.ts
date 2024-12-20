export interface Entry {
  _id: string;
  title: string;
  image: string | null;
  text: string;
  author: {
    _id: string;
    email: string;
  };
}

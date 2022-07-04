export default interface ICreateInput {
  headers: {
    authorization: string;
  };
  body: {
    email_to: string;
    subject: string;
    body: string;
  };
}

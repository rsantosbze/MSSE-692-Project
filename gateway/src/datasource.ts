import { RemoteGraphQLDataSource } from "@apollo/gateway";


export class DataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const headers = context.req.headers;
    console.log('will', headers);
    for (const key in headers) {
      console.log('I am here' + key); 
      const value = headers[key];
      if (value) {
        request.http?.headers.set(key, String(value));
      }
    }
  }
}
 
import {  gql } from 'apollo-angular';

export const LOGIN = gql`
  mutation ($input: LoginDTO!) {
    login(input: $input) {
    accessToken
    }
  }
`;

import {  gql } from 'apollo-angular';

export const CREATE = gql`
  mutation ($input: UserInputDTO!) {
    createUser(input: $input) {
      action,
      message
    }
  }
`;

export const DELETE = gql`
    mutation ($input: UserInputDTO!) {
        deleteUser(input: $input) {
            action
            message
        }
    }
`;

export const UPDATE = gql`
    mutation ($input: UserInputDTO!) {
        updateUser(input: $input) {
            action
            message
        }
    }
`;

export const FINDALL = gql`
  query {
    findAllUsers {
      _id
      firstName
      lastName
      email
      role
      status
      username
      organizationId
    }
  }
`;

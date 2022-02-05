import {  gql } from 'apollo-angular';

export const REGISTER = gql`
    mutation ($input: RegisterDTO!) {
        registerUser(input: $input) {
            action
            message
        }
    }
`;

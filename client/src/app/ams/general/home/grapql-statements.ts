import {  gql } from 'apollo-angular';

export const FINDMAINCOMPANY = gql`
    query {
        findMainCompany {
            _id
            organizationName
            organizationType
            }
        }
`;

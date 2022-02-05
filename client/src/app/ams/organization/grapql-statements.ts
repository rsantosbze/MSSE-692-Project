import {  gql } from 'apollo-angular';

export const CREATE = gql`
  mutation ($input: OrganizationInputDTO!) {
    createOrg(input: $input) {
      action,
      message
    }
  }
`;

export const DELETE = gql`
    mutation ($input: OrganizationInputDTO!) {
        deleteOrg(input: $input) {
            action
            message
        }
    }
`;

export const UPDATE = gql`
    mutation ($input: OrganizationInputDTO!) {
        updateOrg(input: $input) {
            action
            message
        }
    }
`;

export const FINDALL = gql`
  query {
    findAllOrgs {
      _id
      organizationName
      organizationType
      # address{
      #   _id
      #   addressType
      #   streetLine1
      #   streetLine2
      #   city
      #   state
      #   zipCode
      #   country
      # }
    }
  }
`;

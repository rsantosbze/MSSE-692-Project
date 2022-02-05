import {  gql } from 'apollo-angular';

export const CREATE = gql`
  mutation ($input: AssetInputDTO!) {
    createAsset(input: $input) {
      action,
      message
    }
  }
`;

export const DELETE = gql`
    mutation ($input: AssetInputDTO!) {
        deleteAsset(input: $input) {
            action
            message
        }
    }
`;


export const UPDATE = gql`
    mutation ($input: AssetInputDTO!) {
        updateAsset(input: $input) {
            action
            message
        }
    }
`;


export const FINDFACILITIES = gql`
    query {
        findAllFacilities {
            _id
            organizationName
            organizationType
            }
        }
`;

export const FINDASSETBYFACILITY = gql`
    query ($id: String!){
        findOrg (_id: $id){
            fassets {
                _id
                assetName
                assetCode
                assetDescription
                dateOfManufacture
                dateOfInstallation
                facilityId
                userId
                supplierId
                # supplier {
                #     _id
                # }
                # facility {
                #     _id
                # }
            }
        }
    }
`;

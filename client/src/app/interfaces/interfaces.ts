export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  email?: string;
  status?: boolean;
  role?: string;
  action?: string;
}

export interface IResponse {
    action: string;
    errorMsg: string;
}

export interface IOrganization {
    _id: string;
    organizationName?: string;
    organizationType?: string;
    // userId?: string;
    // address?: IAddress;
}

export interface IAddress {
    _id: string;
    addressType: string;
    streetLine1: string;
    streetLine2: string;
    city: string;
    state: string;
    zipCode: number;
    country: string;
}

export interface IAsset {
    _id: string;
    assetCode?: string;
    assetDescription?: string;
    assetName?: string;
    dateOfManufacture?: Date;
    dateOfInstallation?: Date;
    supplierId?: string;
    facilityId?: string;
    userId?: string;
}

export interface IMaintenanceRecord {
    _id: string;
    maintenanceDescription?: string;
    dateOfMaintenance?: Date;
    userId?: string;
    assetId?: string;
}

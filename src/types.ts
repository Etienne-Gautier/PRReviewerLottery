import { IdentityRef } from "azure-devops-extension-api/WebApi/WebApi";

export interface IProjectSettings {
  id: string;
  createdDate: Date;
  modifiedDate: Date;
  extensionEnabled: boolean;
  overrideOrganizationSettings: boolean;
  reviewerSettings: IReviewerGroup[];
}

export interface IReviewerGroup {
  id: string;
  name: string;
  settingId: string;
  isRequired: boolean;
  members?: IdentityRef[];
}

export interface IdentityRefWithRequirement extends IdentityRef {
  IsRequired: boolean;
}

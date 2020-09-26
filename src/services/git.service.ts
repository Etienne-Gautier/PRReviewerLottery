import { IdentityRefWithRequirement } from "./../types";
import * as SDK from "azure-devops-extension-sdk";
import {
  getClient,
} from "azure-devops-extension-api";

import {
  GitRestClient,
  IdentityRefWithVote,
} from "azure-devops-extension-api/Git";
import { IdentityRef } from "azure-devops-extension-api/WebApi/WebApi";

interface reviewerRequest {}

export class GitService {
  constructor() {
    SDK.init();
  }

  public async assignReviewers(
    reviewerIdentities: IdentityRefWithRequirement[],
    context: any
  ) {
    const gitClient = getClient(GitRestClient);

    for (let i = 0; i < reviewerIdentities.length; i++) {
      const reviewer = reviewerIdentities[i];
      const reviewerAsIdentity = reviewerIdentities[i] as IdentityRef;

      const reviewerVote: IdentityRefWithVote = {
        ...reviewerAsIdentity,
        reviewerUrl: reviewer.url,
        isRequired: reviewer.IsRequired,
        isFlagged: false,
        vote: 0,
        votedFor: [],
      };
      await gitClient.createPullRequestReviewer(
        reviewerVote,
        context.pullRequest.repositoryId,
        context.pullRequest.pullRequestId,
        reviewer.id,
        context?.pullRequest?.repository?.project?.id
      );
    }
  }
}

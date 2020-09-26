import { IdentityRefWithRequirement, IReviewerGroup } from "./../types";
import { IdentityRef } from "azure-devops-extension-api/WebApi/WebApi";

export class RandomReviewerDrawService {
  private getRandomInt(high: number): number {
    return Math.floor(Math.random() * high);
  }

  private computeSetDifference(
    mainSet: IdentityRef[],
    removeSet: IdentityRef[]
  ) {
    const mainSetCopy = [...mainSet];
    for (let i = 0; i < removeSet.length; i++) {
      const itemToRemove = removeSet[i];

      for (let j = 0; j < mainSet.length; j++) {
        const mainItem = mainSet[j];

        if (mainItem.id == itemToRemove.id) {
          mainSetCopy.splice(j, 1);
          continue;
        }
      }
    }
    return mainSetCopy;
  }

  public drawReviewers(
    groups: IReviewerGroup[],
    unavailableIdentities: IdentityRefWithRequirement[]
  ): IdentityRefWithRequirement[] {
    const pickedReviewers: IdentityRefWithRequirement[] = [];
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];

      const effectiveGroup = this.computeSetDifference(
        group.members!,
        unavailableIdentities
      );
      if (effectiveGroup.length > 0) {
        const randomNum = this.getRandomInt(effectiveGroup.length);
        const memberWithRequirement: IdentityRefWithRequirement = {
          ...effectiveGroup[randomNum],
          IsRequired: group.isRequired,
        };
        unavailableIdentities.push(memberWithRequirement);
        pickedReviewers.push(memberWithRequirement);
      }
    }
    return pickedReviewers;
  }
}

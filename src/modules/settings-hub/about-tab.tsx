import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import {
  CommonServiceIds,
  IHostNavigationService,
} from "azure-devops-extension-api";

import { Button } from "azure-devops-ui/Button";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
import { Card } from "azure-devops-ui/Card";
import { Icon, IconSize } from "azure-devops-ui/Icon";

export interface IAboutTabState {
  currentHash?: string;
  currentQueryParams?: string;
}

export class AboutTab extends React.Component<{}, IAboutTabState> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    this.initialize();
  }

  public render(): JSX.Element {
    const { currentHash, currentQueryParams } = this.state;
    return (
      <div className="page-content page-content-top flex-column rhythm-vertical-16">
        <Card>
          <div className="list-example-row flex-row h-scroll-hidden">
            <div
              style={{ marginLeft: "10px", padding: "10px 0px" }}
              className="flex-column h-scroll-hidden"
            >
              <span>Credits</span>
              <span className="fontSizeMS font-size-ms secondary-text">
                <p>
                  This extension was developped as a productivity tool for the
                  Obzervr Engineering team by <i>Etienne Gautier</i>.
                </p>
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  private async initialize() {
    const navigationService = await SDK.getService<IHostNavigationService>(
      CommonServiceIds.HostNavigationService
    );
    navigationService.onHashChanged((hash: string) => {
      this.setState({ currentHash: hash });
    });
  }

  private onGetHashClick = async (): Promise<void> => {
    const navService = await SDK.getService<IHostNavigationService>(
      CommonServiceIds.HostNavigationService
    );
    const hash = await navService.getHash();
    this.setState({ currentHash: hash });
  };

  private onUpdateHashClick = async (): Promise<void> => {
    const navService = await SDK.getService<IHostNavigationService>(
      CommonServiceIds.HostNavigationService
    );
    navService.setHash("time=" + new Date().getTime());
  };

  private onGetQueryParamsClick = async (): Promise<void> => {
    const navService = await SDK.getService<IHostNavigationService>(
      CommonServiceIds.HostNavigationService
    );
    const hash = await navService.getQueryParams();
    this.setState({ currentQueryParams: JSON.stringify(hash) });
  };

  private onUpdateQueryParamsClick = async (): Promise<void> => {
    const navService = await SDK.getService<IHostNavigationService>(
      CommonServiceIds.HostNavigationService
    );
    navService.setQueryParams({ time: "" + new Date().getTime() });
  };

  private onUpdateDocumentTitle = async (): Promise<void> => {
    const navService = await SDK.getService<IHostNavigationService>(
      CommonServiceIds.HostNavigationService
    );
    navService.setDocumentTitle(
      "Sample hub new title: " + new Date().getTime()
    );
  };
}

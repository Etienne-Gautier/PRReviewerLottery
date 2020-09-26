import "./settings-hub.scss";
import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";

import { Header, TitleSize } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";

import { showRootComponent } from "../../common";
import { OverviewTab } from "./overview-tab";
import { AboutTab } from "./about-tab";

interface IHubContentState {
  selectedTabId: string;
  fullScreenMode: boolean;
  headerDescription?: string;
  useLargeTitle?: boolean;
  useCompactPivots?: boolean;
}

class SettingsHub extends React.Component<{}, IHubContentState> {
  public state: IHubContentState;
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedTabId: "overview",
      fullScreenMode: false,
      headerDescription: "Configure how PR are assigned for review",
    };
  }

  public componentDidMount() {
    SDK.init();
  }

  public render(): JSX.Element {
    const {
      selectedTabId,
      headerDescription,
      useCompactPivots,
      useLargeTitle,
    } = this.state;

    return (
      <Page className="sample-hub flex-grow">
        <Header
          title="PR settings"
          description={headerDescription}
          titleSize={useLargeTitle ? TitleSize.Large : TitleSize.Medium}
        />

        <TabBar
          onSelectedTabChanged={this.onSelectedTabChanged}
          selectedTabId={selectedTabId}
          tabSize={useCompactPivots ? TabSize.Compact : TabSize.Tall}
        >
          <Tab name="Overview" id="overview" />
          <Tab name="About" id="about" />
        </TabBar>

        {this.getPageContent()}
      </Page>
    );
  }

  private onSelectedTabChanged = (newTabId: string) => {
    this.setState({
      selectedTabId: newTabId,
    });
  };

  private getPageContent() {
    const { selectedTabId } = this.state;
    if (selectedTabId === "overview") {
      return <OverviewTab />;
    } else if (selectedTabId === "about") {
      return <AboutTab />;
    }
  }
}
showRootComponent(<SettingsHub />);

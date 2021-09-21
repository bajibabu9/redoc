import { observer } from 'mobx-react';
import * as React from 'react';

import { IMenuItem, MenuStore } from '../../services/MenuStore';
import { AppStore } from '../../services/AppStore';
import { OptionsContext } from '../OptionsProvider';
import { MenuItems } from './MenuItems';

import { PerfectScrollbarWrap } from '../../common-elements/perfect-scrollbar';
import { RedocAttribution, DownloadOpernApi, DownloadButton } from './styled.elements';

@observer
export class SideMenu extends React.Component<{ apiStore: AppStore; menu: MenuStore; className?: string}> {
  static contextType = OptionsContext;
  private _updateScroll?: () => void;

  handleDownloadClick = e => {
    if (!e.target.href) {
      e.target.href = this.props.apiStore.spec.info.downloadLink;
    }
  };

  render() {
    const store = this.props.menu;
    const { info } = this.props.apiStore.spec;
    const downloadFilename = info.downloadFileName;
    const downloadLink = info.downloadLink;

    return (
      <PerfectScrollbarWrap
        updateFn={this.saveScrollUpdate}
        className={this.props.className}
        options={{
          wheelPropagation: false,
        }}
      >
        <MenuItems items={store.items} onActivate={this.activate} root={true} />
        <DownloadOpernApi>
          <p>
            OpenAPI specification:
            <DownloadButton
              download={downloadFilename}
              target="_blank"
              href={downloadLink}
              onClick={this.handleDownloadClick}
            >
              Download
            </DownloadButton>
          </p>
        </DownloadOpernApi>
        <RedocAttribution>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Redocly/redoc">
            Documentation Powered by ReDoc
          </a>
        </RedocAttribution>
      </PerfectScrollbarWrap>
    );
  }

  activate = (item: IMenuItem) => {
    if (item && item.active && this.context.menuToggle) {
      return item.expanded ? item.collapse() : item.expand();
    }

    this.props.menu.activateAndScroll(item, true);
    setTimeout(() => {
      if (this._updateScroll) {
        this._updateScroll();
      }
    });
  };

  private saveScrollUpdate = upd => {
    this._updateScroll = upd;
  };
}

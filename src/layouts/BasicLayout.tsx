import React, {useContext, useCallback} from 'react';
import type {Dispatch} from 'umi';
import {connect, history} from 'umi';
import {Layout, ConfigProvider} from 'antd';
import getLocales from '../locales';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type {SiderMenuProps} from '@/layouts/Sider';
import Sider from '@/layouts/Sider';
import Header from '@/layouts/Header';
import Content from '@/layouts/Content';
import Footer from '@/layouts/Footer';
import type {MenuDataItem, Route, TabPaneProps, MessageDescriptor} from '@/layouts/typings';
import type {ConnectState} from '@/models/connect';
import {DEFAULT_ACTIVE_KTY} from '@/constants';
import getMenuData from '@/layouts/utils/getMenuData';
import {useModel} from '@@/plugin-model/useModel';

export type BasicLayoutProps = {
  dispatch: Dispatch;
  collapsed: boolean;
  menu?: {
    locale?: boolean;
    defaultOpenAll?: boolean;
    ignoreFlatMenu?: boolean;
    loading?: boolean;
    onLoadingChange?: (loading?: boolean) => void;
    params?: Record<string, any>;
    request?: (params: Record<string, any>, defaultMenuData: MenuDataItem[]) => Promise<MenuDataItem[]>;
    type?: 'sub' | 'group';
    autoClose?: false;
  };
  route: Route;
  formatMessage?: (message: MessageDescriptor) => string;
} & SiderMenuProps;

const BasicLayout: React.FC<BasicLayoutProps> = React.memo(props => {
  const {
    dispatch,
    collapsed,
    activeKey,
    tabPaneList,
    menu,
    route,
    formatMessage: propsFormatMessage,
  } = props;

  const { initialState } = useModel('@@initialState');
  const settings = initialState?.settings;

  const context = useContext(ConfigProvider.ConfigContext);
  const prefixCls = props.prefixCls ?? context.getPrefixCls('pro');

  const formatMessage = useCallback(
    ({ id, defaultMessage, ...restParams }: { id: string; defaultMessage?: string }): string => {
      if (propsFormatMessage) {
        return propsFormatMessage({
          id,
          defaultMessage,
          ...restParams,
        });
      }
      const locales = getLocales();
      return locales[id] ? locales[id] : (defaultMessage as string);
    },
    [propsFormatMessage],
  );

  const [menuInfoData] = useMergedState<{
    breadcrumb?: Record<string, MenuDataItem>;
    breadcrumbMap?: Map<string, MenuDataItem>;
    menuData?: MenuDataItem[];
  }>(() => getMenuData(route?.routes || [], menu, formatMessage));

  const { menuData = [] } = menuInfoData || {};

  // 菜单缩放
  const handleMenuCollapse = (payload: boolean) => {
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });
  };
  // 设置tabPane列表
  const setTabPaneList = (payload: TabPaneProps[]) => {
    if (dispatch) {
      dispatch({
        type: 'global/setTabPaneList',
        payload,
      });
    }
  };
  /**
   * 设置当前激活的页签
   * 如果入参undefined，则激活默认页
   *
   * @param payload
   */
  const setActiveKey = (payload: string | undefined) => {
    if (dispatch) {
      if (payload !== undefined) {
        dispatch({
          type: 'global/setActiveKey',
          payload,
        });
        history.push(payload);
      } else {
        dispatch({
          type: 'global/setActiveKey',
          payload: DEFAULT_ACTIVE_KTY,
        });
        history.push(DEFAULT_ACTIVE_KTY);
      }
    }
  };

  return (
    <Layout style={{minWidth: '1200px'}}>
      <Sider
        {...props}
        logo={settings?.logo}
        title={settings?.title}
        layout={settings?.layout}
        menuData={menuData}
        formatMessage={formatMessage}
        tabPaneList={tabPaneList}
        setTabPaneList={setTabPaneList}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        prefixCls={prefixCls}
      />
      <Layout>
        <Header
          collapsed={collapsed}
          handleMenuCollapse={handleMenuCollapse}
        />
        <Content
          tabPaneList={tabPaneList}
          setTabPaneList={setTabPaneList}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
        />
        <Footer/>
      </Layout>
    </Layout>
  );
});

export default connect(({global}: ConnectState) => ({
  collapsed: global.collapsed,
  activeKey: global.activeKey,
  tabPaneList: global.tabPaneList,
}))(BasicLayout);

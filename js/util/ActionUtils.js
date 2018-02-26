/**
 * Created by CxS on 2018/1/18 16:18
 */
import React from 'react';
import RepositoryDetail from '../page/RepositoryDetail';

export default class ActionUtils {

    /**
     * 跳转到详情页面
     * @param params 要传递的一些参数
     */
    static onSelectRepository(params) {
        let {navigator} = params;
        navigator.push({
            component: RepositoryDetail,
            params: {
                ...params
            }
        })
    }
}

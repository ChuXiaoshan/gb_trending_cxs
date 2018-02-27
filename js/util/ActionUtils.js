/**
 * Created by CxS on 2018/1/18 16:18
 */
import React from 'react';
import RepositoryDetail from '../page/RepositoryDetail';
import {FLAG_STORAGE} from "../expand/dao/DataRepository";

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

    /**
     * favoriteIcon 的单击回调函数
     * @param favoriteDao
     * @param item
     * @param isFavorite
     * @param flag
     */
    static onFavorite(favoriteDao, item, isFavorite, flag) {
        let key = flag === FLAG_STORAGE.flag_trending ? item.fullName : item.id.toString();
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item))
        } else {
            favoriteDao.removeFavoriteItem(key)
        }
    }
}

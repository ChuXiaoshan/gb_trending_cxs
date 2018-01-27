/**
 * Created by CxS on 2018/1/18 16:18
 */
import React from 'react';

export default class Utils {
    /**
     * 检查改item 有没有被收藏过
     * @param item
     * @param items
     * @returns {boolean}
     */
    static checkFavorite(item, items) {
        for (let i = 0, len = items.length; i < len; i++) {
            let id = item.id ? item.id.toString() : item.fullName;
            if (id === items[i]) {
                return true;
            }
        }
        return false;
    }
}
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

    /**
     * 判断数据是否过时
     * @param longTime 数据的时间戳
     * @returns {boolean} 是否过时
     */
    static checkDate(longTime) {
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if (cDate.getMonth() !== tDate.getMonth()) return false;
        if (cDate.getDay() !== tDate.getDay()) return false;
        return cDate.getHours() - tDate.getHours() <= 4;
    }
}

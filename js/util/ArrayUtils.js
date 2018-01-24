/**
 * Created by CxS on 2018/1/18 16:18
 */
import React from 'react';
import {
    Image,
    TouchableOpacity
} from 'react-native';

export default class ViewUtils {
    /**
     * 删除数组
     * @param array
     * @param item
     */
    static updateArray(array, item) {
        for (let i = 0, len = array.length; i < len; i++) {
            const temp = array[i];
            if (temp === item) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    /**
     * 克隆一个数组
     * @param from
     * @returns {Array}
     */
    static clone(from) {
        if (!from) return [];
        let newArray = [];
        for (let i = 0, len = from.length; i < len; i++) {
            newArray[i] = from[i];
        }
        return newArray;
    }

    /**
     * 判断两个数组的元素是否相等
     * @param arr1
     * @param arr2
     * @returns {boolean} true 数组长度和元素相等，false 不相等
     */
    static isEqual(arr1, arr2) {
        if (!(arr1 && arr2)) return false;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0, l = arr2.length; i < l; i++) {
            if (arr1[1] !== arr2[i]) return false;
        }
        return true;
    }

    /**
     * 将数组中指定元素移除
     * @param arr
     * @param items
     */
    static remove(arr, items) {
        if (!arr) {
            return;
        }
        for (let i = 0, l = arr.length; i < l; i++) {
            if (items === arr[i]) arr.splice(i, 1);
        }
    }
}

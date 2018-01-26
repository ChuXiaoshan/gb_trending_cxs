/**
 * Created by CxS on 2018/1/18 16:36
 */
import React from 'react';
import {AsyncStorage} from 'react-native';

const FAVORITE_KEY_PREFIX = 'favorite_';
export default class FavoriteDao {
    constructor(flag) {
        this.flag = flag;
        this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
    }

    /**
     * 收藏项目，保存收藏的项目
     * @param key 项目id或者名称
     * @param value 收藏的项目
     * @param callback
     */
    saveFavoriteItem(key, value, callback) {
        AsyncStorage.setItem(key, value, (e) => {
            if (!e) {
                this.updateFavoriteKeys(key, true);
            }
        })
    }

    /**
     * 取消收藏，移除已经收藏的项目
     * @param key
     */
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (e) => {
            if (!e) {
                this.updateFavoriteKeys(key, false);
            }
        })
    }

    /**
     * 获取收藏的项目对应的key
     * @returns {Promise<any>}
     */
    getFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (e, r) => {
                if (!e) {
                    try {
                        resolve(JSON.parse(r))
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(e)
                }
            })
        })
    }

    /**
     * 更新Favorite key集合
     * @param key
     * @param isAdd true 添加，false 删除
     */
    updateFavoriteKeys(key, isAdd) {
        AsyncStorage.getItem(this.favoriteKey, (e, r) => {
            if (!e) {
                let favoriteKeys = [];
                if (r) {
                    favoriteKeys = JSON.parse(r);
                }
                let index = favoriteKeys.indexOf(key);
                if (isAdd) {
                    if (index === -1) favoriteKeys.push(key);
                } else {
                    if (index !== -1) favoriteKeys.splice(index, 1);
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
            }
        })
    }
}
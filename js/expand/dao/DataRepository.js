/**
 * Created by CxS on 2017/12/28 16:38
 */
import React from 'react';
import {
    AsyncStorage
} from 'react-native';
import GitHubTrending from 'GitHubTrending';

export var FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending', flag_my: 'my'};

export default class DataRepository {
    constructor(flag) {
        this.flag = flag;
        if (flag === FLAG_STORAGE.flag_trending) this.trending = new GitHubTrending();
    }

    fetchRepository(url) {
        return new Promise((resolve, reject) => {
            //获取本地数据
            this.fetchLocalRepository(url)
                .then(result => {
                    if (result) {
                        resolve(result);
                    } else {
                        this.fetchNetRepository(url)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(e => {
                                resolve(e);
                            })
                    }
                })
                .catch(e => {
                    this.fetchNetRepository(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(e => {
                            resolve(e);
                        })
                })
        })
    }

    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        })
    }

    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            if (this.flag === FLAG_STORAGE.flag_trending) {
                this.trending.fetchTrending(url)
                    .then(result => {
                        if (!result) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        this.saveRepository(url, result);
                        resolve(result)
                    })

            } else {
                fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        if (!result) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(result.items);
                        this.saveRepository(url, result.items)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }
        })
    }

    saveRepository(url, items, callBack) {
        if (!url || !items) return;
        let wrapData = {items: items, update_data: new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack)
    }
}
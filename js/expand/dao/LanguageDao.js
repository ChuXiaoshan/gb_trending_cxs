/**
 * Created by CxS on 2018/1/18 16:36
 */
import React from 'react';
import {
    AsyncStorage
} from 'react-native';
import keysData from '../../../res/data/keys.json'
import langsData from '../../../res/data/langs.json'

export var FLAG_LANGUAGE = {flag_language: 'flag_language_language', flag_key: 'flag_language_key'};

export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }

    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    if (r) {
                        try {
                            resolve(JSON.parse(r));
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        const data = this.flag === FLAG_LANGUAGE.flag_key ? keysData : langsData;
                        this.save(data);
                        resolve(data);
                    }
                }
            })
        })
    }

    save(data) {
        AsyncStorage.setItem(this.flag, JSON.stringify(data), (e) => {

        })
    }
}
/**
 * Created by CxS on 2018/2/7 15:22
 */
import DataRepository, {FLAG_STORAGE} from './DataRepository';
import Utils from "../../util/Utils";

const itemMap = new Map();

export default class RepositoryUtils {

    constructor(aboutCommon) {
        this.aboutCommon = aboutCommon;
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_my);
    }

    /**
     * 更新数据
     * @param k
     * @param v
     */
    updateData(k, v) {
        itemMap.set(k, v);
        let arr = [];
        for (let value of itemMap.values()) {
            arr.push(value);
        }
        this.aboutCommon.onNotifyDataChanged(arr);
    }

    /**
     * 获取指点url下的数据
     * @param url
     */
    fetchRepository(url) {
        this.dataRepository.fetchRepository(url)
            .then(r => {
                if (r) {
                    this.updateData(url, r);
                    if (!Utils.checkDate(r.update_data))
                        return this.dataRepository.fetchNetRepository(url);
                }
            }).then((item) => {
            if (item) {
                this.updateData(url, item);
            }
        }).catch(e => {
        })
    }

    /**
     * 批量获取urls下的数据
     * @param urls
     */
    fetchRepositories(urls) {
        for (let i = 0, l = urls.length; i < l; i++) {
            let url = urls[i];
            this.fetchRepository(url);
        }

    }
}
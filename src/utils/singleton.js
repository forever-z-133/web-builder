/**
 * 单例式请求 SingletonRequest
 * 
 * 比如，多组件或多页面都有同个异步过程，
 * 则可对回调进行排队，在该过程完成后再运行。
 * 
 * 举个例子：
 * const _getToken = () => new Promise(resolve => setTimeout(() => resolve('result'), 1e3)); // 原函数
 * SingletonRequest.add('getToken', _getToken); // 加入配置
 * const getToken = (cb) => singleton.get('getToken', undefined, cb); // 改造原函数
 * getToken(() => { // getUserInfo }); // 多次调用都只会请求一次，且回调位置可放在任何位置
 * getToken().then(() => { // getOthers });
 */
class SingletonRequest {
  ajaxMap = {};
  queueList = [];
  dataMap = {};
  loadingMap = {};

  static instance = new SingletonRequest();
  static getInstance() {
    return this.instance;
  }

  add(type, func) {
    this.ajaxMap[type] = func;
  }

  remove(type, onlyRemoveCache = false) {
    delete this.dataMap[type];
    delete this.loadingMap[type];
    this._removeQueue(type, false);
    if (!onlyRemoveCache) {
      delete this.ajaxMap[type];
    }
  }

  get(type, params, cb) {
    return new Promise(resolve => {
      const func = this.ajaxMap[type];
      if (!func) throw new Error('未找到对应配置，请检查是否已配置过 add 函数');

      // 最终的回调
      const callback = (result, isCache) => {
        cb && cb(result, isCache);
        resolve(result);
      };

      // 若已获得数据，则返回
      const cache = this.dataMap[type];
      if (cache !== undefined) {
        callback(cache, true);
        return;
      }

      // 若未获得数据，但正在请求中，则加入队列等待请求结束
      const loading = this.loadingMap[type];
      if (loading) {
        this.queueList.push({ type, callback });
        return;
      }

      // 若既没有数据，也没有等待中，即需要请求数据咯
      this.loadingMap[type] = true;
      this.queueList.push({ type, callback });

      // 接口完成的回调
      const finish = (result) => {
        this.loadingMap[type] = false;
        this._removeQueue(type, true, result);
      };

      // 接口请求
      const promise = func(params, finish);
      if (promise && typeof promise.then === 'function') promise.then(finish);
    });
  }

  // 清掉某数据类的相关队列
  _removeQueue(type, trigger = false, result) {
    this.queueList = this.queueList.filter((item) => {
      if (item.type === type) {
        trigger && this._triggerQueueItem(type, item, result);
        return false;
      }
      return true;
    });
  }

  // 运行某个等待项，且写入缓存
  _triggerQueueItem(type, item, result) {
    const isCache = type in this.dataMap;
    const callback = item.callback;
    callback(result, isCache);
    if (!isCache) this.dataMap[type] = result;
  }
}
export default SingletonRequest;

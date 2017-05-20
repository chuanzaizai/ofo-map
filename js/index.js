/*
 * 封装定位自行车方法
*/
var markers = [];
class Bike {
    /*
     * lng：经度
     * lat：纬度
     * map：地图对象
    */
	constructor(lng, lat, map) { 
        this.lng = lng;
        this.lat = lat;
        this.map = map;
    }
}

Object.assign(Bike.prototype, {
    /*
     * 随机生成随机数
     * @ n:随机位数,默认为3
    */
    randomNumber(n = 3) {
        let rand = '';
        for(let i = 0; i < n; i++){
            let r = Math.floor(Math.random() * 10);
            rand += r;
        }
        return parseInt(rand);
    },
    /*
     * 模拟后台返回的经纬度数组
     * @lng:经度
     * @lat:纬度
    */
    getBikePosition() {
        let lng = this.lng;
        let lat = this.lat;
        if(!lng || !lat) return;
        lng = lng.toFixed(3);
        lat = lat.toFixed(3);
        // 自行车图标路径
        let icon = 'C:/Users/xusong/Desktop/高德地图/img/bike.png';
        /*
         * 这里只是随机生成5个自行车定位点的数组
         * 从经纬度的第4位小数开始生成随机数
        */
        let arr = [];
        for(let i = 0; i < 5; i++){
            let rand = this.randomNumber(3);
            let randLng = parseFloat(lng + rand);
            let randLat = parseFloat(lat + rand);
            // 这里生成的经纬度可能重复
            arr[i] = {icon:icon, lng:randLng, lat:randLat};
        }
        // 用promise模仿异步
        return new Promise((resolve, reject) => {
            arr.length >= 1? resolve(arr) : reject('请求错误');
        });
    },
    /*
     * 渲染自行车坐标
     * @bikePositions:自行车坐标数组
    */
    renderBike(bikePositions = []) {
        // 清除上一次定位绘制的自行车点
        this.map.remove(markers);
        markers = [];
        bikePositions.forEach((bikePosition) => {
            let marker = new AMap.Marker({
                map: this.map,
                icon: bikePosition.icon,
                position: [bikePosition.lng, bikePosition.lat],
                offset: new AMap.Pixel(-12, -36)
            });
            markers.push(marker);
        }); 
    }
})


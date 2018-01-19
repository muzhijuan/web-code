
/**
 * 私有方法
 * @param cornerX
 * @param cornerY
 * @param width
 * @param height
 * @param cornerRadius
 */
function _roundedRect(context, cornerX, cornerY, width, height, cornerRadius) {
    if (width> 0) {
        context.moveTo(cornerX + cornerRadius, cornerY);
    }
    else  {
        context.moveTo(cornerX - cornerRadius, cornerY);
    }
    //核心代码
    context.arcTo(cornerX+width,cornerY,cornerX + width,cornerY + height,cornerRadius);
    context.arcTo(cornerX+width,cornerY + height,cornerX,cornerY + height,cornerRadius);
    context.arcTo(cornerX,cornerY+height,cornerX,cornerY,cornerRadius);
    if(width> 0) {
        context.arcTo(cornerX,cornerY,cornerX+cornerRadius,cornerY,cornerRadius);
    }
    else{
        context.arcTo(cornerX,cornerY,cornerX-cornerRadius,cornerY,cornerRadius);
    }
}
/**
 * 圆角矩形
 * @param strokeStyle 边框颜色
 * @param fillStyle 填充颜色
 * @param cornerX  左上角X轴坐标
 * @param cornerY  左上角Y轴坐标
 * @param width  矩形宽度
 * @param height  矩形高度
 * @param cornerRadius  四个角的半径
 */
function drawRoundedRect(context, strokeStyle,fillStyle,cornerX,cornerY,width,height,cornerRadius) {
    context.beginPath();
    _roundedRect(context, cornerX, cornerY, width, height, cornerRadius);
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
    context.stroke();
    context.fill();
    console.log("绘制圆角");
}


/**
 * 随机返回16进制颜色
 * @returns {string}
 */
function getRandomColor(){
    return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
}


/**
 * 音频的播放时间 -- 格式化时间(秒 --> 00:00:00)
 * @param seconds
 */
function timeFormatter(seconds){
    function zeroPad(str){
        if(str.length > 2) return str;
        for(var i=0; i<(2 - str.length); i++){
            str = "0" + str;
        }
        return str;
    }
    var minute = 60,
        hour = minute * 60;
    hStr = "",
        mStr = "",
        sStr = "";
    var h = Math.floor(seconds / hour);
    hStr = zeroPad(String(h));
    var m = Math.floor((seconds - (h * hour)) / minute);
    mStr = zeroPad(String(m));
    var s = Math.floor((seconds - (h * hour)) - (m * minute));
    sStr = zeroPad(String(s));
    return (hStr + ":" +  mStr + ":" + sStr);
}


/**
 * 返回 HH:mm:ss
 * @param date
 * @returns {string} HH:mm:ss
 * @private
 */
function _dateFormat(date){
    var h = date.getHours() < 10 ?  "0" + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ?  "0" + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ?  "0" + date.getSeconds() : date.getSeconds();
    return h + ":" + m + ":" + s;
}
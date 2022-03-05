//文件大小转换函数
//将表示文件大小的字节数转换为MB、GB格式
export const fileSizeTransfer = (initSize) => {
		if (initSize!= null){
				initSize=initSize/1024/1024;
				if (initSize<0.01){
						initSize='0.01MB'
				}else if (initSize <1024){
						initSize=initSize.toString().split('.');
						initSize=initSize[0]+'.'+initSize[1].slice(0,2)+'MB';
				}else if (initSize>=1024){
						initSize=(initSize/=1024)+'GB'
				}
		}else {
				initSize=''
		}
		return initSize;
};

//时间转换函数
//将UTC时间转换为string类型的时间
//2022-2-27T15:51:32 ---> 2022-2-27 15:51:32
export const formatDateTime=(defaultDate)=>{
		var date=new Date(defaultDate);
		date.setHours(date.getHours()+8);
		// console.log(date)
		var o={
				year:date.getFullYear(),
				month:date.getMonth()+1,
				day:date.getDate(),
				hour:date.getHours(),
				minute:date.getMinutes(),
				sec:date.getSeconds()
		}
		// console.log(o.month)
		return o.year+'-'+o.month+'-'+o.day+' '+o.hour+':'+o.minute+':'+o.sec
}




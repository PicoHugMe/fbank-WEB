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
// export {fileSizeTransfer}


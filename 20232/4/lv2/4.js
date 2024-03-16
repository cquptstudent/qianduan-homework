let arr = [1,[2,3],[4,5,[6,7,8]],9]
console.log(arr);
function flatten(arr){
	let array = [];
	for(let i = 0; i < arr.length; i++) {
		if(Array.isArray(arr[i])){
			array = array.concat(flatten(arr[i]))
		} else {
			array.push(arr[i])
		}
	}
	return array;
}

arr = flatten(arr);

console.log(arr); 
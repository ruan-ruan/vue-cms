export function testPsd(value){
	var rep=/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
	return rep.test(value);
}



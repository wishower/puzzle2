//连接数据库
function DBConn(){
     db = openDatabase('mudb_game_puzzle', '1.0', 'Game DB', 1024 * 1024);	
	 db.transaction(function (tx) {
     tx.executeSql('CREATE TABLE IF NOT EXISTS user_Info (user_name unique,user_password,user_score,user_step,user_time)');
     tx.executeSql('INSERT INTO  user_Info (user_name ,user_password,user_score,user_step,user_time) VALUES ("user","123456","0"," "," ")');
	
     });	
	 
	//打印当前所有用户信息 
	db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM user_Info', [], function (tx, results) {
    var len = results.rows.length, i;
    for (i = 0; i < len; i++){
		    userInfo_list=new Array();
			userInfo_list=new Array();
			userInfo_list.push(results.rows.item(i).user_name);
	        userInfo_list.push(results.rows.item(i).user_password);
	        userInfo_list.push(results.rows.item(i).user_score);
			userInfo_list.push(results.rows.item(i).user_step);
			userInfo_list.push(results.rows.item(i).user_time);
			console.log(userInfo_list);
        }
      }, null);
   });
}


//插入用户信息
function InsertDB(user_name1,user_password1){
	db.transaction(function (tx) {
		var sql='INSERT INTO user_Info (user_name,user_password,user_score,user_step,user_time) VALUES ("'+user_name1+'","'+user_password1+'","0","","")';
       tx.executeSql(sql);	  	   
     });
	 
	//打印当前所有用户信息
	 db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM user_Info', [], function (tx, results) {
    var len = results.rows.length, i;
    for (i = 0; i < len; i++){
		    var userInfo_all=new Array();
			userInfo_all.push(results.rows.item(i).user_name);
	        userInfo_all.push(results.rows.item(i).user_password);
	        userInfo_all.push(results.rows.item(i).user_score);
			userInfo_all.push(results.rows.item(i).user_step);
			userInfo_all.push(results.rows.item(i).user_time);
			console.log(userInfo_all);
        }
      }, null);
   });
}


//修改用户信息
function UpdateDB(score,step,time,name){
	db.transaction(function (tx) {
	var sql='UPDATE user_Info SET user_score="'+score+'" ,user_step="'+step+'" ,user_time="'+time+'" WHERE user_name="'+name+'"';
   tx.executeSql(sql);
});

	db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM user_Info', [], function (tx, results) {
    var len = results.rows.length, i;
    for (i = 0; i < len; i++){
		if( results.rows.item(i).user_name==name){
		    userInfo_list=new Array();
			userInfo_list.push(results.rows.item(i).user_name);
	        userInfo_list.push(results.rows.item(i).user_password);
	        userInfo_list.push(results.rows.item(i).user_score);
			userInfo_list.push(results.rows.item(i).user_step);
	        userInfo_list.push(results.rows.item(i).user_time);
			console.log(userInfo_list);
		 }
        }
      }, null);
   });
}

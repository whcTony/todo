angular.module('todo',[])
    
       .controller('todoCtrl',['$scope',function($scope){
       	/*
       添加任务
       1、 获取用户输入的任务名字
        2、 准备一个任务列表的数组
        3、监听输入框的回车事件
        4、将任务添加到任务列表中
        5、利用ng-repeat指令将任务显示在页面中


       	*/
       	$scope.taskList = [];
       	$scope.addTask = function(event){
       		//如果用户按的是回车键并且文本框中有内容
                 if(event.keyCode == 13 &&$scope.task){
                 	//将用户输入的任务名字添加到任务数组中
                 	$scope.taskList.push({
                 		name:$scope.task,
                 		isCompleted:false
                 	});
                 	$scope.task = ""
                 }
       	}
       	/*删除任务
          1、给删除按钮添加点击事件
          2、把需要删除的任务传递进入事件函数中
          3、删除事件


       	*/
       	$scope.deleteTask = function(task){
             //从数组中删除元素splice(index,1)
             
             $scope.taskList.splice($scope.taskList.indexOf(task),1)
       	}


       	/*
               计算未完成的数量
       	*/
            $scope.unCompletedTaskNum = function(){
       //filter 对数组的内容进行过滤
            	// return $scope.taskList.filter(function(item){
             //         return !item.isCompleted;
            	// }).length;

            	return $scope.taskList.filter(item =>!item.isCompleted).length
            }
       }])
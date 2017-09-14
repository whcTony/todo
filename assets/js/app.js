angular.module('todo',[])
    
       .controller('todoCtrl',['$scope',function($scope){
       	    /*
             获取数据
       	    */
            	$scope.taskList = [];
            	GetTasks();
            	function GetTasks(){
            		if(localStorage.getItem('taskList')){
            		$scope.taskList = angular.fromJson(localStorage.getItem('taskList'))
            		}
            	}





       	/*
       添加任务
       1、 获取用户输入的任务名字
        2、 准备一个任务列表的数组
        3、监听输入框的回车事件
        4、将任务添加到任务列表中
        5、利用ng-repeat指令将任务显示在页面中


       	*/
       	
       	$scope.addTask = function(event){
       		//如果用户按的是回车键并且文本框中有内容
                 if(event.keyCode == 13 &&$scope.task){
                 	//将用户输入的任务名字添加到任务数组中
                 	$scope.taskList.push({
                 		name:$scope.task,
                 		isCompleted:false,
                 		isEditing:false
                 	});
                 	$scope.task = "";

                 	localStorage.setItem('taskList',angular.toJson($scope.taskList))

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
             

             $scope.select = 'All';
            $scope.filterData = function(type){
              switch(type){
              	case 'All':
                 $scope.filterType = '';
                 $scope.select = 'All';
              	break;

              	case 'Active':
                     $scope.filterType = 'false';
                     $scope.select = 'Active';
              	break;

              	case 'Completed':
                      $scope.filterType = 'true';
                      $scope.select = 'Completed';
              	break;
              }
            }

            /*
             清除已完成任务
            
            */
            $scope.clearCompletedTask = function(){
            	 // for(var i=0;i<$scope.taskList.length;i++){
            	 // 	if($scope.taskList[i].isCompleted){
              //           $scope.taskList.splice(i,1);
              //           i--;               
            	 // 	}
            	 // }

            	 //对数据尽心过滤，将未完成的任务留下
            	 $scope.taskList = $scope.taskList.filter(item => !item.isCompleted)
            }

            /*批量更改任务状态*/
            $scope.changeStatus = function(){
            	$scope.taskList.forEach(item => item.isCompleted = $scope.status)
            }

            $scope.updataStatus = function(){

            	// for(var i=0;i<$scope.taskList.length;i++){
            	// 	if(!$scope.taskList[i].isCompleted){
             //                $scope.status = false;
             //                return
            	// 	}
            	// }
            	// $scope.status = true;
            	//如果未完成任务的数量是0，说明都完成了，高亮
           $scope.status = $scope.taskList.filter(item => !item.isCompleted).length == 0
            }

            /*更改任务名称*/
            $scope.modifyTaskName = function(task){
            	//将所有的任务取消编辑状态
              $scope.taskList.forEach(item =>item.isEditing =false);
              //将当前双击的任务添加编辑状态
               task.isEditing = true;
            }
                //取消编辑状态
            $scope.cancelEditing = function(){
            	 $scope.taskList.forEach(item =>item.isEditing =false);
            }
            $scope.$watch('taskList',function(){
            	localStorage.setItem('taskList',angular.toJson($scope.taskList))
            },true)


       }])

       .directive('inpFocus',['$timeout',function($timeout){
       	return {
       		restrict:'A',
       		link:function(scope,element,attributes){
               scope.$watch('item.isEditing',function(newvalue){
                    
                    if(newvalue){
                    $timeout(function(){
                          element[0].focus();
                    },0)
                    	
                    }
               })
       		}
       	}
       }])
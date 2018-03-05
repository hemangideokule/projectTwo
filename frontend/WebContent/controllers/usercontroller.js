/**
 * 
 */
app.controller('UserController',function($scope,$rootScope,$location,userService,$cookieStore){
	$scope.registerUser=function(user){
		alert('Entering usercontroller registerUer() in frontend'+user)
		console.log('entering usercontroller registerUser() in frontend'+user)
		
		userService.registerUser(user).then(function(response){
			alert('Registered Successfully.. Login Again..!!')
			$location.path('/index')
			
		}	
		,function(response){
			$scope.error=response.data
			
		})
	}
	
	$scope.login=function(user){
		console.log('UserController->login')
		console.log(user)
		userService.login(user).then(function(response){
			$rootScope.loggedInUser=response.data
	         $cookieStore.put('currentUser',response.data)
			console.log('success')
			$location.path('/home')
		},function(response){
			console.log('error')
			$scope.error=response.data
			$location.path('/login')
		})
	}
	
	if($rootScope.loggedInUser!=undefined){
		userService.getUser().then(
			function(response){
				$scope.user=response.data
			},
			function(response){
				if(response.status==401)
					$location.path('/login')
				else
					console.log('error 2')
					$scope.error=response.data;
			})
			}


$scope.updateUser=function(user){
	userService.updateUser(user).then(function(response){
		alert('Updated user profile successfully')
		$rootScope.loggedInUser=response.data
		$cookieStore.put('loggedInUser',response.data)
		$location.path('/home')
	},function(response){
		if(response.status==401)
			$location.path('/login')
			else
				$scope.error=response.data
	
	
	})
}

})

















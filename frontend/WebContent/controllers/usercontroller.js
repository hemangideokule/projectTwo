/**
 * 
 */
app.controller('UserController',function($scope,$rootScope,$location,userService){
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
})
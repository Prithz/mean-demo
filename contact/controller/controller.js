var myApp = angular.module('myApp',[]);

	myApp.controller('ContactController', function($scope, $http){
		
	// Get the data from database
		var refresh = function(){		
			$scope.added = $scope.updated = $scope.removed = false;
			$scope.selectedname = null;
			$http({
				method:'GET',
				url:'/contactlists'				
			}).then( function( response ){
				//success			
				$scope.contactlists = response.data;			
				$scope.mycontact = {};				
			}, function(response){ //error
				console.log('Something went wrong in GET :' + response.statusText);			
			});				
		}

		refresh();	
	

	//Contact Form Validation
	
	var validateForm = function(){
		$scope.submitForm = function(isValid){			
			if(isValid){
				$scope.contactForm.$setPristine();
			}
		}	
	}
	
	// Get Selected Person Name
	
	var getUserName = function(id){
		$http({
				method:'GET',
				url:'/contactlists/'+id			
			}).then( function( response ){				
				$scope.selectedname = response.data.name;			
			}, function(response){ //error
				console.log('Something went wrong in GET :' + response.statusText);			
		});
	
	};
	
	//Show the modal 
	$scope.removeModal = function(id){
		$("#myModal").modal();
		getUserName(id);
	}
	
	// Post the data to database
		$scope.addContact = function(){
			validateForm();
			$http({
				method:'POST',
				url : '/contactlists',
				data: $scope.mycontact			
			}).then ( function(response){				
				refresh();
				$scope.added = true;
				$scope.selectedname	=  angular.copy($scope.mycontact.name);
			}, function(response){			
				console.log('Something went wrong in POST :' + response.statusText);
			});		
		};
	
	
		
	//Remove data from database	
		$scope.removeContact = function(id){
			getUserName(id);
			$http({
				method:'DELETE',
				url:'/contactlists/' +id			
			}).then ( function(response){	
				console.log($scope.selectedname);
				refresh();				
				$scope.removed = true;				
			}, function(response){			
				console.log('Something went wrong in Delete :' + response.statusText);
			});		
		}
	
	
	// edit Data
		$scope.editContact = function(id){
			$scope.showme = true;
			$http({
				method:'GET',
				url:'/contactlists/'+id			
			}).then( function( response ){				
				$scope.mycontact = response.data;			
			}, function(response){ //error
				console.log('Something went wrong in GET :' + response.statusText);			
			});		 
		}
		 
		$scope.updateContact = function(){
			$scope.showme = false;
			$http({
				method:'PUT',
				url:'/contactlists/'+ $scope.mycontact._id,
				data:$scope.mycontact		
			}).then( function(response){				
				refresh();				
				$scope.updated = true;
				$scope.selectedname	=  angular.copy($scope.mycontact.name);
				$scope.contactForm.$setPristine();				
			},function(response){		
				console.log('Something went wrong in PUT :' + response.statusText);			
			});		  
		}
	//Cancel form	
		$scope.cancelForm = function(){
			$scope.showme = false;
			$scope.mycontact = {};	
		}
		
	});
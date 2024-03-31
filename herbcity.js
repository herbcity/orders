var app = angular.module("myApp",[]);
app.controller("TableController", function($scope, $http){
    $scope.currPage = 1;
    $scope.pageSize = 10;
    $scope.editData = {};
    $scope.addData = {};    
    $scope.setPage = function(page){
        $scope.startIndex = (page - 1)*$scope.pageSize;
        $scope.endIndex = page*$scope.pageSize;
        $scope.paginatedData = $scope.tableData.slice($scope.startIndex, $scope.endIndex);
        console.log($scope.startIndex + "      " + $scope.endIndex);
    }
    
    $scope.totalPages = function (){
        if($scope.tableData){
            return Math.ceil($scope.tableData.length/$scope.pageSize);
        }
        else {
            return 0;
        }        
    }
    $scope.loadData = function(){
        var request = {
            url: "https://herbcitybackend-1-s0006745.deta.app/api/v1/orders/",
            method: "GET"
        };
        $http(request).then(function(response){
            $scope.tableData = response.data;
            console.log($scope.tableData);
            $scope.setPage($scope.currPage);
        }).catch(function(error){
            console.log("This is an error ",error);      
        });                
    }
    $scope.loadData();                  
    $scope.getPage = function(){
        $scope.pages = $scope.totalPages();
        var pageArr = [];
        for(var i = 1; i<= $scope.pages; i++){
            pageArr.push(i);
        }
        return pageArr;
    }
    $scope.editItem = function(item){
        $scope.item = item;
        console.log($scope.editData);        
    }
    $scope.deleteItem = function(item){
        $scope.item = item;        
    }
    $scope.delete = function(id){
        $scope.id = id;
        var request = {
            url: "https://herbcitybackend-1-s0006745.deta.app/api/v1/orders/" + $scope.id,
            method: "DELETE"
        };
        $http(request).then(function(response){
            $scope.response = response.data;
            $scope.loadData();
            console.log($scope.response);
        });        
    }
    $scope.save = function(id){
        if($scope.editData.status == "" || $scope.editData.status == undefined){
            $scope.editData.status = "Pending";
        }
        $scope.eId = id;
        var request = {
            url: "https://herbcitybackend-1-s0006745.deta.app/api/v1/orders/" + $scope.eId,
            method: "PUT",
            data: $scope.editData
        };
        $http(request).then(function(response){
            $scope.response = response.data;
            $scope.loadData();
        });       
        console.log(id + "    " + $scope.editData.status);
    }
    $scope.addRow = function(){
        console.log($scope.addData);
    }
    $scope.saveRow = function(){
        if($scope.addData.status == "" || $scope.addData.status == undefined){
            $scope.addData.status = "Pending";
        }        
        var request = {
            url: "https://herbcitybackend-1-s0006745.deta.app/api/v1/orders/",
            method: "POST",
            data: $scope.addData
        }
        $http(request).then(function(response){
            $scope.response = response.data;
            console.log($scope.response);
            $scope.loadData();
        });
        console.log($scope.addData);
    }
    
});
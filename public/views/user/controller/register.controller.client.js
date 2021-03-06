(function () {
    angular
        .module("FlightSearchApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $routeParams) {
        var vm = this;
        var userType = $routeParams['userType'];

        vm.registerUser = registerUser;
        // vm.closeAlertBox = closeAlertBox;

        function init() {
            vm.userType = userType;
            // vm.showErrorBox = false;

            vm.questionOptions = {availableQuestions : [{id : '1',name :'What is your birth city?'},
                {id : '2',name :'What is your mother\'s maiden name?'},
                {id : '3',name :'What is your favorite sport?'},
                {id : '4',name :'What is your favorite color?'},
                {id : '5',name :'What is your favorite car?'}],
                passwordRecoveryQuestion : {id : '1',name :'What is your birth city?'}} ;
        }
        init();

        function registerUser(newUser) {
            if(vm.userType != "ADMIN"){
                newUser.passwordRecoveryQuestion = vm.questionOptions.passwordRecoveryQuestion.name;
                newUser.userType = vm.userType;
                if (newUser.password === newUser.verify.password) {
                    UserService
                        .findUserByUsername(newUser.username)
                        .success(function (user) {
                            vm.error = 'Username already exists';
                            vm.showErrorBox = true;
                        })
                        .error(function () {
                            UserService
                                .createUser(newUser)
                                .success(function (user) {
                                    if(user.userType === "HOTELOWNER"){
                                        $location.url('/user-hotelowner/profile');
                                    }
                                    else
                                        $location.url("/user/profile");
                                });
                        });
                } else {
                    vm.error = "Passwords do not match";
                    vm.showErrorBox = true;
                }
            }
            else{
                vm.error = 'Access Denied !!';
                vm.showErrorBox = true;
            }
        }


        // function closeAlertBox () {
        //     console.log('in close alert box');
        //     vm.showErrorBox = false;
        //     // $location.url("/register/" + vm.userType);
        // }


    }
})();
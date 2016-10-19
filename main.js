(function () {
  var app = angular.module('redditApp', ['angularMoment']);

  app.filter('abs', function () {
    return function (num) {
      return Math.abs(num);
    }
  });

  app.filter('length', function () {
    return function (arr) {
      return arr.length;
    }
  });
  app.filter('contains', () => {
    return (input, str) => {
      if (str) {
        return input.filter((oneThing) => {
          return oneThing.title.toLowerCase().indexOf(str.toLowerCase()) > -1;
        });
      } else {
        return input;
      }
    }
  });

  app.controller('mainCtrl', function ($rootScope) {
    this.things = [{title: "google", description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', likes: 0, img: "http://www.placecage.com/200/300", comments: ['Comment1', 'Comment 2'], date:new Date()},
    { title: "yahoo", description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', likes: 0, comments: [], img: "http://www.placecage.com/g/200/300", comments: [], date:new Date() },
    { title: "bing", description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', likes: 0, comments: [], img: "http://www.placecage.com/c/200/300", comments: [], date:new Date() }]
    this.filtering = '-likes'
    $rootScope.title = '';
    $rootScope.comments = [];
    var things = this.things
    $rootScope.$on('newPosting', function (event, data) {
      things.push(data)
    })
  });

  app.controller('singleCtrl', function ($rootScope) {
    this.modal = function (thing) {
      $rootScope.$emit('modalChange', thing)
    }

    this.add = function (num) {
      return num + 1;
    }

    this.down = function (num) {
      return num - 1;
    }
  })

  app.controller('Modal', function ($rootScope) {
    var test = this
    $rootScope.$on('modalChange', function (event, thing) {
      test.comments = thing.comments
      test.title = thing.title
    })
    this.addPost = function () {
      var out = {
        title: this.title,
        description: this.description,
        likes: 0,
        comments: [],
        imgage: this.image,
        date: new Date()
      }
      this.title = '';
      this.description = '';
      this.image = '';
      $rootScope.$emit('newPosting', out)
    }
    this.addCom = function (str) {
      test.comments.push(str)
    }
  })


  $('.close').click(function() {
    $('#newPost').modal('toggle');
  });
})();

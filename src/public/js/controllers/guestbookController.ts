angular.module('guestbook').controller('guestbookCtrl', function ($scope, $http: angular.IHttpService) {
    var gb = this;
    this.getEntries = () => {
        $http.get('/api/entries').then((response) => {
            gb.entries = response.data;
        });
    }

    this.submit = () => {
        $http.post('/api/entries', {
            name: gb.name,
            message: gb.message
        }).then(() => {
            gb.name = '';
            gb.message = '';
            gb.getEntries();
        });
    }
    
    this.delete = (entry) => {
        console.log(entry);
        
        $http.delete('/api/entries/' + entry._id).then(() => {
            gb.getEntries();
        });
    }
    
    gb.getEntries();
});
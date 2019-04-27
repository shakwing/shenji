function PromiseResolver () { 
  var self = this; 
  this.promise = new Promise(
    function (resolve, reject) { 
      self.resolve = resolve; 
      self.reject = reject; 
    }
  ); 
};
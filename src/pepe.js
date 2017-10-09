module.exports = function () {
  this.firstName = 'firstName';
  this.lastName = 'lastName';
  this.fullName = function () { 
      return this.firstName + ' ' + this.lastName;
  }
}

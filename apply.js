var robin = {
	firstName: "Robin",
	sayHi: function() {
		return "Hi " + this.firstName;
	},
	addNum: function(a,b,c,d) {
		return this.firstName + " just calculated "
		+ (a + b + c + d);
	}
}

var Kobe = {
	firstName: "Kobe"
};

console.log(robin.firstName);

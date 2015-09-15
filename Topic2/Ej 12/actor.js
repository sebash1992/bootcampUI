 function actor (firstName, lastName) {
            this.attributes = {};
            this.attributes["firstName"]=firstName;
            this.attributes["lastName"]=lastName;
        };

actor.prototype = (function(){
    return{
        getName:function ()  {
            console.log(this.attributes["firstName"] + " " + this.attributes["lastName"]);
        },
        set:function (attr,value)  {
                    var oldValue = this.attributes[attr];
                    this.attributes[attr]=value;
                    console.log(attr+" " + oldValue + " renamed by " + this.attributes[attr]);
        },
    };
})();